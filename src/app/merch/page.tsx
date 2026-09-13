"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CreditCard } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  tag?: string;
  sizes?: string[];
  imageUrl?: string;
}

export default function MerchPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("L");

  const products: Product[] = [
    {
      id: "m-1",
      name: "DIVINE Premium Hoodie",
      price: "£65.00",
      category: "HOODIES",
      tag: "BESTSELLER",
      sizes: ["S", "M", "L", "XL", "XXL"],
      imageUrl: "/images/merch_hoodie.jpg",
    },
    {
      id: "m-2",
      name: "DIVINE Record Flight Bag",
      price: "£125.00",
      category: "DJ GEAR",
      tag: "NEW",
      imageUrl: "/images/merch_record_bag.jpg",
    },
    {
      id: "m-3",
      name: "Premium Headphone Hardcase",
      price: "£45.00",
      category: "DJ GEAR",
      imageUrl: "/images/merch_headphone_case.jpg",
    },
    {
      id: "m-4",
      name: "Classic Script Tee",
      price: "£35.00",
      category: "TEES",
      sizes: ["S", "M", "L", "XL"],
      imageUrl: "/images/merch_tshirt.jpg",
    },
    {
      id: "m-5",
      name: "London Coordinates Snapback",
      price: "£30.00",
      category: "ACCESSORIES",
      tag: "SOLD OUT",
      imageUrl: "/images/merch_hat.jpg",
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
              className={`group ${item.tag === 'SOLD OUT' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => item.tag !== 'SOLD OUT' && setSelectedProduct(item)}
            >
              <div className="aspect-[4/5] bg-zinc-900 rounded-2xl mb-4 relative overflow-hidden border border-white/5 group-hover:border-brand-gold/30 transition-colors flex items-center justify-center">
                {item.tag && (
                  <div className={`absolute top-4 right-4 z-10 px-3 py-1 text-[9px] font-bold tracking-[0.2em] rounded-full uppercase ${
                    item.tag === 'SOLD OUT' ? 'bg-red-500/20 text-red-500' : 'bg-brand-gold text-black'
                  }`}>
                    {item.tag}
                  </div>
                )}
                {/* Product Image */}
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className="text-white/10 font-bold tracking-widest text-2xl uppercase rotate-[-45deg] select-none">
                    DIVINE
                  </div>
                )}
              </div>
              <div className="px-2 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold mb-1 tracking-tight">{item.name}</h3>
                  <p className="text-brand-gold font-bold">{item.price}</p>
                </div>
                {item.tag !== 'SOLD OUT' && (
                  <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-black transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Merch Checkout Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg glass-panel border border-brand-gold/30 rounded-2xl shadow-[0_0_50px_rgba(201,168,76,0.15)] overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 bg-zinc-900 flex items-center justify-center p-0 aspect-square md:aspect-auto overflow-hidden relative">
                {selectedProduct.imageUrl ? (
                  <Image src={selectedProduct.imageUrl} alt={selectedProduct.name} fill sizes="250px" className="object-cover" loading="lazy" />
                ) : (
                  <div className="text-white/10 font-bold tracking-widest text-2xl uppercase rotate-[-45deg] select-none">
                    DIVINE
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-brand-gold uppercase block">
                    {selectedProduct.category}
                  </span>
                  <button onClick={() => setSelectedProduct(null)} className="hover:opacity-70 transition-opacity">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="font-bold text-lg mb-6">{selectedProduct.price}</p>
                
                {selectedProduct.sizes && (
                  <div className="mb-8">
                    <span className="text-xs text-white/50 mb-3 block">Select Size:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(size => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-lg border text-sm font-bold transition-colors ${
                            selectedSize === size 
                              ? "bg-brand-gold border-brand-gold text-black" 
                              : "bg-white/5 border-white/10 text-white hover:border-brand-gold/50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <button className="w-full py-4 rounded-xl bg-white text-black font-black tracking-widest uppercase text-[11px] flex items-center justify-center gap-3 hover:bg-brand-gold transition-colors mt-auto">
                  <CreditCard className="w-4 h-4" />
                  Buy Now via Stripe
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
