"use client";

import { motion } from "framer-motion";
import { Headphones, Play } from "lucide-react";

export default function ChillPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16 relative overflow-hidden flex flex-col items-center">
      {/* Ambient Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center mt-12 md:mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase rounded-full border border-blue-500/20 mb-8">
            <Headphones className="w-3.5 h-3.5" />
            24/7 Ambient Broadcast
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-blue-100 to-indigo-500/50 bg-clip-text text-transparent">
            DIVINE:CHILL
          </h1>
          <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            The sanctuary. Ambient, lo-fi, and soulful downtime listening. 
            Escape the noise of the city and tune into the higher frequency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="glass-panel group relative overflow-hidden rounded-full px-8 py-5 flex items-center gap-4 mx-auto border border-blue-500/30 hover:border-blue-400/60 transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-white/5">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-black transition-colors">
              <Play className="w-5 h-5 text-blue-400 group-hover:text-black ml-1 transition-colors" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-1">
                Listen Live
              </span>
              <span className="block font-bold text-lg">Tune into the Sanctuary</span>
            </div>
          </button>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
           className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {[
            { title: "Deep Focus", desc: "Minimal beats for maximum concentration.", time: "06:00 - 12:00" },
            { title: "Afternoon Haze", desc: "Lo-fi instrumentals and warm analog synths.", time: "12:00 - 18:00" },
            { title: "Midnight Ambient", desc: "Cinematic soundscapes for the late night.", time: "18:00 - 06:00" }
          ].map((slot, i) => (
             <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5">
                <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase mb-2">{slot.time}</p>
                <h3 className="font-bold text-lg mb-2">{slot.title}</h3>
                <p className="text-sm text-white/50">{slot.desc}</p>
             </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
