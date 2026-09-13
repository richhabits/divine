"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, X } from "lucide-react";

export function Shoutbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/shoutouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          name: name.trim() || "Anonymous",
        }),
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("sent");
      // Close after 2s
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
          setName("");
        }, 400);
      }, 2000);
    } catch {
      setStatus("error");
      setErrorMsg("Failed to send. Please try again.");
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:shadow-[0_0_50px_rgba(201,168,76,0.6)] transition-shadow"
        aria-label="Send studio shoutout"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed bottom-24 right-6 z-50 w-80 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-brand-gold/30"
            >
              {/* Header */}
              <div className="bg-brand-gold text-black p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-black tracking-widest text-[11px] uppercase">
                    Studio Shoutout
                  </h3>
                  <p className="text-[10px] text-black/60 mt-0.5">
                    Message goes live to the DJ on air
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black/60 hover:text-black transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                {status === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-3">
                      <Send className="w-5 h-5 text-brand-gold" />
                    </div>
                    <p className="text-brand-gold font-bold text-sm">
                      Shoutout sent to the studio! 🎙️
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Name field */}
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name (optional)"
                        maxLength={50}
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white focus:border-brand-gold outline-none placeholder:text-white/30 transition-colors"
                      />
                    </div>

                    {/* Message field */}
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your shoutout message..."
                      maxLength={500}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-brand-gold outline-none resize-none h-24 placeholder:text-white/30 transition-colors"
                      required
                    />

                    {/* Character count */}
                    <div className="text-right text-[10px] text-white/20">
                      {message.length}/500
                    </div>

                    {/* Error */}
                    {status === "error" && (
                      <p className="text-red-400 text-xs text-center">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending" || !message.trim()}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-brand-gold text-black font-black text-[11px] uppercase tracking-wider hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="animate-spin w-3 h-3 border-2 border-black/30 border-t-black rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send to Studio
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
