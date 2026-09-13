"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Channel } from "@/lib/types";

interface NavLink {
  label: string;
  href: string;
  channel?: Channel;
}

const NAV_LINKS: NavLink[] = [
  { label: "DIVINE:ONE", href: "/", channel: "DIVINE:ONE" },
  { label: "DIVINE:SUB", href: "/sub", channel: "DIVINE:SUB" },
  { label: "DIVINE:CHILL", href: "/chill", channel: "DIVINE:CHILL" },
  { label: "DIVINE:TV", href: "/tv", channel: "DIVINE:TV" },
];

const SECONDARY_LINKS = [
  { label: "SCHEDULE", href: "/#schedule" },
  { label: "RESIDENTS", href: "/residents" },
  { label: "EVENTS", href: "/events" },
  { label: "MERCH", href: "/merch" },
  { label: "LISTEN BACK", href: "/listen-back" },
  { label: "FAQ", href: "/faq" },
  { label: "JOIN US", href: "/join-us" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [scrolled, setScrolled] = useState(false);

  // London time clock — adapted from Hectic Radio's broadcast clock
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    });

    const updateClock = () => setClock(formatter.format(new Date()));
    updateClock();
    const id = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Scroll detection for background opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* ── Logo ────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 no-underline group hover:scale-105 transition-transform flex-shrink-0" onClick={() => setIsOpen(false)}>
            <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <Image 
                src="/images/logo.png" 
                alt="DIVINE Radio Logo" 
                fill 
                sizes="(max-width: 768px) 48px, 64px"
                className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.35)]"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 flex-wrap justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[9px] xl:text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-brand-gold transition-all duration-300 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <div className="w-[1px] h-4 bg-white/10 hidden xl:block" />
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[9px] xl:text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right: Clock + Status ───────────────────── */}
          <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0">
            {/* London broadcast clock */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[8px] xl:text-[9px] font-black font-mono text-brand-gold tracking-[0.12em]">
                LONDON
              </span>
              <span className="text-[10px] xl:text-[11px] font-bold font-mono text-white/70">
                {clock}
              </span>
            </div>

            {/* Live status pulse */}
            <div className="flex items-center gap-2 px-2 py-1 xl:px-3 xl:py-1.5 rounded bg-white/[0.03] border border-white/[0.05]">
              <div
                className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-brand-gold"
                style={{
                  boxShadow: "0 0 10px rgba(201, 168, 76, 0.6)",
                  animation: "pulse-gold 2s infinite",
                }}
              />
              <span className="hidden sm:block text-[8px] xl:text-[9px] font-black tracking-[0.15em] text-white/40 uppercase">
                ON AIR
              </span>
            </div>

            {/* Sign In */}
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-1.5 xl:gap-2 px-2 py-1 xl:px-3 xl:py-1.5 rounded bg-white/[0.03] border border-white/[0.05] text-[8px] xl:text-[9px] font-black tracking-[0.15em] text-white/40 uppercase hover:text-brand-gold hover:border-brand-gold/30 transition-all whitespace-nowrap"
            >
              <LogIn className="w-3 h-3" />
              Sign In
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 -mr-2 text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav Drawer ──────────────────────────── */}
        {isOpen && (
          <nav className="lg:hidden border-t border-white/10 py-6 flex flex-col gap-4 max-h-[calc(100vh-80px)] overflow-y-auto px-2 pb-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[12px] font-bold tracking-[0.25em] uppercase text-white/60 hover:text-brand-gold transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-white/10 my-2" />
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[12px] font-bold tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-white/10 my-2" />
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[12px] font-bold tracking-[0.25em] uppercase text-brand-gold py-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In to Portal
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
