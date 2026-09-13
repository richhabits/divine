"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Volume1 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NowPlaying } from "@/lib/types";
import { EQVisualiser } from "./EQVisualiser";
import { DJAvatar } from "./DJAvatar";

interface LivePlayerProps {
  nowPlaying: NowPlaying;
}

export function LivePlayer({ nowPlaying: initialNowPlaying }: LivePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.75);
  const [liveTrack, setLiveTrack] = useState<string>("");
  const [liveArtist, setLiveArtist] = useState<string>("");
  const [listeners, setListeners] = useState<number>(0);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextInitialized = useRef(false);

  // Poll /api/now-playing every 15 seconds for real metadata
  useEffect(() => {
    let active = true;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const data = await res.json();
        if (active) {
          setLiveTrack(data.track || "Live Broadcast");
          setLiveArtist(data.artist || "DIVINE Radio London");
          setListeners(data.listeners || 0);
        }
      } catch {
        // silently fail — use fallback text
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handleTogglePlay = useCallback(() => {
    if (!audioContextInitialized.current && audioRef.current) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContext();
        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 256;
        
        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
        
        setAnalyser(analyserNode);
        audioContextInitialized.current = true;
      } catch (err) {
        console.error("Web Audio API not supported or blocked by CORS:", err);
      }
    }

    setIsPlaying((prev) => !prev);
  }, []);

  const handleMute = useCallback(() => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume, prevVolume]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  const VolumeIcon =
    isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="glass-panel w-full max-w-lg mx-auto p-6 md:p-8"
    >
      {/* ── Top: Live Badge + Channel ──────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
            <div
              className="w-2 h-2 rounded-full bg-red-500"
              style={{ animation: "pulse-live 2s infinite" }}
            />
            <span className="text-[10px] font-black tracking-[0.2em] text-red-400 uppercase">
              LIVE NOW
            </span>
          </div>
          {listeners > 0 && (
            <span className="text-[10px] font-bold text-white/30">
              {listeners} listening
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold tracking-[0.2em] text-brand-gold/60 uppercase">
          {initialNowPlaying.channel}
        </span>
      </div>

      {/* ── Middle: DJ Info ─────────────────────────────── */}
      <div className="flex items-center gap-4 mb-6">
        <DJAvatar
          name={initialNowPlaying.dj}
          avatarUrl={initialNowPlaying.avatarUrl}
          size="lg"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white truncate leading-tight">
            {initialNowPlaying.dj}
          </h3>
          <p className="text-sm text-white/50 truncate mt-0.5">
            {initialNowPlaying.show}
          </p>
        </div>
        <EQVisualiser isPlaying={isPlaying} barCount={5} analyser={analyser} />
      </div>

      {/* ── Bottom: Controls ───────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Play / Pause */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleTogglePlay}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          style={{
            background: isPlaying
              ? "rgba(201, 168, 76, 0.15)"
              : "linear-gradient(135deg, #C9A84C 0%, #E8D48B 100%)",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Pause className="w-5 h-5 text-brand-gold" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Play className="w-5 h-5 text-black ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* ── Now Playing Text (live from Icecast) ─── */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase">
            {liveArtist || "NOW PLAYING ON DAB"}
          </p>
          <p className="text-xs text-white/60 truncate mt-0.5">
            {liveTrack || "The Higher State of Audio"}
          </p>
        </div>

        {/* ── Volume ───────────────────────────────── */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={handleMute}
            className="p-1.5 text-white/40 hover:text-white transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <VolumeIcon className="w-4 h-4" />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-20"
            aria-label="Volume"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={initialNowPlaying.streamUrl}
        preload="none"
        crossOrigin="anonymous"
      />
    </motion.div>
  );
}
