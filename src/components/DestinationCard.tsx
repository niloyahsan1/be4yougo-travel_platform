import { Link } from "react-router-dom";
import { MapPin, Clock, DollarSign } from "lucide-react";
import type { Destination } from "@/data/destinations";

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <Link to={`/destination/${destination.id}`} className="group block">
      <div className="card-hover bg-card rounded-2xl overflow-hidden border border-border/50">
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-foreground">
            {destination.costLevel}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-1">{destination.name}</h3>
          <p className="text-sm text-primary font-medium mb-3">{destination.tagline}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {destination.bestTime}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {destination.travelTime}
            </span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {destination.idealFor.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
