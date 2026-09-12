"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function ListenBackPage() {
  const archives = [
    {
      id: "arc-1",
      title: "The Gold Standard Sessions",
      dj: "DJ Fivestack",
      date: "10 Sep 2026",
      duration: "02:00:00",
      genre: "UK Garage",
    },
    {
      id: "arc-2",
      title: "Jungle Fever",
      dj: "Marcus Vance",
      date: "09 Sep 2026",
      duration: "01:30:00",
      genre: "Jungle / D&B",
    },
    {
      id: "arc-3",
      title: "Afterhours Deep",
      dj: "Elena Cruz",
      date: "08 Sep 2026",
      duration: "02:00:00",
      genre: "Deep House",
    },
    {
      id: "arc-4",
      title: "Sunday Soul",
      dj: "Marc Anthony",
      date: "06 Sep 2026",
      duration: "03:00:00",
      genre: "Soulful House",
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-4 block">
            On Demand
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            LISTEN BACK
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-2xl">
            Missed a show? Catch up on the latest broadcasts from the DIVINE:ONE studio.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {archives.map((show, i) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 hover:border-brand-gold/30 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors shrink-0">
                  <Play className="w-5 h-5 text-white group-hover:text-black ml-1" />
                </button>
                <div>
                  <h3 className="text-lg font-bold tracking-tight mb-1">{show.title}</h3>
                  <p className="text-white/50 text-sm">
                    {show.dj} &middot; {show.genre}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
                <div className="text-left md:text-right">
                  <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                    Broadcast Date
                  </span>
                  <span className="text-sm font-medium">{show.date}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                    Duration
                  </span>
                  <span className="text-sm font-medium">{show.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
