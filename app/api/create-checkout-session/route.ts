import { NextResponse } from "next/server";

export async function POST() {
  // Stripe Checkout can be added here later using a server-only STRIPE_SECRET_KEY.
  // The MVP returns a mock unlock response so the app works without real API keys.
  return NextResponse.json({
    mode: "demo",
    status: "unlocked",
    checkoutUrl: null
  });
}
