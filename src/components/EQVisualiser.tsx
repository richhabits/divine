"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface EQVisualiserProps {
  barCount?: number;
  color?: string;
  isPlaying: boolean;
  className?: string;
  analyser?: AnalyserNode | null;
}

export function EQVisualiser({
  barCount = 5,
  color = "#C9A84C",
  isPlaying,
  className = "",
  analyser,
}: EQVisualiserProps) {
  const barsRef = useRef<Array<HTMLDivElement | null>>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying || !analyser) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      // We only have a few bars, but lots of frequency data.
      // We will sample across the low-mid frequencies (where kicks and bass live).
      const step = Math.floor((analyser.frequencyBinCount * 0.4) / barCount);

      barsRef.current.forEach((bar, index) => {
        if (!bar) return;
        const dataIndex = index * step;
        let sum = 0;
        for (let j = 0; j < step; j++) {
           sum += dataArray[dataIndex + j] || 0;
        }
        const average = sum / step;
        
        // Map 0-255 to a scale of 0.15 to 1.0
        const scale = 0.15 + (average / 255) * 0.85;
        // Map 0-255 to an opacity of 0.3 to 1.0
        const opacity = 0.3 + (average / 255) * 0.7;

        bar.style.transform = `scaleY(${scale})`;
        bar.style.opacity = `${opacity}`;
      });

      requestRef.current = requestAnimationFrame(updateBars);
    };

    requestRef.current = requestAnimationFrame(updateBars);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, analyser, barCount]);

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
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          style={{
            backgroundColor: color,
            height: "100%",
            width: "3px",
            borderRadius: "9999px",
            transformOrigin: "bottom",
          }}
          // If we have an analyser, Framer Motion doesn't handle the animation,
          // the requestAnimationFrame loop modifies the DOM node directly for performance.
          // Otherwise, we use the fallback random animation.
          animate={
            !analyser && isPlaying
              ? {
                  scaleY: [0.3, 1, 0.5, 0.9, 0.4, 0.8, 0.3],
                  opacity: [0.7, 1, 0.8, 1, 0.7, 0.9, 0.7],
                }
              : !analyser && !isPlaying
              ? { scaleY: 0.15, opacity: 0.3 }
              : {} // do nothing if analyser exists, rAF handles it
          }
          transition={
            !analyser && isPlaying
              ? {
                  duration: 0.8 + i * 0.12,
                  repeat: Infinity,
                  repeatType: "mirror" as const,
                  ease: "easeInOut",
                  delay: i * 0.08,
                }
              : { duration: 0.4, ease: "easeOut" }
          }
          initial={{ scaleY: 0.15, opacity: 0.3 }}
        />
      ))}
    </div>
  );
}
