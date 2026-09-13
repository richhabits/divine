"use client";

import { Activity, Users, Radio, Globe, BarChart2, TrendingUp, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function DJAnalyticsPage() {
  const stats = [
    { label: "Total Listeners (Last 30 Days)", val: "48,290", change: "+14.2%", icon: Users },
    { label: "Peak Concurrents", val: "3,410", change: "+8.7%", icon: Activity },
    { label: "DAB+ Coverage Area Share", val: "22.4%", change: "+3.1%", icon: Radio },
    { label: "Mixcloud Plays", val: "18,920", change: "+24.5%", icon: Globe },
  ];

  const topLocations = [
    { city: "London (Greater & Central)", pct: "58%" },
    { city: "Hertfordshire (Watford / St Albans)", pct: "24%" },
    { city: "Essex & South East", pct: "11%" },
    { city: "International Streamers (US / Ibiza)", pct: "7%" },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <Link
            href="/dj"
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-brand-gold transition-colors mb-4 block"
          >
            &larr; Back to Artist Portal
          </Link>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-2 block">
            Broadcast Telemetry
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            PERFORMANCE &amp; AUDIENCE ANALYTICS.
          </h1>
          <p className="text-white/50 text-sm">
            Real-time listener reception, DAB multiplex density, and digital archive engagement data.
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-4">
                <s.icon className="w-6 h-6 text-brand-gold" />
                <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                  {s.change}
                </span>
              </div>
              <span className="text-3xl font-black block mb-1">{s.val}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Detailed Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Geographical Audience */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-gold" /> Audience Geographic Breakdown
            </h2>
            <div className="space-y-4">
              {topLocations.map((loc, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-white/70">{loc.city}</span>
                    <span className="text-brand-gold font-mono">{loc.pct}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-gold to-[#E8D48B]"
                      style={{ width: loc.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Health & Quality */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <Radio className="w-5 h-5 text-brand-gold" /> Feed Health &amp; Bitrate
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="block text-xs font-bold text-white/80">Icecast Ingest Quality</span>
                  <span className="block text-[10px] text-white/40">320kbps MP3 / Stereo 44.1kHz</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-green-500/20 text-green-400 font-bold text-[10px] uppercase">
                  Optimal (0% Jitter)
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="block text-xs font-bold text-white/80">DAB+ Multiplex Encoding</span>
                  <span className="block text-[10px] text-white/40">Block 11C / HE-AAC v2</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-brand-gold/20 text-brand-gold font-bold text-[10px] uppercase">
                  128kbps HD
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <span className="block text-xs font-bold text-white/80">Cloud Playout Automation</span>
                  <span className="block text-[10px] text-white/40">Auto-failover ready</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase">
                  Armed &amp; Synced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
