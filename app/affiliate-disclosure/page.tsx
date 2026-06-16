import { Card } from "@/components/Card";
import { AFFILIATE_DISCLOSURE } from "@/lib/affiliateLinks";

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-linen py-14">
      <div className="page-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sage">Disclosure</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-normal">
          Affiliate disclosure
        </h1>
        <Card className="mt-8 p-6">
          <p className="text-base leading-8 text-muted">{AFFILIATE_DISCLOSURE}</p>
          <p className="mt-4 text-base leading-8 text-muted">
            Product prices and availability may change. Product links in this MVP are
            placeholders and should be replaced with approved affiliate links before a
            production launch. RoomRevamp is not endorsed by Amazon.
          </p>
        </Card>
      </div>
    </div>
  );
}
