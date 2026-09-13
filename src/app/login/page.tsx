"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = username === "admin" ? "/admin" : "/dj";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 md:p-12 rounded-2xl w-full max-w-md border border-white/10 shadow-[0_0_50px_rgba(201,168,76,0.1)]"
      >
        <div className="text-center mb-8">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-2 block">
            DIVINE Network
          </span>
          <h1 className="text-3xl font-black tracking-tighter">
            PORTAL LOGIN
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center uppercase tracking-wider">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
              placeholder="admin or dj"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-4 text-[11px] font-black tracking-[0.3em] uppercase rounded transition-all duration-300 bg-brand-gold text-black hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
          >
            Access System
          </button>
        </form>
        
        {process.env.NODE_ENV !== "production" && (
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">
              Dev Mode Quick Fill:
            </p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => {
                  setUsername("admin");
                  setPassword("divine2026!");
                }}
                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
              >
                Fill Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsername("dj");
                  setPassword("divine-dj-2026!");
                }}
                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold border border-brand-gold/30 transition-colors"
              >
                Fill DJ
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
