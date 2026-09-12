"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Music } from "lucide-react";
import { DJSlot, DayOfWeek } from "@/lib/types";
import { schedule } from "@/lib/schedule-data";
import { DJAvatar } from "./DJAvatar";

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: "MON", label: "Mon" },
  { key: "TUE", label: "Tue" },
  { key: "WED", label: "Wed" },
  { key: "THU", label: "Thu" },
  { key: "FRI", label: "Fri" },
  { key: "SAT", label: "Sat" },
  { key: "SUN", label: "Sun" },
];

function getCurrentDay(): DayOfWeek {
  const jsDay = new Date().getDay(); // 0 = Sunday
  const map: DayOfWeek[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return map[jsDay];
}

function SlotCard({ slot, index }: { slot: DJSlot; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ scale: 1.02, borderColor: "rgba(201, 168, 76, 0.4)" }}
      className="group relative bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:shadow-[0_4px_30px_rgba(201,168,76,0.06)]"
    >
      {/* Gold left accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-gold/20 group-hover:bg-brand-gold/60 transition-colors duration-300" />

      <div className="p-5 pl-6">
        <div className="flex items-start gap-4">
          <DJAvatar name={slot.dj} avatarUrl={slot.avatarUrl} size="md" />

          <div className="flex-1 min-w-0">
            {/* DJ name */}
            <h4 className="text-sm font-bold text-white truncate group-hover:text-brand-gold transition-colors">
              {slot.dj}
            </h4>
            {/* Show name */}
            <p className="text-xs text-white/40 truncate mt-0.5">
              {slot.showName}
            </p>

            {/* Time + Genre */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-white/25">
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-bold tracking-wider">
                  {slot.startTime} — {slot.endTime}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Music className="w-3 h-3 text-brand-gold/40" />
                <span className="text-[10px] font-bold tracking-wider text-brand-gold/50">
                  {slot.genre}
                </span>
              </div>
            </div>
          </div>

          {/* Channel badge */}
          <span className="text-[8px] font-black tracking-[0.15em] text-white/15 uppercase whitespace-nowrap">
            {slot.channel.replace("DIVINE:", "")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ScheduleGrid() {
  const [activeDay, setActiveDay] = useState<DayOfWeek>(getCurrentDay());

  // Update active day on mount (client-side only)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveDay(getCurrentDay());
  }, []);

  const filtered = useMemo(
    () =>
      schedule
        .filter((slot) => slot.day === activeDay)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [activeDay]
  );

  return (
    <div className="px-6 md:px-8 lg:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      {/* ── Section Header ───────────────────────────── */}
      <div className="mb-10 md:mb-14">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase text-brand-gold/60 mb-3">
          Broadcast Schedule
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          On Air This Week
        </h2>
      </div>

      {/* ── Day Selector Pills ───────────────────────── */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {DAYS.map((day) => (
          <button
            key={day.key}
            onClick={() => setActiveDay(day.key)}
            className={`px-4 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              activeDay === day.key
                ? "bg-brand-gold text-black shadow-[0_0_20px_rgba(201,168,76,0.25)]"
                : "bg-white/[0.03] text-white/30 border border-white/[0.05] hover:text-white/60 hover:border-white/10"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* ── Grid ─────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((slot, i) => (
            <SlotCard key={slot.id} slot={slot} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-white/20 text-sm tracking-wider">
            No scheduled shows for this day.
          </p>
        </div>
      )}
    </div>
  );
}
