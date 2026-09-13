"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { RESIDENTS, STATION_INFO } from "@/lib/schedule-data";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

export function StudioAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Yo! I'm the DIVINE Studio Assistant. I know the schedule, the DJs, and how to get in touch. What do you want to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processAIResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = "I'm not sure about that. Try asking about the schedule, a specific DJ, or how to text the studio!";

    // Simple pattern matching for "AI" feel
    if (lowerQuery.includes("text") || lowerQuery.includes("contact") || lowerQuery.includes("message") || lowerQuery.includes("shoutout")) {
      response = `You can text the studio directly for a shoutout via WhatsApp or SMS on ${STATION_INFO.studioWhatsApp}.`;
    } else if (lowerQuery.includes("schedule") || lowerQuery.includes("playing") || lowerQuery.includes("on air") || lowerQuery.includes("timetable")) {
      response = "Check out the full timetable just above this section! We broadcast 24/7 on DAB across London.";
    } else if (lowerQuery.includes("dab") || lowerQuery.includes("coverage") || lowerQuery.includes("where can i listen")) {
      response = `We broadcast on DAB Block 11C across London, Hertfordshire, and the South East. You can also listen globally via our iOS and Android apps!`;
    } else if (lowerQuery.includes("join") || lowerQuery.includes("dj") || lowerQuery.includes("apply") || lowerQuery.includes("presenter")) {
      response = "Looking to join the family? Click the 'Join Us' link in the menu to submit an application. We're always looking for fresh talent.";
    } else if (lowerQuery.includes("merch") || lowerQuery.includes("shop") || lowerQuery.includes("buy")) {
      response = "We just dropped some fresh premium merch. Head over to the 'Merch' section in the menu to grab hoodies, tees, and DJ gear.";
    } else {
      // Check if they are asking about a specific DJ
      const foundDj = RESIDENTS.find(r => lowerQuery.includes(r.name.toLowerCase()) || lowerQuery.includes(r.id.toLowerCase()));
      if (foundDj) {
        response = `${foundDj.name} is one of our residents! They play ${foundDj.genres.join(", ")}. You can catch the ${foundDj.showName} on DIVINE:ONE.`;
      } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi ") || lowerQuery.includes("yo")) {
        response = "Hey! Keep it locked to DIVINE. What can I help you with?";
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Simulate thinking time (1-2s)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    processAIResponse(userMsg.text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-2xl border border-brand-gold/20 overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.1)] flex flex-col h-[500px]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
            <Sparkles className="w-5 h-5 text-brand-gold" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">DIVINE Intelligence</h3>
            <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.1em] text-green-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-end gap-3 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${
                  msg.sender === "user"
                    ? "bg-white/10"
                    : "bg-brand-gold text-black"
                }`}
              >
                {msg.sender === "user" ? (
                  <User className="w-4 h-4 text-white/70" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-white/10 rounded-br-none text-white"
                    : "bg-brand-gold/10 border border-brand-gold/20 rounded-bl-none text-brand-gold"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-3 max-w-[85%] mr-auto"
            >
              <div className="w-8 h-8 rounded-full flex shrink-0 items-center justify-center bg-brand-gold text-black">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 rounded-bl-none flex gap-1">
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-black/40">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about DJs, schedule, or texting the studio..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 rounded-lg bg-brand-gold text-black disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 hover:scale-105 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
