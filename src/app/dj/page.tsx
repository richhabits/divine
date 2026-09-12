"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, Music, Radio } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DJPortal() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role === "ADMIN") {
      router.push("/admin");
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white/50">Loading Portal...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-2 block">
              Creator Studio
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
              WELCOME, {session.user.name?.toUpperCase()}
            </h1>
          </motion.div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold transition-colors border border-white/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stream Status Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-brand-gold/30 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <Radio className="text-brand-gold w-6 h-6" />
              <h2 className="text-xl font-bold">Studio Feed</h2>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm font-bold text-white/70">You are currently OFFLINE</p>
            </div>
            
            <button className="mt-auto w-full py-4 text-[11px] font-black tracking-[0.3em] uppercase rounded bg-white/10 text-white/50 border border-white/20 cursor-not-allowed">
              Go Live (Disabled in Mockup)
            </button>
          </motion.div>

          {/* Tracklist Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 col-span-1 md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <Music className="text-white/60 w-6 h-6" />
              <h2 className="text-xl font-bold">Live Tracklist</h2>
            </div>
            
            <p className="text-sm text-white/50 mb-4">
              Update the tracklist below to sync metadata to the global stream and DIVINE player.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Artist Name" className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-brand-gold/50 outline-none" />
                <input type="text" placeholder="Track Title" className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-brand-gold/50 outline-none" />
              </div>
              <button className="px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase rounded bg-brand-gold text-black self-end hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">
                Push Metadata
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
