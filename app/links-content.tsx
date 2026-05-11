"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";

function trackClick(destination: string, locale: string) {
  try {
    fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, locale }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export type Dict = {
  tagline: string;
  catalog: string;
  managersTitle: string;
  managerTg: string;
  copyright: string;
};

const socialLinks = [
  {
    label: "Instagram",
    event: "social_instagram",
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
    event: "social_telegram",
    href: "https://t.me/+m17URU--fvxkODM6",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    event: "social_whatsapp",
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
    event: "social_facebook",
    href: "https://www.facebook.com/profile.php?id=61582381711912",
    icon: (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export function LinksContent({ dict, lang }: { dict: Dict; lang: "ru" | "en" }) {
  return (
    <div lang={lang} className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10 safe-pb safe-pt">
      {/* Subtle background accents */}
      <div className="animate-float pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[120px]" />
      <div className="animate-glow pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-accent-light/[0.04] blur-[100px]" />

      {/* Language switcher — fixed top-right with safe-area for notch */}
      <div
        className="absolute right-4 z-20 flex items-center gap-0.5 rounded-full border border-white/40 bg-white/70 p-0.5 text-[12px] font-semibold tracking-[0.1em] shadow-sm backdrop-blur-md"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        <Link
          href="/"
          aria-label="Русский"
          className={`rounded-full px-3 py-1.5 transition-colors ${
            lang === "ru" ? "bg-accent text-white" : "text-accent-dark"
          }`}
        >
          RU
        </Link>
        <Link
          href="/en"
          aria-label="English"
          className={`rounded-full px-3 py-1.5 transition-colors ${
            lang === "en" ? "bg-accent text-white" : "text-accent-dark"
          }`}
        >
          EN
        </Link>
      </div>

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
          {dict.tagline}
        </p>

        {/* Social links */}
        <div className="animate-fade-up delay-300 mb-3 flex w-full flex-col gap-2.5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(link.event, lang)}
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
            onClick={() => trackClick("catalog", lang)}
            className="btn-glow group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-accent px-6 py-[14px] text-[15px] font-semibold tracking-wide text-white active:scale-[0.98]"
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {dict.catalog}
            <ArrowRight />
          </a>
        </div>

        {/* Managers — Telegram + WhatsApp */}
        <p className="animate-fade-up delay-600 mt-5 mb-2 text-[11px] tracking-[0.15em] uppercase text-muted">
          {dict.managersTitle}
        </p>
        <div className="animate-fade-up delay-600 flex w-full flex-col gap-2.5">
          <a
            href="https://t.me/+m17URU--fvxkODM6"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("manager_telegram", lang)}
            className="btn-glow group flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-[14px] text-[15px] font-semibold tracking-wide text-white active:scale-[0.98]"
            style={{ backgroundColor: "#229ED9" }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            {dict.managerTg}
            <ArrowRight />
          </a>
        </div>

        <p className="animate-fade-in delay-700 mt-8 text-[11px] tracking-wider text-muted/50">
          {dict.copyright}
        </p>
      </div>
    </div>
  );
}
