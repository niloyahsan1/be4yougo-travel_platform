import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { dayTripCities } from "@/data/dayTrips";
import { MapPin, Clock, ArrowLeft, ChevronRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DayTrips = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const city = dayTripCities.find((c) => c.id === selectedCity);

  if (!city) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Day <span className="gradient-text">Trips</span>
              </h1>
              <p className="text-muted-foreground">
                Pick your city and discover amazing day trip destinations nearby
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dayTripCities.map((c, i) => (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.06, 0.4) }}
                  onClick={() => setSelectedCity(c.id)}
                  className="group text-left rounded-2xl overflow-hidden border border-border/50 card-hover bg-card"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.city}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-lg font-bold text-white">{c.city}</h3>
                      <p className="text-white/80 text-xs">{c.tagline}</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {c.spots.length} Spots
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {c.spots.slice(0, 3).map((s) => s.name).join(" · ")}
                    </span>
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1.5 mb-6"
            onClick={() => setSelectedCity(null)}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Cities
          </Button>

          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Day Trips from <span className="gradient-text">{city.city}</span>
            </h1>
            <p className="text-muted-foreground">{city.tagline} — {city.spots.length} day trip destinations</p>
          </div>

          <div className="space-y-6">
            {city.spots.map((spot, i) => (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden card-hover"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-72 h-48 md:h-auto shrink-0">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{spot.name}</h3>
                      <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {spot.estimatedCost}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{spot.description}</p>

                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                        <MapPin className="h-3 w-3 text-primary" /> {spot.distance}
                      </span>
                      <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                        <Clock className="h-3 w-3 text-primary" /> {spot.travelTime}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-foreground/70 mb-1.5">Highlights</p>
                      <div className="flex flex-wrap gap-1.5">
                        {spot.highlights.map((h) => (
                          <span key={h} className="text-[10px] px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium">{h}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {spot.bestFor.map((b) => (
                        <span key={b} className="text-[10px] px-2.5 py-1 rounded-lg bg-muted text-foreground/60 font-medium">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DayTrips;
