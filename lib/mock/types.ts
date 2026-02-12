export type AppItem = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  vendorId: string;
  categoryIds: string[];
  rating: number;
  reviews: number;
  installCount: number;
};

export type Vendor = {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoUrl: string;
  website: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
};
