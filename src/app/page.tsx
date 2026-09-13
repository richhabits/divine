"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { LivePlayer } from "@/components/LivePlayer";
import { ScheduleGrid } from "@/components/ScheduleGrid";
import { SocialFeed } from "@/components/SocialFeed";
import { ArchiveCarousel } from "@/components/ArchiveCarousel";
import { DJMarquee } from "@/components/DJMarquee";
import { StudioAssistant } from "@/components/StudioAssistant";
import { NowPlaying } from "@/lib/types";
import { RESIDENTS, STATION_INFO, MERCH } from "@/lib/schedule-data";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Smartphone,
  Radio,
  Users,
  Headphones,
  Megaphone,
  TrendingUp,
  BarChart3,
  Mail,
  ArrowRight,
  ExternalLink,
  Apple,
  ShoppingBag,
  LogIn,
  UserPlus,
  Music,
  Shield,
  Briefcase,
  Speaker,
  Mic,
} from "lucide-react";

const NOW_PLAYING: NowPlaying = {
  dj: "DJ Fivestack",
  show: "The Gold Standard Sessions",
  channel: "DIVINE:ONE",
  isLive: true,
  avatarUrl: "/images/djs/anton-james.jpg",
  streamUrl: "https://orbit.citrus3.com:2020/stream/divineradiolondon",
};

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

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-4 block">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-white/50 text-sm md:text-base max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default function HomePage() {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════
          AMBIENT BACKGROUND ORBS
          ═══════════════════════════════════════════════════ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ y: [-20, 20, -20], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 mix-blend-screen blur-[120px]"
          style={{
            background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ y: [10, -30, 10], x: [-10, 10, -10] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-15 mix-blend-screen blur-[140px]"
          style={{
            background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ y: [-15, 25, -15] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-10 mix-blend-screen blur-[100px]"
          style={{
            background: "radial-gradient(circle, #E8D48B 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 1: HERO + LIVE PLAYER
          ═══════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
      >
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto mb-12 md:mb-16"
        >
          <motion.p
            variants={stagger.item}
            className="text-[10px] md:text-[11px] font-black tracking-[0.5em] uppercase text-brand-gold/70 mb-6"
          >
            London&apos;s Premier DAB Digital Broadcast
          </motion.p>
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
          <motion.p
            variants={stagger.item}
            className="text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase mt-12 max-w-2xl mx-auto border-l-2 border-brand-gold pl-4 text-left"
          >
            London&apos;s premier DAB digital broadcast network.
            <br />
            Soulful House &middot; Garage &middot; Jungle &middot; D&amp;B
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", damping: 20 }}
          className="relative w-full max-w-xl mx-auto perspective-1000 z-20"
        >
          <div className="absolute inset-0 bg-brand-gold/20 blur-[100px] rounded-full scale-110 -z-10" />
          <div className="transform-gpu hover:scale-[1.02] hover:-rotate-1 transition-all duration-500">
            <LivePlayer nowPlaying={NOW_PLAYING} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[1px] h-8 bg-gradient-to-b from-brand-gold/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TICKER MARQUEE
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full overflow-hidden bg-brand-gold py-3 md:py-4 -rotate-1 scale-105 my-12 shadow-[0_0_50px_rgba(201,168,76,0.3)]">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex items-center"
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-black font-black tracking-widest text-sm md:text-lg uppercase mx-6 flex items-center gap-6"
            >
              LONDON&apos;S PREMIER DAB BROADCAST
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
          SECTION 1.5: RECENT BROADCASTS (LISTEN BACK)
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-12 pb-24 border-b border-white/5 bg-gradient-to-b from-transparent to-zinc-950/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-2 block">
              Missed A Show?
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">
              RECENT BROADCASTS.
            </h2>
          </div>
          <Link
            href="/listen-back"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 border border-white/10 rounded hover:text-white hover:border-white/30 transition-all"
          >
            View Archive <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <ArchiveCarousel />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: ABOUT US & FEATURED RESIDENTS
          ═══════════════════════════════════════════════════ */}
      <section id="about" className="relative z-10 pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={aboutRef}>
              <SectionHeading
                eyebrow="About Us"
                title="WE ARE DIVINE RADIO LONDON."
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Divine Radio is the Internet&apos;s leading underground radio
                  station, broadcasting live from London across the globe.
                </p>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  We have a team of 40 plus DJs who are equally experienced,
                  enthusiastic and committed in the way they present their shows
                  offering a unique blend of House, Garage, Jungle, Drum &amp;
                  Bass, Oldskool, Hardcore, Reggae, RnB &amp; Soul.
                </p>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  While the DJ team bring with them vast experience, they also
                  bring their own individual following and especially a deep
                  knowledge of their own sub-genres. With a fine balance between
                  old and new music, they pay tribute to the past and provoke the
                  future.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="glass-panel px-6 py-4 rounded-xl border border-white/5 text-center">
                    <span className="block text-2xl md:text-3xl font-black text-brand-gold">
                      40+
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
                      Resident DJs
                    </span>
                  </div>
                  <div className="glass-panel px-6 py-4 rounded-xl border border-white/5 text-center">
                    <span className="block text-2xl md:text-3xl font-black text-brand-gold">
                      {STATION_INFO.archiveCount}
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
                      Archived Shows
                    </span>
                  </div>
                  <div className="glass-panel px-6 py-4 rounded-xl border border-white/5 text-center">
                    <span className="block text-2xl md:text-3xl font-black text-brand-gold">
                      {STATION_INFO.listenerPopulation}
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
                      DAB Coverage
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side Info Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:flex flex-col items-center justify-center p-12 glass-panel border border-brand-gold/20 rounded-3xl"
            >
              <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30 mb-8">
                <Radio className="w-10 h-10 text-brand-gold" />
              </div>
              <h3 className="text-3xl font-black mb-4 text-center">Global Dance Music<br/>Radio Station</h3>
              <p className="text-white/40 text-center text-sm mb-8">
                A massive roster of professional DJs delivering the very best in underground music.
              </p>
              <Link href="/residents" className="inline-flex items-center gap-3 px-8 py-3 bg-brand-gold text-black font-black text-[11px] tracking-[0.2em] uppercase rounded hover:bg-[#E8D48B] transition-colors">
                Meet The DJs <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* DJ Marquee takes full width */}
        <DJMarquee />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: SCHEDULE / TIMETABLE
          ═══════════════════════════════════════════════════ */}
      <section id="timetable" className="relative z-10">
        <ScheduleGrid />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: AI STUDIO ASSISTANT
          ═══════════════════════════════════════════════════ */}
      <section
        id="text"
        className="relative z-10 px-6 md:px-12 py-24 md:py-32 overflow-hidden bg-zinc-950/80 border-t border-white/5"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-brand-gold/5 blur-[200px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            eyebrow="2026 AI Assistant"
            title="ASK DIVINE."
            subtitle="Meet our interactive studio assistant. Ask about the schedule, our DJs, DAB coverage, or how to get a shoutout live on air."
            align="center"
          />

          <div className="mt-12">
            <StudioAssistant />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: COVERAGE & APPS
          ═══════════════════════════════════════════════════ */}
      <section
        id="coverage"
        className="relative z-10 px-6 md:px-12 py-24 md:py-32 border-t border-white/5 bg-zinc-950/50"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Take Us On The Move"
            title="DAB COVERAGE & APPS."
            subtitle="Listen across Hertfordshire, North London, and the South East on DAB+ digital radio. Or stream us anywhere on the planet."
            align="center"
          />

          {/* Coverage Towns */}
          <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto">
            {STATION_INFO.dabCoverageTowns.map((town) => (
              <span
                key={town}
                className="px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-white/50 bg-white/5 rounded-full border border-white/10 hover:border-brand-gold/40 hover:text-brand-gold transition-all cursor-default"
              >
                {town}
              </span>
            ))}
          </div>

          {/* High-Res Devices Suite Showcase */}
          <div className="relative max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(201,168,76,0.15)] group">
            <div className="aspect-[16/9] relative">
              <Image
                src="/images/divine_devices.jpg"
                alt="DIVINE Radio across iOS, Android, macOS, Apple TV and DAB+"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                <div>
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase text-brand-gold block mb-1">
                    Universal Broadcast Sync
                  </span>
                  <h4 className="text-xl md:text-2xl font-black text-white">
                    ONE EXPERIENCE. EVERY SCREEN & RADIO.
                  </h4>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-brand-gold/30">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase">
                    DAB+ &bull; iOS &bull; Android &bull; Web
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Apps & Platforms Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {/* iOS */}
            <a
              href={STATION_INFO.iosAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all group text-center flex flex-col items-center justify-center"
            >
              <Apple className="w-8 h-8 text-white/60 mb-3 group-hover:text-brand-gold transition-colors" />
              <h3 className="font-bold text-sm mb-1">iOS App</h3>
              <p className="text-white/40 text-[10px] mb-3">App Store</p>
              <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase flex items-center justify-center gap-1">
                Get <ExternalLink className="w-2 h-2" />
              </span>
            </a>

            {/* Android */}
            <a
              href={STATION_INFO.androidAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all group text-center flex flex-col items-center justify-center"
            >
              <Smartphone className="w-8 h-8 text-white/60 mb-3 group-hover:text-brand-gold transition-colors" />
              <h3 className="font-bold text-sm mb-1">Android App</h3>
              <p className="text-white/40 text-[10px] mb-3">Google Play</p>
              <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase flex items-center justify-center gap-1">
                Get <ExternalLink className="w-2 h-2" />
              </span>
            </a>

            {/* TuneIn */}
            <a
              href={STATION_INFO.tuneInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#1DA1F2]/50 transition-all group text-center flex flex-col items-center justify-center"
            >
              <Radio className="w-8 h-8 text-white/60 mb-3 group-hover:text-[#1DA1F2] transition-colors" />
              <h3 className="font-bold text-sm mb-1">TuneIn</h3>
              <p className="text-white/40 text-[10px] mb-3">Global Directory</p>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#1DA1F2] uppercase flex items-center justify-center gap-1">
                Listen <ExternalLink className="w-2 h-2" />
              </span>
            </a>

            {/* Alexa */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#00A8E1]/50 transition-all group text-center flex flex-col items-center justify-center">
              <Speaker className="w-8 h-8 text-white/60 mb-3 group-hover:text-[#00A8E1] transition-colors" />
              <h3 className="font-bold text-sm mb-1">Alexa</h3>
              <p className="text-white/40 text-[10px] mb-3">&quot;Play DIVINE Radio&quot;</p>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#00A8E1] uppercase flex items-center justify-center gap-1">
                Smart Speaker
              </span>
            </div>

            {/* DAB+ */}
            <div className="glass-panel p-6 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 text-center flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <Mic className="w-8 h-8 text-brand-gold mb-3" />
              <h3 className="font-bold text-sm mb-1">DAB+</h3>
              <p className="text-white/40 text-[10px] mb-3">Block 11C</p>
              <span className="text-[9px] font-bold tracking-[0.2em] text-brand-gold uppercase flex items-center justify-center gap-1">
                128kbps HD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: ADVERTISE WITH US
          ═══════════════════════════════════════════════════ */}
      <section
        id="advertise"
        className="relative z-10 px-6 md:px-12 py-24 md:py-32 overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-brand-gold/5 blur-[200px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            eyebrow="Grow Your Brand"
            title="ADVERTISE WITH DIVINE."
            subtitle="Reach 813,000+ engaged listeners across London's most passionate music community."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Users,
                stat: "813K+",
                label: "DAB Coverage Population",
                desc: "Direct access to London's underground music audience",
              },
              {
                icon: Headphones,
                stat: "40+",
                label: "Resident DJs",
                desc: "Trusted voices your audience already follows",
              },
              {
                icon: TrendingUp,
                stat: "24/7",
                label: "Live Broadcast",
                desc: "Around-the-clock airtime for maximum reach",
              },
              {
                icon: BarChart3,
                stat: "15K+",
                label: "Archived Shows",
                desc: "Evergreen content with long-tail engagement",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all group"
              >
                <item.icon className="w-8 h-8 text-brand-gold mb-4 group-hover:scale-110 transition-transform" />
                <span className="block text-3xl font-black text-white mb-1">
                  {item.stat}
                </span>
                <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold mb-2">
                  {item.label}
                </span>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Ad Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "Starter",
                price: "Contact Us",
                features: [
                  "Pre-recorded audio spots",
                  "Social media mentions",
                  "Website banner placement",
                  "Monthly analytics report",
                ],
                highlight: false,
              },
              {
                tier: "Premium",
                price: "Contact Us",
                features: [
                  "Everything in Starter",
                  "Live DJ read-outs during shows",
                  "Branded show sponsorship",
                  "Event partnership opportunities",
                  "Priority ad rotation",
                ],
                highlight: true,
              },
              {
                tier: "Enterprise",
                price: "Contact Us",
                features: [
                  "Everything in Premium",
                  "Exclusive channel sponsorship",
                  "Custom branded content",
                  "Dedicated account manager",
                  "Cross-platform campaign",
                ],
                highlight: false,
              },
            ].map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`p-8 rounded-2xl border transition-all ${
                  pkg.highlight
                    ? "bg-brand-gold/10 border-brand-gold/40 shadow-[0_0_40px_rgba(201,168,76,0.1)]"
                    : "glass-panel border-white/5"
                }`}
              >
                {pkg.highlight && (
                  <span className="inline-block px-3 py-1 bg-brand-gold text-black text-[9px] font-bold tracking-[0.2em] uppercase rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-black mb-2">{pkg.tier}</h3>
                <p className="text-brand-gold font-bold text-lg mb-6">
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-white/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:info@divineradiolondon.com?subject=Advertising%20Enquiry"
                  className={`block w-full py-3 rounded-xl text-center text-[11px] font-black tracking-[0.2em] uppercase transition-all ${
                    pkg.highlight
                      ? "bg-brand-gold text-black hover:bg-[#E8D48B]"
                      : "bg-white/5 text-white border border-white/10 hover:border-brand-gold/40"
                  }`}
                >
                  Get In Touch
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 7: MIXCLOUD / SOCIAL INTEGRATIONS
          ═══════════════════════════════════════════════════ */}
      <section
        id="mixcloud"
        className="relative z-10 border-t border-white/5 bg-zinc-950/50 px-6 md:px-12 py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Listen Anywhere"
            title="MIXCLOUD & SOCIAL."
            subtitle="Over 15,000 archived shows on Mixcloud. Follow the movement across every platform."
            align="center"
          />

          {/* Mixcloud Embed */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <iframe
                width="100%"
                height="400"
                src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&dark=1&feed=%2FDivineRadio%2F"
                frameBorder="0"
                allow="autoplay"
                className="w-full"
                title="DIVINE Radio Mixcloud"
              />
            </div>
          </div>

          {/* Social Platform Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              {
                name: "Mixcloud",
                url: "https://www.mixcloud.com/DivineRadio/",
                desc: "15,000+ archived shows",
                color: "from-purple-500 to-blue-500",
              },
              {
                name: "YouTube",
                url: "https://www.youtube.com/@divineradiolondon",
                desc: "Live streams & DJ sets",
                color: "from-red-600 to-red-500",
              },
              {
                name: "TikTok",
                url: "https://www.tiktok.com/@divineradiolondon",
                desc: "Behind the decks clips",
                color: "from-black to-pink-500",
              },
              {
                name: "Instagram",
                url: "https://www.instagram.com/divineradiolondon/",
                desc: "Studio life & events",
                color: "from-purple-600 via-pink-500 to-orange-400",
              },
            ].map((platform, i) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group text-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} mx-auto mb-4 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-sm mb-1">{platform.name}</h3>
                <p className="text-[10px] text-white/40">{platform.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 8: MERCH SHOWCASE
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Official Store"
              title="DIVINE MERCH."
              subtitle="Premium heavyweight apparel designed in London."
            />
            <Link
              href="/merch"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold border border-brand-gold/30 rounded hover:bg-brand-gold/10 transition-all mb-16"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {MERCH.slice(0, 4).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-zinc-900 rounded-2xl mb-4 relative overflow-hidden border border-white/5 group-hover:border-brand-gold/30 transition-colors">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 font-bold tracking-widest text-lg uppercase rotate-[-45deg] select-none">
                      DIVINE
                    </div>
                  )}
                  {item.tag && (
                    <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-brand-gold text-black text-[8px] font-bold tracking-[0.15em] rounded-full uppercase shadow-md">
                      {item.tag}
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold tracking-tight mb-1 group-hover:text-brand-gold transition-colors truncate">
                  {item.name}
                </h3>
                <p className="text-brand-gold text-sm font-bold">£{item.price.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>

          <Link
            href="/merch"
            className="md:hidden mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold border border-brand-gold/30 rounded hover:bg-brand-gold/10 transition-all"
          >
            <ShoppingBag className="w-4 h-4" /> Shop All Merch
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 8.5: SIGN IN / CREATE ACCOUNT
          ═══════════════════════════════════════════════════ */}
      <section
        id="account"
        className="relative z-10 border-t border-white/5 bg-zinc-950/50 px-6 md:px-12 py-24 md:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Your Account"
            title="JOIN THE PLATFORM."
            subtitle="Create an account to unlock exclusive features, save your favourite shows, and interact with the station."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                role: "Listener",
                desc: "Save shows, shoutouts, and personalised schedule.",
                color: "border-blue-500/30 hover:border-blue-400/60",
                iconColor: "text-blue-400",
                href: "/auth/signup?role=listener",
              },
              {
                icon: Music,
                role: "Artist / DJ",
                desc: "Manage your profile, upload mixes, and view analytics.",
                color: "border-brand-gold/30 hover:border-brand-gold/60",
                iconColor: "text-brand-gold",
                href: "/join-us",
              },
              {
                icon: Shield,
                role: "Management",
                desc: "Station admin, schedule control, and user management.",
                color: "border-red-500/30 hover:border-red-400/60",
                iconColor: "text-red-400",
                href: "/admin",
              },
              {
                icon: Briefcase,
                role: "Client",
                desc: "Advertising dashboard, campaign analytics, and billing.",
                color: "border-green-500/30 hover:border-green-400/60",
                iconColor: "text-green-400",
                href: "/#advertise",
              },
            ].map((account, i) => (
              <motion.a
                key={account.role}
                href={account.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel p-6 rounded-2xl border ${account.color} transition-all group text-center block`}
              >
                <account.icon
                  className={`w-10 h-10 ${account.iconColor} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="font-bold text-lg mb-2">{account.role}</h3>
                <p className="text-white/40 text-sm mb-4">{account.desc}</p>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                  <UserPlus className="w-3 h-3" /> Sign Up
                </span>
              </motion.a>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-8 py-3 text-[11px] font-black tracking-[0.2em] uppercase text-white/60 border border-white/10 rounded hover:border-white/30 hover:text-white transition-all"
            >
              <LogIn className="w-4 h-4" /> Already have an account? Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 9: SOCIAL FEED
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-white/5 bg-zinc-950/50">
        <SocialFeed />
      </div>

      {/* ═══════════════════════════════════════════════════
          SECTION 9: JOIN US CTA
          ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02]">
          <span className="text-[25vw] font-black tracking-tighter text-white leading-none">
            DIVINE
          </span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <SectionHeading
            eyebrow="Join The Family"
            title="ARE YOU A DJ?"
            subtitle="We are always looking for new fresh talent to join the station. If you think you've got what it takes to be part of the DIVINE family, we'd love to hear from you."
            align="center"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/join-us"
              className="px-10 py-4 text-[11px] font-black tracking-[0.3em] uppercase rounded transition-all duration-500 hover:translate-y-[-2px] inline-flex items-center gap-3"
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C 0%, #E8D48B 100%)",
                color: "#000",
                boxShadow: "0 0 40px rgba(201, 168, 76, 0.25)",
              }}
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:info@divineradiolondon.com"
              className="px-10 py-4 text-[11px] font-black tracking-[0.3em] uppercase rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all inline-flex items-center gap-3"
            >
              <Mail className="w-4 h-4" /> Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
