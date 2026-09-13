import Link from "next/link";
import Image from "next/image";
import { Radio, Shield, Headphones, Music, Mail, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black text-white pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[200px] bg-brand-gold/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand & DAB info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="DIVINE Radio London"
                  fill
                  className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.35)]"
                />
              </div>
              <span className="text-xl font-black tracking-[0.2em] group-hover:text-brand-gold transition-colors">
                DIVINE RADIO
              </span>
            </Link>
            <p className="text-white/40 text-xs leading-relaxed max-w-sm">
              London&apos;s premier DAB digital broadcast network. Broadcasting 24/7 across Hertfordshire, North London, and the South East on DAB+ Block 11C and worldwide in 192kbps HD audio.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[9px] font-black uppercase tracking-wider">
                <Radio className="w-3 h-3 animate-pulse" /> DAB+ Block 11C
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/50 text-[9px] font-black uppercase tracking-wider">
                192kbps HD
              </span>
            </div>
          </div>

          {/* Col 2: Channels */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold mb-4">
              Channels
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="text-white/50 hover:text-brand-gold transition-colors">
                  DIVINE : ONE (Flagship)
                </Link>
              </li>
              <li>
                <Link href="/sub" className="text-white/50 hover:text-brand-gold transition-colors">
                  DIVINE : SUB (Bass & Jungle)
                </Link>
              </li>
              <li>
                <Link href="/chill" className="text-white/50 hover:text-brand-gold transition-colors">
                  DIVINE : CHILL (Balearic Soul)
                </Link>
              </li>
              <li>
                <Link href="/tv" className="text-white/50 hover:text-brand-gold transition-colors">
                  DIVINE : TV (Live Studio Feed)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Network Links */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/residents" className="text-white/50 hover:text-white transition-colors">
                  Resident Roster
                </Link>
              </li>
              <li>
                <Link href="/#schedule" className="text-white/50 hover:text-white transition-colors">
                  Broadcast Schedule
                </Link>
              </li>
              <li>
                <Link href="/listen-back" className="text-white/50 hover:text-white transition-colors">
                  Listen Back Archive
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/50 hover:text-white transition-colors">
                  Live Events & Nights
                </Link>
              </li>
              <li>
                <Link href="/merch" className="text-white/50 hover:text-white transition-colors">
                  Official Merch Store
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/50 hover:text-white transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Portals */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-4">
              Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/login" className="text-white/50 hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-red-400" /> Admin Command
                </Link>
              </li>
              <li>
                <Link href="/dj" className="text-white/50 hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <Headphones className="w-3 h-3 text-brand-gold" /> DJ Studio Portal
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="text-white/50 hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <Music className="w-3 h-3 text-blue-400" /> Apply to Host
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-white/50 hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-pink-400" /> Listener Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase font-bold tracking-wider text-white/30">
          <div>
            © {new Date().getFullYear()} DIVINE RADIO LONDON. Intellectual Property Protected by HECTIC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Terms</Link>
            <Link href="mailto:info@divineradiolondon.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" /> Contact Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
