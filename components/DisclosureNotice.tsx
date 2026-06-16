import { AFFILIATE_DISCLOSURE } from "@/lib/affiliateLinks";

export function DisclosureNotice() {
  return (
    <aside className="rounded-soft border border-line bg-oat p-4 text-sm leading-6 text-muted">
      <strong className="font-semibold text-ink">Affiliate disclosure: </strong>
      {AFFILIATE_DISCLOSURE}
    </aside>
  );
}
