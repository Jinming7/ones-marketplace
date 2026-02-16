import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { env } from "../../config/env.js";
import { elasticsearchClient } from "../../config/elasticsearch.js";
import { prisma } from "../../config/prisma.js";
import { SearchAppsQuery } from "./apps.types.js";

const searchQuerySchema = z.object({
  application: z.string().optional(),
  hosting: z.string().optional(),
  cost: z.string().optional(),
  program: z.string().optional(),
  sortBy: z.enum(["relevance", "top-selling", "top-rated", "newest"]).default("relevance"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20)
});

const sortMap = {
  relevance: [{ _score: { order: "desc" as const } }],
  "top-selling": [{ installs: { order: "desc" as const } }],
  "top-rated": [{ ratingAverage: { order: "desc" as const } }],
  newest: [{ createdAt: { order: "desc" as const } }]
};

export class AppsService {
  async searchApps(rawQuery: SearchAppsQuery) {
    const query = searchQuerySchema.parse(rawQuery);
    const from = (query.page - 1) * query.limit;

    const must: Array<Record<string, unknown>> = [];
    const filter: Array<Record<string, unknown>> = [];

    if (query.application) {
      must.push({
        multi_match: {
          query: query.application,
          fields: ["name^3", "summary^2", "partnerName", "categories", "keywords"],
          fuzziness: "AUTO"
        }
      });
    }

    if (query.hosting) {
      filter.push({ term: { hosting: query.hosting.toLowerCase() } });
    }

    if (query.cost) {
      filter.push({ term: { pricingModel: query.cost.toLowerCase() } });
    }

    if (query.program) {
      filter.push({ term: { programs: query.program } });
    }

    const body = {
      from,
      size: query.limit,
      query: {
        bool: {
          must: must.length ? must : [{ match_all: {} }],
          filter
        }
      },
      sort: sortMap[query.sortBy],
      aggs: {
        by_hosting: { terms: { field: "hosting" } },
        by_program: { terms: { field: "programs" } },
        by_cost: { terms: { field: "pricingModel" } }
      }
    };

    const response = await elasticsearchClient.search({
      index: env.elasticsearchAppIndex,
      body
    });

    const total =
      typeof response.hits.total === "number"
        ? response.hits.total
        : (response.hits.total?.value ?? 0);

    const apps = response.hits.hits.map((hit) => ({
      id: hit._id,
      ...(hit._source as Record<string, unknown>)
    }));

    return {
      page: query.page,
      limit: query.limit,
      total,
      apps,
      aggregations: response.aggregations ?? {}
    };
  }

  toHalSearchResponse(basePath: string, result: Awaited<ReturnType<AppsService["searchApps"]>>) {
    const totalPages = Math.ceil(result.total / result.limit) || 1;

    return {
      _links: {
        self: { href: `${basePath}?page=${result.page}&limit=${result.limit}` },
        first: { href: `${basePath}?page=1&limit=${result.limit}` },
        last: { href: `${basePath}?page=${totalPages}&limit=${result.limit}` },
        ...(result.page > 1
          ? { prev: { href: `${basePath}?page=${result.page - 1}&limit=${result.limit}` } }
          : {}),
        ...(result.page < totalPages
          ? { next: { href: `${basePath}?page=${result.page + 1}&limit=${result.limit}` } }
          : {})
      },
      page: {
        number: result.page,
        size: result.limit,
        totalElements: result.total,
        totalPages
      },
      _embedded: {
        apps: result.apps
      },
      facets: result.aggregations
    };
  }

  async getAppByKey(appKey: string) {
    const app = await prisma.app.findUnique({
      where: { key: appKey },
      include: {
        partner: true,
        reviews: {
          include: {
            user: {
              select: { id: true, name: true }
            }
          },
          orderBy: {
            createdAt: "desc"
          },
          take: 20
        },
        categories: true
      }
    });

    if (!app) {
      const error = new Error("App not found");
      (error as Error & { status?: number }).status = StatusCodes.NOT_FOUND;
      throw error;
    }

    return app;
  }
}

export const appsService = new AppsService();
