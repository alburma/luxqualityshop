import Image from "next/image";
import { ArrowRight } from "./icons";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lux.quality.shop/",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/+yhh39f3qLkYyNjQy",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/message/3OAO4FTEU6ELA1?autoload=1&app_absent=0",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582381711912",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10 safe-pb">
      {/* Subtle background accents */}
      <div className="animate-float pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[120px]" />
      <div className="animate-glow pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-accent-light/[0.04] blur-[100px]" />

      <div className="relative z-10 flex w-full max-w-[380px] flex-col items-center">
        {/* Logo */}
        <div className="animate-fade-up mb-6">
          <Image
            src="/logo.jpg"
            alt="LQS — Lux Quality Shop"
            width={140}
            height={140}
            priority
            className="h-[140px] w-[140px] rounded-2xl object-contain"
          />
        </div>

        <h1 className="animate-fade-up delay-100 mb-1 text-lg font-semibold tracking-[0.15em] uppercase text-accent-dark">
          Lux Quality Shop
        </h1>
        <p className="animate-fade-up delay-200 mb-8 text-center text-[13px] tracking-wide text-muted">
          Премиальные товары с доставкой
        </p>

        {/* Social links */}
        <div className="animate-fade-up delay-300 mb-3 flex w-full flex-col gap-2.5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group flex items-center gap-4 rounded-2xl px-5 py-[14px] active:scale-[0.98]"
            >
              <span className="text-accent-light transition-colors duration-200 group-hover:text-accent-dark">
                {link.icon}
              </span>
              <span className="flex-1 text-[15px] font-medium tracking-wide">{link.label}</span>
              <ArrowRight />
            </a>
          ))}
        </div>

        {/* Catalog CTA */}
        <div className="animate-fade-up delay-500 mt-3 w-full">
          <a
            href="https://a.abiz.cc/HNsbD3i"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-accent px-6 py-[14px] text-[15px] font-semibold tracking-wide text-white active:scale-[0.98]"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Каталог
            <ArrowRight />
          </a>
        </div>

        {/* Managers — Telegram + WhatsApp */}
        <p className="animate-fade-up delay-600 mt-5 mb-2 text-[11px] tracking-[0.15em] uppercase text-muted">
          Написать менеджеру
        </p>
        <div className="animate-fade-up delay-600 flex w-full flex-col gap-2.5">
          <a
            href="https://t.me/+yhh39f3qLkYyNjQy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow group flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-[14px] text-[15px] font-semibold tracking-wide text-white active:scale-[0.98]"
            style={{ backgroundColor: "#229ED9" }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            Менеджер в Telegram
            <ArrowRight />
          </a>
          <a
            href="https://api.whatsapp.com/message/3OAO4FTEU6ELA1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow group flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-[14px] text-[15px] font-semibold tracking-wide text-white active:scale-[0.98]"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
            </svg>
            Менеджер в WhatsApp
            <ArrowRight />
          </a>
        </div>

        <p className="animate-fade-in delay-700 mt-8 text-[11px] tracking-wider text-muted/50">
          &copy; 2026 LUX QUALITY SHOP
        </p>
      </div>
    </div>
  );
}
