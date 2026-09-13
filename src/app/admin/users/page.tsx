"use client";

import { useState, useEffect } from "react";
import { getResidents, deleteResident, createResident, updateResident } from "@/app/actions/resident-actions";
import { Resident } from "@/lib/types";
import { Trash2, Plus, Edit, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminUsersPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    showName: "",
    genres: "",
    avatarUrl: "",
    bio: "",
    mixcloudUrl: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getResidents();
      setResidents(data);
      setLoading(false);
    }
    load();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", showName: "", genres: "", avatarUrl: "", bio: "", mixcloudUrl: "" });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (r: Resident) => {
    setEditingId(r.id);
    setFormData({
      name: r.name,
      showName: r.showName,
      genres: r.genres.join(", "),
      avatarUrl: r.avatarUrl,
      bio: r.bio,
      mixcloudUrl: r.mixcloudUrl || ""
    });
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const dataToSubmit = {
        name: formData.name,
        showName: formData.showName,
        genres: formData.genres.split(",").map(g => g.trim()).filter(Boolean),
        avatarUrl: formData.avatarUrl,
        bio: formData.bio,
        mixcloudUrl: formData.mixcloudUrl
      };

      if (editingId) {
        const res = await updateResident(editingId, dataToSubmit);
        if (!res.success) throw new Error(res.error || "Failed to update");
      } else {
        const res = await createResident(dataToSubmit);
        if (!res.success) throw new Error(res.error || "Failed to create");
      }
      
      // Reload the data
      const data = await getResidents();
      setResidents(data);
      closeModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this DJ?")) return;
    const res = await deleteResident(id);
    if (res.success) {
      setResidents(residents.filter(r => r.id !== id));
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
            <h1 className="text-4xl font-black tracking-tighter">DJ Roster Management</h1>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-brand-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-brand-gold-light transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New DJ
          </button>
        </div>

        {loading ? (
          <div className="text-white/50 animate-pulse">Loading roster from database...</div>
        ) : (
          <div className="glass-panel overflow-hidden border border-white/5 rounded-2xl">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-medium">DJ</th>
                  <th className="p-4 font-medium">Show Name</th>
                  <th className="p-4 font-medium hidden md:table-cell">Genres</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {residents.map((r) => (
                  <tr key={r.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full relative overflow-hidden bg-white/10 shrink-0">
                          {r.avatarUrl ? (
                            <Image src={r.avatarUrl} alt={r.name} fill className="object-cover" sizes="40px" />
                          ) : null}
                        </div>
                        <span className="font-bold">{r.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/70">{r.showName}</td>
                    <td className="p-4 text-white/50 hidden md:table-cell">{r.genres.join(", ")}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(r)}
                          className="p-2 text-white/50 hover:text-white transition-colors rounded hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(r.id)}
                          className="p-2 text-white/50 hover:text-red-500 transition-colors rounded hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {residents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-white/50">
                      No DJs found in the database.
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
          <div className="bg-zinc-950 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-black">{editingId ? "Edit DJ" : "Add New DJ"}</h2>
              <button onClick={closeModal} className="text-white/50 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm">{error}</div>}
              <form id="dj-form" onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">DJ Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="e.g. DJ Fivestack" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Show Name</label>
                  <input required value={formData.showName} onChange={e => setFormData({...formData, showName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="e.g. The Breakfast Show" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Genres (comma separated)</label>
                  <input required value={formData.genres} onChange={e => setFormData({...formData, genres: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="e.g. Jungle, Drum & Bass, UKG" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Avatar URL</label>
                  <input required value={formData.avatarUrl} onChange={e => setFormData({...formData, avatarUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="/images/djs/..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Mixcloud URL (Optional)</label>
                  <input value={formData.mixcloudUrl} onChange={e => setFormData({...formData, mixcloudUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="https://mixcloud.com/..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">Bio</label>
                  <textarea required value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none" placeholder="DJ Bio here..." />
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end gap-3 mt-auto">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded-lg font-bold text-white/60 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" form="dj-form" disabled={isSubmitting} className="px-6 py-2 rounded-lg font-bold bg-brand-gold text-black hover:bg-brand-gold-light transition-colors disabled:opacity-50">
                {isSubmitting ? "Saving..." : "Save DJ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
