import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/data/destinations";
import { format } from "date-fns";
import { CalendarIcon, Plus, X, GripVertical, MapPin, Clock, DollarSign, Trash2, Download, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, safeUuid } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface TripStop {
  id: string;
  destinationId: string;
  startDate?: Date;
  endDate?: Date;
  notes: string;
  expanded: boolean;
}

const TripPlanner = () => {
  const [tripName, setTripName] = useState("My Bangladesh Trip");
  const [stops, setStops] = useState<TripStop[]>([]);
  const [showAddPicker, setShowAddPicker] = useState(false);

  const addStop = (destId: string) => {
    setStops([...stops, {
      id: safeUuid(),
      destinationId: destId,
      notes: "",
      expanded: true,
    }]);
    setShowAddPicker(false);
  };

  const removeStop = (id: string) => {
    setStops(stops.filter((s) => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<TripStop>) => {
    setStops(stops.map((s) => s.id === id ? { ...s, ...updates } : s));
  };

  const moveStop = (index: number, direction: "up" | "down") => {
    const newStops = [...stops];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newStops.length) return;
    [newStops[index], newStops[targetIndex]] = [newStops[targetIndex], newStops[index]];
    setStops(newStops);
  };

  const totalDays = stops.reduce((acc, stop) => {
    if (stop.startDate && stop.endDate) {
      const diff = Math.ceil((stop.endDate.getTime() - stop.startDate.getTime()) / (1000 * 60 * 60 * 24));
      return acc + Math.max(diff, 1);
    }
    return acc;
  }, 0);

  const totalEstimatedCost = stops.length * 3500; // rough average per stop

  const availableDestinations = destinations.filter(
    (d) => !stops.some((s) => s.destinationId === d.id)
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Trip <span className="gradient-text">Planner</span>
            </h1>
            <p className="text-muted-foreground">
              Build your multi-destination itinerary — drag, reorder, and plan your perfect Bangladesh trip.
            </p>
          </div>

          {/* Trip Name */}
          <div className="mb-8">
            <input
              type="text"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              className="text-2xl font-bold text-foreground bg-transparent border-b-2 border-border focus:border-primary outline-none pb-2 w-full transition-colors"
              placeholder="Name your trip..."
            />
          </div>

          {/* Summary Bar */}
          {stops.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8 p-4 bg-card rounded-2xl border border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{stops.length} destinations</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{totalDays || "—"} days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">~৳{totalEstimatedCost.toLocaleString()} est.</span>
              </div>
            </div>
          )}

          {/* Stops */}
          <div className="space-y-4 mb-8">
            <AnimatePresence>
              {stops.map((stop, index) => {
                const dest = destinations.find((d) => d.id === stop.destinationId)!;
                return (
                  <motion.div
                    key={stop.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-card rounded-2xl border border-border/50 overflow-hidden"
                  >
                    {/* Stop Header */}
                    <div className="flex items-center gap-3 p-4">
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => moveStop(index, "up")}
                          disabled={index === 0}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveStop(index, "down")}
                          disabled={index === stops.length - 1}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>

                      <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-xl object-cover" />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground truncate">{dest.name}</h3>
                        <p className="text-xs text-muted-foreground">{dest.tagline}</p>
                      </div>

                      <button
                        onClick={() => updateStop(stop.id, { expanded: !stop.expanded })}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {stop.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>

                      <button
                        onClick={() => removeStop(stop.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Stop Details */}
                    {stop.expanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4"
                      >
                        {/* Dates */}
                        <div className="flex flex-wrap gap-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-[180px] justify-start text-left text-sm rounded-xl",
                                  !stop.startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {stop.startDate ? format(stop.startDate, "MMM d, yyyy") : "Start date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={stop.startDate}
                                onSelect={(d) => updateStop(stop.id, { startDate: d })}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-[180px] justify-start text-left text-sm rounded-xl",
                                  !stop.endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {stop.endDate ? format(stop.endDate, "MMM d, yyyy") : "End date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={stop.endDate}
                                onSelect={(d) => updateStop(stop.id, { endDate: d })}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="bg-muted px-3 py-1 rounded-full">🕐 Best: {dest.bestTime}</span>
                          <span className="bg-muted px-3 py-1 rounded-full">🚗 {dest.travelTime}</span>
                          <span className="bg-muted px-3 py-1 rounded-full">💰 {dest.costLevel}</span>
                          <span className="bg-muted px-3 py-1 rounded-full">🏨 {dest.hotels.length} hotels</span>
                        </div>

                        {/* Notes */}
                        <textarea
                          value={stop.notes}
                          onChange={(e) => updateStop(stop.id, { notes: e.target.value })}
                          placeholder="Add notes for this stop... (e.g., things to see, hotels to book)"
                          className="w-full p-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                          rows={2}
                        />

                        {/* Quick Links */}
                        <div className="flex gap-2">
                          <Link to={`/destination/${dest.id}`}>
                            <Button size="sm" variant="outline" className="rounded-full text-xs">View Details</Button>
                          </Link>
                          <Link to="/hotels">
                            <Button size="sm" variant="outline" className="rounded-full text-xs">Book Hotels</Button>
                          </Link>
                          <Link to="/transport">
                            <Button size="sm" variant="outline" className="rounded-full text-xs">Transport</Button>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Connector Lines */}
          {stops.length > 0 && !showAddPicker && (
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 bg-border" />
            </div>
          )}

          {/* Add Destination */}
          {!showAddPicker ? (
            <button
              onClick={() => setShowAddPicker(true)}
              className="w-full p-6 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Destination</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground">Choose a destination</h3>
                <button onClick={() => setShowAddPicker(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {availableDestinations.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All destinations have been added to your trip! 🎉
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableDestinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => addStop(dest.id)}
                      className="group relative rounded-xl overflow-hidden h-28 transition-all hover:ring-2 hover:ring-primary"
                    >
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors flex flex-col items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">{dest.name}</span>
                        <span className="text-primary-foreground/70 text-[10px]">{dest.tagline}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Empty State */}
          {stops.length === 0 && !showAddPicker && (
            <div className="text-center mt-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Start Planning Your Trip</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Add destinations to create your itinerary. Set dates, add notes, reorder stops, and plan the perfect Bangladesh adventure.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripPlanner;
