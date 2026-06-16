import type { BudgetTier, DecorTheme, ImprovementGoal, Product, RoomType } from "@/lib/types";

export const products: Product[] = [
  {
    id: "warm-bedside-lamp",
    name: "Warm bedside lamp",
    category: "Lighting",
    priceRange: "$25-$60",
    imageUrl: "/images/ai-hotel-bedroom.png",
    affiliateUrl: "https://www.amazon.com/dp/B0LAMP0001",
    reason: "Adds softer evening light so the room feels warmer and more intentional.",
    themes: ["cosy neutral", "Japandi", "luxury hotel", "warm natural", "Scandinavian"],
    roomTypes: ["bedroom", "rental room", "small apartment", "living room"],
    priority: 1,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "neutral-bedding-set",
    name: "Neutral bedding set",
    category: "Bedding",
    priceRange: "$45-$120",
    imageUrl: "/images/ai-japandi-bedroom.png",
    affiliateUrl: "https://www.amazon.com/dp/B0BEDDING1",
    reason: "Creates a calmer focal point and makes the bed area look finished.",
    themes: ["minimalist", "cosy neutral", "Japandi", "Scandinavian", "luxury hotel", "warm natural"],
    roomTypes: ["bedroom", "rental room", "small apartment"],
    priority: 2,
    budgetTier: ["under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "under-bed-storage",
    name: "Under-bed storage boxes",
    category: "Storage",
    priceRange: "$20-$50",
    imageUrl: "/images/ai-after-student.png",
    affiliateUrl: "https://www.amazon.com/dp/B0STORAGE1",
    reason: "Moves visual clutter out of sight without needing new furniture.",
    themes: ["minimalist", "clean student room", "cosy neutral", "warm natural", "custom theme"],
    roomTypes: ["bedroom", "rental room", "small apartment"],
    priority: 1,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "cable-management-tray",
    name: "Cable management tray",
    category: "Cable management",
    priceRange: "$18-$45",
    imageUrl: "/images/ai-after-gaming.png",
    affiliateUrl: "https://www.amazon.com/dp/B0CABLE001",
    reason: "Hides cords under the desk so the whole setup looks cleaner immediately.",
    themes: ["gaming setup", "clean student room", "modern", "minimalist", "dark modern"],
    roomTypes: ["home office", "bedroom", "small apartment"],
    priority: 1,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "minimal-desk-lamp",
    name: "Minimal desk lamp",
    category: "Study setup accessories",
    priceRange: "$30-$90",
    imageUrl: "/images/ai-after-student.png",
    affiliateUrl: "https://www.amazon.com/dp/B0DESKLAMP",
    reason: "Improves task lighting and makes the desk feel like a dedicated work zone.",
    themes: ["minimalist", "modern", "clean student room", "Scandinavian", "dark modern"],
    roomTypes: ["home office", "bedroom", "small apartment"],
    priority: 2,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "large-neutral-rug",
    name: "Large neutral rug",
    category: "Rugs",
    priceRange: "$80-$220",
    imageUrl: "/images/ai-hotel-bedroom.png",
    affiliateUrl: "https://www.amazon.com/dp/B0RUG00001",
    reason: "Defines the room layout and pulls separate furniture pieces into one zone.",
    themes: ["cosy neutral", "Japandi", "Scandinavian", "warm natural", "luxury hotel"],
    roomTypes: ["living room", "bedroom", "small apartment", "rental room"],
    priority: 3,
    budgetTier: ["under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "floating-shelf",
    name: "Floating shelf",
    category: "Wall decor",
    priceRange: "$25-$70",
    imageUrl: "/images/ai-japandi-bedroom.png",
    affiliateUrl: "https://www.amazon.com/dp/B0SHELF001",
    reason: "Adds display space without taking up floor area, especially useful in rentals.",
    themes: ["minimalist", "Japandi", "Scandinavian", "warm natural", "modern"],
    roomTypes: ["bedroom", "home office", "living room", "small apartment", "rental room", "bathroom"],
    priority: 4,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "linen-curtains",
    name: "Linen curtains",
    category: "Curtains",
    priceRange: "$45-$130",
    imageUrl: "/images/ai-japandi-bedroom.png",
    affiliateUrl: "https://www.amazon.com/dp/B0CURTAIN1",
    reason: "Softens harsh light and makes the room look calmer from wall to wall.",
    themes: ["cosy neutral", "Japandi", "Scandinavian", "luxury hotel", "warm natural"],
    roomTypes: ["bedroom", "living room", "rental room", "small apartment"],
    priority: 3,
    budgetTier: ["under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "faux-plant",
    name: "Faux plant",
    category: "Plants",
    priceRange: "$18-$55",
    imageUrl: "/images/ai-after-bedroom-dark.png",
    affiliateUrl: "https://www.amazon.com/dp/B0PLANT001",
    reason: "Adds softness and height without needing daily care.",
    themes: ["warm natural", "cosy neutral", "Scandinavian", "Japandi", "minimalist"],
    roomTypes: ["bedroom", "home office", "living room", "small apartment", "rental room", "bathroom"],
    priority: 5,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "storage-basket",
    name: "Storage basket",
    category: "Storage",
    priceRange: "$15-$45",
    imageUrl: "/images/ai-after-student.png",
    affiliateUrl: "https://www.amazon.com/dp/B0BASKET01",
    reason: "Gives everyday loose items one calm home instead of spreading across surfaces.",
    themes: ["cosy neutral", "warm natural", "Japandi", "Scandinavian", "clean student room"],
    roomTypes: ["bedroom", "living room", "small apartment", "rental room"],
    priority: 2,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "led-bias-lighting",
    name: "Tasteful LED bias lighting",
    category: "Gaming setup accessories",
    priceRange: "$20-$65",
    imageUrl: "/images/ai-after-gaming.png",
    affiliateUrl: "https://www.amazon.com/dp/B0BIASLED1",
    reason: "Adds screen-friendly ambient light without turning the room into a light show.",
    themes: ["gaming setup", "dark modern", "modern"],
    roomTypes: ["home office", "bedroom"],
    priority: 2,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "wooden-desk-organiser",
    name: "Wooden desk organiser",
    category: "Desk organisation",
    priceRange: "$20-$55",
    imageUrl: "/images/ai-after-student.png",
    affiliateUrl: "https://www.amazon.com/dp/B0ORGANISE",
    reason: "Keeps small desk items grouped while adding a warmer material.",
    themes: ["Japandi", "Scandinavian", "clean student room", "warm natural", "minimalist"],
    roomTypes: ["home office", "bedroom", "small apartment"],
    priority: 3,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "compact-side-table",
    name: "Compact side table",
    category: "Small furniture",
    priceRange: "$45-$140",
    imageUrl: "/images/ai-hotel-bedroom.png",
    affiliateUrl: "https://www.amazon.com/dp/B0SIDETABLE",
    reason: "Adds a proper landing zone so lamps, books, and chargers stop collecting on the floor.",
    themes: ["modern", "Japandi", "cosy neutral", "luxury hotel", "dark modern"],
    roomTypes: ["bedroom", "living room", "small apartment", "rental room", "bathroom"],
    priority: 4,
    budgetTier: ["under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "bathroom-counter-tray",
    name: "Bathroom counter tray",
    category: "Storage",
    priceRange: "$12-$35",
    imageUrl: "/images/ai-after-bathroom.webp",
    affiliateUrl: "https://www.amazon.com/dp/B0BATHROOM1",
    reason: "Groups daily bottles and brushes so the vanity looks intentional instead of cluttered.",
    themes: ["minimalist", "cosy neutral", "modern", "Japandi", "Scandinavian", "warm natural", "custom theme"],
    roomTypes: ["bathroom", "rental room", "small apartment"],
    priority: 1,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  },
  {
    id: "adhesive-bathroom-shelf",
    name: "Adhesive bathroom shelf",
    category: "Storage",
    priceRange: "$18-$45",
    imageUrl: "/images/ai-after-bathroom.webp",
    affiliateUrl: "https://www.amazon.com/dp/B0BATHROOM2",
    reason: "Adds useful vertical storage without drilling into rental walls or crowding the counter.",
    themes: ["minimalist", "cosy neutral", "modern", "Japandi", "Scandinavian", "warm natural", "custom theme"],
    roomTypes: ["bathroom", "rental room", "small apartment"],
    priority: 2,
    budgetTier: ["under $100", "under $250", "under $500", "under $1000", "no strict budget"]
  }
];

const goalCategoryBoosts: Record<ImprovementGoal, string[]> = {
  "less clutter": ["Storage", "Desk organisation", "Cable management"],
  "better lighting": ["Lighting", "Curtains", "Gaming setup accessories"],
  "better layout": ["Rugs", "Small furniture", "Storage"],
  "more aesthetic": ["Bedding", "Wall decor", "Plants", "Rugs"],
  "better study setup": ["Study setup accessories", "Desk organisation", "Lighting"],
  "better gaming setup": ["Gaming setup accessories", "Cable management", "Lighting"],
  "more mature room": ["Bedding", "Lighting", "Curtains", "Small furniture"],
  "rental friendly": ["Wall decor", "Storage", "Curtains", "Plants"]
};

export function getRecommendedProducts({
  selectedTheme,
  roomType,
  budget,
  goals
}: {
  selectedTheme: DecorTheme;
  roomType: RoomType;
  budget: BudgetTier;
  goals: ImprovementGoal[];
}) {
  const boostedCategories = new Set(goals.flatMap((goal) => goalCategoryBoosts[goal]));

  return products
    .filter((product) => {
      const budgetMatches =
        budget === "no strict budget" || product.budgetTier.includes(budget);
      const themeMatches =
        selectedTheme === "custom theme" || product.themes.includes(selectedTheme);
      const roomMatches = product.roomTypes.includes(roomType);
      return budgetMatches && (themeMatches || roomMatches || product.priority <= 2);
    })
    .map((product) => ({
      product,
      score:
        product.priority * 10 -
        (product.themes.includes(selectedTheme) ? 12 : 0) -
        (product.roomTypes.includes(roomType) ? 8 : 0) -
        (boostedCategories.has(product.category) ? 14 : 0)
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 8)
    .map(({ product }) => product);
}
