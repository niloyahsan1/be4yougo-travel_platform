import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";

const HomeBudgetCTA = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(destinations[0]?.id ?? "");
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(3);

  const handleStart = () => {
    const params = new URLSearchParams({
      destination,
      travelers: String(travelers),
      nights: String(nights),
    });
    navigate(`/budget?${params.toString()}`);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Calculator className="h-3.5 w-3.5" /> Budget Calculator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Plan your trip <span className="gradient-text">in seconds</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Pick a destination and we'll pre-fill your budget — hotels, transport, and food, all estimated for you.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-5 space-y-4 shadow-sm">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-sm font-semibold p-2.5 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <Users className="h-3 w-3" /> Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full text-sm p-2.5 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <Calendar className="h-3 w-3" /> Nights
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full text-sm p-2.5 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {[1, 2, 3, 4, 5, 7, 10, 14].map((n) => (
                      <option key={n} value={n}>{n} night{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button onClick={handleStart} size="lg" className="w-full rounded-full font-bold">
                Start Budgeting <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBudgetCTA;