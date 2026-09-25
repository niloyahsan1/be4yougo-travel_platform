import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Star, MapPin, X, Users, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Hotel } from "@/data/destinations";

interface BookingModalProps {
  hotel: Hotel & { destination: string; destinationId: string };
  onClose: () => void;
}

const roomTypes = [
  { name: "Standard", multiplier: 1 },
  { name: "Deluxe", multiplier: 1.5 },
  { name: "Suite", multiplier: 2.2 },
];

const BookingModal = ({ hotel, onClose }: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("Standard");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => onClose(), 2500);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {confirmed ? <Check className="h-5 w-5 text-green-500" /> : null}
            {confirmed ? "Booking Confirmed!" : `Book ${hotel.name}`}
          </DialogTitle>
        </DialogHeader>

        {confirmed ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-foreground font-medium">Your booking at {hotel.name} has been confirmed.</p>
            <p className="text-sm text-muted-foreground mt-1">{hotel.destination}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Hotel info */}
            <div className="flex items-start justify-between p-3 rounded-xl bg-muted/50">
              <div>
                <p className="font-semibold text-foreground text-sm">{hotel.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="h-3 w-3" /> {hotel.location}, {hotel.destination}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="font-bold">{hotel.rating}</span>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label className="text-xs font-medium text-foreground mb-1.5 block">Room Type</label>
              <div className="grid grid-cols-3 gap-2">
                {roomTypes.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => setRoomType(r.name)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      roomType === r.name
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">Check-in</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left text-xs h-10 px-3 truncate", !checkIn && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">{checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus className="p-3 pointer-events-auto" disabled={(d) => d < new Date()} />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">Check-out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left text-xs h-10 px-3 truncate", !checkOut && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                      <span className="truncate">{checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}</span>
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
              <label className="text-xs font-medium text-foreground mb-1.5 block">Guests</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setGuests(Math.max(1, guests - 1))}>-</Button>
                <span className="text-sm font-medium flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {guests}</span>
                <Button variant="outline" size="sm" onClick={() => setGuests(Math.min(10, guests + 1))}>+</Button>
              </div>
            </div>

            {/* Price */}
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per night</span>
                <span className="font-bold text-primary">{hotel.priceRange}</span>
              </div>
            </div>

            <Button className="w-full rounded-xl" onClick={handleConfirm} disabled={!checkIn || !checkOut}>
              Confirm Booking
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
