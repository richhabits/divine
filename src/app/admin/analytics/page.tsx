"use client";

import { useState } from "react";
import { BarChart3, Users, Radio, Globe, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Headphones } from "lucide-react";
import Link from "next/link";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const kpis = [
    { label: "Total Unique Listeners", value: "18,420", change: "+14.2%", trend: "up", icon: Radio },
    { label: "Active Monthly Listeners", value: "12,140", change: "+8.1%", trend: "up", icon: Users },
    { label: "Average Session Duration", value: "1h 14m", change: "+12.4%", trend: "up", icon: Headphones },
    { label: "Mixcloud Re-listens", value: "4,850", change: "+22.5%", trend: "up", icon: DollarSign },
  ];

  const channelsPerformance = [
    { channel: "DIVINE:ONE (Flagship DAB)", share: "46%", peak: "850 concurrent", bitRate: "128kbps HD" },
    { channel: "DIVINE:SUB (Bass / Jungle)", share: "28%", peak: "420 concurrent", bitRate: "192kbps" },
    { channel: "DIVINE:CHILL (Balearic / Deep)", share: "16%", peak: "210 concurrent", bitRate: "192kbps" },
    { channel: "DIVINE:TV (Live Studio Video)", share: "10%", peak: "120 concurrent", bitRate: "1080p60" },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <Link href="/admin" className="text-white/40 hover:text-white mb-2 block text-sm">
              &larr; Back to Command Center
            </Link>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500 mb-2 flex items-center gap-2">
              Audience &amp; Revenue Intelligence
              <span className="bg-white/10 px-2 py-0.5 rounded text-white/50 tracking-normal normal-case">Mock Data</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              STATION ANALYTICS.
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            {["24h", "7d", "30d", "90d"].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                  timeRange === r ? "bg-brand-gold text-black shadow-md" : "text-white/40 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-4">
                <kpi.icon className="w-6 h-6 text-brand-gold" />
                <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded flex items-center gap-1 border border-green-500/20">
                  <ArrowUpRight className="w-3 h-3" /> {kpi.change}
                </span>
              </div>
              <span className="text-3xl font-black block mb-1">{kpi.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Channel Share & Streaming Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-black mb-6">Channel Audience Distribution</h3>
            <div className="space-y-5">
              {channelsPerformance.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-white/80">{c.channel}</span>
                    <span className="text-brand-gold font-mono">{c.share}</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-gradient-to-r from-brand-gold to-[#E8D48B]"
                      style={{ width: c.share }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/40 font-mono">
                    <span>{c.peak}</span>
                    <span>{c.bitRate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10">
            <h3 className="text-xl font-black mb-6">Platform Distribution</h3>
            <div className="space-y-4">
              {[
                { platform: "DAB+ Digital Radio (Block 11C)", pct: "42%" },
                { platform: "iOS & Android Mobile Apps", pct: "31%" },
                { platform: "Web Browsers & Progressive Web App", pct: "18%" },
                { platform: "Smart Speakers (Alexa & TuneIn)", pct: "9%" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-bold text-white/80">{p.platform}</span>
                  <span className="text-sm font-black text-brand-gold font-mono">{p.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
