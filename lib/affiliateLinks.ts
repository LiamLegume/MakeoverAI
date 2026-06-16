export const AFFILIATE_TAG =
  process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || "roomrevamp-20";

export const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases. Some links on this page may be affiliate links.";

export function withAffiliateTag(url: string, tag = AFFILIATE_TAG) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("amazon.")) {
      parsed.searchParams.set("tag", tag);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}
