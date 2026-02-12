import { homeApps, homeCategories, type HomeApp } from '@/lib/mock/marketplace-home-data';
import { getAppBySlug, getVendorById } from '@/lib/mock/repository';

export type AppReview = {
  id: string;
  author: string;
  role: string;
  rating: number;
  dateLabel: string;
  content: string;
};

export type AppScreenshot = {
  id: string;
  title: string;
  caption: string;
  highlights: string[];
};

export type AppPricingPlan = {
  id: string;
  name: string;
  priceLabel: string;
  billingLabel: string;
  recommended: boolean;
  features: string[];
};

export type AppDetailModel = {
  slug: string;
  name: string;
  vendor: string;
  vendorSlug: string;
  rating: number;
  installs: number;
  description: string;
  tags: string[];
  categoryName: string;
  iconText: string;
  features: string[];
  screenshots: AppScreenshot[];
  pricingPlans: AppPricingPlan[];
  reviews: AppReview[];
};

const reviewAuthors = [
  { name: 'Ava Chen', role: 'Engineering Manager' },
  { name: 'Noah Kim', role: 'DevOps Lead' },
  { name: 'Sofia Patel', role: 'Product Operations' },
  { name: 'Liam Wang', role: 'Technical Program Manager' },
  { name: 'Mia Rodriguez', role: 'QA Director' },
  { name: 'Ethan Zhao', role: 'Head of Engineering' },
];

const reviewPhrases = [
  'Implementation was quick and the workflow fit our existing release process immediately.',
  'The app surfaced bottlenecks we missed in weekly syncs and improved planning confidence.',
  'Adoption was smooth because the UI is clean and role permissions are straightforward.',
  'We reduced handoff time across teams and now track delivery risk much earlier.',
  'Dashboards are executive-friendly while still useful for squad-level execution details.',
  'Automation quality is reliable and support response has been consistently fast.',
];

function toIconText(name: string) {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
}

function getStableSeed(input: string) {
  return input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function buildReviews(app: HomeApp): AppReview[] {
  const seed = getStableSeed(app.slug);

  return Array.from({ length: 5 }, (_, index) => {
    const author = reviewAuthors[(seed + index) % reviewAuthors.length];
    const phrase = reviewPhrases[(seed + index * 2) % reviewPhrases.length];
    const ratingOffset = index % 2 === 0 ? 0 : 0.1;

    return {
      id: `${app.id}-review-${index + 1}`,
      author: author.name,
      role: author.role,
      rating: Math.max(4.2, Number((app.rating - ratingOffset).toFixed(1))),
      dateLabel: `2026-0${(index % 6) + 1}-1${index}`,
      content: phrase,
    };
  });
}

function buildScreenshots(app: HomeApp): AppScreenshot[] {
  return [
    {
      id: `${app.id}-screen-1`,
      title: 'Overview Dashboard',
      caption: `Track ${app.name} outcomes with unified visibility across squads and releases.`,
      highlights: ['Realtime KPI board', 'Owner drill-down', 'Weekly trend insight'],
    },
    {
      id: `${app.id}-screen-2`,
      title: 'Workflow Automation',
      caption: 'Configure rules and automation chains without external scripting.',
      highlights: ['Conditional triggers', 'Approval stages', 'Ops-ready logs'],
    },
    {
      id: `${app.id}-screen-3`,
      title: 'Executive Summary',
      caption: 'Generate structured summaries for delivery leaders and stakeholders.',
      highlights: ['Portfolio view', 'Risk snapshot', 'Shareable briefing'],
    },
  ];
}

function buildPricingPlans(app: HomeApp): AppPricingPlan[] {
  return [
    {
      id: `${app.id}-starter`,
      name: 'Starter',
      priceLabel: '$0',
      billingLabel: 'up to 10 members',
      recommended: false,
      features: ['Core integration', 'Basic analytics', 'Community support'],
    },
    {
      id: `${app.id}-growth`,
      name: 'Growth',
      priceLabel: '$39',
      billingLabel: 'per workspace / month',
      recommended: true,
      features: ['Advanced automation', 'Priority support', 'Role-based access'],
    },
    {
      id: `${app.id}-enterprise`,
      name: 'Enterprise',
      priceLabel: 'Custom',
      billingLabel: 'annual contract',
      recommended: false,
      features: ['Security controls', 'Dedicated success', 'Custom rollout plan'],
    },
  ];
}

function buildDetail(app: HomeApp): AppDetailModel {
  const categoryName = homeCategories.find((category) => category.id === app.categoryId)?.name ?? 'General';

  return {
    slug: app.slug,
    name: app.name,
    vendor: app.vendor,
    vendorSlug: app.vendorSlug,
    rating: app.rating,
    installs: app.installs,
    description: app.description,
    tags: app.tags,
    categoryName,
    iconText: toIconText(app.name),
    features: [
      `Built for ${categoryName.toLowerCase()} workflows`,
      'Enterprise-ready permission and governance model',
      'Fast onboarding with minimal setup overhead',
      'Actionable insights for delivery and leadership reviews',
    ],
    screenshots: buildScreenshots(app),
    pricingPlans: buildPricingPlans(app),
    reviews: buildReviews(app),
  };
}

function buildLegacyDetail(slug: string): AppDetailModel | null {
  const legacy = getAppBySlug(slug);
  if (!legacy) return null;

  const vendor = getVendorById(legacy.vendorId);
  const fallback: HomeApp = {
    id: legacy.id,
    slug: legacy.slug,
    name: legacy.name,
    vendor: vendor?.name ?? 'Unknown Vendor',
    vendorSlug: vendor?.slug ?? 'unknown-vendor',
    description: legacy.description,
    installs: legacy.installCount,
    rating: legacy.rating,
    tags: ['Integration', 'Productivity'],
    categoryId: legacy.categoryIds[0] ?? homeCategories[0]?.id ?? 'cat-project',
    featured: true,
    recommended: true,
    cta: 'Install Now',
  };

  return buildDetail(fallback);
}

export function getAppDetailBySlug(slug: string) {
  const app = homeApps.find((item) => item.slug === slug);
  if (app) return buildDetail(app);
  return buildLegacyDetail(slug);
}

export function getRelatedAppsBySlug(slug: string) {
  const current = homeApps.find((item) => item.slug === slug);
  if (!current) {
    return homeApps.slice(0, 3);
  }

  return homeApps
    .filter((app) => app.slug !== slug && app.categoryId === current.categoryId)
    .sort((left, right) => right.installs - left.installs)
    .slice(0, 3);
}
