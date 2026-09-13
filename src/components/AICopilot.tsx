"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageSquare, Sparkles, Send, User } from "lucide-react";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
};

// Contextual Knowledge Base based on routes
const ROUTE_KNOWLEDGE: Record<string, string[]> = {
  "/": [
    "Welcome to DIVINE Radio. Use the player above to tune in.",
    "Check out the 'Listen Back' section to hear past broadcasts.",
    "Want to join us? Scroll down to the Join Us section or click 'Sign Up' in the nav."
  ],
  "/dj": [
    "Welcome to the DJ Portal! To go live, you need to connect your broadcasting software (like OBS or Audio Hijack) to our Icecast server.",
    "Your streaming details are: Server: orbit.citrus3.com, Port: 2020, Mount: /divineradiolondon.",
    "When you connect, the live player on the homepage will automatically update to show you are ON AIR."
  ],
  "/admin": [
    "Welcome to the Command Center. Here you can manage the schedule, review DJ applications, and monitor server health.",
    "Click on any slot in the Schedule Editor to reassign a DJ.",
    "The server is currently running smoothly with Icecast handling the audio distribution."
  ],
  "/merch": [
    "This is the official DIVINE Merch store. All items are premium quality.",
    "We have Hoodies, T-Shirts, Record Bags, and Headphone Cases.",
    "To buy, simply click on an item."
  ]
};

export function AICopilot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Auto-trigger on route change
  useEffect(() => {
    if (!pathname) return;

    // Reset conversation context for the new page
    const routeHints = ROUTE_KNOWLEDGE[pathname] || ROUTE_KNOWLEDGE["/"];
    const welcomeMsg = routeHints[0] || "How can I help you on this page?";

    // eslint-disable-next-line react-hooks/set-state-in-effect
setMessages([
      {
        id: Date.now().toString(),
        sender: "ai",
        text: `DIVINE Copilot initialized. ${welcomeMsg}`,
      },
    ]);

    // Only auto-open if we are in a dashboard (like /dj or /admin)
    if (pathname.startsWith("/dj") || pathname.startsWith("/admin")) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, [pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processResponse = (userText: string) => {
    const text = userText.toLowerCase();
    const routeHints = ROUTE_KNOWLEDGE[pathname || "/"] || [];
    let response = "I'm still learning about this specific area. But I'm here to help!";

    if (text.includes("stream") || text.includes("obs") || text.includes("go live") || text.includes("icecast")) {
      response = "To stream, use Icecast. Server: orbit.citrus3.com. Port: 2020. Mount: /divineradiolondon. You'll need your specific DJ password to authenticate.";
    } else if (text.includes("schedule") || text.includes("timetable")) {
      response = "The schedule is managed via the Admin Command Center. Live changes reflect instantly on the homepage and apps.";
    } else if (text.includes("help") || text.includes("what can you do")) {
      response = routeHints.length > 1 ? routeHints[1] : "I can guide you through setting up your stream, managing the station, or finding what you need.";
    } else if (text.includes("app") || text.includes("mobile")) {
      response = "DIVINE has native iOS and Android apps! You can find the download links on the homepage.";
    } else {
      // Just grab a random hint for the current route
      response = routeHints[Math.floor(Math.random() * routeHints.length)] || response;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "ai", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const newMsg: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);
    processResponse(newMsg.text);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-gold text-black flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_50px_rgba(201,168,76,0.5)] transition-shadow"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] glass-panel rounded-2xl border border-brand-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden bg-black/90 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Copilot</h3>
                  <div className="text-[9px] font-bold tracking-[0.1em] text-brand-gold uppercase">
                    Context: {pathname === "/" ? "Home" : pathname?.replace("/", "") || "System"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex shrink-0 items-center justify-center mt-1 ${
                      msg.sender === "user"
                        ? "bg-white/10"
                        : "bg-brand-gold text-black"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-3 h-3 text-white/70" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-white/10 rounded-tr-none text-white"
                        : "bg-brand-gold/10 border border-brand-gold/20 rounded-tl-none text-brand-gold"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-6 h-6 rounded-full flex shrink-0 items-center justify-center mt-1 bg-brand-gold text-black">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 rounded-tl-none flex items-center gap-1">
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                    <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for guidance..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
