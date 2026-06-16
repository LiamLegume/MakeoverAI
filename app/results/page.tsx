"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BeforeAfterPreview } from "@/components/BeforeAfterPreview";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ColourPalette } from "@/components/ColourPalette";
import { DisclosureNotice } from "@/components/DisclosureNotice";
import { LockedSection } from "@/components/LockedSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ReportSection } from "@/components/ReportSection";
import { ScoreCard } from "@/components/ScoreCard";
import { SocialShareCard } from "@/components/SocialShareCard";
import { getMatchedRoomExample } from "@/lib/roomExamples";
import type { GeneratedRoomReport } from "@/lib/types";

const storageKey = "roomrevamp.latestReport";
const planStorageKey = "roomrevamp.selectedPlan";

const includedCards = [
  { badge: "LAY", title: "Layout moves", copy: "Furniture placement and walking-path fixes." },
  { badge: "LGT", title: "Lighting plan", copy: "Warm bulbs, task lights, and mood layers." },
  { badge: "FUR", title: "Furniture tips", copy: "What to keep, move, replace, or buy first." },
  { badge: "BUY", title: "Shopping list", copy: "Budget-aware product categories and priorities." }
];

export default function ResultsPage() {
  const router = useRouter();
  const [report, setReport] = useState<GeneratedRoomReport | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        setReport(JSON.parse(raw) as GeneratedRoomReport);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
    const plan = localStorage.getItem(planStorageKey) || "";
    setSelectedPlan(plan);
    setIsLocked(!plan);
    setIsLoading(false);
  }, []);

  function goToPricing() {
    router.push("/pricing");
  }

  if (isLoading) {
    return (
      <div className="page-shell py-16">
        <Card className="premium-card glass-panel p-8">
          <p className="text-muted">Loading your latest report...</p>
        </Card>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="aurora-stage py-16">
        <div className="page-shell">
          <Card className="premium-card glass-panel p-8 text-center">
            <p className="text-sm font-semibold uppercase text-sage">No report yet</p>
            <h1 className="font-serif-display mt-2 text-4xl font-semibold tracking-normal text-plum">
              Create a makeover plan first.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">
              Upload a room photo and choose your style, room type, budget, and goals. The
              latest report will appear here.
            </p>
            <Button href="/create" className="orange-button mt-5">
              Go to Create
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const matchedExample = getMatchedRoomExample({
    roomType: report.input.customRoomType || report.input.roomType,
    theme: report.input.selectedTheme
  });
  const beforeImage = matchedExample.beforeImage;
  const afterImage = matchedExample.afterImage;
  const displayRoomType = report.input.customRoomType || report.input.roomType;
  const planLabel = selectedPlan ? selectedPlan.replaceAll("-", " ") : "Free teaser";
  const teaserSteps = [
    report.quickTip,
    report.priorityFixes[0],
    `Keep purchases inside the ${report.input.budget} plan until the layout is settled.`
  ];

  return (
    <div className="aurora-stage dotted-parallax py-8 md:py-12">
      <div className="aurora-motion" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="page-shell relative z-10 space-y-6">
        <section className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <div className="glass-panel rounded-soft p-6 md:p-8">
            <p className="glass-pill inline-flex px-4 py-2 text-xs font-semibold uppercase text-plum">
              Makeover report
            </p>
            <h1 className="font-serif-display mt-5 max-w-4xl text-5xl font-semibold leading-none tracking-normal text-plum md:text-7xl">
              Your {displayRoomType} plan is ready.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              The free view shows the diagnosis and first moves. Unlock the full report for
              layout, lighting, palette, shopping, and the share card.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Score", `${report.roomScore}/100`],
                ["Budget", report.input.budget],
                ["Plan", planLabel]
              ].map(([label, value]) => (
                <div key={label} className="rounded-soft border border-white/62 bg-white/56 p-4 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase text-sage">{label}</p>
                  <p className="mt-2 text-lg font-semibold capitalize text-plum">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-soft border border-white/62 bg-white/58 p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase text-sage">Main problem</p>
              <h2 className="mt-2 text-2xl font-semibold text-plum">{report.mainProblem}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{report.quickTip}</p>
            </div>
          </div>

          <div className="glass-panel rounded-soft p-3">
            <LockedSection
              isLocked={isLocked}
              title="Full preview locked"
              description="Choose a plan to reveal the full before/after preview and the complete practical report."
              buttonLabel="See pricing plans"
              onUnlock={goToPricing}
            >
              <BeforeAfterPreview
                beforeImage={beforeImage}
                afterImage={afterImage}
                theme={report.input.selectedTheme}
                budget={report.input.budget}
              />
            </LockedSection>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {includedCards.map((item) => (
            <div key={item.title} className="glass-panel rounded-soft p-5">
              <span className="inline-flex h-8 min-w-10 items-center justify-center rounded bg-oat px-2 text-[11px] font-semibold tracking-normal text-plum">
                {item.badge}
              </span>
              <h2 className="mt-4 text-base font-semibold text-plum">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-5">
            <ScoreCard score={report.roomScore} />

            <div className="glass-panel rounded-soft p-5">
              <p className="text-xs font-semibold uppercase text-sage">Start here</p>
              <div className="mt-4 space-y-3">
                {teaserSteps.map((step, index) => (
                  <div key={step} className="rounded-soft border border-white/60 bg-white/56 p-3 backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase text-sage">0{index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {isLocked ? (
              <div className="glass-panel rounded-soft border-coral/40 p-5">
                <p className="text-sm font-semibold text-plum">Free teaser</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Unlock the full plan when you want the detailed layout, product ideas,
                  palette, lighting plan, and share card.
                </p>
                <Button className="orange-button mt-4 w-full" onClick={goToPricing}>
                  Unlock results
                </Button>
              </div>
            ) : (
              <div className="glass-panel rounded-soft p-5">
                <p className="text-xs font-semibold uppercase text-sage">Unlocked plan</p>
                <p className="mt-2 text-lg font-semibold capitalize text-plum">{planLabel}</p>
              </div>
            )}
          </aside>

          <div className="space-y-6">
            <LockedSection
              isLocked={isLocked}
              title="Full report locked"
              description="Choose a plan to reveal the complete room plan."
              buttonLabel="See pricing plans"
              onUnlock={goToPricing}
            >
              <div className="space-y-6 p-1 md:p-2">
                <ReportSection title="Style diagnosis" eyebrow="Diagnosis">
                  <p className="text-sm leading-6 text-muted">{report.styleSummary}</p>
                </ReportSection>

                <ReportSection title="Main issues" eyebrow="Honest read">
                  <ul className="grid gap-3 text-sm leading-6 text-muted sm:grid-cols-2">
                    {report.mainIssues.map((issue) => (
                      <li key={issue} className="rounded-soft border border-white/60 bg-white/56 p-3 backdrop-blur-xl">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </ReportSection>

                <ReportSection title="Priority fixes" eyebrow="Start here">
                  <ol className="grid gap-3 text-sm leading-6 text-muted sm:grid-cols-2">
                    {report.priorityFixes.map((fix) => (
                      <li key={fix} className="rounded-soft border border-white/60 bg-white/56 p-3 backdrop-blur-xl">
                        {fix}
                      </li>
                    ))}
                  </ol>
                </ReportSection>

                <ReportSection title="Furniture and layout moves" eyebrow="Layout plan">
                  <ul className="grid gap-3 text-sm leading-6 text-muted sm:grid-cols-2">
                    {report.layoutSuggestions.map((suggestion) => (
                      <li key={suggestion} className="rounded-soft border border-white/60 bg-white/56 p-3 backdrop-blur-xl">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </ReportSection>

                <ReportSection title="Colour palette" eyebrow="Palette">
                  <ColourPalette colours={report.colourPalette} />
                </ReportSection>

                <ReportSection title="Lighting plan" eyebrow="Light">
                  <ul className="grid gap-3 text-sm leading-6 text-muted sm:grid-cols-2">
                    {report.lightingPlan.map((item) => (
                      <li key={item} className="rounded-soft border border-white/60 bg-white/56 p-3 backdrop-blur-xl">
                        {item}
                      </li>
                    ))}
                  </ul>
                </ReportSection>

                <ReportSection title="Product recommendations" eyebrow="Shopping list">
                  <div className="space-y-4">
                    <DisclosureNotice />
                    <ProductGrid products={report.productRecommendations} />
                  </div>
                </ReportSection>

                <ReportSection title="Social share card" eyebrow="Screenshot">
                  <SocialShareCard
                    score={report.roomScore}
                    theme={report.input.selectedTheme}
                    topFix={report.priorityFixes[0]}
                    beforeImage={beforeImage}
                    afterImage={afterImage}
                  />
                </ReportSection>

                <ReportSection title="Export and compare" eyebrow="Next steps">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-soft border border-white/60 bg-white/56 p-4 backdrop-blur-xl">
                      <p className="font-semibold text-plum">Leaderboard</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        Compare this score against the demo makeover board.
                      </p>
                      <Button href="/leaderboard" variant="secondary" className="mt-4">
                        View leaderboard
                      </Button>
                    </div>
                    <div className="rounded-soft border border-white/60 bg-white/56 p-4 backdrop-blur-xl">
                      <p className="font-semibold text-plum">Download</p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        PDF export is mocked in this MVP and ready to connect later.
                      </p>
                      <Button variant="secondary" className="mt-4">
                        Download report
                      </Button>
                    </div>
                  </div>
                </ReportSection>

                <details className="glass-panel rounded-soft p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-plum">
                    Developer generation prompt
                  </summary>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted">
                    {report.aiPreviewPrompt}
                  </p>
                </details>
              </div>
            </LockedSection>
          </div>
        </section>
      </div>
    </div>
  );
}
