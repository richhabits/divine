"use client";

import { motion } from "framer-motion";
import { Disc, Play } from "lucide-react";

export default function SubPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16 relative overflow-hidden flex flex-col items-center">
      {/* Heavy Underground Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-red-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-brand-gold/10 rounded-full blur-[200px] mix-blend-screen pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center mt-12 md:mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase rounded-full border border-red-500/20 mb-8">
            <Disc className="w-3.5 h-3.5" />
            The Underground Network
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-red-200 to-red-600/80 bg-clip-text text-transparent">
            DIVINE:SUB
          </h1>
          <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            The raw, unfiltered sound of London. Deep house, minimal tech, and underground garage cuts. 
            No commercial breaks. Just the bassline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="glass-panel group relative overflow-hidden rounded-full px-8 py-5 flex items-center gap-4 mx-auto border border-red-500/30 hover:border-red-500/60 transition-all hover:shadow-[0_0_40px_rgba(239,68,68,0.3)] bg-white/5">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500 group-hover:text-black transition-colors">
              <Play className="w-5 h-5 text-red-500 group-hover:text-black ml-1 transition-colors" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-red-500 mb-1">
                Listen Live
              </span>
              <span className="block font-bold text-lg">Enter the Underground</span>
            </div>
          </button>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
           className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto"
        >
          {[
            { title: "Minimal Mondays", desc: "Stripped back tech and minimal house grooves.", time: "MON 20:00" },
            { title: "The Bassline Syndicate", desc: "Heavy UKG and bass-driven tracks.", time: "THU 22:00" },
            { title: "Techno Sessions", desc: "Peak time warehouse techno mixes.", time: "FRI 23:00" },
            { title: "Sunday Deep", desc: "Soulful, deep, and raw house records.", time: "SUN 18:00" }
          ].map((slot, i) => (
             <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-red-500/20 transition-colors">
                <p className="text-[10px] text-red-500 font-bold tracking-[0.2em] uppercase mb-2">{slot.time}</p>
                <h3 className="font-bold text-lg mb-2">{slot.title}</h3>
                <p className="text-sm text-white/50">{slot.desc}</p>
             </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
