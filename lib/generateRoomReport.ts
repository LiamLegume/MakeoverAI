import { generateRoomPreview } from "@/lib/generateRoomPreview";
import { getRecommendedProducts } from "@/lib/products";
import { themeDescriptions } from "@/lib/mockData";
import type {
  ColourSwatch,
  GeneratedRoomReport,
  ImprovementGoal,
  RoomReportInput
} from "@/lib/types";

const problemByGoal: Record<ImprovementGoal, string> = {
  "less clutter": "Too much visual clutter",
  "better lighting": "Lighting is too harsh or too flat",
  "better layout": "Furniture layout blocks the room",
  "more aesthetic": "No clear colour palette",
  "better study setup": "Desk area feels messy",
  "better gaming setup": "Cables and lighting compete with the setup",
  "more mature room": "The room lacks a finished adult direction",
  "rental friendly": "The room needs upgrades that do not damage the space"
};

const issuePool: Record<ImprovementGoal, string[]> = {
  "less clutter": [
    "Small loose items are drawing attention away from the main furniture.",
    "Storage exists, but it is not doing enough visual work."
  ],
  "better lighting": [
    "The room needs layered light instead of relying on one overhead source.",
    "Warmer lamps would make the space feel calmer in the evening."
  ],
  "better layout": [
    "The main zones need clearer separation.",
    "The largest furniture pieces should lead the eye through the room, not block it."
  ],
  "more aesthetic": [
    "The colour direction needs to be simplified.",
    "There are too many unrelated textures competing for attention."
  ],
  "better study setup": [
    "The desk needs better task lighting and fewer visible small items.",
    "A cleaner desk surface would make the room feel more focused."
  ],
  "better gaming setup": [
    "Cable visibility makes the setup feel less premium.",
    "Lighting should support the screen instead of becoming the whole design."
  ],
  "more mature room": [
    "The bed or seating zone needs more finished layers.",
    "A stronger palette would make the room feel more grown up."
  ],
  "rental friendly": [
    "The room needs reversible upgrades with more impact.",
    "Wall and window treatments can add personality without permanent changes."
  ]
};

const paletteByTheme: Record<string, ColourSwatch[]> = {
  dark: [
    { name: "Soft black", hex: "#1F1F1F", usage: "small accents and hardware" },
    { name: "Warm grey", hex: "#8B8278", usage: "bedding or larger textiles" },
    { name: "Bone", hex: "#F3EEE6", usage: "walls and balance" },
    { name: "Aged brass", hex: "#A8784F", usage: "lamp or small decor detail" }
  ],
  light: [
    { name: "Warm white", hex: "#FAF8F3", usage: "main background and bedding" },
    { name: "Oat", hex: "#D8C7B2", usage: "curtains or rug" },
    { name: "Sage", hex: "#6F7D65", usage: "plant, art, or quiet accent" },
    { name: "Walnut", hex: "#6B4F3F", usage: "wooden storage or desk detail" }
  ],
  gaming: [
    { name: "Charcoal", hex: "#2B2A28", usage: "desk and monitor zone" },
    { name: "Warm white", hex: "#F6F1EA", usage: "walls or bedding to soften contrast" },
    { name: "Muted amber", hex: "#B88A5A", usage: "bias lighting temperature" },
    { name: "Slate green", hex: "#53645B", usage: "plant or desk accessory accent" }
  ]
};

function choosePalette(theme: string, customPalette?: ColourSwatch[]) {
  if (customPalette?.length) {
    return customPalette;
  }

  if (theme.includes("dark")) return paletteByTheme.dark;
  if (theme.includes("gaming")) return paletteByTheme.gaming;
  return paletteByTheme.light;
}

function deterministicScore(input: RoomReportInput) {
  const seed =
    (input.customRoomType || input.roomType).length * 3 +
    input.selectedTheme.length * 2 +
    input.budget.length +
    input.goals.join("").length;
  return Math.max(62, Math.min(91, 70 + (seed % 18)));
}

export async function generateRoomReport(
  input: RoomReportInput
): Promise<GeneratedRoomReport> {
  const primaryGoal = input.goals[0];
  const displayRoomType = input.customRoomType || input.roomType;
  const products = getRecommendedProducts({
    selectedTheme: input.selectedTheme,
    roomType: input.roomType,
    budget: input.budget,
    goals: input.goals
  });

  const preview = await generateRoomPreview({
    uploadedRoomImage: input.uploadedImages[0]?.url,
    selectedTheme: input.selectedTheme,
    customPalette: input.customPalette,
    roomType: input.roomType,
    customRoomType: input.customRoomType,
    budget: input.budget,
    goals: input.goals,
    customPrompt: input.customPrompt,
    suggestedProducts: products
  });

  const mainProblem = problemByGoal[primaryGoal];
  const roomScore = deterministicScore(input);
  const mainIssues = [
    ...issuePool[primaryGoal],
    "The fastest improvement would be to reduce visible clutter before adding new decor.",
    "This room would look much better with one repeated material and one repeated accent colour."
  ];

  return {
    id: `roomrevamp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    input,
    roomScore,
    headline:
      "Your room has good bones. It needs clearer layout, better lighting, cleaner storage, and smarter furniture choices.",
    mainProblem,
    styleSummary: `A ${input.selectedTheme} direction works well for this ${displayRoomType}: ${themeDescriptions[input.selectedTheme]}. ${
      input.customPalette?.length
        ? "Use the custom colour palette as the guardrail so new pieces feel intentional."
        : "Keep the changes practical and make each purchase solve a visible problem."
    }`,
    quickTip:
      primaryGoal === "better lighting"
        ? "Add one warm lamp at eye level before buying more decor."
        : "Clear the most visible surface first, then add one warm texture to make the room feel intentional.",
    mainIssues,
    priorityFixes: [
      `Start with the ${mainProblem.toLowerCase()} because it affects the whole room at once.`,
      "Create one clean focal point: bed, desk, sofa, or media wall.",
      "Remove or hide the small objects that are not used every day.",
      `Use the ${input.budget} budget on practical pieces before decorative extras.`
    ],
    layoutSuggestions: [
      "Keep the main walking path open and remove anything sitting in that path.",
      "Group similar functions together: sleep, work, storage, or media.",
      "Use one rug, shelf, lamp, or side table to visually anchor the main zone.",
      "Check measurements before buying, especially rugs, shelves, curtains, and storage boxes."
    ],
    colourPalette: choosePalette(input.selectedTheme, input.customPalette),
    lightingPlan: [
      "Use warm white bulbs around 2700K to 3000K for a calmer room.",
      "Add one task light where you work, read, or get ready.",
      "Use curtains or diffused shades to soften direct daylight.",
      "Avoid making coloured LEDs the main light source; use them as a subtle accent only."
    ],
    productRecommendations: products,
    aiPreviewPrompt: preview.generationPrompt,
    generatedPreviewImage: preview.previewImageUrl,
    previewStatus: preview.status
  };
}
