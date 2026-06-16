import { BeforeAfterPreview } from "@/components/BeforeAfterPreview";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { exampleMakeovers } from "@/lib/mockData";

export default function ExamplesPage() {
  return (
    <div className="aurora-stage py-10 md:py-14">
      <div className="page-shell relative z-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="inline-flex rounded-full bg-white/75 px-4 py-2 text-sm font-semibold uppercase text-sage shadow-card">
              Examples
            </p>
            <h1 className="font-serif-display mt-4 text-5xl tracking-normal text-plum md:text-7xl">
              Makeovers that stay believable.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              These sample reports show the tone: direct, useful, and grounded in
              budget-aware changes.
            </p>
          </div>
          <Button href="/create" className="orange-button">Start your own</Button>
        </div>

        <div className="mt-8 space-y-6">
          {exampleMakeovers.map((example) => (
            <Card key={example.title} className="premium-card p-4">
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase text-sage">{example.title}</p>
                  <h2 className="font-serif-display mt-1 text-4xl text-plum">
                    {example.theme} refresh
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{example.summary}</p>
                </div>
                <div className="metric-pulse rounded-soft border border-line bg-[#fff0e9] px-4 py-2 text-sm font-semibold text-coral">
                  {example.score}/100
                </div>
              </div>
              <BeforeAfterPreview
                beforeImage={example.before}
                afterImage={example.after}
                theme={example.theme}
                budget="demo"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
