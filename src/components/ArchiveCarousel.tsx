"use client";

import { motion } from "framer-motion";
import { Play, Heart, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArchiveShow } from "@/lib/types";
import { getArchiveShows } from "@/app/actions/archive-actions";

export function ArchiveCarousel() {
  const [archives, setArchives] = useState<ArchiveShow[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    getArchiveShows().then(setArchives);
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full overflow-x-auto pb-8 pt-4 hide-scrollbar snap-x snap-mandatory">
      <div className="flex gap-4 px-6 md:px-12 w-max">
        {archives.map((archive, i) => (
          <motion.div
            key={archive.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="snap-center shrink-0 w-[280px] group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 mb-4 border border-white/5 group-hover:border-brand-gold/30 transition-colors">
              <Image
                src={archive.avatarUrl}
                alt={archive.dj}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                sizes="(max-width: 768px) 280px, 280px"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              {/* Top Bar: Genre & Favorite */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <div className="flex gap-1 flex-wrap max-w-[70%]">
                  <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-full text-[8px] font-bold tracking-[0.1em] text-white uppercase border border-white/10">
                    {archive.genre.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={(e) => toggleFavorite(archive.id, e)}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${favorites.has(archive.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                </button>
              </div>

              {/* Play Button - appears on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                  <Play className="w-6 h-6 text-black ml-1" />
                </div>
              </div>

              {/* Bottom Info inside image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-bold text-white/80">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {archive.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {archive.duration}
                </div>
              </div>
            </div>

            {/* Metadata below image */}
            <div>
              <h3 className="font-bold text-base tracking-tight leading-tight mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">
                {archive.title}
              </h3>
              <p className="text-white/40 text-xs font-medium">
                with <span className="text-white/80">{archive.dj}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
