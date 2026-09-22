import HeroSection from "@/components/HeroSection";
import DestinationCard from "@/components/DestinationCard";
import WelcomePopup from "@/components/WelcomePopup";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { destinations } from "@/data/destinations";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Hotel, Bus, BarChart3, MapPin } from "lucide-react";
import TrendingStats from "@/components/TrendingStats";
import CallCenterSection from "@/components/CallCenterSection";
import WeatherStrip from "@/components/WeatherStrip";
import CultureSection from "@/components/CultureSection";
import TripBudgetCalculator from "@/components/TripBudgetCalculator";
import { Wallet } from "lucide-react";

const quickInsights = [
  { icon: Hotel, label: "50+ Hotels", desc: "Verified accommodations across Bangladesh", link: "/hotels" },
  { icon: Bus, label: "Transport & Fares", desc: "Bus, train, and flight booking info", link: "/transport" },
  { icon: BarChart3, label: "Compare Places", desc: "Side-by-side destination comparison", link: "/compare" },
  { icon: MapPin, label: "10 Destinations", desc: "Curated travel guides with local insights", link: "/destinations" },
];

const Index = () => {
  const featured = destinations.slice(0, 4);

  return (
    <div className="min-h-screen">
      <WelcomePopup />
      <Navbar />
      <HeroSection />

      {/* Full Trip Budget Calculator */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/60 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Wallet className="h-3.5 w-3.5" /> Trip Budget
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Plan your trip <span className="gradient-text">budget instantly</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl mx-auto">
              Pick a destination, hotel and transport — we'll add it all up with real prices from our guide.
            </p>
          </div>
          <TripBudgetCalculator />
        </div>
      </section>

      {/* Quick Insights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickInsights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={item.link}
                  className="block p-6 rounded-2xl bg-card border border-border/50 card-hover text-center"
                >
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-foreground text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Stats */}
      <TrendingStats />

      {/* Live Weather */}
      <WeatherStrip />

      {/* Featured Destinations */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Featured <span className="gradient-text">Destinations</span>
              </h2>
              <p className="text-muted-foreground mt-2">Discover Bangladesh's most stunning places</p>
            </div>
            <Link to="/destinations" className="hidden md:flex items-center gap-1 text-primary font-medium text-sm hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </div>
          <div className="md:hidden mt-6 text-center">
            <Link to="/destinations" className="text-primary font-medium text-sm">
              View All Destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* Honeymoon Packages */}
      {/* Bondhu (Friends Plan) */}
      {/* Stories Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Travel <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Real experiences from real travelers. Get inspired before your next trip.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {destinations.slice(0, 3).map((dest) => (
              <Link key={dest.id} to={`/destination/${dest.id}`} className="group">
                <div className="card-hover bg-card rounded-2xl p-6 border border-border/50 text-left">
                  <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-4">
                    "{dest.microStory}"
                  </p>
                  <p className="mt-4 text-xs font-semibold text-primary">
                    — {dest.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/stories" className="text-primary font-medium text-sm hover:underline">
            Read All Stories →
          </Link>
        </div>
      </section>

      {/* Bangladesh Culture */}
      <CultureSection />

      {/* Call Center Support */}
      <CallCenterSection />

      <Footer />
    </div>
  );
};

export default Index;
