import { AppDetailModel } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export async function getAppDetail(appKey: string): Promise<AppDetailModel> {
  const response = await fetch(`${API_BASE_URL}/api/apps/${appKey}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch app detail: ${response.status}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    key: data.key,
    logoUrl: data.logoUrl,
    name: data.name,
    partnerName: data.partner?.name ?? "Unknown Partner",
    rating: data.ratingAverage ?? 0,
    installs: data.installs ?? 0,
    summary: data.summary,
    programs: (Array.isArray(data.programs) ? data.programs : []).map((code: string) => ({
      code,
      label: code.replaceAll("_", " ")
    })),
    supportedHosting:
      data.hosting === "ONPREM"
        ? ["on-prem"]
        : data.hosting === "HYBRID"
          ? ["cloud", "on-prem"]
          : ["cloud"],
    description: data.description,
    pricingModel: data.pricingModel,
    partner: data.partner,
    reviews: data.reviews,
    securityInfo: data.securityInfo
  };
}
