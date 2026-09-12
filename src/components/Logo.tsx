import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`group inline-flex flex-col items-start ${className}`}>
      <span className="text-2xl font-black tracking-tighter text-white leading-none">
        DIVINE
      </span>
      <div className="flex items-center gap-1.5 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
        <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-brand-gold">
          LONDON
        </span>
      </div>
    </Link>
  );
}
