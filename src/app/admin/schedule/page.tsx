"use client";

import { useState, useEffect } from "react";
import { getScheduleSlots, deleteScheduleSlot, createScheduleSlot, updateScheduleSlot } from "@/app/actions/schedule-actions";
import { getResidents } from "@/app/actions/resident-actions";
import { Trash2, Plus, Calendar, Edit, X } from "lucide-react";
import Link from "next/link";
import { Resident } from "@/lib/types";

export default function AdminSchedulePage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    day: "Monday",
    slot: "20:00 - 22:00",
    channel: "DIVINE:ONE",
    residentId: "",
    isLive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const [slotData, resData] = await Promise.all([getScheduleSlots(), getResidents()]);
      setSlots(slotData);
      setResidents(resData);
      
      if (resData.length > 0) {
        setFormData(prev => ({ ...prev, residentId: resData[0].id }));
      }
      setLoading(false);
    }
    load();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      day: "Monday",
      slot: "20:00 - 22:00",
      channel: "DIVINE:ONE",
      residentId: residents.length > 0 ? residents[0].id : "",
      isLive: true
    });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (s: any) => {
    setEditingId(s.id);
    // Find residentId by matching DJ name because the slot data returns the name.
    // In a full relational fetch, slot might have residentId, but here we can map it back.
    const resident = residents.find(r => r.name === s.dj);
    
    setFormData({
      day: s.day,
      slot: `${s.startTime} - ${s.endTime}`,
      channel: s.channel,
      residentId: resident ? resident.id : (residents.length > 0 ? residents[0].id : ""),
      isLive: s.isLive ?? true
    });
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.residentId) {
      setError("Please select a DJ");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      if (editingId) {
        const res = await updateScheduleSlot(editingId, formData);
        if (!res.success) throw new Error(res.error || "Failed to update");
      } else {
        const res = await createScheduleSlot(formData);
        if (!res.success) throw new Error(res.error || "Failed to create");
      }
      
      // Reload the data
      const data = await getScheduleSlots();
      setSlots(data);
      closeModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this schedule slot?")) return;
    const res = await deleteScheduleSlot(id);
    if (res.success) {
      setSlots(slots.filter(s => s.id !== id));
    } else {
      alert(res.error || "Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-24 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-white/40 hover:text-white mb-2 block text-sm">
              &larr; Back to Command Center
            </Link>
            <h1 className="text-4xl font-black tracking-tighter">Timetable Management</h1>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-brand-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-brand-gold-light transition-colors"
          >
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
                      <div className="font-bold flex items-center gap-2">
                        {s.dj}
                        {!s.isLive && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 uppercase">Auto</span>}
                      </div>
                      <div className="text-xs text-white/50">{s.showName}</div>
                    </td>
                    <td className="p-4 text-white/70 hidden md:table-cell">
                      {s.channel}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(s)}
                          className="p-2 text-white/50 hover:text-white transition-colors rounded hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(s.id)}
                          className="p-2 text-white/50 hover:text-red-500 transition-colors rounded hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-black">{editingId ? "Edit Slot" : "Add New Slot"}</h2>
              <button onClick={closeModal} className="text-white/50 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm">{error}</div>}
              <form id="slot-form" onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Day</label>
                  <select value={formData.day} onChange={e => setFormData({...formData, day: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                      <option key={d} value={d} className="bg-black text-white">{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Time Slot</label>
                  <input required value={formData.slot} onChange={e => setFormData({...formData, slot: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="e.g. 20:00 - 22:00" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Channel</label>
                  <select value={formData.channel} onChange={e => setFormData({...formData, channel: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                    {["DIVINE:ONE", "DIVINE:SUB", "DIVINE:CHILL", "DIVINE:TV"].map(c => (
                      <option key={c} value={c} className="bg-black text-white">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Assign DJ</label>
                  <select value={formData.residentId} onChange={e => setFormData({...formData, residentId: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                    <option value="" disabled className="bg-black text-white/50">Select a DJ...</option>
                    {residents.map(r => (
                      <option key={r.id} value={r.id} className="bg-black text-white">{r.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <input 
                    type="checkbox" 
                    id="isLive" 
                    checked={formData.isLive} 
                    onChange={e => setFormData({...formData, isLive: e.target.checked})}
                    className="w-4 h-4 accent-brand-gold"
                  />
                  <label htmlFor="isLive" className="text-sm font-bold text-white/80 cursor-pointer">Live Broadcast</label>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded-lg font-bold text-white/60 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" form="slot-form" disabled={isSubmitting} className="px-6 py-2 rounded-lg font-bold bg-brand-gold text-black hover:bg-brand-gold-light transition-colors disabled:opacity-50">
                {isSubmitting ? "Saving..." : "Save Slot"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
