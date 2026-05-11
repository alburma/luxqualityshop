import type { Metadata } from "next";
import { LinksContent, type Dict } from "../links-content";

const en: Dict = {
  tagline: "Premium goods with delivery",
  catalog: "Catalog",
  managersTitle: "Contact a manager",
  managerTg: "Telegram manager",
  copyright: "© 2026 LUX QUALITY SHOP",
};

export const metadata: Metadata = {
  title: "LuxQualityShop — Premium Store",
  description: "LuxQualityShop — premium goods store. Instagram, Telegram, WhatsApp, Facebook.",
  alternates: {
    canonical: "/en",
    languages: {
      ru: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "LuxQualityShop — Premium Store",
    description: "Premium goods store",
    type: "website",
    siteName: "LuxQualityShop",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxQualityShop — Premium Store",
    description: "Premium goods store",
  },
};

export default function EnLinksPage() {
  return <LinksContent dict={en} lang="en" />;
}
