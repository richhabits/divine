"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { Resident } from "@/lib/types";
import { useState, useEffect } from "react";
import { getResidents } from "@/app/actions/resident-actions";

export function DJMarquee() {
  const [residents, setResidents] = useState<Resident[]>([]);

  useEffect(() => {
    getResidents().then(setResidents);
  }, []);

  if (residents.length === 0) return null;

  // Duplicate residents to ensure seamless infinite scrolling
  const marqueeItems = [...residents, ...residents];
  return (
    <div className="relative w-full overflow-hidden py-12 bg-zinc-950/50 border-y border-white/5 flex flex-col gap-6">
      {/* Top Row - Scrolling Left */}
      <div className="flex w-[200%] gap-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex flex-1 gap-4 shrink-0"
        >
          {marqueeItems.slice(0, Math.floor(marqueeItems.length / 2)).map((dj, i) => (
            <DJCard key={`${dj.id}-top-${i}`} dj={dj} />
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex flex-1 gap-4 shrink-0"
        >
          {marqueeItems.slice(0, Math.floor(marqueeItems.length / 2)).map((dj, i) => (
            <DJCard key={`${dj.id}-top-dup-${i}`} dj={dj} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Row - Scrolling Right */}
      <div className="flex w-[200%] gap-4" style={{ transform: "translateX(-50%)" }}>
        <motion.div
          animate={{ x: ["0%", "50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex flex-1 gap-4 shrink-0"
        >
          {marqueeItems.slice(Math.floor(marqueeItems.length / 2)).map((dj, i) => (
            <DJCard key={`${dj.id}-bot-${i}`} dj={dj} />
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["0%", "50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex flex-1 gap-4 shrink-0"
        >
          {marqueeItems.slice(Math.floor(marqueeItems.length / 2)).map((dj, i) => (
            <DJCard key={`${dj.id}-bot-dup-${i}`} dj={dj} />
          ))}
        </motion.div>
      </div>

      {/* Fade Overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}

function DJCard({ dj }: { dj: Resident }) {
  return (
    <div className="group relative w-64 h-80 rounded-2xl overflow-hidden shrink-0 cursor-pointer">
      <Image
        src={dj.avatarUrl}
        alt={dj.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-50"
        sizes="(max-width: 768px) 256px, 256px"
      />
      
      {/* Content overlay on hover */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center mb-4">
            <Play className="w-4 h-4 text-black ml-1" />
          </div>
          <h3 className="text-xl font-black text-white mb-1 leading-none">{dj.name}</h3>
          <p className="text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            {dj.showName}
          </p>
          <div className="flex flex-wrap gap-1">
            {dj.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[8px] font-bold tracking-[0.1em] text-white uppercase">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Default bottom gradient and name */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-lg font-black text-white leading-none">{dj.name}</h3>
      </div>
    </div>
  );
}
