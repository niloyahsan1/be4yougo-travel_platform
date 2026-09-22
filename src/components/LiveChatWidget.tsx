import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Headphones, MinusCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  time: string;
}

const quickReplies = [
  "Hotel booking help",
  "Transport info",
  "Destination tips",
  "Group trip planning",
];

const agentResponses: Record<string, string> = {
  "hotel booking help": "I'd love to help with hotel bookings! Which destination are you looking at? We have great options in Cox's Bazar, Sylhet, Sajek, and more. 🏨",
  "transport info": "We cover bus, train & flight routes across Bangladesh. Where are you traveling from and to? I'll find the best options for you! 🚌✈️",
  "destination tips": "Bangladesh has amazing spots! Popular picks right now: Sajek Valley (trending +32%), Cox's Bazar, and Sundarbans. Want details on any? 🌴",
  "group trip planning": "Planning a বন্ধু trip? Awesome! We have packages for 4-15 friends — trekking in Bandarban, beach parties in Cox's Bazar, or Sundarbans adventures. What's your vibe? 🎉",
};

const getAgentReply = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(agentResponses)) {
    if (lower.includes(key) || key.split(" ").some((w) => lower.includes(w))) {
      return reply;
    }
  }
  return "Thanks for reaching out! Our team will get back to you shortly. Meanwhile, feel free to explore our destinations or check trending hotels on the homepage. 😊";
};

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! 👋 Welcome to Before You Go. How can I help you plan your trip?",
      sender: "agent",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: Date.now(), text, sender: "user", time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: getAgentReply(text),
        sender: "agent",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
      if (!isOpen) setUnread((u) => u + 1);
    }, 1200 + Math.random() * 800);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setUnread(0);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all"
          >
            <MessageCircle className="h-6 w-6" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Headphones className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border border-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Before You Go Support</h4>
                  <p className="text-[10px] opacity-80">4 agents online • Avg reply &lt;2m</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                  <MinusCircle className="h-4 w-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                    <p className={`text-[9px] mt-1 ${msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t border-border/50 bg-background flex flex-wrap gap-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-border/50 bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Type a message..."
                  className="flex-1 text-sm px-4 py-2.5 rounded-xl bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;
