"use client";

import { Palette, Sparkles } from "lucide-react";
import { decorThemes, themeDescriptions } from "@/lib/mockData";
import type { ColourSwatch, DecorTheme } from "@/lib/types";

interface ThemeSelectorProps {
  value: DecorTheme | "";
  onChange: (value: DecorTheme) => void;
  customPalette?: ColourSwatch[];
  onCustomPaletteChange?: (value: ColourSwatch[]) => void;
}

type PaletteField = "name" | "hex" | "usage";

const fallbackCustomPalette: ColourSwatch[] = [
  { name: "Warm white", hex: "#F7F1E8", usage: "walls and large surfaces" },
  { name: "Sage green", hex: "#71846B", usage: "towels, cushions, or small accents" },
  { name: "Soft clay", hex: "#C77B5A", usage: "art, ceramics, or decor" },
  { name: "Deep plum", hex: "#2F1236", usage: "one grounding detail" }
];

const palettePresets: {
  name: string;
  bestFor: string;
  colours: ColourSwatch[];
}[] = [
  {
    name: "Warm Rental Calm",
    bestFor: "apartments and bedrooms",
    colours: [
      { name: "Warm white", hex: "#F7F1E8", usage: "walls and large surfaces" },
      { name: "Walnut", hex: "#7A563B", usage: "wood furniture" },
      { name: "Sage", hex: "#71846B", usage: "soft accents" },
      { name: "Clay", hex: "#C77B5A", usage: "small decor" }
    ]
  },
  {
    name: "Clean Bathroom",
    bestFor: "bathrooms and small rooms",
    colours: [
      { name: "Porcelain", hex: "#F8F5EE", usage: "base colour" },
      { name: "Stone", hex: "#B8B0A6", usage: "tile and towels" },
      { name: "Muted olive", hex: "#78866B", usage: "greenery and towels" },
      { name: "Brushed black", hex: "#2E2A27", usage: "hardware accents" }
    ]
  },
  {
    name: "Soft Hotel",
    bestFor: "bedrooms that need polish",
    colours: [
      { name: "Ivory", hex: "#F6EEE3", usage: "bedding and walls" },
      { name: "Taupe", hex: "#A58B76", usage: "curtains or rug" },
      { name: "Aged brass", hex: "#B48A54", usage: "lamps and handles" },
      { name: "Wine brown", hex: "#4E3436", usage: "one deep accent" }
    ]
  },
  {
    name: "Dark But Warm",
    bestFor: "screen zones and modern rooms",
    colours: [
      { name: "Charcoal", hex: "#242629", usage: "desk or media zone" },
      { name: "Amber", hex: "#D19A5F", usage: "warm light accents" },
      { name: "Bone", hex: "#EEE6DB", usage: "soft contrast" },
      { name: "Slate green", hex: "#586A60", usage: "plants or decor" }
    ]
  }
];

const themeDetails: Record<DecorTheme, { palette: string[]; bestFor: string; result: string }> = {
  minimalist: {
    palette: ["#F8F5EF", "#D8D0C4", "#92897D", "#2F2A27"],
    bestFor: "messy rooms",
    result: "Fewer visible objects and calmer surfaces."
  },
  "cosy neutral": {
    palette: ["#F7EFE3", "#D6BFA7", "#A9896C", "#5F4A3E"],
    bestFor: "cold rooms",
    result: "Softer layers without making the room busy."
  },
  modern: {
    palette: ["#F7F7F4", "#BFC6C8", "#707A7D", "#242424"],
    bestFor: "unfinished rooms",
    result: "Cleaner lines, better contrast, and a finished palette."
  },
  Japandi: {
    palette: ["#F4EFE5", "#D5BD97", "#8A7656", "#5D6C5A"],
    bestFor: "visual noise",
    result: "Natural wood, simple forms, and less clutter."
  },
  Scandinavian: {
    palette: ["#FBF8F1", "#D7C8AC", "#AFC3BF", "#5F7476"],
    bestFor: "small spaces",
    result: "Light timber, practical storage, and gentle warmth."
  },
  "dark modern": {
    palette: ["#27292C", "#5B514D", "#A88363", "#F0D8B0"],
    bestFor: "flat lighting",
    result: "Moody contrast with warmer lamps and cleaner edges."
  },
  "gaming setup": {
    palette: ["#1F2430", "#3D5AFE", "#80DEEA", "#F3EFE7"],
    bestFor: "screen zones",
    result: "Cable control, bias lighting, and a grown-up setup."
  },
  "luxury hotel": {
    palette: ["#F4EADF", "#C8A47A", "#7B5C49", "#3F2C2C"],
    bestFor: "bedrooms",
    result: "Symmetry, layered bedding, and warm bedside light."
  },
  "clean student room": {
    palette: ["#F7F3E9", "#D2B587", "#7D9A87", "#383436"],
    bestFor: "study spaces",
    result: "Better desk focus, storage, and low-cost upgrades."
  },
  "warm natural": {
    palette: ["#FFF7ED", "#D7B58D", "#B88B5D", "#6F8A70"],
    bestFor: "rentals",
    result: "Timber, woven storage, soft whites, and plants."
  },
  "custom theme": {
    palette: ["#F7F1E8", "#71846B", "#C77B5A", "#2F1236"],
    bestFor: "specific ideas",
    result: "Use your palette and final brief as the main style direction."
  }
};

