"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, CreditCard } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  price: string;
  status: string;
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const events: Event[] = [
    {
      id: "ev-1",
      title: "DIVINE Summer Boat Party",
      date: "August 15, 2026",
      venue: "Thames River Cruiser",
      price: "£25.00",
      status: "SELLING FAST",
    },
    {
      id: "ev-2",
      title: "Warehouse Sessions: Volume I",
      date: "September 02, 2026",
      venue: "Printworks, London",
      price: "£35.00",
      status: "AVAILABLE",
    },
    {
      id: "ev-3",
      title: "Deep House Rooftop",
      date: "September 24, 2026",
      venue: "Skylight Peckham",
      price: "£20.00",
      status: "SOLD OUT",
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
            Live Experiences
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            UPCOMING EVENTS
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-2xl">
            Join the DIVINE family across London&apos;s best venues. Warehouse raves, boat parties, and intimate club nights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-brand-gold tracking-[0.2em] uppercase">
                  {ev.date}
                </span>
                <span className={`text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded-full ${
                  ev.status === "SOLD OUT" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
                }`}>
                  {ev.status}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-brand-gold transition-colors">
                {ev.title}
              </h3>
              <p className="text-white/40 text-sm mb-6 flex-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {ev.venue}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="font-bold text-lg">{ev.price}</span>
                <button
                  onClick={() => setSelectedEvent(ev)}
                  disabled={ev.status === "SOLD OUT"}
                  className="px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded bg-white text-black hover:bg-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tickets
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ticket Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md glass-panel border border-brand-gold/30 rounded-2xl shadow-[0_0_50px_rgba(201,168,76,0.15)] overflow-hidden"
            >
              <div className="bg-brand-gold p-4 flex justify-between items-center text-black">
                <h3 className="font-black tracking-[0.2em] uppercase text-xs">Secure Your Spot</h3>
                <button onClick={() => setSelectedEvent(null)} className="hover:opacity-70 transition-opacity">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
                <div className="flex flex-col gap-3 mb-8 text-white/70 text-sm">
                   <div className="flex items-center gap-3">
                     <Calendar className="w-4 h-4 text-brand-gold" />
                     {selectedEvent.date}
                   </div>
                   <div className="flex items-center gap-3">
                     <MapPin className="w-4 h-4 text-brand-gold" />
                     {selectedEvent.venue}
                   </div>
                </div>
                
                <div className="border-t border-white/10 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/50 text-sm">General Admission</span>
                    <span className="font-bold">{selectedEvent.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-white/30">
                    <span>Booking Fee</span>
                    <span>£2.50</span>
                  </div>
                </div>
                
                <button className="w-full py-4 rounded-xl bg-white text-black font-black tracking-widest uppercase text-[11px] flex items-center justify-center gap-3 hover:bg-brand-gold transition-colors">
                  <CreditCard className="w-4 h-4" />
                  Proceed to Checkout
                </button>
                <p className="text-center text-[10px] text-white/30 mt-4">
                  Payments are secured by Stripe. All sales are final.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
