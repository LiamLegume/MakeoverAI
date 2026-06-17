"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Bath, BedDouble, Building2, BriefcaseBusiness } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/Button";
import { roomExamples } from "@/lib/roomExamples";

const exampleIcons: Record<string, LucideIcon> = {
  "small-apartment": Building2,
  "bathroom-refresh": Bath,
  "bedroom-dark": BedDouble,
  "work-zone": BriefcaseBusiness
};

export function HomeExampleShowcase() {
  const [activeId, setActiveId] = useState(roomExamples[0].id);
  const activeIndex = Math.max(0, roomExamples.findIndex((example) => example.id === activeId));
  const active = roomExamples[activeIndex];

  function move(direction: number) {
    const nextIndex = (activeIndex + direction + roomExamples.length) % roomExamples.length;
    setActiveId(roomExamples[nextIndex].id);
  }

  return (
    <div className="relative mt-8">
      <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase text-sage">Live examples</p>
          <h2 className="font-serif-display mt-1 text-4xl text-plum md:text-5xl">
            Practical makeovers, same room angle.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {roomExamples.map((example) => {
            const Icon = exampleIcons[example.id] || Building2;

            return (
              <button
                key={example.id}
                type="button"
                aria-pressed={active.id === example.id}
                onClick={() => setActiveId(example.id)}
                className={`focus-ring glass-pill inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-1 hover:shadow-card ${
                  active.id === example.id
                    ? "border-coral bg-white/82 text-plum"
                    : "border-white/55 text-muted hover:border-coral hover:text-plum"
                }`}
              >
                <Icon aria-hidden="true" size={15} strokeWidth={2.2} />
                {example.eyebrow}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.55fr]">
        <BeforeAfterSlider
          key={active.id}
          beforeImage={active.beforeImage}
          afterImage={active.afterImage}
          beforeLabel="Before"
          afterLabel="After"
          imageClassName="h-[420px] md:h-[590px]"
        />

        <aside className="premium-card glass-panel rounded-soft p-6">
          <p className="text-xs font-semibold uppercase text-sage">{active.eyebrow}</p>
          <h3 className="font-serif-display mt-2 text-4xl leading-tight text-plum">
            {active.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted">{active.summary}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-soft border border-white/65 bg-white/58 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase text-sage">Score</p>
              <p className="font-serif-display mt-1 text-4xl text-plum">{active.score}</p>
            </div>
            <div className="rounded-soft border border-white/65 bg-white/58 p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase text-sage">Budget</p>
              <p className="mt-2 text-sm font-semibold text-plum">{active.budget}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {active.fixes.map((fix) => (
              <div
                key={fix}
                className="flex items-center gap-3 rounded-soft border border-white/60 bg-white/62 p-3 text-sm text-plum backdrop-blur-xl"
              >
                <span className="h-2 w-2 rounded-full bg-coral" />
                {fix}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => move(-1)}>
              Previous
            </Button>
            <Button className="orange-button flex-1" onClick={() => move(1)}>
              Next
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
