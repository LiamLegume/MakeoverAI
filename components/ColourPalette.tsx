import type { ColourSwatch } from "@/lib/types";

interface ColourPaletteProps {
  colours: ColourSwatch[];
}

export function ColourPalette({ colours }: ColourPaletteProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {colours.map((colour) => (
        <div key={colour.name} className="rounded-soft border border-line bg-white p-3">
          <div
            className="h-20 rounded-soft border border-line"
            style={{ backgroundColor: colour.hex }}
            aria-label={`${colour.name} colour swatch`}
          />
          <p className="mt-3 text-sm font-semibold">{colour.name}</p>
          <p className="mt-1 text-xs uppercase text-muted">{colour.hex}</p>
          <p className="mt-2 text-sm leading-5 text-muted">{colour.usage}</p>
        </div>
      ))}
    </div>
  );
}
