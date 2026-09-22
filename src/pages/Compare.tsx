import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/data/destinations";
import { X, Plus, BarChart3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Compare = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const selectedDests = destinations.filter((d) => selected.includes(d.id));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with gradient banner */}
          <div className="rounded-3xl p-8 md:p-12 mb-10 text-center" style={{
            background: "linear-gradient(135deg, hsl(199 89% 48%), hsl(210 90% 42%))"
          }}>
            <BarChart3 className="h-10 w-10 mx-auto mb-4 text-primary-foreground/80" />
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
              Compare Destinations
            </h1>
            <p className="text-primary-foreground/80 max-w-lg mx-auto">
              Select 2 or 3 destinations to compare them side by side — costs, hotels, travel time, and more.
            </p>
          </div>

          {/* Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Select destinations ({selected.length}/3)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {destinations.map((dest) => {
                const isSelected = selected.includes(dest.id);
                return (
                  <button
                    key={dest.id}
                    onClick={() => toggle(dest.id)}
                    disabled={!isSelected && selected.length >= 3}
                    className={`relative rounded-xl overflow-hidden h-28 transition-all ${
                      isSelected ? "ring-2 ring-primary ring-offset-2" : "opacity-80 hover:opacity-100"
                    } ${!isSelected && selected.length >= 3 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">{dest.name}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedDests.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border/50 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Feature</th>
                      {selectedDests.map((d) => (
                        <th key={d.id} className="text-left px-6 py-4">
                          <div className="flex items-center gap-2">
                            <img src={d.image} alt={d.name} className="w-8 h-8 rounded-lg object-cover" />
                            <span className="text-sm font-bold text-foreground">{d.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Tagline", fn: (d: typeof selectedDests[0]) => d.tagline },
                      { label: "Best Time", fn: (d: typeof selectedDests[0]) => d.bestTime },
                      { label: "Travel Time", fn: (d: typeof selectedDests[0]) => d.travelTime },
                      { label: "Cost Level", fn: (d: typeof selectedDests[0]) => d.costLevel },
                      { label: "Ideal For", fn: (d: typeof selectedDests[0]) => d.idealFor.join(", ") },
                      { label: "Hotels", fn: (d: typeof selectedDests[0]) => `${d.hotels.length} options` },
                      { label: "Top Hotel", fn: (d: typeof selectedDests[0]) => {
                        const top = [...d.hotels].sort((a, b) => b.rating - a.rating)[0];
                        return `${top.name} (${top.rating}⭐)`;
                      }},
                      { label: "Price Range", fn: (d: typeof selectedDests[0]) => {
                        const prices = d.costBreakdown.map(c => c.cost);
                        return prices[1] || prices[0];
                      }},
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="px-6 py-3 text-sm font-semibold text-foreground">{row.label}</td>
                        {selectedDests.map((d) => (
                          <td key={d.id} className="px-6 py-3 text-sm text-muted-foreground">
                            {row.fn(d)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="px-6 py-4"></td>
                      {selectedDests.map((d) => (
                        <td key={d.id} className="px-6 py-4">
                          <Link to={`/destination/${d.id}`}>
                            <Button size="sm" className="rounded-full text-xs">View & Book</Button>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {selectedDests.length < 2 && (
            <div className="text-center py-16 text-muted-foreground">
              Select at least 2 destinations above to start comparing.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
