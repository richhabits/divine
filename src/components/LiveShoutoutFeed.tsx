"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Check } from "lucide-react";

interface Shoutout {
  id: string;
  message: string;
  name: string;
  timestamp: string;
  read: boolean;
}

export function LiveShoutoutFeed() {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [loading, setLoading] = useState(true);

  // Poll for new shoutouts every 5 seconds
  useEffect(() => {
    let active = true;
    
    async function fetchShoutouts() {
      try {
        const res = await fetch("/api/shoutouts?unread=true");
        if (!res.ok) return;
        const data = await res.json();
        if (active && data.shoutouts) {
          setShoutouts(data.shoutouts);
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to fetch shoutouts", e);
      }
    }

    fetchShoutouts();
    const interval = setInterval(fetchShoutouts, 5000);
    
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const markAsRead = async (id: string) => {
    // Optimistic UI update
    setShoutouts(prev => prev.filter(s => s.id !== id));
    
    try {
      await fetch("/api/shoutouts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] })
      });
    } catch (e) {
      console.error("Failed to mark shoutout as read", e);
    }
  };

  return (
    <div className="glass-panel p-8 rounded-2xl border border-white/5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-brand-gold" />
          <h2 className="text-xl font-black">Live Studio Feed</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Receiving</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {loading ? (
          <div className="text-center py-10 text-white/30 text-sm">
            Connecting to shoutout feed...
          </div>
        ) : shoutouts.length === 0 ? (
          <div className="text-center py-10 text-white/30 text-sm italic border border-dashed border-white/10 rounded-xl">
            No unread shoutouts right now.
          </div>
        ) : (
          <AnimatePresence>
            {shoutouts.map(shout => (
              <motion.div
                key={shout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-4 relative group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-brand-gold text-sm">{shout.name}</span>
                  <span className="text-[10px] text-brand-gold/50">
                    {new Date(shout.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-white text-sm leading-relaxed">{shout.message}</p>
                
                <button
                  onClick={() => markAsRead(shout.id)}
                  className="absolute top-1/2 -translate-y-1/2 -right-3 opacity-0 group-hover:opacity-100 group-hover:-right-4 transition-all w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center hover:scale-110 shadow-lg"
                  title="Mark as Read"
                >
                  <Check className="w-4 h-4 text-black" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
