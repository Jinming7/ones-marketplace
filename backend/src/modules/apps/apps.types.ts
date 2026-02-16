export type AppSortBy = "relevance" | "top-selling" | "top-rated" | "newest";

export interface SearchAppsQuery {
  application?: string;
  hosting?: string;
  cost?: string;
  program?: string;
  sortBy?: AppSortBy;
  page?: number;
  limit?: number;
}
