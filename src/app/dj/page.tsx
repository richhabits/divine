"use client";

import { motion } from "framer-motion";
import { Mic2, Radio, Users, Activity, Settings, PlayCircle, Upload } from "lucide-react";
import { STATION_INFO } from "@/lib/schedule-data";
import Link from "next/link";
import { LiveShoutoutFeed } from "@/components/LiveShoutoutFeed";

export default function DJDashboard() {
  return (
    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-4 block">
              Artist Portal
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              YOUR DASHBOARD.
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.2em] text-green-400 uppercase">
                Server Online
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-8 rounded-2xl border border-brand-gold/30 bg-brand-gold/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Mic2 className="w-8 h-8 text-brand-gold mb-6" />
            <h3 className="text-xl font-black mb-2 relative z-10">Go Live</h3>
            <p className="text-white/40 text-sm mb-6 relative z-10">
              Connect your broadcast software to Icecast.
            </p>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Server:</span>
                <span className="font-mono text-brand-gold">orbit.citrus3.com</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Port:</span>
                <span className="font-mono text-brand-gold">2020</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Mount:</span>
                <span className="font-mono text-brand-gold">/divineradiolondon</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/50">Password:</span>
                <span className="font-mono text-brand-gold blur-sm hover:blur-none transition-all cursor-pointer">••••••••</span>
              </div>
            </div>
          </div>

          <Link href="/dj/upload" className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
            <Upload className="w-8 h-8 text-white/40 mb-6 group-hover:text-brand-gold transition-colors" />
            <h3 className="text-xl font-black mb-2">Upload Mix</h3>
            <p className="text-white/40 text-sm mb-6">
              Upload a pre-recorded show to the cloud. We will auto-play it during your slot if you aren't live.
            </p>
          </Link>

          <Link href="/dj/analytics" className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
            <Activity className="w-8 h-8 text-white/40 mb-6 group-hover:text-brand-gold transition-colors" />
            <h3 className="text-xl font-black mb-2">Analytics</h3>
            <p className="text-white/40 text-sm mb-6">
              View listener statistics, peak concurrents, and mixcloud engagement.
            </p>
          </Link>
        </div>

        {/* Bottom Section: Feed and Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Schedule Info */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 h-full">
            <div className="flex items-center gap-3 mb-8">
              <Radio className="w-5 h-5 text-white/50" />
              <h2 className="text-xl font-black">Upcoming Slots</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { day: "Today", time: "20:00 - 22:00", type: "Live Broadcast" },
                { day: "Next Friday", time: "18:00 - 20:00", type: "Pre-recorded (Auto)" }
              ].map((slot, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <span className="block text-sm font-bold text-brand-gold mb-1">{slot.day}</span>
                    <span className="block text-xs text-white/50">{slot.time}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[9px] font-bold tracking-[0.2em] uppercase text-white/70">
                    {slot.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Shoutout Feed */}
          <div className="h-[400px] md:h-auto">
            <LiveShoutoutFeed />
          </div>
        </div>

      </div>
    </div>
  );
}
