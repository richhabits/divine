"use client";

import { motion } from "framer-motion";

export default function TVPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black tracking-[0.2em] rounded-full border border-red-500/20 flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-red-500"
                style={{ animation: "pulse-live 2s infinite" }}
              />
              LIVE BROADCAST
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
              DIVINE:TV
            </h1>
          </div>
          <p className="text-white/50 text-sm md:text-base max-w-2xl">
            Live studio feeds, exclusive DJ sets, and visual broadcasts from the Higher State of Audio.
          </p>
        </motion.div>

        {/* Video Player Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl relative bg-zinc-900"
        >
          {/* YouTube Embed Placeholder */}
          <iframe
            className="w-full h-full absolute inset-0"
            src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&loop=1&playlist=5qap5aO4i9A"
            title="DIVINE:TV Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </motion.div>

        {/* Up Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-xl font-bold mb-6 tracking-tight text-white/80">
            UP NEXT ON DIVINE:TV
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { time: "20:00", title: "The Gold Standard Sessions", dj: "DJ Fivestack" },
              { time: "22:00", title: "Jungle Fever", dj: "Marcus Vance" },
              { time: "00:00", title: "Afterhours Deep", dj: "Elena Cruz" }
            ].map((show, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors">
                <p className="text-brand-gold font-bold text-sm mb-2">{show.time}</p>
                <h3 className="text-lg font-bold mb-1">{show.title}</h3>
                <p className="text-white/50 text-sm">{show.dj}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
