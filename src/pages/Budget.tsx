import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, type Destination, type Hotel } from "@/data/destinations";
import { busProviders, trainRoutes, airlines } from "@/data/transport";
import { Calculator, Plus, X, MapPin, Hotel as HotelIcon, Bus, Plane, Train, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { safeUuid } from "@/lib/utils";

interface BudgetStop {
  id: string;
  destinationId: string;
  hotelId: string | null;
  nights: number;
  transportType: "bus" | "train" | "flight" | "own";
  travelers: number;
}

const transportCosts = {
  bus: { label: "Bus", avg: 1200 },
  train: { label: "Train", avg: 700 },
  flight: { label: "Flight", avg: 5500 },
  own: { label: "Own Vehicle", avg: 0 },
};

const Budget = () => {
  const [searchParams] = useSearchParams();
  const [stops, setStops] = useState<BudgetStop[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [travelers, setTravelers] = useState(() => {
    const t = Number(searchParams.get("travelers"));
    return t > 0 ? t : 2;
  });
  const [dailyFood, setDailyFood] = useState(600);

  useEffect(() => {
    const destId = searchParams.get("destination");
    const nightsParam = Number(searchParams.get("nights")) || 2;
    if (destId && destinations.some((d) => d.id === destId)) {
      setStops((prev) => {
        if (prev.some((s) => s.destinationId === destId)) return prev;
        return [
          ...prev,
          {
            id: safeUuid(),
            destinationId: destId,
            hotelId: null,
            nights: nightsParam,
            transportType: "bus",
            travelers,
          },
        ];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const addStop = (destId: string) => {
    setStops([...stops, {
      id: safeUuid(),
      destinationId: destId,
      hotelId: null,
      nights: 2,
      transportType: "bus",
      travelers,
    }]);
    setShowAdd(false);
  };

  const removeStop = (id: string) => setStops(stops.filter((s) => s.id !== id));

  const updateStop = (id: string, updates: Partial<BudgetStop>) => {
    setStops(stops.map((s) => s.id === id ? { ...s, ...updates } : s));
  };

  const getHotelAvgPrice = (hotel: Hotel): number => {
    const match = hotel.priceRange.match(/[\d,]+/g);
    if (!match || match.length < 2) return 3000;
    const low = parseInt(match[0].replace(",", ""));
    const high = parseInt(match[1].replace(",", ""));
    return Math.round((low + high) / 2);
  };

  const breakdown = useMemo(() => {
    let totalAccommodation = 0;
    let totalTransport = 0;
    let totalFood = 0;
    let totalDays = 0;

    stops.forEach((stop) => {
      const dest = destinations.find((d) => d.id === stop.destinationId);
      if (!dest) return;

      const hotel = stop.hotelId ? dest.hotels.find((h) => h.id === stop.hotelId) : null;
      const hotelCost = hotel ? getHotelAvgPrice(hotel) * stop.nights : 2500 * stop.nights;
      totalAccommodation += hotelCost;
      totalTransport += transportCosts[stop.transportType].avg;
      totalFood += dailyFood * stop.nights;
      totalDays += stop.nights;
    });

    const perPerson = totalAccommodation + totalTransport + totalFood;
    const total = perPerson * travelers;

    return { totalAccommodation, totalTransport, totalFood, totalDays, perPerson, total };
  }, [stops, travelers, dailyFood]);

  const availableDestinations = destinations.filter(
    (d) => !stops.some((s) => s.destinationId === d.id)
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Budget <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-muted-foreground mb-10">
            Estimate your trip cost based on destinations, hotels, transport, and food.
          </p>

          {/* Global Settings */}
          <div className="bg-card rounded-2xl border border-border/50 p-5 mb-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <label className="text-xs text-muted-foreground block">Travelers</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="text-sm font-semibold text-foreground bg-transparent border-none focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5 text-primary" />
              <div>
                <label className="text-xs text-muted-foreground block">Daily Food Budget</label>
                <select
                  value={dailyFood}
                  onChange={(e) => setDailyFood(Number(e.target.value))}
                  className="text-sm font-semibold text-foreground bg-transparent border-none focus:outline-none"
                >
                  <option value={300}>৳300 (Budget)</option>
                  <option value={600}>৳600 (Standard)</option>
                  <option value={1000}>৳1,000 (Comfort)</option>
                  <option value={1500}>৳1,500 (Premium)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stops */}
          <div className="space-y-4 mb-8">
            <AnimatePresence>
              {stops.map((stop) => {
                const dest = destinations.find((d) => d.id === stop.destinationId)!;
                const selectedHotel = stop.hotelId ? dest.hotels.find((h) => h.id === stop.hotelId) : null;
                const hotelCost = selectedHotel ? getHotelAvgPrice(selectedHotel) * stop.nights : 2500 * stop.nights;
                const transportCost = transportCosts[stop.transportType].avg;
                const foodCost = dailyFood * stop.nights;
                const stopTotal = hotelCost + transportCost + foodCost;

                return (
                  <motion.div
                    key={stop.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-card rounded-2xl border border-border/50 p-5"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{dest.name}</h3>
                        <p className="text-xs text-muted-foreground">{dest.tagline}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">৳{stopTotal.toLocaleString()}</span>
                      <button onClick={() => removeStop(stop.id)} className="p-1 text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Hotel */}
                      <div>
                        <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          <HotelIcon className="h-3 w-3" /> Hotel
                        </label>
                        <select
                          value={stop.hotelId || ""}
                          onChange={(e) => updateStop(stop.id, { hotelId: e.target.value || null })}
                          className="w-full text-xs p-2 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="">Average (৳2,500/night)</option>
                          {dest.hotels.map((h) => (
                            <option key={h.id} value={h.id}>
                              {h.name} (~৳{getHotelAvgPrice(h).toLocaleString()}/night)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Nights */}
                      <div>
                        <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" /> Nights
                        </label>
                        <select
                          value={stop.nights}
                          onChange={(e) => updateStop(stop.id, { nights: Number(e.target.value) })}
                          className="w-full text-xs p-2 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          {[1, 2, 3, 4, 5, 7, 10, 14].map((n) => (
                            <option key={n} value={n}>{n} night{n > 1 ? "s" : ""}</option>
                          ))}
                        </select>
                      </div>

                      {/* Transport */}
                      <div>
                        <label className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          <Bus className="h-3 w-3" /> Transport
                        </label>
                        <select
                          value={stop.transportType}
                          onChange={(e) => updateStop(stop.id, { transportType: e.target.value as BudgetStop["transportType"] })}
                          className="w-full text-xs p-2 rounded-lg bg-muted/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <option value="bus">Bus (~৳1,200)</option>
                          <option value="train">Train (~৳700)</option>
                          <option value="flight">Flight (~৳5,500)</option>
                          <option value="own">Own Vehicle (৳0)</option>
                        </select>
                      </div>

                      {/* Cost Breakdown Mini */}
                      <div className="flex flex-col justify-center text-xs text-muted-foreground space-y-0.5">
                        <span>🏨 ৳{hotelCost.toLocaleString()}</span>
                        <span>🚌 ৳{transportCost.toLocaleString()}</span>
                        <span>🍽️ ৳{foodCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Add Destination */}
          {!showAdd ? (
            <button
              onClick={() => setShowAdd(true)}
              className="w-full p-5 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Destination</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border/50 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Choose a destination</h3>
                <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {availableDestinations.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">All destinations added! 🎉</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {availableDestinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => addStop(dest.id)}
                      className="group relative rounded-xl overflow-hidden h-24 hover:ring-2 hover:ring-primary transition-all"
                    >
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xs">{dest.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Total Summary */}
          {stops.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 bg-primary rounded-2xl p-6 text-primary-foreground"
            >
              <h2 className="text-xl font-bold mb-4">Trip Cost Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-primary-foreground/70 text-xs">Accommodation</p>
                  <p className="text-lg font-bold">৳{breakdown.totalAccommodation.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-primary-foreground/70 text-xs">Transport</p>
                  <p className="text-lg font-bold">৳{breakdown.totalTransport.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-primary-foreground/70 text-xs">Food ({breakdown.totalDays} days)</p>
                  <p className="text-lg font-bold">৳{breakdown.totalFood.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-primary-foreground/70 text-xs">Per Person</p>
                  <p className="text-lg font-bold">৳{breakdown.perPerson.toLocaleString()}</p>
                </div>
              </div>
              <div className="border-t border-primary-foreground/20 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/70 text-xs">Total for {travelers} {travelers === 1 ? "person" : "people"} • {stops.length} destinations • {breakdown.totalDays} nights</p>
                  <p className="text-3xl font-bold">৳{breakdown.total.toLocaleString()}</p>
                </div>
                <Link to={`/hotels?location=${stops[0].destinationId}`}>
                  <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold">
                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {stops.length === 0 && !showAdd && (
            <div className="text-center mt-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Estimate Your Trip Cost</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Add destinations, pick hotels and transport, and get an instant cost breakdown for your Bangladesh adventure.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Budget;
