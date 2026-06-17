"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { BadgeCheck, ClipboardList, Eye, LockKeyhole, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { getMatchedRoomExample } from "@/lib/roomExamples";
import type { GeneratedRoomReport } from "@/lib/types";

const reportStorageKey = "roomrevamp.latestReport";
const planStorageKey = "roomrevamp.selectedPlan";

const plans = [
  {
    id: "mini-reveal",
    name: "Mini Reveal",
    price: "A$4",
    eyebrow: "Starter",
    description: "Unlock the score, the main problem, and the first fixes to start with.",
    features: ["Room score", "Top 3 fixes", "One preview direction"],
    bestFor: "Quick confidence check",
    highlighted: false
  },
  {
    id: "full-room-plan",
    name: "Full Room Plan",
    price: "A$14",
    eyebrow: "Recommended",
    description: "Unlock the full practical makeover plan with layout, lighting, furniture, and shopping notes.",
    features: ["Full before/after preview", "Furniture and layout plan", "Shopping shortlist"],
    bestFor: "One complete room",
    highlighted: true
  },
  {
    id: "room-pack",
    name: "Room Pack",
    price: "A$29",
    eyebrow: "Multiple rooms",
    description: "For connected spaces that need one visual system across multiple reports.",
    features: ["Up to 3 room reports", "Style consistency notes", "Expanded shopping shortlist"],
    bestFor: "Connected spaces",
    highlighted: false
  }
];

const unlockSteps = [
  "Full image preview",
  "Priority fixes",
  "Palette and lighting",
  "Product shortlist"
];

const planIcons: Record<string, LucideIcon> = {
  "mini-reveal": Eye,
  "full-room-plan": ClipboardList,
  "room-pack": Sparkles
};

const unlockDeliverables = [
  "Before/after direction",
  "Layout and furniture moves",
  "Lighting and palette plan",
  "Shopping priorities",
  "3D room view"
];

const showcaseImages = [
  "/images/ai-after-apartment.webp",
  "/images/ai-after-bathroom.webp",
  "/images/ai-after-bedroom-dark.png",
  "/images/ai-japandi-bedroom.png",
  "/images/ai-after-student.png",
  "/images/ai-hotel-bedroom.png"
];

