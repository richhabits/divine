"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Radio, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["House", "UK Garage"]);
  const [submitted, setSubmitted] = useState(false);

  const GENRES = ["House", "UK Garage", "Deep Underground", "Jungle", "Drum & Bass", "Soulful House", "Balearic"];

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-brand-gold/5 rounded-full blur-[220px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="DIVINE Radio Logo"
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(201,168,76,0.35)]"
              />
            </div>
            <span className="text-2xl font-black tracking-[0.2em] group-hover:text-brand-gold transition-colors">
              DIVINE
            </span>
          </Link>
          <h1 className="text-3xl font-black tracking-tighter mb-2">JOIN THE NETWORK</h1>
          <p className="text-white/40 text-sm">
            Create your listener account for personalised shows, track IDs & live shoutouts
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 rounded-2xl border border-brand-gold/30 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-2">Welcome to DIVINE</h2>
            <p className="text-white/60 text-sm mb-6">
              Your account has been created successfully. Welcome to London&apos;s higher state of audio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="px-6 py-3 rounded bg-brand-gold text-black font-black text-[11px] tracking-[0.2em] uppercase hover:bg-[#E8D48B] transition-colors"
              >
                Sign In to Portal
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded border border-white/10 text-white font-black text-[11px] tracking-[0.2em] uppercase hover:border-white/30 transition-colors"
              >
                Back to Radio
              </Link>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(201,168,76,0.05)]"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
                  Full Name / Nickname
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-brand-gold/50 transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
                  Music Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((g) => {
                    const active = selectedGenres.includes(g);
                    return (
                      <button
                        type="button"
                        key={g}
                        onClick={() => toggleGenre(g)}
                        className={`text-[9px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border transition-all ${
                          active
                            ? "bg-brand-gold/20 text-brand-gold border-brand-gold/40"
                            : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-4 rounded-xl font-black text-[11px] tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] bg-brand-gold text-black shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:bg-[#E8D48B]"
              >
                <UserPlus className="w-4 h-4" /> Create Listener Account
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-white/40">
              Already have an account?{" "}
              <Link href="/login" className="text-brand-gold font-bold hover:underline ml-1">
                Sign In
              </Link>
            </div>
          </form>
        )}

        <div className="mt-8 flex justify-center items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
          <Link href="/join-us" className="hover:text-brand-gold transition-colors">
            DJ & Artist Application
          </Link>
          <span>•</span>
          <Link href="/login" className="hover:text-brand-gold transition-colors">
            Station Admin Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
