"use client";

import { motion } from "framer-motion";

interface EQVisualiserProps {
  barCount?: number;
  color?: string;
  isPlaying: boolean;
  className?: string;
}

export function EQVisualiser({
  barCount = 5,
  color = "#C9A84C",
  isPlaying,
  className = "",
}: EQVisualiserProps) {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div
      className={`flex items-end gap-[3px] h-6 ${className}`}
      role="img"
      aria-label={isPlaying ? "Audio playing" : "Audio paused"}
    >
      {bars.map((i) => (
        <motion.div
          key={i}
          style={{
            backgroundColor: color,
            height: "100%",
            width: "3px",
            borderRadius: "9999px",
            transformOrigin: "bottom",
          }}
          animate={
            isPlaying
              ? {
                  scaleY: [0.3, 1, 0.5, 0.9, 0.4, 0.8, 0.3],
                  opacity: [0.7, 1, 0.8, 1, 0.7, 0.9, 0.7],
                }
              : { scaleY: 0.15, opacity: 0.3 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8 + i * 0.12,
                  repeat: Infinity,
                  repeatType: "mirror" as const,
                  ease: "easeInOut",
                  delay: i * 0.08,
                }
              : { duration: 0.4, ease: "easeOut" }
          }
          initial={{ scaleY: 0.15 }}
        />
      ))}
    </div>
  );
}
