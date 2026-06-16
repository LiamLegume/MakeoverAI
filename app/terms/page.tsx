import { Card } from "@/components/Card";

export default function TermsPage() {
  return (
    <div className="bg-linen py-14">
      <div className="page-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sage">Terms</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-normal">Terms of use</h1>
        <Card className="mt-8 space-y-5 p-6 text-base leading-8 text-muted">
          <p>
            RoomRevamp provides AI-assisted suggestions for room styling, layout, product
            categories, and budget planning. It does not provide certified professional
            interior design, construction, electrical, or safety advice.
          </p>
          <p>
            Users should check product dimensions, room measurements, rental rules, and
            installation requirements before buying or installing anything.
          </p>
          <p>
            Product prices and availability may change. Amazon does not endorse this app,
            and recommendations are not guarantees of fit, quality, or outcome.
          </p>
        </Card>
      </div>
    </div>
  );
}
