import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, getAllHotels } from "@/data/destinations";
import { CalendarIcon, Star, MapPin, Users, Check, ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const roomTypes = [
  { name: "Standard", multiplier: 1, desc: "Comfortable room with essential amenities" },
  { name: "Deluxe", multiplier: 1.5, desc: "Spacious room with premium furnishings" },
  { name: "Suite", multiplier: 2.2, desc: "Luxury suite with living area and views" },
];

const parseBasePrice = (priceRange: string): number => {
  const match = priceRange.match(/[\d,]+/);
  if (match) return parseInt(match[0].replace(/,/g, ""));
  return 3000;
};

const getRoomPrice = (basePrice: number, multiplier: number): string => {
  const price = Math.round(basePrice * multiplier);
  return `৳${price.toLocaleString()}`;
};

const Booking = () => {
  const [searchParams] = useSearchParams();
  const hotelName = searchParams.get("hotel");
  const destId = searchParams.get("dest");

  const allHotels = getAllHotels();
  const hotel = allHotels.find((h) => h.name === hotelName);

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("Standard");
  const [confirmed, setConfirmed] = useState(false);

  if (!hotel) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Hotel not found</h1>
          <Link to="/hotels"><Button>Browse Hotels</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const bookingId = `B4U-${Date.now().toString(36).toUpperCase()}`;

  if (confirmed) {
    const basePrice = parseBasePrice(hotel.priceRange);
    const selectedRoom = roomTypes.find(r => r.name === roomType)!;
    const perNight = Math.round(basePrice * selectedRoom.multiplier);
    const nights = checkIn && checkOut ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))) : 1;
    const subtotal = perNight * nights;
    const tax = Math.round(subtotal * 0.15);
    const total = subtotal + tax;

    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto">
            {/* Print button - hidden when printing */}
            <div className="flex justify-end gap-2 mb-4 print:hidden">
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.print()}>
                <Printer className="h-4 w-4" /> Print Receipt
              </Button>
            </div>

            {/* Receipt Card */}
            <div id="booking-receipt" className="bg-card rounded-2xl border border-border overflow-hidden print:border-none print:shadow-none">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-center text-primary-foreground">
                <h1 className="text-2xl font-bold">B4YouGo</h1>
                <p className="text-sm opacity-80">Travel Booking Confirmation</p>
              </div>

              {/* Success badge */}
              <div className="flex flex-col items-center pt-6">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Check className="h-7 w-7 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Booking Confirmed!</h2>
                <p className="text-xs text-muted-foreground mt-1">Booking ID: <span className="font-mono font-semibold">{bookingId}</span></p>
              </div>

              <div className="p-6 space-y-5">
                {/* Hotel Details */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Hotel Details</h3>
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Hotel</span><span className="font-semibold text-foreground">{hotel.name}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Location</span><span className="font-medium">{hotel.location}, {hotel.destination}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rating</span><span className="font-medium flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" />{hotel.rating}</span></div>
                  </div>
                </div>

                {/* Stay Details */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Stay Details</h3>
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Room Type</span><span className="font-semibold text-foreground">{roomType}</span></div>
                    {checkIn && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Check-in</span><span className="font-medium">{format(checkIn, "PPP")}</span></div>}
                    {checkOut && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Check-out</span><span className="font-medium">{format(checkOut, "PPP")}</span></div>}
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Duration</span><span className="font-medium">{nights} night{nights > 1 ? "s" : ""}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Guests</span><span className="font-medium">{guests}</span></div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Payment Summary</h3>
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{roomType} × {nights} night{nights > 1 ? "s" : ""}</span><span>৳{subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Tax & Service (15%)</span><span>৳{tax.toLocaleString()}</span></div>
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base"><span>Total Amount</span><span className="text-primary">৳{total.toLocaleString()}</span></div>
                  </div>
                </div>

                {/* Footer note */}
                <div className="text-center text-xs text-muted-foreground border-t border-border pt-4 space-y-1">
                  <p>Please present this receipt at check-in.</p>
                  <p>For support, call our helpline or use live chat.</p>
                  <p className="font-mono text-[10px] mt-2">Generated on {format(new Date(), "PPP 'at' p")}</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 print:hidden">
              <Link to="/hotels"><Button variant="outline" className="rounded-full">Browse More Hotels</Button></Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to={destId ? `/hotels?location=${destId}` : "/hotels"}>
            <Button variant="ghost" size="sm" className="gap-1.5 mb-4"><ArrowLeft className="h-3.5 w-3.5" /> Back to Hotels</Button>
          </Link>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Hotel Info */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-2xl border border-border overflow-hidden sticky top-24">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-5">
                  <h2 className="text-xl font-bold text-white">{hotel.name}</h2>
                  <p className="text-white/80 text-sm">{hotel.type}</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> {hotel.location}, {hotel.destination}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" /> <span className="font-bold">{hotel.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{hotel.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {hotel.amenities.map((a) => (
                      <span key={a} className="text-[10px] px-2.5 py-1 rounded-lg bg-muted text-foreground/70 font-medium">{a}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">Price per night</p>
                    <p className="text-lg font-bold text-primary">{hotel.priceRange}</p>
                    <p className="text-[10px] text-muted-foreground italic mt-1">Indicative price — final rate confirmed by hotel at check-in.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="md:col-span-3 space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Complete Your Booking</h1>

              {/* Room Type */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Select Room Type</label>
                <div className="space-y-2">
                  {roomTypes.map((r) => {
                    const basePrice = parseBasePrice(hotel.priceRange);
                    const price = getRoomPrice(basePrice, r.multiplier);
                    return (
                      <button
                        key={r.name}
                        onClick={() => setRoomType(r.name)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all ${
                          roomType === r.name ? "bg-primary/10 border-2 border-primary" : "bg-card border border-border hover:border-primary/30"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-sm text-foreground">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.desc}</p>
                        </div>
                        <span className="text-sm font-bold text-primary">{price}<span className="text-xs font-normal text-muted-foreground">/night</span></span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Check-in Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left", !checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus className="p-3 pointer-events-auto" disabled={(d) => d < new Date()} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Check-out Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left", !checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus className="p-3 pointer-events-auto" disabled={(d) => d < (checkIn || new Date())} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => setGuests(Math.max(1, guests - 1))}>-</Button>
                  <span className="text-base font-medium flex items-center gap-2"><Users className="h-4 w-4" /> {guests} {guests === 1 ? "Guest" : "Guests"}</span>
                  <Button variant="outline" size="sm" onClick={() => setGuests(Math.min(10, guests + 1))}>+</Button>
                </div>
              </div>

              {/* Total Payment Summary */}
              {checkIn && checkOut && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-5 space-y-3">
                  <h3 className="font-semibold text-foreground">Payment Summary</h3>
                  {(() => {
                    const basePrice = parseBasePrice(hotel.priceRange);
                    const selectedRoom = roomTypes.find(r => r.name === roomType)!;
                    const perNight = Math.round(basePrice * selectedRoom.multiplier);
                    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
                    const subtotal = perNight * nights;
                    const tax = Math.round(subtotal * 0.15);
                    const total = subtotal + tax;
                    return (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">{selectedRoom.name} Room × {nights} night{nights > 1 ? "s" : ""}</span><span>৳{subtotal.toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Tax & Service (15%)</span><span>৳{tax.toLocaleString()}</span></div>
                        <div className="border-t border-border pt-2 flex justify-between font-bold text-base"><span>Total</span><span className="text-primary">৳{total.toLocaleString()}</span></div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              <Button className="w-full rounded-xl h-12 text-base" onClick={() => setConfirmed(true)} disabled={!checkIn || !checkOut}>
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
