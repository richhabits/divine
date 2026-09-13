"use client";

import { useState, useMemo } from "react";
import { STATION_INFO } from "@/lib/schedule-data";
import {
  Search,
  Radio,
  Globe,
  Headphones,
  Mic2,
  HelpCircle,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  tags: string[];
}

interface FAQCategory {
  category: string;
  icon: typeof Radio;
  badge: string;
  items: FAQItem[];
}

const FAQ_SECTIONS: FAQCategory[] = [
  {
    category: "Listeners & Tuning In",
    icon: Radio,
    badge: "24/7 Digital Audio",
    items: [
      {
        q: "How do I tune in to DIVINE on DAB+ digital radio?",
        a: "DIVINE broadcasts across North & South East London and Hertfordshire on DAB+ Block 11C at 128kbps crystal-clear high fidelity. On your in-car or home digital radio, initiate a 'Full Scan' or 'Autotune' and scroll to 'DIVINE' in the alphabetical station directory.",
        tags: ["dab", "radio", "frequency", "car", "listen", "scan", "block 11c", "tune"]
      },
      {
        q: "How can I play DIVINE through Amazon Alexa, Google Home, or Siri?",
        a: `On any Amazon Alexa smart speaker, speak clearly: "${STATION_INFO.alexaSkill}". On Google Nest or Apple HomePod, use the TuneIn integration by asking: "Hey Google, stream Divine Radio London on TuneIn", or AirPlay directly from our iOS and Web players.`,
        tags: ["alexa", "google", "siri", "smart speaker", "voice", "tunein", "homepod"]
      },
      {
        q: "What is the difference between the 4 broadcast channels?",
        a: "DIVINE:ONE is our flagship DAB stream dedicated to House, UK Garage, and Underground classics. DIVINE:SUB powers low-end sound system culture (Jungle, Drum & Bass, 140). DIVINE:CHILL delivers Balearic beats, liquid rollers, and downtempo. DIVINE:TV features our 1080p60 multi-camera live DJ booth visual feed.",
        tags: ["channels", "sub", "chill", "tv", "one", "house", "garage", "dnb", "jungle"]
      },
      {
        q: "Are the live audio streams completely free with no subscription?",
        a: "Yes! DIVINE is 100% free to stream worldwide across iOS, Android, web browsers, and DAB+ digital radio. No credit card, subscription, or listening limits.",
        tags: ["free", "cost", "price", "subscription", "pay"]
      },
      {
        q: "How do I install the DIVINE Progressive Web App (PWA) on iPhone or Android?",
        a: "On Safari (iOS), tap the Share icon at the bottom and select 'Add to Home Screen'. On Chrome (Android), tap the three dots in the corner and select 'Install app'. You get offline caching, instant home-screen launch, and background audio play.",
        tags: ["app", "install", "pwa", "ios", "android", "iphone", "download"]
      }
    ]
  },
  {
    category: "DJs, Broadcasters & Artists",
    icon: Headphones,
    badge: "Broadcaster Hub",
    items: [
      {
        q: "How do scheduled DJs connect to the broadcast server to go live?",
        a: "Scheduled residents log into the Artist Portal (/dj) to access their live Icecast host details: Host: orbit.citrus3.com | Port: 2020 | Mount: /divineradiolondon. You can connect using BUTT (Broadcast Using This Tool), OBS Studio, Audio Hijack, or Rekordbox / Serato live streams.",
        tags: ["dj", "icecast", "broadcast", "butt", "obs", "stream", "live", "port", "connect"]
      },
      {
        q: "What should I do if I cannot perform my scheduled live set?",
        a: "All resident selectors have automated pre-record failover. Upload your 320kbps MP3 set via the /dj portal at least 4 hours before your slot. Our automated cloud playout engine will broadcast your show seamlessly with full track metadata.",
        tags: ["upload", "pre-recorded", "auto", "missed show", "cloud", "failover"]
      },
      {
        q: "How can new DJs and selectors apply for a DIVINE residency?",
        a: "Navigate to '/join-us' or tap 'Artist VIP' on the WhatsApp launcher. Submit your 30-to-60-minute DJ mix (SoundCloud or Mixcloud URL), social handles, and your preferred music genres. Station programming reviews new demo submissions weekly.",
        tags: ["apply", "residency", "dj demo", "join us", "recruitment", "resident"]
      },
      {
        q: "Are DJ shows archived for listeners to replay?",
        a: "Yes! Every single broadcast is automatically archived on our official Mixcloud channel with over 15,000+ past sets, as well as highlighted in the 'Listen Back' section of this platform.",
        tags: ["archive", "mixcloud", "listen back", "replay", "shows"]
      }
    ]
  },
  {
    category: "Live Studio & Listener Community",
    icon: Globe,
    badge: "Community & WhatsApp",
    items: [
      {
        q: "How do I request a live shoutout on air?",
        a: `The fastest route into the studio booth is via WhatsApp: text ${STATION_INFO.studioWhatsApp} or tap the floating WhatsApp launcher on any page. Your message goes directly onto the studio display in front of the active DJ.`,
        tags: ["shoutout", "message", "whatsapp", "studio", "text", "track request"]
      },
      {
        q: "Can I request a track to be played during a set?",
        a: "Yes. Send your track name and artist over WhatsApp to the live booth. Resident selectors frequently accommodate requests that fit the flow and energy of the current set.",
        tags: ["request", "song", "track", "play"]
      },
      {
        q: "What is the DIVINE VIP WhatsApp Community?",
        a: "It is an exclusive, spam-free WhatsApp group for dedicated listeners where resident DJs drop unreleased dubplates, secret guest set times, VIP event discount codes, and live studio video clips.",
        tags: ["community", "whatsapp group", "vip", "chat", "perks"]
      }
    ]
  },
  {
    category: "Commercial, Advertising & Events",
    icon: Mic2,
    badge: "Partners & Brands",
    items: [
      {
        q: "How can businesses advertise on DIVINE DAB and digital streams?",
        a: "We reach 813,000+ targeted music fans across London and Hertfordshire. Options include prime-time 30-second DAB audio spots, live presenter endorsements, visual overlays on DIVINE:TV, and website banner takeovers. Contact management@divineradiolondon.com or select 'Client Inquiry' on WhatsApp.",
        tags: ["advertising", "commercial", "sponsor", "business", "promote", "reach", "marketing"]
      },
      {
        q: "Where can I buy official DIVINE merchandise and DJ gear?",
        a: "Check out our official '/merch' section featuring heavyweight 480gsm metallic foil hoodies, vintage acid-wash tees, Technics 1210 slipmats, and CDJ flight bags. All items ship globally from London.",
        tags: ["merch", "clothing", "hoodie", "tee", "slipmats", "store", "buy", "gear"]
      },
      {
        q: "Are DIVINE club nights and festival tickets refundable?",
        a: "Ticket purchases made through our ticketing partners (Skiddle, Resident Advisor) are subject to their respective refund policies. Event updates and lineup changes are announced via our website and official WhatsApp announcements channel.",
        tags: ["tickets", "events", "refund", "festival", "skiddle"]
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q && activeCategory === "ALL") return FAQ_SECTIONS;

    return FAQ_SECTIONS.map((section) => {
      if (activeCategory !== "ALL" && section.category !== activeCategory) {
        return { ...section, items: [] };
      }

      if (!q) return section;

      const matchingItems = section.items.filter(
        (item) =>
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );

      return {
        ...section,
        items: matchingItems,
      };
    }).filter((section) => section.items.length > 0);
  }, [searchQuery, activeCategory]);

  const totalResults = useMemo(() => {
    return filteredSections.reduce((acc, s) => acc + s.items.length, 0);
  }, [filteredSections]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* ── Page Header ───────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            <Sparkles className="w-3 h-3" />
            Comprehensive Knowledge Engine
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
            HOW CAN WE HELP?
          </h1>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Everything about DAB+ reception, studio broadcast tools, artist applications, and commercial partnerships.
          </p>

          {/* ── Predictive Search Bar ──────────────────────── */}
          <div className="mt-8 relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-brand-gold absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, e.g. DAB+, Icecast, Alexa, Shoutout, Merch..."
                className="w-full bg-white/[0.04] border border-white/15 focus:border-brand-gold rounded-2xl py-4 pl-12 pr-10 text-white placeholder-white/30 text-sm md:text-base outline-none transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] focus:ring-1 focus:ring-brand-gold/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-bold uppercase text-white/40 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Keyword Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Quick:</span>
              {["DAB+ 11C", "Icecast Port", "Alexa", "WhatsApp Shoutout", "Merch", "Advertise"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-white/5 hover:bg-brand-gold/20 text-white/60 hover:text-brand-gold transition-colors border border-white/5"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Filter Tabs ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
              activeCategory === "ALL"
                ? "bg-brand-gold text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                : "bg-white/5 text-white/60 hover:text-white border border-white/5"
            }`}
          >
            All Questions ({FAQ_SECTIONS.reduce((n, s) => n + s.items.length, 0)})
          </button>
          {FAQ_SECTIONS.map((sec) => (
            <button
              key={sec.category}
              onClick={() => setActiveCategory(sec.category)}
              className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
                activeCategory === sec.category
                  ? "bg-brand-gold text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/5"
              }`}
            >
              {sec.category}
            </button>
          ))}
        </div>

        {/* ── Results Summary ──────────────────────────────── */}
        {searchQuery && (
          <div className="mb-8 text-sm text-white/50 flex items-center justify-between">
            <span>
              Found <strong className="text-brand-gold">{totalResults}</strong> matching results for &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("ALL");
              }}
              className="text-xs text-brand-gold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Accordion Sections ───────────────────────────── */}
        {filteredSections.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center max-w-xl mx-auto my-12">
            <HelpCircle className="w-12 h-12 text-brand-gold mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-black mb-2">No matching questions found</h3>
            <p className="text-white/50 text-sm mb-6">
              Couldn&apos;t find what you need? Talk directly with our studio team on WhatsApp or submit a query.
            </p>
            <a
              href={STATION_INFO.whatsAppRoutes.studio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-black font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> Message Studio WhatsApp
            </a>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredSections.map((section, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02]"
              >
                <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                        {section.category}
                      </h2>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                        {section.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white/30 px-3 py-1 rounded-full bg-white/5">
                    {section.items.length} items
                  </span>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <details
                      key={i}
                      open={Boolean(searchQuery)}
                      className="group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-2xl p-5 transition-all"
                    >
                      <summary className="flex cursor-pointer items-center justify-between text-left font-bold text-base sm:text-lg hover:text-brand-gold transition-colors list-none">
                        <span className="pr-4">{item.q}</span>
                        <ChevronDown className="w-5 h-5 text-brand-gold shrink-0 group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <div className="mt-4 pt-4 border-t border-white/5 text-white/70 text-sm sm:text-base leading-relaxed">
                        <p>{item.a}</p>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-bold uppercase tracking-wider text-white/30 bg-white/5 px-2 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Human Escalation / Direct Contact Card ──────── */}
        <div className="mt-16 glass-panel p-8 md:p-12 rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/10 via-black to-zinc-950 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand-gold block mb-2">
              Still Need Answers?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              TALK DIRECTLY TO THE MANAGEMENT & STUDIO.
            </h3>
            <p className="text-white/60 text-sm mb-8">
              Whether you are an artist needing urgent technical streaming support or a brand looking to advertise, reach our London team instantly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={STATION_INFO.whatsAppRoutes.studio}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] text-black font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Live Studio
              </a>
              <a
                href="mailto:management@divineradiolondon.com"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest border border-white/15 transition-all inline-flex items-center gap-2"
              >
                Email Management <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
