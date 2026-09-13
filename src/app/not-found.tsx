import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 glass-panel p-12 md:p-16 rounded-3xl border border-white/5 max-w-2xl w-full">
        <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center border border-brand-gold/30 mx-auto mb-8">
          <Radio className="w-8 h-8 text-brand-gold" />
        </div>
        
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-4 block">
          404 &mdash; Dead Air
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
          FREQUENCY NOT FOUND
        </h1>
        <p className="text-white/50 text-base md:text-lg mb-12 max-w-md mx-auto">
          The broadcast you are looking for has either finished, moved, or never existed on this dial.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-black font-black text-[11px] tracking-[0.2em] uppercase rounded hover:bg-[#E8D48B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Studio
        </Link>
      </div>
      
      {/* Decorative Ticker */}
      <div className="absolute bottom-12 w-full overflow-hidden opacity-20 pointer-events-none">
        <div className="whitespace-nowrap flex items-center gap-8 animate-[marquee_20s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-xs font-black tracking-widest uppercase">
              DIVINE RADIO LONDON
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
