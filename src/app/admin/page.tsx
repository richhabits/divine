"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, Settings, Users, Radio, Calendar } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPortal() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role === "DJ") {
      router.push("/dj");
    }
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white/50">Loading Admin...</div>;
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
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500 mb-2 block">
              System Administrator
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter">
              CONTROL PANEL
            </h1>
          </motion.div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            End Session
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Network Status", icon: Radio, value: "4 CHANNELS LIVE", color: "text-green-500" },
            { title: "Active DJs", icon: Users, value: "12 ONLINE", color: "text-brand-gold" },
            { title: "Schedule", icon: Calendar, value: "SYNCED", color: "text-blue-400" },
            { title: "System", icon: Settings, value: "NOMINAL", color: "text-white/60" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/5"
            >
              <stat.icon className={`w-6 h-6 mb-4 ${stat.color}`} />
              <h3 className="text-sm text-white/50 mb-1">{stat.title}</h3>
              <p className={`text-lg font-bold tracking-tight ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 glass-panel p-6 rounded-2xl border border-white/10"
        >
          <h2 className="text-xl font-bold mb-6">Global Settings Override</h2>
          <p className="text-sm text-white/50 mb-4">
            Warning: Changes here affect all clients currently connected to the DIVINE Network.
          </p>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase rounded bg-red-500 text-white hover:bg-red-600 transition-colors">
              Trigger Emergency Broadcast
            </button>
            <button className="px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase rounded bg-white/10 text-white hover:bg-white/20 transition-colors">
              Refresh Schedule Cache
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
