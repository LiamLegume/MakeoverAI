import type { DecorTheme, RoomType } from "@/lib/types";

export interface RoomExample {
  id: string;
  eyebrow: string;
  title: string;
  roomType: string;
  theme: string;
  budget: string;
  score: number;
  beforeImage: string;
  afterImage: string;
  summary: string;
  fixes: string[];
}

export const roomExamples: RoomExample[] = [
  {
    id: "small-apartment",
    eyebrow: "Small apartment",
    title: "Cluttered rental to warmer living area",
    roomType: "small apartment",
    theme: "warm natural",
    budget: "under $250",
    score: 88,
    beforeImage: "/images/ai-before-apartment.webp",
    afterImage: "/images/ai-after-apartment.webp",
    summary:
      "The same room angle, with better lighting, clearer storage, a calmer sofa zone, and a dining corner that finally makes sense.",
    fixes: ["Warm floor lighting", "Hidden everyday clutter", "Cleaner dining path"]
  },
  {
    id: "bathroom-refresh",
    eyebrow: "Bathroom",
    title: "Messy vanity to rental-friendly reset",
    roomType: "bathroom",
    theme: "cosy neutral",
    budget: "under $100",
    score: 84,
    beforeImage: "/images/ai-before-bathroom.webp",
    afterImage: "/images/ai-after-bathroom.webp",
    summary:
      "A practical counter reset using coordinated storage, softer light, matching towels, and simple open shelving.",
    fixes: ["Clear counter tray", "Warmer vanity bulbs", "Useful wall shelf"]
  },
  {
    id: "bedroom-dark",
    eyebrow: "Bedroom",
    title: "Messy bedroom to darker hotel calm",
    roomType: "bedroom",
    theme: "dark modern",
    budget: "under $250",
    score: 88,
    beforeImage: "/images/ai-before-bedroom-messy.png",
    afterImage: "/images/ai-after-bedroom-dark.png",
    summary:
      "Better lighting, cleaner bedding layers, calmer walls, and a stronger furniture direction.",
    fixes: ["Warm side lighting", "Cleaner desk zone", "Darker focal wall"]
  },
  {
    id: "work-zone",
    eyebrow: "Home office",
    title: "Cluttered work zone to clean home office",
    roomType: "home office",
    theme: "clean student room",
    budget: "under $250",
    score: 91,
    beforeImage: "/images/ai-before-student.png",
    afterImage: "/images/ai-after-student.png",
    summary:
      "A clearer desk area, visible storage, softer bedding, and a calmer study corner.",
    fixes: ["Desk task lamp", "Open shelf baskets", "Light bedding layers"]
  }
];

export function getMatchedRoomExample({
  roomType,
  theme
}: {
  roomType?: RoomType | string;
  theme?: DecorTheme | string;
}) {
  const room = (roomType || "").toLowerCase();
  const decor = (theme || "").toLowerCase();

  if (room.includes("bath")) return roomExamples[1];
  if (room.includes("apartment") || room.includes("living") || room.includes("rental")) return roomExamples[0];
  if (room.includes("office") || room.includes("desk") || decor.includes("student") || decor.includes("gaming")) {
    return roomExamples[3];
  }
  if (decor.includes("dark") || decor.includes("modern") || decor.includes("hotel")) return roomExamples[2];
  return roomExamples[0];
}
