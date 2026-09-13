"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function ListenBackPage() {
  const [activeShow, setActiveShow] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const archives = [
    {
      id: "arc-1",
      title: "The Gold Standard Sessions",
      dj: "DJ Fivestack",
      date: "10 Sep 2026",
      duration: "02:00:00",
      genre: "UK Garage",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // placeholder audio
    },
    {
      id: "arc-2",
      title: "Jungle Fever",
      dj: "Marcus Vance",
      date: "09 Sep 2026",
      duration: "01:30:00",
      genre: "Jungle / D&B",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: "arc-3",
      title: "Afterhours Deep",
      dj: "Elena Cruz",
      date: "08 Sep 2026",
      duration: "02:00:00",
      genre: "Deep House",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: "arc-4",
      title: "Sunday Soul",
      dj: "Marc Anthony",
      date: "06 Sep 2026",
      duration: "03:00:00",
      genre: "Soulful House",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    }
  ];

  const handlePlayPause = (showId: string, audioUrl: string) => {
    if (activeShow === showId) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setActiveShow(showId);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-16">
      <div className="max-w-4xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold mb-4 block">
            On Demand
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            LISTEN BACK
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-2xl">
            Missed a show? Catch up on the latest broadcasts from the DIVINE:ONE studio.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {archives.map((show, i) => {
            const isActive = activeShow === show.id;
            return (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-panel p-4 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border transition-colors group cursor-pointer ${
                  isActive ? "border-brand-gold bg-brand-gold/5" : "border-white/5 hover:border-brand-gold/30"
                }`}
                onClick={() => handlePlayPause(show.id, show.audioUrl)}
              >
                <div className="flex items-center gap-4">
                  <button className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                    isActive ? "bg-brand-gold border-brand-gold text-black" : "bg-white/5 border-white/10 group-hover:bg-brand-gold group-hover:border-brand-gold text-white group-hover:text-black"
                  }`}>
                    {isActive && isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-1" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight mb-1">{show.title}</h3>
                    <p className="text-white/50 text-sm">
                      {show.dj} &middot; {show.genre}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="text-left md:text-right">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                      Broadcast Date
                    </span>
                    <span className="text-sm font-medium">{show.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1">
                      Duration
                    </span>
                    <span className="text-sm font-medium">{show.duration}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sticky Player for Listen Back */}
      {activeShow && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4"
        >
          <div className="max-w-4xl mx-auto glass-panel border border-brand-gold/30 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-[0_0_30px_rgba(201,168,76,0.15)] bg-black/80">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-2xl overflow-hidden">
              <div 
                className="h-full bg-brand-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex items-center gap-4 flex-1 w-full">
               <button 
                  onClick={() => {
                    if (isPlaying) {
                      audioRef.current?.pause();
                      setIsPlaying(false);
                    } else {
                      audioRef.current?.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-brand-gold text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
               >
                 {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
               </button>
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold truncate">
                    {archives.find(a => a.id === activeShow)?.title}
                 </p>
                 <p className="text-[10px] text-white/50 truncate">
                    {archives.find(a => a.id === activeShow)?.dj}
                 </p>
               </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
               <Volume2 className="w-4 h-4 text-white/50" />
               <input
                 type="range"
                 min="0"
                 max="1"
                 step="0.01"
                 value={volume}
                 onChange={(e) => setVolume(parseFloat(e.target.value))}
                 className="w-24"
               />
            </div>
          </div>
        </motion.div>
      )}
      
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden" 
      />
    </div>
  );
}
