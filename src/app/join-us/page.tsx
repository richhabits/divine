"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Music, Mic2, Radio, ArrowRight } from "lucide-react";

const STEPS = [
  { id: "name", label: "What's your DJ / artist name?", placeholder: "e.g. DJ Fivestack", type: "text" },
  { id: "realName", label: "Your real name?", placeholder: "e.g. John Smith", type: "text" },
  { id: "email", label: "Best email to reach you?", placeholder: "you@example.com", type: "email" },
  { id: "phone", label: "Contact number?", placeholder: "+44 7XXX XXXXXX", type: "tel" },
  { id: "genres", label: "What genres do you play?", placeholder: "e.g. House, UK Garage, Jungle, D&B", type: "text" },
  { id: "experience", label: "Tell us about your DJ experience", placeholder: "How long you've been mixing, any station experience, club residencies, etc.", type: "textarea" },
  { id: "mixcloud", label: "Got a Mixcloud or SoundCloud link?", placeholder: "https://mixcloud.com/your-profile", type: "url" },
  { id: "availability", label: "When are you available to broadcast?", placeholder: "e.g. Weekday evenings, Saturday afternoons", type: "text" },
];

export default function JoinUsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const currentValue = formData[step?.id] || "";

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Generate WhatsApp Message
    const msg = `*NEW DJ APPLICATION*%0A%0A*Name/Alias:* ${formData.name || "N/A"}%0A*Real Name:* ${formData.realName || "N/A"}%0A*Email:* ${formData.email || "N/A"}%0A*Phone:* ${formData.phone || "N/A"}%0A*Genres:* ${formData.genres || "N/A"}%0A*Experience:* ${formData.experience || "N/A"}%0A*Mixcloud/Link:* ${formData.mixcloud || "N/A"}%0A*Availability:* ${formData.availability || "N/A"}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/447597611013?text=${msg}`, "_blank");
    
    setIsSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentValue.trim()) {
      e.preventDefault();
      goNext();
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">
            APPLICATION RECEIVED.
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Thanks, {formData.name || "DJ"}! We&apos;ve got your application. If we think
            you&apos;ve got what it takes to join the DIVINE family, someone from
            the management team will be in touch shortly.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-3 bg-brand-gold text-black font-black text-[11px] tracking-[0.2em] uppercase rounded hover:bg-[#E8D48B] transition-colors"
          >
            Back to DIVINE <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-brand-gold/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-30 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-brand-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-16 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                <Mic2 className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-[9px] font-black tracking-[0.2em] text-brand-gold uppercase">
                  DJ Application
                </span>
              </div>
              <span className="text-[10px] text-white/30 font-bold">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
          </motion.div>

          {/* Step */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <label className="block text-2xl md:text-4xl font-black tracking-tight mb-8">
                {step.label}
              </label>

              {step.type === "textarea" ? (
                <textarea
                  autoFocus
                  value={currentValue}
                  onChange={(e) =>
                    setFormData({ ...formData, [step.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && currentValue.trim()) {
                      e.preventDefault();
                      goNext();
                    }
                  }}
                  placeholder={step.placeholder}
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-white/10 focus:border-brand-gold text-xl md:text-2xl font-medium py-4 outline-none transition-colors placeholder:text-white/15 resize-none"
                />
              ) : (
                <input
                  autoFocus
                  type={step.type}
                  value={currentValue}
                  onChange={(e) =>
                    setFormData({ ...formData, [step.id]: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  placeholder={step.placeholder}
                  className="w-full bg-transparent border-b-2 border-white/10 focus:border-brand-gold text-xl md:text-2xl font-medium py-4 outline-none transition-colors placeholder:text-white/15"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={goBack}
              disabled={currentStep === 0}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors disabled:opacity-0"
            >
              ← Back
            </button>

            <button
              onClick={goNext}
              disabled={!currentValue.trim()}
              className="flex items-center gap-3 px-8 py-3 bg-brand-gold text-black font-black text-[11px] tracking-[0.2em] uppercase rounded hover:bg-[#E8D48B] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  Submit Application <Send className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
