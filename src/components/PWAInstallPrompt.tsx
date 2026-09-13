"use client";

import { useState, useEffect } from "react";
import { Download, X, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as unknown as { standalone?: boolean }).standalone) {
      setIsStandalone(true);
      return;
    }

    // Check iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const dismissed = localStorage.getItem("divine_pwa_dismissed");
    if (dismissed && Date.now() - parseInt(dismissed, 10) < 86400000 * 3) {
      return; // Do not show if dismissed in last 3 days
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If iOS and not standalone, show helper prompt after 5 seconds
    if (isIosDevice) {
      const timer = setTimeout(() => setShowPrompt(true), 5000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("divine_pwa_dismissed", Date.now().toString());
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 glass-panel border border-brand-gold/40 bg-black/90 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
              <Radio className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h4 className="text-xs font-black tracking-wider uppercase text-white">Install DIVINE App</h4>
              <p className="text-[11px] text-white/50 leading-tight mt-0.5">
                {isIOS
                  ? "Tap Share ⎋ then 'Add to Home Screen' for fullscreen DAB radio"
                  : "Listen to 24/7 DAB broadcasts on your home screen"}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/40 hover:text-white p-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isIOS && deferredPrompt && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleInstall}
              className="px-4 py-1.5 rounded-lg bg-brand-gold text-black text-xs font-black tracking-widest uppercase hover:brightness-110 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
