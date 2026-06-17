"use client";

import { decorThemes, themeDescriptions } from "@/lib/mockData";
import type { DecorTheme } from "@/lib/types";

interface ThemeSelectorProps {
  value: DecorTheme | "";
  onChange: (value: DecorTheme) => void;
}

const themeDetails: Record<DecorTheme, { palette: string[]; bestFor: string; result: string }> = {
  minimalist: {
    palette: ["#f7f4ee", "#c9c3b8", "#33302d"],
    bestFor: "messy rooms",
    result: "Fewer visible objects and calmer surfaces."
  },
  "cosy neutral": {
    palette: ["#f7efe3", "#d6bfa7", "#8a725b"],
    bestFor: "cold rooms",
    result: "Softer layers without making the room busy."
  },
  modern: {
    palette: ["#f7f7f4", "#9aa2a5", "#242424"],
    bestFor: "unfinished rooms",
    result: "Cleaner lines, better contrast, and a finished palette."
  },
  Japandi: {
    palette: ["#f4efe5", "#c9a878", "#5d6c5a"],
    bestFor: "visual noise",
    result: "Natural wood, simple forms, and less clutter."
  },
  Scandinavian: {
    palette: ["#fbf8f1", "#d7c8ac", "#6f8a8d"],
    bestFor: "small spaces",
    result: "Light timber, practical storage, and gentle warmth."
  },
  "dark modern": {
    palette: ["#2f3133", "#78645a", "#f0d8b0"],
    bestFor: "flat lighting",
    result: "Moody contrast with warmer lamps and cleaner edges."
  },
  "gaming setup": {
    palette: ["#1f2430", "#4d6bff", "#9be7ff"],
    bestFor: "screen zones",
    result: "Cable control, bias lighting, and a grown-up setup."
  },
  "luxury hotel": {
    palette: ["#f4eadf", "#b99974", "#3f2c2c"],
    bestFor: "bedrooms",
    result: "Symmetry, layered bedding, and warm bedside light."
  },
  "clean student room": {
    palette: ["#f7f4ee", "#85a090", "#d2b587"],
    bestFor: "study spaces",
    result: "Better desk focus, storage, and low-cost upgrades."
  },
  "warm natural": {
    palette: ["#fff7ed", "#b88b5d", "#6f8a70"],
    bestFor: "rentals",
    result: "Timber, woven storage, soft whites, and plants."
  },
  "custom theme": {
    palette: ["#f7f2ec", "#b4a7bd", "#6f7d65"],
    bestFor: "specific ideas",
    result: "Use your final brief as the main style direction."
  }
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
              className={`choice-card focus-ring rounded-soft border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                isSelected
                  ? "choice-card-selected border-coral bg-white/90 text-ink shadow-card"
                  : "border-white/60 bg-white/62 text-muted backdrop-blur-xl hover:border-coral hover:text-ink"
              }`}
            >
              <span className="flex items-center gap-1">
                {themeDetails[theme].palette.map((colour) => (
                  <span
                    key={colour}
                    className="h-7 w-7 rounded border border-white shadow-sm"
                    style={{ backgroundColor: colour }}
                  />
                ))}
              </span>
              <span className="mt-4 block text-sm font-semibold capitalize text-plum">
                {theme}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted">
                {themeDescriptions[theme]}
              </span>
              <span className="mt-3 block rounded bg-white/68 px-2 py-1 text-[11px] font-semibold capitalize text-plum">
                Best for: {themeDetails[theme].bestFor}
              </span>
              <span className="mt-2 block text-[11px] leading-5 text-muted">
                {themeDetails[theme].result}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
