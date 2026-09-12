"use client";

import { motion } from "framer-motion";
import { Instagram, PlaySquare } from "lucide-react"; // PlaySquare as TikTok fallback

export function SocialFeed() {
  const posts = [
    {
      id: "p1",
      platform: "instagram",
      image: "/images/dj_anton_james_1789249211645.jpg",
      caption: "Live in the studio right now! 🔥 @antonjames #DIVINE",
    },
    {
      id: "p2",
      platform: "tiktok",
      image: "/images/dj_elena_cruz_1789248949747.jpg",
      caption: "When the bass drops just right 🔊",
    },
    {
      id: "p3",
      platform: "instagram",
      image: "/images/dj_marcus_vance_1789248755674.jpg",
      caption: "Getting ready for Jungle Fever tonight.",
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-2 block">
            Studio Cam
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            SOCIAL FEED
          </h2>
        </div>
        <div className="hidden sm:flex gap-4">
          <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors">
            <Instagram className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors">
            <PlaySquare className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group cursor-pointer block relative rounded-2xl overflow-hidden aspect-square border border-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.caption}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
              {post.platform === "instagram" ? (
                <Instagram className="w-4 h-4 text-white" />
              ) : (
                <PlaySquare className="w-4 h-4 text-white" />
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <p className="text-sm font-medium line-clamp-2 text-white/90 group-hover:text-white">
                {post.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
