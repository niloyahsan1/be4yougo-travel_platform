import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, Calendar, DollarSign, Check, CalendarIcon, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const honeymoonPackages = [
  {
    id: "coxs-bazar-romance",
    title: "Cox's Bazar Romantic Escape",
    destination: "Cox's Bazar",
    destinationId: "coxs-bazar",
    duration: "4 Days / 3 Nights",
    price: "৳25,000 – ৳60,000",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    highlights: ["Beachfront suite", "Candlelight dinner on the beach", "Marine Drive sunset tour", "Couples spa session"],
    bestTime: "Nov – Mar",
    description: "Walk hand-in-hand along the world's longest natural sea beach. Enjoy private dinners with the sound of waves as your soundtrack.",
    hotels: ["Long Beach Hotel", "Ocean Paradise Hotel", "Sayeman Beach Resort"],
  },
  {
    id: "sajek-clouds",
    title: "Sajek Valley Cloud Retreat",
    destination: "Sajek Valley",
    destinationId: "sajek-valley",
    duration: "3 Days / 2 Nights",
    price: "৳15,000 – ৳35,000",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    highlights: ["Hilltop cottage stay", "Sunrise from Konglak Hill", "Bonfire under the stars", "Local tribal dinner experience"],
    bestTime: "Oct – Mar",
    description: "Wake up above the clouds together. Sajek's misty mornings and starlit nights create the perfect romantic backdrop.",
    hotels: ["Sajek Hill View Resort", "Sajek Resort", "Megh Machang"],
  },
  {
    id: "saint-martin-paradise",
    title: "Saint Martin's Island Paradise",
    destination: "Saint Martin's Island",
    destinationId: "saint-martin",
    duration: "3 Days / 2 Nights",
    price: "৳18,000 – ৳40,000",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800",
    highlights: ["Private beach walk", "Snorkeling together", "Fresh seafood BBQ", "Bioluminescent night beach"],
    bestTime: "Nov – Feb",
    description: "Bangladesh's only coral island offers crystal-clear waters, coconut palms, and nights lit by bioluminescent waves.",
    hotels: ["Dera Resort", "Blue Marine Resort", "Naf Resort"],
  },
  {
    id: "sylhet-tea-romance",
    title: "Sylhet Tea Garden Romance",
    destination: "Sylhet",
    destinationId: "sylhet",
    duration: "4 Days / 3 Nights",
    price: "৳20,000 – ৳50,000",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800",
    highlights: ["Tea estate resort stay", "Lalakhal boat ride", "Ratargul swamp forest dawn", "Seven-layer tea tasting"],
    bestTime: "Oct – Mar",
    description: "Stroll through endless tea gardens, take a boat ride on turquoise waters, and stay at a luxury tea estate resort.",
    hotels: ["Grand Sultan Tea Resort", "Nazimgarh Garden Resort", "Jaintia Hill Resort"],
  },
  {
    id: "sundarbans-adventure",
    title: "Sundarbans Couple's Adventure",
    destination: "Sundarbans",
    destinationId: "sundarbans",
    duration: "3 Days / 2 Nights",
    price: "৳16,000 – ৳35,000",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
    highlights: ["Luxury houseboat cruise", "Wildlife watching", "Mangrove kayaking", "Riverside dinner"],
    bestTime: "Nov – Feb",
    description: "For adventurous couples — cruise through mangrove channels, spot wildlife, and dine on the river under the stars.",
    hotels: ["Royal Bengal Cruise", "Sundarban Tiger Camp", "Sundarbans Eco Resort"],
  },
  {
    id: "rangamati-lake",
    title: "Rangamati Lakeside Getaway",
    destination: "Rangamati",
    destinationId: "rangamati",
    duration: "3 Days / 2 Nights",
    price: "৳14,000 – ৳30,000",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
    highlights: ["Kaptai Lake boat tour", "Hanging bridge walk", "Chakma cultural evening", "Lakeside sunset dinner"],
    bestTime: "Oct – Mar",
    description: "Float on the golden waters of Kaptai Lake as sunset paints the hills. A peaceful, intimate escape.",
    hotels: ["Lake Shore Resort", "Hanging Bridge Resort", "Parjatan Motel Rangamati"],
  },
];

