"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("DIVINE Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 glass-panel p-12 md:p-16 rounded-3xl border border-white/5 max-w-2xl w-full">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30 mx-auto mb-8">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500 mb-4 block">
          Transmission Interrupted
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
          BROADCAST FAILURE
        </h1>
        <p className="text-white/50 text-base md:text-lg mb-12 max-w-md mx-auto">
          We experienced an unexpected signal drop. Our studio engineers have been notified. Please refresh the connection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-brand-gold text-black font-black text-[11px] tracking-[0.2em] uppercase rounded hover:bg-[#E8D48B] transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Reconnect Signal
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white/5 text-white font-black text-[11px] tracking-[0.2em] uppercase rounded border border-white/10 hover:border-white/30 transition-colors"
          >
            Studio Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
