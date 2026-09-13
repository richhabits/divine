"use client";

import { Users, Calendar, Settings, ShieldAlert, BarChart3, Radio } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500 mb-4 block flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Command Center
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              SYSTEM ADMIN.
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.2em] text-green-400 uppercase">
                All Systems Operational
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/admin/schedule" className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group relative overflow-hidden">
            <Calendar className="w-8 h-8 text-white/40 mb-6 group-hover:text-red-500 transition-colors relative z-10" />
            <h3 className="text-xl font-black mb-2 relative z-10">Schedule Editor</h3>
            <p className="text-white/40 text-sm relative z-10">
              Manage the 24/7 timetable. Assign DJs to slots and manage auto-play archives.
            </p>
          </Link>

          <Link href="/admin/users" className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group relative overflow-hidden">
            <Users className="w-8 h-8 text-white/40 mb-6 group-hover:text-red-500 transition-colors relative z-10" />
            <h3 className="text-xl font-black mb-2 relative z-10">User Management</h3>
            <p className="text-white/40 text-sm relative z-10">
              Approve DJ applications, manage permissions, and handle listener accounts.
            </p>
          </Link>

          <Link href="/admin/analytics" className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group relative overflow-hidden">
            <BarChart3 className="w-8 h-8 text-white/40 mb-6 group-hover:text-red-500 transition-colors relative z-10" />
            <h3 className="text-xl font-black mb-2 relative z-10">Global Analytics</h3>
            <p className="text-white/40 text-sm relative z-10">
              View total stream connections, ad impressions, and engagement metrics.
            </p>
          </Link>
        </div>

        {/* Server Status Widget */}
        <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-zinc-950/50">
          <div className="flex items-center gap-3 mb-8">
            <Radio className="w-5 h-5 text-white/50" />
            <h2 className="text-xl font-black">Icecast Stream Status</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-xs text-white/50 mb-1">Current Listeners</span>
              <span className="text-2xl font-black">1,402</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-xs text-white/50 mb-1">Peak Today</span>
              <span className="text-2xl font-black">3,891</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-xs text-white/50 mb-1">Mount Point</span>
              <span className="text-lg font-bold text-brand-gold truncate">/divineradiolondon</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-xs text-white/50 mb-1">Source DJ</span>
              <span className="text-lg font-bold text-green-400 truncate">DJ Fivestack</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