export function ThemeSelector({
  value,
  onChange,
  customPalette = fallbackCustomPalette,
  onCustomPaletteChange
}: ThemeSelectorProps) {
  function updateCustomPalette(index: number, field: PaletteField, nextValue: string) {
    const nextPalette = customPalette.map((colour, colourIndex) =>
      colourIndex === index ? { ...colour, [field]: nextValue } : colour
    );
    onCustomPaletteChange?.(nextPalette);
    onChange("custom theme");
  }

  function applyPreset(colours: ColourSwatch[]) {
    onCustomPaletteChange?.(colours);
    onChange("custom theme");
  }

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">Decor direction</legend>

      <div className="mt-3 rounded-soft border border-coral/30 bg-white/72 p-4 shadow-card backdrop-blur-xl">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-sage">
              <Palette aria-hidden="true" size={15} />
              Custom colour palette
            </p>
            <h3 className="mt-2 text-xl font-semibold text-plum">Make your own palette first.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Pick four colours and what each one should do. Selecting or editing this palette
              uses the custom theme for the report.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange("custom theme")}
            className={`focus-ring inline-flex items-center justify-center gap-2 rounded-soft border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-card ${
              value === "custom theme"
                ? "border-coral bg-coral text-white"
                : "border-line bg-white text-plum hover:border-coral"
            }`}
          >
            <Sparkles aria-hidden="true" size={16} />
            Use custom palette
          </button>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {customPalette.map((colour, index) => (
              <div key={`${colour.hex}-${index}`} className="rounded-soft border border-white/70 bg-white/70 p-3">
                <div className="flex items-center gap-3">
                  <input
                    aria-label={`Palette colour ${index + 1}`}
                    type="color"
                    value={colour.hex}
                    onChange={(event) => updateCustomPalette(index, "hex", event.target.value)}
                    className="h-12 w-14 cursor-pointer rounded border border-line bg-white p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <input
                      value={colour.name}
                      onChange={(event) => updateCustomPalette(index, "name", event.target.value)}
                      className="focus-ring w-full rounded border border-line bg-white px-3 py-2 text-sm font-semibold text-plum"
                    />
                    <p className="mt-1 text-xs uppercase text-muted">{colour.hex}</p>
                  </div>
                </div>
                <input
                  value={colour.usage}
                  onChange={(event) => updateCustomPalette(index, "usage", event.target.value)}
                  className="focus-ring mt-3 w-full rounded border border-line bg-white px-3 py-2 text-sm text-muted"
                />
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-sage">Better palette starts</p>
            <div className="mt-3 grid gap-2">
              {palettePresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset.colours)}
                  className="focus-ring rounded-soft border border-white/70 bg-white/64 p-3 text-left transition hover:-translate-y-0.5 hover:border-coral hover:shadow-card"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-plum">{preset.name}</span>
                    <span className="text-xs text-muted">{preset.bestFor}</span>
                  </span>
                  <span className="mt-3 flex gap-1">
                    {preset.colours.map((colour) => (
                      <span
                        key={`${preset.name}-${colour.hex}`}
                        className="h-6 flex-1 rounded border border-white shadow-sm"
                        style={{ backgroundColor: colour.hex }}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
