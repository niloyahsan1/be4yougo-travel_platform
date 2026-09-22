import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/data/destinations";
import { MapPin, Clock, DollarSign, AlertTriangle, Lightbulb, Star, Phone, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const DestinationDetail = () => {
  const { id } = useParams();
  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 text-center py-20">
          <h1 className="text-2xl font-bold text-foreground">Destination not found</h1>
          <Link to="/destinations" className="text-primary mt-4 inline-block">← Back to destinations</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-primary-foreground/80 text-sm font-medium mb-2">{dest.tagline}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{dest.name}</h1>
            <div className="flex gap-4 text-primary-foreground/80 text-sm">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {dest.bestTime}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {dest.travelTime}</span>
              <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {dest.costLevel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{dest.description}</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {dest.idealFor.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                ))}
              </div>
            </section>

            {/* Micro Story */}
            <section className="bg-card rounded-2xl p-6 border border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-3">A Traveler's Story</h2>
              <p className="text-muted-foreground italic leading-relaxed">"{dest.microStory}"</p>
            </section>

            {/* Cost Breakdown */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cost Breakdown</h2>
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                {dest.costBreakdown.map((item, i) => (
                  <div key={i} className={`flex justify-between px-6 py-3 ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                    <span className="text-sm text-foreground">{item.item}</span>
                    <span className="text-sm font-semibold text-primary">{item.cost}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Hotels */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Where to Stay</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {dest.hotels.map((hotel) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-2xl p-5 border border-border/50 card-hover"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-foreground text-sm">{hotel.name}</h3>
                        <span className="text-xs text-primary font-medium">{hotel.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span className="text-xs font-semibold text-foreground">{hotel.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{hotel.description}</p>
                    <p className="text-xs text-muted-foreground mb-2">📍 {hotel.location}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hotel.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{a}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-primary block">{hotel.priceRange}</span>
                        <span className="text-[9px] text-muted-foreground italic">Indicative</span>
                      </div>
                      <Link to="/hotels">
                        <Button size="sm" className="rounded-full text-xs px-4">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-secondary" /> Pro Tips
              </h3>
              <ul className="space-y-2">
                {dest.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-secondary font-bold">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mistakes */}
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" /> Common Mistakes
              </h3>
              <ul className="space-y-2">
                {dest.mistakes.map((m, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent font-bold">•</span> {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 space-y-3">
              <Link to="/compare" className="block w-full">
                <Button variant="outline" className="w-full rounded-xl">Compare with other places</Button>
              </Link>
              <Link to="/transport" className="block w-full">
                <Button variant="outline" className="w-full rounded-xl">View Transport Options</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