interface BookingData {
  packageId: string;
  packageTitle: string;
  selectedHotel: string;
  checkIn?: Date;
  checkOut?: Date;
  guests: number;
}

const Honeymoon = () => {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleBook = (pkg: typeof honeymoonPackages[0]) => {
    setBooking({
      packageId: pkg.id,
      packageTitle: pkg.title,
      selectedHotel: pkg.hotels[0],
      guests: 2,
    });
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setBooking(null);
      setConfirmed(false);
    }, 2500);
  };

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
              className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Heart className="h-4 w-4 fill-pink-500" />
              Honeymoon Plans
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-3"
            >
              Romantic <span className="gradient-text">Getaways</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Curated honeymoon packages across Bangladesh's most beautiful destinations. Start your journey together.
            </motion.p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {honeymoonPackages.map((pkg, i) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Heart className="h-3 w-3 fill-white" /> Honeymoon
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-xs opacity-80">{pkg.duration}</p>
                      <p className="font-bold text-lg">{pkg.title}</p>
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
                          <Heart className="h-3 w-3 text-pink-400 fill-pink-400 shrink-0" />
                          <span className="text-foreground/80">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hotels Available */}
                    <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-100 mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Available Hotels</p>
                      {pkg.hotels.map((h) => (
                        <p key={h} className="text-xs text-foreground/80">• {h}</p>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/destination/${pkg.destinationId}`}
                        className="flex-1 block text-center bg-muted text-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-muted/80 transition-all"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleBook(pkg)}
                        className="flex-1 block text-center bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {/* Booking Modal */}
      {booking && (
        <Dialog open onOpenChange={() => { setBooking(null); setConfirmed(false); }}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                {confirmed ? <Check className="h-5 w-5 text-green-500" /> : <Heart className="h-5 w-5 text-pink-500" />}
                {confirmed ? "Booking Confirmed!" : `Book: ${booking.packageTitle}`}
              </DialogTitle>
            </DialogHeader>

            {confirmed ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-foreground font-medium">Your honeymoon package has been booked!</p>
                <p className="text-sm text-muted-foreground mt-1">{booking.packageTitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Hotel: {booking.selectedHotel}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Hotel Selection */}
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Select Hotel</label>
                  <div className="space-y-2">
                    {honeymoonPackages.find(p => p.id === booking.packageId)?.hotels.map((h) => (
                      <button
                        key={h}
                        onClick={() => setBooking({ ...booking, selectedHotel: h })}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          booking.selectedHotel === h
                            ? "bg-pink-500 text-white shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Check-in</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left text-xs", !booking.checkIn && "text-muted-foreground")}>
                          <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                          {booking.checkIn ? format(booking.checkIn, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarPicker mode="single" selected={booking.checkIn} onSelect={(d) => setBooking({ ...booking, checkIn: d })} initialFocus className="p-3 pointer-events-auto" disabled={(d) => d < new Date()} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Check-out</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left text-xs", !booking.checkOut && "text-muted-foreground")}>
                          <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                          {booking.checkOut ? format(booking.checkOut, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarPicker mode="single" selected={booking.checkOut} onSelect={(d) => setBooking({ ...booking, checkOut: d })} initialFocus className="p-3 pointer-events-auto" disabled={(d) => d < (booking.checkIn || new Date())} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Guests</label>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => setBooking({ ...booking, guests: Math.max(1, booking.guests - 1) })}>-</Button>
                    <span className="text-sm font-medium flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {booking.guests}</span>
                    <Button variant="outline" size="sm" onClick={() => setBooking({ ...booking, guests: Math.min(10, booking.guests + 1) })}>+</Button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="p-3 rounded-xl bg-pink-50 border border-pink-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Package Price</span>
                    <span className="font-bold text-pink-600">
                      {honeymoonPackages.find(p => p.id === booking.packageId)?.price}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  onClick={handleConfirm}
                  disabled={!booking.checkIn || !booking.checkOut}
                >
                  <Heart className="h-4 w-4 mr-2" /> Confirm Honeymoon Booking
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Honeymoon;
