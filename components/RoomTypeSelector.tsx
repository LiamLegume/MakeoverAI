"use client";

import { roomTypes } from "@/lib/mockData";
import type { RoomType } from "@/lib/types";

interface RoomTypeSelectorProps {
  value: RoomType | "";
  onChange: (value: RoomType) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
}

const roomTypeDetails: Record<RoomType, { badge: string; description: string }> = {
  bedroom: {
    badge: "BED",
    description: "Bedding, lighting, storage, bedside zones."
  },
  "living room": {
    badge: "LIV",
    description: "Sofa layout, TV wall, rugs, lamps, clutter."
  },
  "small apartment": {
    badge: "APT",
    description: "Multi-use spaces, rental fixes, compact storage."
  },
  bathroom: {
    badge: "BTH",
    description: "Vanity clutter, towels, shelves, lighting."
  },
  kitchen: {
    badge: "KIT",
    description: "Counter clutter, storage, dining flow."
  },
  "home office": {
    badge: "WRK",
    description: "Desk setup, cords, task light, shelves."
  },
  "dining room": {
    badge: "DIN",
    description: "Table zone, lighting, chairs, wall balance."
  },
  entryway: {
    badge: "ENT",
    description: "Drop zone, shoes, hooks, first impression."
  },
  "kids room": {
    badge: "KID",
    description: "Storage, sleep zone, play space, durability."
  },
  "rental room": {
    badge: "RNT",
    description: "No-drill upgrades and reversible changes."
  },
  "other room": {
    badge: "ETC",
    description: "Tell us the room and we will adapt the plan."
  }
};

export function RoomTypeSelector({
  value,
  onChange,
  customValue = "",
  onCustomChange
}: RoomTypeSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">Room type</legend>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {roomTypes.map((roomType) => {
          const details = roomTypeDetails[roomType];
          const isSelected = value === roomType;

          return (
            <button
              key={roomType}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(roomType)}
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
                {roomType}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted">
                {details.description}
              </span>
            </button>
          );
        })}
      </div>
      {value === "other room" ? (
        <label className="mt-4 block text-sm font-semibold text-ink">
          What room is it?
          <input
            value={customValue}
            onChange={(event) => onCustomChange?.(event.target.value)}
            placeholder="Example: laundry, nursery, garage studio"
            className="focus-ring mt-2 w-full rounded-soft border border-line bg-white/85 p-3 text-sm text-ink placeholder:text-muted backdrop-blur-xl"
          />
        </label>
      ) : null}
    </fieldset>
  );
}
