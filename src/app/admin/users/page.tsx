"use client";

import { useState, useEffect } from "react";
import { getResidents, deleteResident } from "@/app/actions/resident-actions";
import { Resident } from "@/lib/types";
import { Trash2, Plus, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminUsersPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getResidents();
      setResidents(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this DJ?")) return;
    await deleteResident(id);
    setResidents(residents.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-white/40 hover:text-white mb-2 block text-sm">
              &larr; Back to Command Center
            </Link>
            <h1 className="text-4xl font-black tracking-tighter">DJ Roster Management</h1>
          </div>
          <button className="flex items-center gap-2 bg-brand-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-brand-gold-light transition-colors">
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
                        <button className="p-2 text-white/50 hover:text-white transition-colors rounded hover:bg-white/10">
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
    </div>
  );
}
