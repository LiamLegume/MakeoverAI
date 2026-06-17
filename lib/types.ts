export type RoomType =
  | "bedroom"
  | "living room"
  | "small apartment"
  | "bathroom"
  | "kitchen"
  | "home office"
  | "dining room"
  | "entryway"
  | "kids room"
  | "rental room"
  | "other room";

export type DecorTheme =
  | "minimalist"
  | "cosy neutral"
  | "modern"
  | "Japandi"
  | "Scandinavian"
  | "dark modern"
  | "gaming setup"
  | "luxury hotel"
  | "clean student room"
  | "warm natural"
  | "custom theme";

export type BudgetTier =
  | "under $100"
  | "under $250"
  | "under $500"
  | "under $1000"
  | "no strict budget";

export type ImprovementGoal =
  | "less clutter"
  | "better lighting"
  | "better layout"
  | "more aesthetic"
  | "better study setup"
  | "better gaming setup"
  | "more mature room"
  | "rental friendly";

export type ProductCategory =
  | "Lighting"
  | "Bedding"
  | "Desk organisation"
  | "Storage"
  | "Rugs"
  | "Wall decor"
  | "Plants"
  | "Cable management"
  | "Curtains"
  | "Small furniture"
  | "Gaming setup accessories"
  | "Study setup accessories";

export type PreviewStatus = "mocked" | "generated" | "failed";

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceRange: string;
  imageUrl: string;
  affiliateUrl: string;
  reason: string;
  themes: DecorTheme[];
  roomTypes: RoomType[];
  priority: number;
  budgetTier: BudgetTier[];
}

export interface ColourSwatch {
  name: string;
  hex: string;
  usage: string;
}

export interface RoomReportInput {
  uploadedImages: UploadedImage[];
  roomType: RoomType;
  customRoomType?: string;
  selectedTheme: DecorTheme;
  customPalette?: ColourSwatch[];
  budget: BudgetTier;
  goals: ImprovementGoal[];
  customPrompt?: string;
}

export interface GenerateRoomPreviewInput {
  uploadedRoomImage?: string;
  selectedTheme: DecorTheme;
  customPalette?: ColourSwatch[];
  roomType: RoomType;
  customRoomType?: string;
  budget: BudgetTier;
  goals: ImprovementGoal[];
  customPrompt?: string;
  suggestedProducts: Product[];
}

export interface GenerateRoomPreviewResult {
  previewImageUrl: string;
  generationPrompt: string;
  status: PreviewStatus;
}

export interface GeneratedRoomReport {
  id: string;
  createdAt: string;
  input: RoomReportInput;
  roomScore: number;
  headline: string;
  mainProblem: string;
  styleSummary: string;
  quickTip: string;
  mainIssues: string[];
  priorityFixes: string[];
  layoutSuggestions: string[];
  colourPalette: ColourSwatch[];
  lightingPlan: string[];
  productRecommendations: Product[];
  aiPreviewPrompt: string;
  generatedPreviewImage: string;
  previewStatus: PreviewStatus;
}
