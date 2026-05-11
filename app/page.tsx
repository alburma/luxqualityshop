import { LinksContent, type Dict } from "./links-content";

const ru: Dict = {
  tagline: "Премиальные товары с доставкой",
  catalog: "Каталог",
  managersTitle: "Написать менеджеру",
  managerTg: "Менеджер в Telegram",
  managerWa: "Менеджер в WhatsApp",
  copyright: "© 2026 LUX QUALITY SHOP",
};

export default function LinksPage() {
  return <LinksContent dict={ru} lang="ru" />;
}
