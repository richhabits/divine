"use client";

import { motion } from "framer-motion";

export default function SubPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-4 block">
          Coming Soon
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          DIVINE:SUB
        </h1>
        <p className="text-white/50 text-base md:text-lg">
          The underground sound of London. Deep house, minimal tech, and raw garage cuts.
          Broadcasts launching shortly.
        </p>
      </motion.div>
    </div>
  );
}
