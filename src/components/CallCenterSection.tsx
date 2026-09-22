import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, MessageCircle, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const agents = [
  { name: "Rafiq Ahmed", area: "Cox's Bazar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", online: true, rating: 4.9, speciality: "Hotels & Resorts" },
  { name: "Nusrat Jahan", area: "Sylhet", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", online: true, rating: 4.8, speciality: "Tea Garden Tours" },
  { name: "Kamal Hossain", area: "Sundarbans", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", online: false, rating: 4.7, speciality: "Wildlife & Adventure" },
  { name: "Fatima Begum", area: "Bandarban", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", online: true, rating: 4.9, speciality: "Trekking & Hiking" },
  { name: "Tanvir Rahman", area: "Dhaka", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", online: true, rating: 4.6, speciality: "City Tours & Transport" },
  { name: "Ayesha Siddiqua", area: "Rajshahi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80", online: false, rating: 4.8, speciality: "Heritage & Culture" },
];

const destinations = ["All", "Cox's Bazar", "Sylhet", "Sundarbans", "Bandarban", "Dhaka", "Rajshahi"];

const CallCenterSection = () => {
  const [selectedDest, setSelectedDest] = useState("All");
  const [messageAgent, setMessageAgent] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const filteredAgents = selectedDest === "All" ? agents : agents.filter((a) => a.area === selectedDest);
  const onlineCount = agents.filter((a) => a.online).length;

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setMessage("");
      setTimeout(() => {
        setSent(false);
        setMessageAgent(null);
      }, 2500);
    }
  };

  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Headphones className="h-4 w-4" />
            Helpline & Support
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="gradient-text">Call Center</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Connect with travel experts for personalized support — real-time availability, direct messaging, and destination-based routing.
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
          <div className="text-center p-4 rounded-2xl bg-background border border-border/50">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs text-green-500 font-medium">LIVE</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{onlineCount}</p>
            <p className="text-[11px] text-muted-foreground">Agents Online</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-background border border-border/50">
            <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">&lt;2m</p>
            <p className="text-[11px] text-muted-foreground">Avg Response</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-background border border-border/50">
            <CheckCircle className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">98%</p>
            <p className="text-[11px] text-muted-foreground">Satisfaction</p>
          </div>
        </div>

        {/* Destination Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setSelectedDest(dest)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedDest === dest
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {dest === "All" ? "All Destinations" : dest}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border border-border/50 bg-background p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
                      agent.online ? "bg-green-500" : "bg-muted-foreground/40"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground text-sm truncate">{agent.name}</h4>
                    {agent.online ? (
                      <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-bold">Online</span>
                    ) : (
                      <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-bold">Offline</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {agent.area}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{agent.speciality}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-medium">
                    ⭐ {agent.rating}
                  </div>
                </div>
              </div>

              {/* Message Area */}
              {messageAgent === agent.name ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 border-t border-border/50 pt-3"
                >
                  {sent ? (
                    <div className="flex items-center gap-2 text-green-500 text-sm font-medium py-2">
                      <CheckCircle className="h-4 w-4" /> Message sent! Agent will respond shortly.
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 text-sm px-3 py-2 rounded-lg bg-muted border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <button
                        onClick={handleSend}
                        className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <button
                  onClick={() => agent.online && setMessageAgent(agent.name)}
                  disabled={!agent.online}
                  className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                    agent.online
                      ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {agent.online ? "Send Message" : "Currently Unavailable"}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallCenterSection;
