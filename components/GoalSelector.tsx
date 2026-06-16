"use client";

import { improvementGoals } from "@/lib/mockData";
import type { ImprovementGoal } from "@/lib/types";

interface GoalSelectorProps {
  values: ImprovementGoal[];
  onChange: (values: ImprovementGoal[]) => void;
}

const goalDetails: Record<ImprovementGoal, { badge: string; description: string }> = {
  "less clutter": {
    badge: "CLR",
    description: "Storage, surfaces, loose items."
  },
  "better lighting": {
    badge: "LGT",
    description: "Bulbs, lamps, daylight control."
  },
  "better layout": {
    badge: "LAY",
    description: "Walking paths and furniture zones."
  },
  "more aesthetic": {
    badge: "STY",
    description: "Palette, texture, focal point."
  },
  "better study setup": {
    badge: "DSK",
    description: "Desk light, cable control, focus."
  },
  "better gaming setup": {
    badge: "SET",
    description: "Screens, cords, bias light, comfort."
  },
  "more mature room": {
    badge: "FIN",
    description: "More finished, less temporary."
  },
  "rental friendly": {
    badge: "RNT",
    description: "No-drill, reversible upgrades."
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
              className={`focus-ring rounded-soft border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                isSelected
                  ? "border-coral bg-white/85 text-ink shadow-card"
                  : "border-white/60 bg-white/62 text-muted backdrop-blur-xl hover:border-coral hover:text-ink"
              }`}
            >
              <span className="inline-flex h-7 min-w-9 items-center justify-center rounded bg-oat px-2 text-[11px] font-semibold tracking-normal text-plum">
                {details.badge}
              </span>
              <span className="mt-3 block text-sm font-semibold capitalize text-plum">
                {goal}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted">
                {details.description}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
