import { themeDescriptions } from "@/lib/mockData";
import { getMatchedRoomExample } from "@/lib/roomExamples";
import type { GenerateRoomPreviewInput, GenerateRoomPreviewResult } from "@/lib/types";

export async function generateRoomPreview(
  input: GenerateRoomPreviewInput
): Promise<GenerateRoomPreviewResult> {
  const displayRoomType = input.customRoomType || input.roomType;
  const productNames = input.suggestedProducts
    .slice(0, 4)
    .map((product) => product.name.toLowerCase())
    .join(", ");

  const customDirection = input.customPrompt
    ? ` Custom style note: ${input.customPrompt.trim()}`
    : "";
  const paletteDirection = input.customPalette?.length
    ? ` Custom colour palette: ${input.customPalette
        .map((colour) => `${colour.name} ${colour.hex} for ${colour.usage}`)
        .join("; ")}.`
    : "";

  const generationPrompt = [
    `Create a realistic ${displayRoomType} makeover in a ${input.selectedTheme} style.`,
    `Design direction: ${themeDescriptions[input.selectedTheme]}.`,
    `Budget: ${input.budget}. Main goals: ${input.goals.join(", ")}.`,
    paletteDirection,
    productNames ? `Suggested product types to incorporate: ${productNames}.` : "",
    "Keep the room believable, bright, practical, and not over-styled.",
    "Do not imply professional certification or guaranteed results.",
    customDirection
  ]
    .filter(Boolean)
    .join(" ");

  return {
    previewImageUrl: getMatchedRoomExample({
      roomType: displayRoomType,
      theme: input.selectedTheme
    }).afterImage,
    generationPrompt,
    status: "mocked"
  };
}
