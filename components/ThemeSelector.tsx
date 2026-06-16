"use client";

import { decorThemes, themeDescriptions } from "@/lib/mockData";
import type { DecorTheme } from "@/lib/types";

interface ThemeSelectorProps {
  value: DecorTheme | "";
  onChange: (value: DecorTheme) => void;
}

const themeBadges: Record<DecorTheme, string> = {
  minimalist: "MIN",
  "cosy neutral": "COS",
  modern: "MOD",
  Japandi: "JPN",
  Scandinavian: "SCN",
  "dark modern": "DRK",
  "gaming setup": "SET",
  "luxury hotel": "HOT",
  "clean student room": "STD",
  "warm natural": "WRM",
  "custom theme": "CUS"
};

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">Decor direction</legend>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {decorThemes.map((theme) => {
          const isSelected = value === theme;

          return (
            <button
              key={theme}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(theme)}
              className={`focus-ring rounded-soft border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                isSelected
                  ? "border-coral bg-white/85 text-ink shadow-card"
                  : "border-white/60 bg-white/62 text-muted backdrop-blur-xl hover:border-coral hover:text-ink"
              }`}
            >
              <span className="inline-flex h-7 min-w-9 items-center justify-center rounded bg-oat px-2 text-[11px] font-semibold tracking-normal text-plum">
                {themeBadges[theme]}
              </span>
              <span className="mt-3 block text-sm font-semibold capitalize text-plum">
                {theme}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted">
                {themeDescriptions[theme]}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
