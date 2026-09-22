import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { travelEvents } from "@/data/news";
import { destinations } from "@/data/destinations";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Events = () => {
  const [destFilter, setDestFilter] = useState("all");

  const filtered = destFilter === "all" ? travelEvents : travelEvents.filter((e) => e.destinationId === destFilter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Travel <span className="gradient-text">Events</span>
          </h1>
          <p className="text-muted-foreground mb-8">Upcoming festivals, fairs, and seasonal attractions</p>

          <div className="flex gap-2 flex-wrap mb-8">
            <button
              onClick={() => setDestFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                destFilter === "all" ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground border border-border hover:border-primary/30"
              }`}
            >
              All Destinations
            </button>
            {destinations.map((d) => (
              <button
                key={d.id}
                onClick={() => setDestFilter(d.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  destFilter === d.id ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="bg-card rounded-2xl overflow-hidden border border-border/50 card-hover"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h3 className="text-white font-bold text-base">{event.name}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {event.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {event.endDate && ` – ${new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No events found for this destination.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
