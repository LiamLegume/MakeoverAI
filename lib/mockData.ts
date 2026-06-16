import type { BudgetTier, DecorTheme, ImprovementGoal, RoomType } from "@/lib/types";

export const roomTypes: RoomType[] = [
  "bedroom",
  "living room",
  "small apartment",
  "bathroom",
  "kitchen",
  "home office",
  "dining room",
  "entryway",
  "kids room",
  "rental room",
  "other room"
];

export const decorThemes: DecorTheme[] = [
  "minimalist",
  "cosy neutral",
  "modern",
  "Japandi",
  "Scandinavian",
  "dark modern",
  "gaming setup",
  "luxury hotel",
  "clean student room",
  "warm natural",
  "custom theme"
];

export const budgetTiers: BudgetTier[] = [
  "under $100",
  "under $250",
  "under $500",
  "under $1000",
  "no strict budget"
];

export const improvementGoals: ImprovementGoal[] = [
  "less clutter",
  "better lighting",
  "better layout",
  "more aesthetic",
  "better study setup",
  "better gaming setup",
  "more mature room",
  "rental friendly"
];

export const themeDescriptions: Record<DecorTheme, string> = {
  minimalist: "clear surfaces, quiet lines, and only the pieces that earn their place",
  "cosy neutral": "warm layers, soft fabric, low contrast, and calm texture",
  modern: "clean silhouettes, balanced contrast, and a more finished palette",
  Japandi: "natural wood, low visual noise, linen texture, and simple forms",
  Scandinavian: "light timber, practical storage, soft whites, and useful warmth",
  "dark modern": "charcoal accents, warmer lighting, and tidy hotel-like contrast",
  "gaming setup": "tidy cables, flattering bias lighting, and a setup that still feels grown up",
  "luxury hotel": "layered bedding, symmetry, warm lamps, and fewer visible small items",
  "clean student room": "strong storage, a better desk zone, and budget-friendly upgrades",
  "warm natural": "timber, soft whites, woven storage, plants, and gentle light",
  "custom theme": "your custom direction translated into a practical room plan"
};

export const themePreviewImages: Record<DecorTheme, string> = {
  minimalist: "/images/ai-japandi-bedroom.png",
  "cosy neutral": "/images/ai-japandi-bedroom.png",
  modern: "/images/ai-after-bedroom-dark.png",
  Japandi: "/images/ai-japandi-bedroom.png",
  Scandinavian: "/images/ai-japandi-bedroom.png",
  "dark modern": "/images/ai-after-bedroom-dark.png",
  "gaming setup": "/images/ai-after-gaming.png",
  "luxury hotel": "/images/ai-hotel-bedroom.png",
  "clean student room": "/images/ai-after-student.png",
  "warm natural": "/images/ai-japandi-bedroom.png",
  "custom theme": "/images/ai-japandi-bedroom.png"
};

export const exampleMakeovers = [
  {
    title: "Small Apartment",
    theme: "Warm natural",
    score: 88,
    before: "/images/ai-before-apartment.webp",
    after: "/images/ai-after-apartment.webp",
    summary: "Same rental room, cleaner layout: warmer lamps, fewer visible cords, proper storage, and a clearer dining zone."
  },
  {
    title: "Bathroom",
    theme: "Cosy neutral",
    score: 84,
    before: "/images/ai-before-bathroom.webp",
    after: "/images/ai-after-bathroom.webp",
    summary: "A rental-friendly counter reset with better storage, softer light, coordinated towels, and no renovation work."
  },
  {
    title: "Bedroom Work Zone",
    theme: "Clean student room",
    score: 91,
    before: "/images/ai-before-student.png",
    after: "/images/ai-after-student.png",
    summary: "A clearer desk zone, softer bedding, and practical open storage."
  }
];

export const leaderboardRooms = [
  {
    rank: 1,
    name: "Apartment Living Reset",
    roomType: "Small apartment",
    theme: "Warm natural",
    score: 94,
    beforeImage: "/images/ai-before-apartment.webp",
    afterImage: "/images/ai-after-apartment.webp",
    topFix: "Warm lamps, hidden storage, and a cleaner sofa-to-dining layout."
  },
  {
    rank: 2,
    name: "Bathroom Counter Reset",
    roomType: "Bathroom",
    theme: "Cosy neutral",
    score: 91,
    beforeImage: "/images/ai-before-bathroom.webp",
    afterImage: "/images/ai-after-bathroom.webp",
    topFix: "Counter tray, coordinated towels, and practical open shelving."
  },
  {
    rank: 3,
    name: "Clean Desk Zone",
    roomType: "Home office",
    theme: "Clean student room",
    score: 89,
    beforeImage: "/images/ai-before-student.png",
    afterImage: "/images/ai-after-student.png",
    topFix: "Cable tray, task lamp, and one warmer desk material."
  },
  {
    rank: 4,
    name: "Student Study Reset",
    roomType: "Home office",
    theme: "Clean student room",
    score: 87,
    beforeImage: "/images/ai-before-student.png",
    afterImage: "/images/ai-after-student.png",
    topFix: "Desk lamp, storage baskets, and lighter bedding."
  },
  {
    rank: 5,
    name: "Hotel Calm Bedroom",
    roomType: "Bedroom",
    theme: "Luxury hotel",
    score: 86,
    beforeImage: "/images/ai-before-bedroom-messy.png",
    afterImage: "/images/ai-hotel-bedroom.png",
    topFix: "Symmetrical lamps, cleaner bedding, and calmer contrast."
  }
];
