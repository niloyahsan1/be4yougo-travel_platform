import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/data/destinations";
import { Search, Star, MapPin, ArrowLeft, ChevronRight, Crown, Award, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import type { Hotel } from "@/data/destinations";

const categoryConfig = {
  Premium: { icon: Crown, color: "from-blue-600 to-indigo-600", badge: "bg-blue-600 text-white" },
  Standard: { icon: Award, color: "from-sky-500 to-blue-500", badge: "bg-sky-500 text-white" },
  Nice: { icon: ThumbsUp, color: "from-teal-500 to-cyan-500", badge: "bg-teal-500 text-white" },
};

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const highlightHotel = searchParams.get("hotel");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [bookingHotel, setBookingHotel] = useState<(Hotel & { destination: string; destinationId: string }) | null>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const selectedDest = destinations.find((d) => d.id === location);

  useEffect(() => {
    if (highlightHotel && highlightRef.current) {
      setTimeout(() => highlightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
    }
  }, [highlightHotel]);

  // Destination selection view
  if (!selectedDest) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Choose Your <span className="gradient-text">Destination</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <p className="text-muted-foreground">
                Select a destination to explore verified hotels & accommodations.
              </p>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Online Booking Coming Soon
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                >
                  <Link
                    to={`/hotels?location=${dest.id}`}
                    className="group block rounded-2xl overflow-hidden border border-border/50 card-hover bg-card"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                        <p className="text-white/80 text-xs">{dest.tagline}</p>
                      </div>
                      <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {dest.hotels.length} Hotels
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{dest.idealFor.slice(0, 3).join(" · ")}</span>
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Filtered hotels view
  const filtered = selectedDest.hotels.filter((h) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || h.name.toLowerCase().includes(q) || h.amenities.some((a) => a.toLowerCase().includes(q)) || h.type.toLowerCase().includes(q);
    const matchesCategory = categoryFilter === "All" || h.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/hotels">
              <Button variant="outline" size="sm" className="rounded-full gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" /> Change Destination
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Hotels in <span className="gradient-text">{selectedDest.name}</span>
          </h1>
          <p className="text-muted-foreground mb-6">{selectedDest.hotels.length} accommodations available</p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Premium", "Standard", "Nice"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  categoryFilter === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat !== "All" && (() => {
                  const Icon = categoryConfig[cat as keyof typeof categoryConfig].icon;
                  return <Icon className="h-3.5 w-3.5" />;
                })()}
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search hotels, amenities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Hotels Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((hotel, i) => {
              const isHighlighted = highlightHotel === hotel.name;
              const catConfig = categoryConfig[hotel.category];
              const CatIcon = catConfig.icon;
              return (
                <motion.div
                  key={hotel.id}
                  ref={isHighlighted ? highlightRef : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  className={`group bg-card rounded-2xl overflow-hidden border card-hover ${isHighlighted ? "border-primary ring-2 ring-primary/30" : "border-border/50"}`}
                >
                  {/* Hotel Gallery */}
                  <div className="relative h-60 overflow-hidden bg-muted">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`absolute top-3 right-3 ${catConfig.badge} px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg`}>
                      <CatIcon className="h-3 w-3" /> {hotel.category}
                    </div>
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-medium border border-white/10">
                      {hotel.type}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-white text-lg leading-tight drop-shadow-md">{hotel.name}</h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-1 bg-white/25 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-white">{hotel.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/25 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                          <MapPin className="h-3 w-3 text-white" />
                          <span className="text-[10px] font-medium text-white line-clamp-1">{hotel.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-2">{hotel.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hotel.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="text-[10px] px-2.5 py-1 rounded-lg bg-muted text-foreground/70 font-medium">{a}</span>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <span className="text-[10px] px-2.5 py-1 rounded-lg bg-muted text-primary font-medium">+{hotel.amenities.length - 4}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Per Night</p>
                        <p className="text-base font-bold text-primary">{hotel.priceRange}</p>
                        <p className="text-[9px] text-muted-foreground italic">Indicative — confirm with hotel</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full px-4 text-xs"
                            onClick={() => setBookingHotel({ ...hotel, destination: selectedDest.name, destinationId: selectedDest.id })}
                          >
                            Book Room
                          </Button>
                        </div>
                        <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
                          Direct Booking Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No hotels found. Try a different search or category.</div>
          )}
        </div>
      </div>
      <Footer />
      {bookingHotel && (
        <BookingModal hotel={bookingHotel} onClose={() => setBookingHotel(null)} />
      )}
    </div>
  );
};

export default Hotels;
