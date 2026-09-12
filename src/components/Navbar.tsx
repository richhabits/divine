"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Radio } from "lucide-react";
import { NavLink } from "@/lib/types";

const NAV_LINKS: NavLink[] = [
  { label: "DIVINE:ONE", href: "#", channel: "DIVINE:ONE" },
  { label: "DIVINE:SUB", href: "#sub", channel: "DIVINE:SUB" },
  { label: "DIVINE:CHILL", href: "#chill", channel: "DIVINE:CHILL" },
  { label: "DIVINE:TV", href: "#tv", channel: "DIVINE:TV" },
];

const SECONDARY_LINKS = [
  { label: "SCHEDULE", href: "#schedule" },
  { label: "RESIDENTS", href: "#residents" },
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* ── Logo ────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <Radio className="w-5 h-5 text-brand-gold opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-black tracking-[0.18em] text-white">
              DIVINE
            </span>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 hover:text-brand-gold transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <div className="w-[1px] h-4 bg-white/10" />
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30 hover:text-white transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right: Clock + Status ───────────────────── */}
          <div className="flex items-center gap-4">
            {/* London broadcast clock */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] font-black font-mono text-brand-gold tracking-[0.12em]">
                LONDON
              </span>
              <span className="text-[11px] font-bold font-mono text-white/70">
                {clock}
              </span>
            </div>

            {/* Live status pulse */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.05]">
              <div
                className="w-2 h-2 rounded-full bg-brand-gold"
                style={{
                  boxShadow: "0 0 10px rgba(201, 168, 76, 0.6)",
                  animation: "pulse-gold 2s infinite",
                }}
              />
              <span className="hidden sm:block text-[9px] font-black tracking-[0.15em] text-white/40 uppercase">
                ON AIR
              </span>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav Drawer ──────────────────────────── */}
        {isOpen && (
          <nav className="md:hidden border-t border-white/5 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 hover:text-brand-gold transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-white/5" />
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/30 hover:text-white transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
