"use client";

import { motion } from "framer-motion";
import { DJAvatar } from "@/components/DJAvatar";
import { useState, useEffect } from "react";
import { Resident } from "@/lib/types";
import { RESIDENTS } from "@/lib/schedule-data";
import { getResidents } from "@/app/actions/resident-actions";

export default function ResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>(RESIDENTS);

  useEffect(() => {
    getResidents().then((data) => {
      if (data && data.length > 0) setResidents(data);
    });
  }, []);
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-4 block">
            The Family
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            RESIDENT DJS
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-2xl">
            The selectors defining the sound of London&apos;s premier digital broadcast.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {residents.map((dj, i) => (
            <motion.div
              key={dj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="mb-4">
                <DJAvatar name={dj.name} avatarUrl={dj.avatarUrl} size="lg" />
              </div>
              {dj.badge && (
                <span className="px-2 py-1 bg-brand-gold/10 text-brand-gold text-[8px] font-bold tracking-[0.2em] rounded-full uppercase mb-2">
                  {dj.badge}
                </span>
              )}
              <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-brand-gold transition-colors">
                {dj.name}
              </h3>
              <p className="text-white/40 text-[10px] font-bold tracking-[0.1em] uppercase mb-3">
                {dj.showName}
              </p>
              <div className="flex flex-wrap gap-1 justify-center mt-auto">
                {dj.genres.map(genre => (
                  <span key={genre} className="text-[8px] font-bold tracking-wider text-white/30 uppercase px-1.5 py-0.5 border border-white/10 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
