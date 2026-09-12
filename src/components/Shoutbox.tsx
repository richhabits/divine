"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";

export function Shoutbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, this sends to websockets/DB
    setSent(true);
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setSent(false);
        setMessage("");
      }, 500);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:scale-110 transition-transform"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/30"
          >
            <div className="bg-brand-gold text-black p-4 flex items-center justify-between">
              <h3 className="font-black tracking-widest text-[11px] uppercase">
                Studio Shoutout
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black/60 hover:text-black font-bold text-lg leading-none"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {sent ? (
                <div className="py-6 text-center text-brand-gold font-bold">
                  Shoutout sent to the studio!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <p className="text-xs text-white/50 mb-2">
                    Send a message directly to the DJ currently on air.
                  </p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your shoutout..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-brand-gold outline-none resize-none h-24"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/10 hover:bg-brand-gold hover:text-black transition-colors text-xs font-bold uppercase tracking-wider mt-2"
                  >
                    <Send className="w-4 h-4" /> Send to Studio
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
