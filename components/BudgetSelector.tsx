"use client";

import type { LucideIcon } from "lucide-react";
import { BadgeDollarSign, LampDesk, PackageCheck, ShoppingBasket, Sparkles } from "lucide-react";
import { budgetTiers } from "@/lib/mockData";
import type { BudgetTier } from "@/lib/types";

interface BudgetSelectorProps {
  value: BudgetTier | "";
  onChange: (value: BudgetTier) => void;
}

const budgetLabels: Record<BudgetTier, string> = {
  "under $100": "quick reset",
  "under $250": "small upgrades",
  "under $500": "room refresh",
  "under $1000": "bigger pieces",
  "no strict budget": "best fit"
};

const budgetDetails: Record<
  BudgetTier,
  { icon: LucideIcon; description: string; focus: string }
> = {
  "under $100": {
    icon: BadgeDollarSign,
    description: "Use what you own, then add one or two high-impact fixes.",
    focus: "Declutter, bulbs, trays"
  },
  "under $250": {
    icon: LampDesk,
    description: "Enough for lighting, storage, and a stronger focal point.",
    focus: "Lamps, shelves, textiles"
  },
  "under $500": {
    icon: ShoppingBasket,
    description: "A practical refresh with several coordinated purchases.",
    focus: "Rugs, curtains, storage"
  },
  "under $1000": {
    icon: PackageCheck,
    description: "Room-level upgrades with one meaningful furniture swap.",
    focus: "Furniture, lighting, layout"
  },
  "no strict budget": {
    icon: Sparkles,
    description: "Recommend the best order of improvements without a cap.",
    focus: "Best overall result"
  }
};

export function BudgetSelector({ value, onChange }: BudgetSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">Budget</legend>
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        {budgetTiers.map((budget) => {
          const details = budgetDetails[budget];
          const Icon = details.icon;
          const isSelected = value === budget;

          return (
            <button
              key={budget}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(budget)}
              className={`choice-card focus-ring min-h-[180px] rounded-soft border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                isSelected
                  ? "choice-card-selected border-coral bg-white/90 text-ink shadow-card"
                  : "border-white/60 bg-white/62 text-muted backdrop-blur-xl hover:border-coral hover:text-ink"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded bg-oat text-plum">
                <Icon aria-hidden="true" size={20} strokeWidth={2} />
              </span>
              <span className="mt-4 block text-sm font-semibold capitalize text-plum">
                {budget}
              </span>
              <span className="mt-1 block text-xs font-semibold uppercase text-sage">
                {budgetLabels[budget]}
              </span>
              <span className="mt-3 block text-xs leading-5 text-muted">
                {details.description}
              </span>
              <span className="mt-3 block rounded bg-white/70 px-2 py-1 text-[11px] font-semibold text-plum">
                {details.focus}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
