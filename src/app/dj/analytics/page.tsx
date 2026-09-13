"use client";

import { motion } from "framer-motion";
import { Activity, Users, Headphones, Calendar, TrendingUp, Globe, BarChart2, Clock } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MOCK_DATA = [
  { time: "20:00", listeners: 1200 },
  { time: "20:15", listeners: 2300 },
  { time: "20:30", listeners: 3800 },
  { time: "20:45", listeners: 4100 },
  { time: "21:00", listeners: 4500 },
  { time: "21:15", listeners: 4900 },
  { time: "21:30", listeners: 5200 },
  { time: "21:45", listeners: 5800 },
  { time: "22:00", listeners: 6100 },
];

export default function DJAnalyticsPage() {
  const stats = [
    { label: "Peak Listeners", value: "6,100", icon: Users, trend: "+12%" },
    { label: "Total Stream Time", value: "128 hrs", icon: Headphones, trend: "+5%" },
    { label: "Engagement Score", value: "94/100", icon: Activity, trend: "+2%" },
    { label: "Shows Broadcast", value: "42", icon: Calendar, trend: "" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <Link
            href="/dj"
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-brand-gold transition-colors mb-4 block"
          >
            &larr; Back to Artist Portal
          </Link>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-2 block">
            Audience Insights
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            YOUR ANALYTICS.
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Real-time listener metrics, peak concurrents, and show statistics across DAB and Web.
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/5"
            >
              <div className="flex justify-between items-start mb-4">
                <stat.icon className="w-5 h-5 text-brand-gold" />
                {stat.trend && (
                  <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-black tracking-tighter">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-8 rounded-2xl border border-white/5"
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-brand-gold" />
            <h2 className="text-xl font-black">Audience Retention (Last Show)</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} tickMargin={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} tickFormatter={(val) => `${val / 1000}k`} tickMargin={10} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(201,168,76,0.3)', borderRadius: '12px', color: '#fff' }} itemStyle={{ color: '#C9A84C' }} />
                <Line type="monotone" dataKey="listeners" stroke="#C9A84C" strokeWidth={3} dot={{ fill: '#000', stroke: '#C9A84C', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#C9A84C' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
