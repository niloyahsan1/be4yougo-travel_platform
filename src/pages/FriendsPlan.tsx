import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, MapPin, Star, Calendar, DollarSign, Mountain, Waves, Trees, Tent } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import type { Hotel } from "@/data/destinations";

const friendsPackages = [
  {
    id: "sajek-squad",
    title: "Sajek Squad Retreat",
    destination: "Sajek Valley",
    destinationId: "sajek-valley",
    duration: "3 Days / 2 Nights",
    price: "৳3,500 – ৳6,000/person",
    rating: 4.6,
    groupSize: "4–8 friends",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    highlights: ["Hilltop bonfire night", "Sunrise trek to Konglak Hill", "Group BBQ dinner", "Tribal village walk"],
    bestTime: "Oct – Mar",
    vibe: "Adventure",
    vibeIcon: Mountain,
    description: "Escape the city with your crew to the clouds of Sajek. Trek, feast, and bond over bonfires under a blanket of stars.",
    hotel: { id: "fp-h1", name: "Cloud Cottage Sajek", type: "Cottage", priceRange: "৳2,000 – ৳4,000", rating: 3.8, amenities: ["Mountain View", "Bonfire Area", "Group Rooms"], description: "Budget-friendly group cottages with stunning sunrise views.", location: "Ruilui Para, Sajek", contact: "+880-1700-000004", category: "Nice" as const, image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600" },
  },
  {
    id: "coxs-bazar-beach-bash",
    title: "Cox's Bazar Beach Bash",
    destination: "Cox's Bazar",
    destinationId: "coxs-bazar",
    duration: "4 Days / 3 Nights",
    price: "৳5,000 – ৳10,000/person",
    rating: 4.7,
    groupSize: "4–12 friends",
    image: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76cb?w=800",
    highlights: ["Beach volleyball tournament", "Marine Drive road trip", "Seafood feast night", "Inani Beach sunset party"],
    bestTime: "Nov – Mar",
    vibe: "Beach Party",
    vibeIcon: Waves,
    description: "Sun, sand, and your best friends — the ultimate beach getaway. Drive the iconic Marine Drive and party at sunset.",
    hotel: { id: "fp-h2", name: "Sea Pearl Beach Resort", type: "Resort", priceRange: "৳4,000 – ৳12,000", rating: 4.3, amenities: ["Beach Access", "Pool", "Restaurant", "Group Discounts"], description: "Family-friendly resort with direct beach access.", location: "Marine Drive, Cox's Bazar", contact: "+880-1700-000014", category: "Standard" as const, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
  },
  {
    id: "sylhet-tea-trip",
    title: "Sylhet Tea Trail Trip",
    destination: "Sylhet",
    destinationId: "sylhet",
    duration: "3 Days / 2 Nights",
    price: "৳3,000 – ৳7,000/person",
    rating: 4.5,
    groupSize: "3–8 friends",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
    highlights: ["Tea garden photo walk", "Lalakhal boat ride", "Seven-layer tea challenge", "Ratargul swamp dawn trip"],
    bestTime: "Oct – Mar",
    vibe: "Chill & Explore",
    vibeIcon: Trees,
    description: "Wander through emerald tea gardens, ride turquoise rivers, and compete over who can drink the most seven-layer tea.",
    hotel: { id: "fp-h3", name: "Nazimgarh Garden Resort", type: "Resort", priceRange: "৳5,000 – ৳12,000", rating: 4.4, amenities: ["Garden", "Pool", "Restaurant", "Group Packages"], description: "Lush garden resort on the outskirts of Sylhet.", location: "Nazimgarh, Sylhet", contact: "+880-1700-000021", category: "Standard" as const, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
  },
  {
    id: "bandarban-trek-squad",
    title: "Bandarban Trek Squad",
    destination: "Bandarban",
    destinationId: "bandarban",
    duration: "4 Days / 3 Nights",
    price: "৳4,000 – ৳8,000/person",
    rating: 4.4,
    groupSize: "4–10 friends",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    highlights: ["Nilgiri sunrise expedition", "Boga Lake trek", "Golden Temple visit", "Campfire storytelling"],
    bestTime: "Nov – Mar",
    vibe: "Trekking",
    vibeIcon: Mountain,
    description: "Challenge your squad with Bangladesh's most rewarding treks. Conquer peaks, cross streams, and camp under the stars.",
    hotel: { id: "fp-h4", name: "Sairu Hill Resort", type: "Resort", priceRange: "৳4,000 – ৳8,000", rating: 4.3, amenities: ["Swimming Pool", "Restaurant", "Group Rooms", "Trekking Guides"], description: "Luxury resort with modern amenities amidst nature.", location: "Chimbuk Road, Bandarban", contact: "+880-1700-000008", category: "Standard" as const, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600" },
  },
  {
    id: "sundarbans-adventure-gang",
    title: "Sundarbans Adventure Gang",
    destination: "Sundarbans",
    destinationId: "sundarbans",
    duration: "3 Days / 2 Nights",
    price: "৳4,500 – ৳9,000/person",
    rating: 4.3,
    groupSize: "6–15 friends",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    highlights: ["Group houseboat cruise", "Tiger spotting expedition", "Mangrove kayaking race", "Riverside camp dinner"],
    bestTime: "Nov – Feb",
    vibe: "Wildlife",
    vibeIcon: Trees,
    description: "Hire a houseboat with your gang and cruise through the world's largest mangrove forest. Spot tigers, crocs, and dolphins.",
    hotel: { id: "fp-h5", name: "Sundarban Tiger Camp", type: "Eco Lodge", priceRange: "৳5,000 – ৳12,000", rating: 4.3, amenities: ["Boat Tour", "Guide", "Meals Included", "Group Tents"], description: "Eco-lodge inside the forest with guided wildlife tours.", location: "Sundarbans East", contact: "+880-1700-000034", category: "Standard" as const, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600" },
  },
  {
    id: "rangamati-lake-chill",
    title: "Rangamati Lake Chill",
    destination: "Rangamati",
    destinationId: "rangamati",
    duration: "3 Days / 2 Nights",
    price: "৳3,000 – ৳5,500/person",
    rating: 4.2,
    groupSize: "4–8 friends",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    highlights: ["Kaptai Lake speedboat tour", "Hanging bridge dare", "Chakma food tasting", "Lake sunset cruise"],
    bestTime: "Oct – Mar",
    vibe: "Camping",
    vibeIcon: Tent,
    description: "Cruise the golden waters of Kaptai Lake, dare each other on the hanging bridge, and explore indigenous cultures together.",
    hotel: { id: "fp-h6", name: "Parjatan Motel Rangamati", type: "Hotel", priceRange: "৳2,000 – ৳5,000", rating: 3.9, amenities: ["Lake View", "Restaurant", "Boating", "Group Rooms"], description: "Government motel with beautiful lake views.", location: "Rangamati Town", contact: "+880-1700-000040", category: "Nice" as const, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600" },
  },
];

const vibeColors: Record<string, string> = {
  "Adventure": "from-blue-500 to-cyan-500",
  "Beach Party": "from-sky-400 to-blue-500",
  "Chill & Explore": "from-teal-500 to-emerald-500",
  "Trekking": "from-blue-600 to-indigo-500",
  "Wildlife": "from-emerald-500 to-green-600",
  "Camping": "from-cyan-500 to-blue-600",
};

const FriendsPlan = () => {
  const [bookingHotel, setBookingHotel] = useState<(Hotel & { destination: string; destinationId: string }) | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Users className="h-4 w-4" />
              Bondhu — Friends Plan
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-3"
            >
              Trip With <span className="gradient-text">Your Squad</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Curated group travel packages for friends — adventure, bonding, and memories that last a lifetime.
            </motion.p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {friendsPackages.map((pkg, i) => {
              const gradient = vibeColors[pkg.vibe] || "from-blue-500 to-cyan-500";
              const VibeIcon = pkg.vibeIcon;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden card-hover group">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute top-3 right-3 bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                        <VibeIcon className="h-3 w-3" /> {pkg.vibe}
                      </div>
                      <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Users className="h-3 w-3" /> {pkg.groupSize}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs opacity-80">{pkg.duration}</p>
                        <p className="font-bold text-lg leading-tight">{pkg.title}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {pkg.destination}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          {pkg.rating} Rating
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          {pkg.bestTime}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5 text-primary" />
                          {pkg.price}
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-1.5 mb-4">
                        {pkg.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs">
                            <Users className="h-3 w-3 text-primary shrink-0" />
                            <span className="text-foreground/80">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Hotel Preview */}
                      <div className="p-3 rounded-xl bg-muted/50 border border-border/30 mb-4">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Recommended Stay</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{pkg.hotel.name}</p>
                            <p className="text-xs text-muted-foreground">{pkg.hotel.type} · {pkg.hotel.priceRange}/night</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="font-bold">{pkg.hotel.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          to={`/destination/${pkg.destinationId}`}
                          className="flex-1 block text-center bg-muted text-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-muted/80 transition-all"
                        >
                          Explore →
                        </Link>
                        <button
                          onClick={() => setBookingHotel({ ...pkg.hotel, destination: pkg.destination, destinationId: pkg.destinationId } as Hotel & { destination: string; destinationId: string })}
                          className="flex-1 block text-center bg-gradient-to-r from-primary to-blue-600 text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                        >
                          Book Hotel
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      {bookingHotel && (
        <BookingModal hotel={bookingHotel} onClose={() => setBookingHotel(null)} />
      )}
    </div>
  );
};

export default FriendsPlan;
