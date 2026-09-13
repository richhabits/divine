"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Users, Megaphone, Mic2, Star } from "lucide-react";
import { STATION_INFO } from "@/lib/schedule-data";

export function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const ACTIONS = [
    {
      id: "studio",
      label: "Text Live Studio",
      desc: "Shoutouts & Requests",
      icon: Mic2,
      href: STATION_INFO.whatsAppRoutes?.studio || STATION_INFO.whatsAppLink,
      color: "text-white",
      bg: "bg-green-500",
    },
    {
      id: "community",
      label: "Join Community",
      desc: "Listener WhatsApp Group",
      icon: Users,
      href: STATION_INFO.whatsAppRoutes?.community || STATION_INFO.whatsAppLink,
      color: "text-white",
      bg: "bg-blue-500",
    },
    {
      id: "channel",
      label: "Announcements",
      desc: "Official Broadcast Channel",
      icon: Megaphone,
      href: STATION_INFO.whatsAppRoutes?.channel || STATION_INFO.whatsAppLink,
      color: "text-black",
      bg: "bg-brand-gold",
    },
    {
      id: "artist",
      label: "Artist Support",
      desc: "DJ / VIP Inquiries",
      icon: Star,
      href: STATION_INFO.whatsAppRoutes?.artist || STATION_INFO.whatsAppLink,
      color: "text-white",
      bg: "bg-zinc-800",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-4">
      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex flex-col gap-3 pb-2"
          >
            {ACTIONS.map((action, i) => (
              <motion.a
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-3 bg-black/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl group pr-6"
              >
                <div className={`w-10 h-10 rounded-full ${action.bg} ${action.color} flex items-center justify-center shrink-0`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-brand-gold transition-colors">
                    {action.label}
                  </h4>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider font-bold">
                    {action.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
