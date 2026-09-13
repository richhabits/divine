"use client";

import { useState, useEffect } from "react";
import { getScheduleSlots, deleteScheduleSlot } from "@/app/actions/schedule-actions";
import { Trash2, Plus, Calendar } from "lucide-react";
import Link from "next/link";

export default function AdminSchedulePage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getScheduleSlots();
      setSlots(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this schedule slot?")) return;
    await deleteScheduleSlot(id);
    setSlots(slots.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-white/40 hover:text-white mb-2 block text-sm">
              &larr; Back to Command Center
            </Link>
            <h1 className="text-4xl font-black tracking-tighter">Timetable Management</h1>
          </div>
          <button className="flex items-center gap-2 bg-brand-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-brand-gold-light transition-colors">
            <Plus className="w-4 h-4" /> Add Slot
          </button>
        </div>

        {loading ? (
          <div className="text-white/50 animate-pulse">Loading schedule from database...</div>
        ) : (
          <div className="glass-panel overflow-hidden border border-white/5 rounded-2xl">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-medium">Day & Time</th>
                  <th className="p-4 font-medium">DJ / Show</th>
                  <th className="p-4 font-medium hidden md:table-cell">Channel</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {slots.map((s) => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-gold" />
                        <span className="font-bold text-brand-gold">{s.day}</span>
                        <span className="text-white/50 ml-2">{s.startTime} - {s.endTime}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold">{s.dj}</div>
                      <div className="text-xs text-white/50">{s.showName}</div>
                    </td>
                    <td className="p-4 text-white/70 hidden md:table-cell">
                      {s.channel}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(s.id)}
                        className="p-2 text-white/50 hover:text-red-500 transition-colors rounded hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {slots.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-white/50">
                      No schedule slots found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
