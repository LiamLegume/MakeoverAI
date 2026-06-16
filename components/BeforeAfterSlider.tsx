"use client";

import { useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  imageClassName?: string;
  afterLocked?: boolean;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  imageClassName = "h-[360px] md:h-[460px]",
  afterLocked = false
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(58);

  return (
    <figure
      className={`image-lift group relative overflow-hidden rounded-soft border border-white bg-white shadow-soft ${className}`}
    >
      <img
        src={beforeImage}
        alt={`${beforeLabel} room`}
        className={`${imageClassName} w-full object-cover object-center`}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <img
          src={afterImage}
          alt={`${afterLabel} room`}
          className={`${imageClassName} w-full object-cover object-center ${afterLocked ? "blur-md" : ""}`}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(47,18,54,0.06),transparent_38%,transparent_66%,rgba(255,112,72,0.08))]" />

      <div
        className="pointer-events-none absolute inset-y-0 z-20 flex -translate-x-1/2 items-center"
        style={{ left: `${position}%` }}
      >
        <span className="h-full w-px bg-white/95 shadow-soft" />
        <span
          aria-hidden="true"
          className="absolute left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-white bg-white/95 shadow-soft"
        >
          <span className="flex items-center gap-1">
            <span className="h-4 w-0.5 rounded-full bg-coral" />
            <span className="h-4 w-0.5 rounded-full bg-coral" />
          </span>
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-4 top-4 z-30 flex items-center justify-between gap-3">
        <span className="glass-pill px-4 py-2 text-xs font-semibold text-plum">
          {beforeLabel}
        </span>
        <span className="rounded-full bg-plum/82 px-4 py-2 text-xs font-semibold text-white shadow-card backdrop-blur-xl">
          {afterLabel}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 h-1.5 overflow-hidden rounded-full bg-white/70 shadow-card">
        <div className="h-full rounded-full bg-coral" style={{ width: `${position}%` }} />
      </div>

      <input
        aria-label="Compare before and after room images"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-0 z-40 h-full w-full cursor-ew-resize opacity-0"
      />
    </figure>
  );
}
