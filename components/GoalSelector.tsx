"use client";

import { Check } from "lucide-react";
import { improvementGoals } from "@/lib/mockData";
import type { ImprovementGoal } from "@/lib/types";

interface GoalSelectorProps {
  values: ImprovementGoal[];
  onChange: (values: ImprovementGoal[]) => void;
}

const goalDetails: Record<ImprovementGoal, { description: string; affects: string }> = {
  "less clutter": {
    description: "Storage, surfaces, loose items.",
    affects: "Storage plan"
  },
  "better lighting": {
    description: "Bulbs, lamps, daylight control.",
    affects: "Lighting plan"
  },
  "better layout": {
    description: "Walking paths and furniture zones.",
    affects: "Furniture moves"
  },
  "more aesthetic": {
    description: "Palette, texture, focal point.",
    affects: "Style direction"
  },
  "better study setup": {
    description: "Desk light, cable control, focus.",
    affects: "Desk zone"
  },
  "better gaming setup": {
    description: "Screens, cords, bias light, comfort.",
    affects: "Screen setup"
  },
  "more mature room": {
    description: "More finished, less temporary.",
    affects: "Finishing touches"
  },
  "rental friendly": {
    description: "No-drill, reversible upgrades.",
    affects: "Damage-free list"
  }
};

export function GoalSelector({ values, onChange }: GoalSelectorProps) {
  function toggle(goal: ImprovementGoal) {
    if (values.includes(goal)) {
      onChange(values.filter((item) => item !== goal));
      return;
    }
    onChange([...values, goal]);
  }

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">Main goal</legend>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {improvementGoals.map((goal) => {
          const isSelected = values.includes(goal);
          const details = goalDetails[goal];

          return (
            <button
              key={goal}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(goal)}
              className={`choice-card focus-ring rounded-soft border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                isSelected
                  ? "choice-card-selected border-coral bg-white/90 text-ink shadow-card"
                  : "border-white/60 bg-white/62 text-muted backdrop-blur-xl hover:border-coral hover:text-ink"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="rounded bg-oat px-2 py-1 text-[11px] font-semibold uppercase text-sage">
                  Priority
                </span>
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border ${
                    isSelected ? "border-coral bg-coral text-white" : "border-line bg-white/70 text-transparent"
                  }`}
                >
                  <Check aria-hidden="true" size={15} strokeWidth={3} />
                </span>
              </span>
              <span className="mt-4 block text-sm font-semibold capitalize text-plum">
                {goal}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted">
                {details.description}
              </span>
              <span className="mt-3 block rounded bg-white/68 px-2 py-1 text-[11px] font-semibold text-plum">
                Changes: {details.affects}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