export default function PricingPage() {
  const router = useRouter();
  const [report, setReport] = useState<GeneratedRoomReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState("full-room-plan");

  useEffect(() => {
    const raw = localStorage.getItem(reportStorageKey);
    if (raw) {
      try {
        setReport(JSON.parse(raw) as GeneratedRoomReport);
      } catch {
        localStorage.removeItem(reportStorageKey);
      }
    }
    setIsLoading(false);
  }, []);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) || plans[1],
    [selectedPlanId]
  );

  function choosePlan(planId = selectedPlanId) {
    localStorage.setItem(planStorageKey, planId);
    router.push(report ? "/results" : "/create");
  }

  if (isLoading) {
    return (
      <div className="page-shell py-16">
        <Card className="premium-card p-8">
          <p className="text-muted">Loading pricing...</p>
        </Card>
      </div>
    );
  }

  const matchedExample = getMatchedRoomExample({
    roomType: report?.input.customRoomType || report?.input.roomType,
    theme: report?.input.selectedTheme
  });
  const teaserBefore = matchedExample.beforeImage;
  const teaserAfter = matchedExample.afterImage;
  const teaserScore = report?.roomScore || 82;
  const teaserProblem = report?.mainProblem || "Lighting and clutter are holding the room back";
  const roomType = report?.input.customRoomType || report?.input.roomType || "your room";
  const theme = report?.input.selectedTheme || "dark modern";

  return (
    <section className="aurora-stage dotted-parallax min-h-[calc(100vh-74px)] py-10 md:py-14">
      <div className="aurora-motion" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="page-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="reveal-up">
            <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase text-plum shadow-card">
              Analysis complete
            </p>
            <h1 className="font-serif-display mt-5 text-5xl leading-[0.96] tracking-normal text-plum md:text-7xl">
              {report ? "Your reveal is waiting." : "Choose your makeover plan."}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              {report
                ? `Your ${roomType} teaser is ready. Unlock the ${theme} makeover preview, the full report, and the practical shopping plan.`
                : "Pick the plan you want, then upload your room photos and answer the guided questions to generate your locked results."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {unlockDeliverables.map((item) => (
                <span key={item} className="glass-pill inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-plum">
                  <BadgeCheck aria-hidden="true" size={14} className="text-coral" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Score", teaserScore],
              ["Locked sections", "7"],
              ["Preview mode", "Live"]
            ].map(([label, value]) => (
              <Card key={label} className="premium-card metric-pulse p-4">
                <p className="text-xs font-semibold uppercase text-sage">{label}</p>
                <p className="font-serif-display mt-2 text-4xl text-plum">{value}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <Card className="premium-card overflow-hidden p-0">
            <div className="relative">
              <BeforeAfterSlider
                beforeImage={teaserBefore}
                afterImage={teaserAfter}
                beforeLabel="Original"
                afterLabel="Locked after"
                afterLocked
                imageClassName="h-[430px] md:h-[560px]"
              />
              <div className="pointer-events-none absolute bottom-14 left-5 z-30 max-w-xs rounded-soft border border-white/70 bg-white/90 p-4 shadow-soft">
                <p className="text-xs font-semibold uppercase text-sage">Room score</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="font-serif-display text-5xl text-plum">{teaserScore}</span>
                  <span className="pb-2 text-sm text-muted">/100</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted">{teaserProblem}</p>
              </div>
            </div>
          </Card>

          <div className="grid gap-6">
            <Card className="premium-card scan-shell overflow-hidden p-0">
              <img
                src="/images/ai-locked-report-preview.png"
                alt="Locked RoomRevamp report preview"
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-sage">
                  <LockKeyhole aria-hidden="true" size={14} />
                  Report vault
                </p>
                <h2 className="font-serif-display mt-2 text-4xl text-plum">
                  The best parts are blurred until unlock.
                </h2>
                <div className="mt-5 grid gap-3">
                  {unlockSteps.map((step, index) => (
                    <div
                      key={step}
                      className="float-panel flex items-center justify-between rounded-soft bg-white/80 p-3 text-sm text-plum"
                    >
                      <span>{step}</span>
                      <span className="rounded-full bg-[#fff0e9] px-3 py-1 text-xs font-semibold text-coral">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="premium-card p-6">
              <p className="text-xs font-semibold uppercase text-sage">Why unlock now</p>
              <h2 className="font-serif-display mt-2 text-4xl text-plum">
                See the plan before buying anything.
              </h2>
              <div className="mt-5 grid gap-3">
                {[
                  "Avoid buying decor that does not fit the room.",
                  "Prioritize the few changes with the biggest visual impact.",
                  "Get the shopping list, colour palette, and layout plan together."
                ].map((item) => (
                  <div key={item} className="rounded-soft bg-white/75 p-4 text-sm text-muted">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="marquee-shell mt-8 rounded-soft border border-line bg-white/60 py-4 shadow-card">
          <div className="marquee-track">
            {[...showcaseImages, ...showcaseImages].map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="h-24 w-40 shrink-0 overflow-hidden rounded-soft border border-white bg-white shadow-card"
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const PlanIcon = planIcons[plan.id];

            return (
              <Card
                key={plan.id}
                className={`premium-card relative p-6 ${isSelected ? "plan-card-selected" : ""}`}
              >
                {plan.highlighted ? (
                  <span className="absolute right-5 top-5 rounded-full bg-[#fff0e9] px-3 py-1 text-xs font-semibold text-coral">
                    Best value
                  </span>
                ) : null}
                <span className="flex h-11 w-11 items-center justify-center rounded bg-oat text-plum">
                  <PlanIcon aria-hidden="true" size={22} />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase text-sage">{plan.eyebrow}</p>
                <h2 className="font-serif-display mt-3 text-4xl text-plum">{plan.name}</h2>
                <p className="mt-2 text-sm text-muted">{plan.bestFor}</p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-semibold text-plum">{plan.price}</span>
                  <span className="pb-2 text-sm text-muted">AUD once-off demo</span>
                </div>
                <p className="mt-5 min-h-16 text-sm leading-6 text-muted">{plan.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-plum/80">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-coral" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-3">
                  <Button
                    className={`w-full ${isSelected ? "orange-button" : ""}`}
                    variant={isSelected ? "primary" : "secondary"}
                    onClick={() => choosePlan(plan.id)}
                  >
                    Unlock with {plan.name}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    {isSelected ? "Selected plan" : "Preview this plan"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="premium-card sticky bottom-4 z-20 mt-6 flex flex-col gap-4 border-coral/40 bg-white/90 p-4 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-sage">Selected unlock</p>
            <p className="mt-1 font-serif-display text-3xl text-plum">
              {selectedPlan.name} <span className="text-coral">{selectedPlan.price}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm leading-6 text-muted">
              This MVP simulates checkout. Stripe can replace this plan selection later.
            </p>
            <Button className="orange-button" onClick={() => choosePlan()}>
              Continue
            </Button>
          </div>
        </Card>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-muted">
          Product links may be affiliate links, and recommendations are suggestions only.
          The current checkout is a transparent demo unlock path.
        </p>
      </div>
    </section>
  );
}
