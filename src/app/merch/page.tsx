"use client";

import { motion } from "framer-motion";

export default function MerchPage() {
  const products = [
    {
      id: "m-1",
      name: "DIVINE Premium Hoodie",
      price: "£65.00",
      category: "HOODIES",
      tag: "NEW",
    },
    {
      id: "m-2",
      name: "Classic Script Tee",
      price: "£30.00",
      category: "TEES",
    },
    {
      id: "m-3",
      name: "London Coordinates Cap",
      price: "£25.00",
      category: "ACCESSORIES",
      tag: "SOLD OUT",
    },
  ];

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
            Official Store
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            MERCHANDISE
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-2xl">
            Premium heavyweight apparel designed in London. Represent the Higher State of Audio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-zinc-900 rounded-2xl mb-4 relative overflow-hidden border border-white/5 group-hover:border-brand-gold/30 transition-colors flex items-center justify-center">
                {item.tag && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-brand-gold text-black text-[9px] font-bold tracking-[0.2em] rounded-full uppercase">
                    {item.tag}
                  </div>
                )}
                {/* Placeholder for merch image */}
                <div className="text-white/10 font-bold tracking-widest text-2xl uppercase rotate-[-45deg] select-none">
                  DIVINE
                </div>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1 block">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold mb-1 tracking-tight">{item.name}</h3>
                <p className="text-brand-gold font-bold">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
