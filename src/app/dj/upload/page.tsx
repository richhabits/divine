"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Music, Clock, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function DJUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [showName, setShowName] = useState("");
  const [scheduledSlot, setScheduledSlot] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !showName) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dj"
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-brand-gold transition-colors mb-4 block"
          >
            &larr; Back to Artist Portal
          </Link>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-2 block">
            Cloud Playout Auto-Failover
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            UPLOAD PRE-RECORDED SET.
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Upload your broadcast-ready MP3 (320kbps recommended). If you are unable to connect live during your scheduled slot, the playout system will automatically broadcast this file without silence or downtime.
          </p>
        </div>

        {success ? (
          <div className="glass-panel p-10 rounded-3xl border border-brand-gold/40 text-center bg-brand-gold/5">
            <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-2">Show Queued Successfully!</h2>
            <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
              Your audio file has been verified and synced with the automation schedule.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  setFile(null);
                  setShowName("");
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-gold text-black font-black text-xs uppercase tracking-wider"
              >
                Upload Another Mix
              </button>
              <Link
                href="/dj"
                className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Show / Episode Name
                </label>
                <input
                  type="text"
                  required
                  value={showName}
                  onChange={(e) => setShowName(e.target.value)}
                  placeholder="e.g. Underground Sessions Ep. 42"
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  Target Broadcast Slot
                </label>
                <select
                  value={scheduledSlot}
                  onChange={(e) => setScheduledSlot(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 focus:border-brand-gold rounded-xl px-4 py-3 text-white text-sm outline-none transition-all"
                >
                  <option value="next">Upcoming Slot (Friday 20:00 - 22:00)</option>
                  <option value="backup">General Emergency Backup Pool</option>
                  <option value="weekend">Special Weekend Rerun</option>
                </select>
              </div>

              {/* Link Input Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                  WeTransfer / Dropbox Link
                </label>
                <div className="relative">
                  <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="url"
                    required
                    onChange={(e) => setFile(e.target.value as any)}
                    placeholder="https://we.tl/t-xxxxxxxxx"
                    className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all"
                  />
                </div>
                <p className="text-white/40 text-[10px] mt-2">
                  Paste a link to your 320kbps MP3 or WAV file. Ensure the link does not expire before your broadcast slot.
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-white/50">
                <AlertCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Please ensure your audio levels do not exceed 0 dBFS peak to avoid clipping on the DAB+ 11C multiplexer.
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!file || !showName || isUploading}
              className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                !file || !showName || isUploading
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-brand-gold text-black hover:brightness-110 shadow-[0_0_30px_rgba(201,168,76,0.3)]"
              }`}
            >
              {isUploading ? "Uploading & Verifying Checksums..." : "Submit to Station Cloud Playout"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
