import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "LuxQualityShop — Premium Store",
  description: "LuxQualityShop — магазин премиальных товаров. Instagram, Telegram, WhatsApp, Facebook.",
  openGraph: {
    title: "LuxQualityShop — Premium Store",
    description: "Магазин премиальных товаров",
    type: "website",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#F0EDEA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`h-dvh antialiased ${geist.variable}`}>
      <body className="min-h-dvh flex flex-col font-sans">{children}</body>
    </html>
  );
}
