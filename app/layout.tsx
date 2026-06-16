import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: {
    default: "RoomRevamp | Upload your room. See the better version.",
    template: "%s | RoomRevamp"
  },
  description:
    "RoomRevamp creates calm, practical room makeover plans, AI preview prompts, and budget-aware product suggestions from your room photos."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CursorGlow />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
