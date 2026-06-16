"use client";

import { budgetTiers } from "@/lib/mockData";
import type { BudgetTier } from "@/lib/types";

interface BudgetSelectorProps {
  value: BudgetTier | "";
  onChange: (value: BudgetTier) => void;
}

const budgetIcons: Record<BudgetTier, string> = {
  "under $100": "💸",
  "under $250": "🧾",
  "under $500": "🛒",
  "under $1000": "🛋️",
  "no strict budget": "✨"
};

export function BudgetSelector({ value, onChange }: BudgetSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">Budget</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-5">
        {budgetTiers.map((budget) => (
          <button
            key={budget}
            type="button"
            aria-pressed={value === budget}
            onClick={() => onChange(budget)}
            className={`focus-ring rounded-soft border px-3 py-2 text-left text-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
              value === budget
                ? "border-clay bg-oat text-ink"
                : "border-line bg-white text-muted hover:border-clay hover:text-ink"
            }`}
          >
            <span className="mr-2" aria-hidden="true">
              {budgetIcons[budget]}
            </span>
            {budget}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
