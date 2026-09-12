"use client";

import { motion } from "framer-motion";
import { LivePlayer } from "@/components/LivePlayer";
import { ScheduleGrid } from "@/components/ScheduleGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { NowPlaying } from "@/lib/types";

const NOW_PLAYING: NowPlaying = {
  dj: "DJ Fivestack",
  show: "The Gold Standard Sessions",
  channel: "DIVINE:ONE",
  isLive: true,
  avatarUrl: "/images/dj_anton_james_1789249211645.jpg",
  streamUrl: "https://icecast2.play.cz/evropa2-128.mp3", // placeholder stream
};

// ── Stagger animation config ────────────────────────────────
const stagger = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════
          SECTION A: Ambient Background Orbs
          ═══════════════════════════════════════════════════ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Orb 1 — top-right, large */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 mix-blend-screen blur-[120px]"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        {/* Orb 2 — bottom-left */}
        <motion.div
          animate={{ y: [10, -30, 10], x: [-10, 10, -10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-15 mix-blend-screen blur-[140px]"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        {/* Orb 3 — center accent */}
        <motion.div
          animate={{ y: [-15, 25, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-10 mix-blend-screen blur-[100px]"
          style={{ background: "radial-gradient(circle, #E8D48B 0%, transparent 70%)" }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION B: Hero + Live Player
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto mb-12 md:mb-16"
        >
          {/* Eyebrow */}
          <motion.p
            variants={stagger.item}
            className="text-[10px] md:text-[11px] font-black tracking-[0.5em] uppercase text-brand-gold/70 mb-6"
          >
            London&apos;s Premier DAB Digital Broadcast
          </motion.p>

          {/* Main heading */}
          <motion.h1
            variants={stagger.item}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-6 relative z-10 mix-blend-difference"
          >
            <span className="block text-white opacity-90 drop-shadow-2xl hover:text-brand-gold transition-colors duration-700 cursor-default">
              THE HIGHER
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#E8D48B] to-brand-gold -mt-2 md:-mt-6">
              STATE.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={stagger.item}
            className="text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mt-12 max-w-2xl mx-auto border-l-2 border-brand-gold pl-4 text-left"
          >
            London's premier DAB digital broadcast network.<br/>
            Soulful House &middot; Garage &middot; Jungle &middot; D&amp;B
          </motion.p>
        </motion.div>

        {/* ── Live Player (Phase 1 centrepiece) ──────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", damping: 20 }}
          className="relative w-full max-w-xl mx-auto perspective-1000 z-20"
        >
          {/* Decorative glow behind player */}
          <div className="absolute inset-0 bg-brand-gold/20 blur-[100px] rounded-full scale-110 -z-10" />
          <div className="transform-gpu hover:scale-[1.02] hover:-rotate-1 transition-all duration-500">
            <LivePlayer nowPlaying={NOW_PLAYING} />
          </div>
        </motion.div>

        {/* ── Scroll indicator ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">
            Schedule
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-brand-gold/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION B.5: Running Ticker Marquee
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full overflow-hidden bg-brand-gold py-3 md:py-4 -rotate-1 scale-105 my-12 shadow-[0_0_50px_rgba(201,168,76,0.3)]">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex items-center"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-black font-black tracking-widest text-sm md:text-lg uppercase mx-6 flex items-center gap-6">
              LONDON'S PREMIER DAB BROADCAST
              <span className="w-2 h-2 rounded-full bg-black/30" />
              SOULFUL HOUSE
              <span className="w-2 h-2 rounded-full bg-black/30" />
              GARAGE
              <span className="w-2 h-2 rounded-full bg-black/30" />
              JUNGLE
              <span className="w-2 h-2 rounded-full bg-black/30" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION C: Schedule Grid
          ═══════════════════════════════════════════════════ */}
      <section id="schedule" className="relative z-10">
        <ScheduleGrid />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION C.5: Social Feed
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/5 bg-zinc-950/50">
        <SocialFeed />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION D: CTA Footer
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 bg-brand-zinc/50 px-6 py-24 md:py-32 text-center overflow-hidden">
        {/* Giant watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
          <span className="text-[25vw] font-black tracking-tighter text-white leading-none">
            DIVINE
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[10px] font-black tracking-[0.5em] text-brand-gold mb-6 uppercase">
            Join the frequency
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            Elevate Your Listening
          </h2>
          <p className="text-white/40 text-sm md:text-base mb-10 leading-relaxed">
            DIVINE broadcasts 24/7 on DAB digital radio across London.
            Stream live on any device. Subscribe to never miss a show.
          </p>
          <button
            className="px-10 py-4 text-[11px] font-black tracking-[0.3em] uppercase rounded transition-all duration-500 hover:translate-y-[-2px]"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #E8D48B 100%)",
              color: "#000",
              boxShadow: "0 0 40px rgba(201, 168, 76, 0.25)",
            }}
          >
            Listen Now →
          </button>
        </div>
      </section>
    </div>
  );
}
