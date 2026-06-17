"use client";

import type { LucideIcon } from "lucide-react";
import {
  Baby,
  Bath,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  CookingPot,
  DoorOpen,
  KeyRound,
  MoreHorizontal,
  Sofa,
  Utensils
} from "lucide-react";
import { roomTypes } from "@/lib/mockData";
import type { RoomType } from "@/lib/types";

interface RoomTypeSelectorProps {
  value: RoomType | "";
  onChange: (value: RoomType) => void;
  customValue?: string;
  onCustomChange?: (value: string) => void;
}

const roomTypeDetails: Record<
  RoomType,
  { icon: LucideIcon; description: string; checks: string }
> = {
  bedroom: {
    icon: BedDouble,
    description: "Sleep zone, bedding, storage, bedside lighting.",
    checks: "Bed placement, nightstands, clothes storage"
  },
  "living room": {
    icon: Sofa,
    description: "Sofa layout, TV wall, rugs, lamps, clutter.",
    checks: "Seating flow, focal point, rug size"
  },
  "small apartment": {
    icon: Building2,
    description: "Multi-use spaces, rental fixes, compact storage.",
    checks: "Zones, walking paths, hidden storage"
  },
  bathroom: {
    icon: Bath,
    description: "Vanity clutter, towels, shelves, lighting.",
    checks: "Counter storage, towels, wall shelves"
  },
  kitchen: {
    icon: CookingPot,
    description: "Counter clutter, storage, prep and dining flow.",
    checks: "Counters, storage, everyday access"
  },
  "home office": {
    icon: BriefcaseBusiness,
    description: "Desk setup, cords, task light, shelves.",
    checks: "Cable control, task light, shelf balance"
  },
  "dining room": {
    icon: Utensils,
    description: "Table zone, lighting, chairs, wall balance.",
    checks: "Pendant height, table path, chair scale"
  },
  entryway: {
    icon: DoorOpen,
    description: "Drop zone, shoes, hooks, first impression.",
    checks: "Shoes, hooks, bag drop, mirror"
  },
  "kids room": {
    icon: Baby,
    description: "Storage, sleep zone, play space, durability.",
    checks: "Toy storage, sleep zone, durable surfaces"
  },
  "rental room": {
    icon: KeyRound,
    description: "No-drill upgrades and reversible changes.",
    checks: "Damage-free fixes, portable lighting"
  },
  "other room": {
    icon: MoreHorizontal,
    description: "Tell us the room and we will adapt the plan.",
    checks: "Custom priorities from your brief"
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
          const Icon = details.icon;

          return (
            <button
              key={roomType}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(roomType)}
              className={`choice-card focus-ring rounded-soft border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                isSelected
                  ? "choice-card-selected border-coral bg-white/90 text-ink shadow-card"
                  : "border-white/60 bg-white/62 text-muted backdrop-blur-xl hover:border-coral hover:text-ink"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded bg-oat text-plum">
                  <Icon aria-hidden="true" size={20} strokeWidth={2} />
                </span>
                <span className="rounded bg-white/70 px-2 py-1 text-[11px] font-semibold uppercase text-sage">
                  Room focus
                </span>
              </span>
              <span className="mt-4 block text-sm font-semibold capitalize text-plum">
                {roomType}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted">
                {details.description}
              </span>
              <span className="mt-3 block rounded bg-white/68 px-2 py-1 text-[11px] font-semibold text-plum">
                Checks: {details.checks}
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
