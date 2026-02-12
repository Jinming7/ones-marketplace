import apps from "@/mock/apps.json";
import categories from "@/mock/categories.json";
import vendors from "@/mock/vendors.json";
import type { AppItem, Category, Vendor } from "@/lib/mock/types";

export const appList = apps as AppItem[];
export const categoryList = categories as Category[];
export const vendorList = vendors as Vendor[];

export function getAppBySlug(slug: string) {
  return appList.find((app) => app.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categoryList.find((category) => category.slug === slug);
}

export function getVendorBySlug(slug: string) {
  return vendorList.find((vendor) => vendor.slug === slug);
}

export function getVendorById(vendorId: string) {
  return vendorList.find((vendor) => vendor.id === vendorId);
}

export function getAppsByCategoryId(categoryId: string) {
  return appList.filter((app) => app.categoryIds.includes(categoryId));
}

export function getAppsByVendorId(vendorId: string) {
  return appList.filter((app) => app.vendorId === vendorId);
}
