import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Eye, Hotel, Ticket, Search, Flame, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { destinations } from "@/data/destinations";

interface TrendingDest { id: string; name: string; views: number; visitors: number; }

const mostBookedHotels = [
  { name: "Sayeman Beach Resort", destination: "Cox's Bazar", bookings: 1842, rating: 4.8, category: "Premium", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80" },
  { name: "Hotel The Cox Today", destination: "Cox's Bazar", bookings: 1356, rating: 4.5, category: "Standard", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=80" },
  { name: "Sajek Resort", destination: "Sajek Valley", bookings: 1120, rating: 4.7, category: "Premium", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80" },
  { name: "Grand Sultan Tea Resort", destination: "Sylhet", bookings: 980, rating: 4.6, category: "Premium", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80" },
  { name: "Nilgiri Resort", destination: "Bandarban", bookings: 870, rating: 4.4, category: "Standard", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&q=80" },
  { name: "Megh Bari Resort", destination: "Sajek Valley", bookings: 760, rating: 4.3, category: "Nice", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=300&q=80" },
];

interface LiveCounts {
  browsing: number;   // unique sessions last 5 min
  hotelsToday: number; // /hotels views today
  ticketsToday: number; // /transport views today
  viewsToday: number;  // total views today
}

const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const start = display;
    const diff = value - start;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <span ref={ref}>{display.toLocaleString()}</span>;
};

const startOfTodayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

const fiveMinAgoISO = () => new Date(Date.now() - 5 * 60 * 1000).toISOString();

const TrendingStats = () => {
  const [counts, setCounts] = useState<LiveCounts>({ browsing: 0, hotelsToday: 0, ticketsToday: 0, viewsToday: 0 });
  const [trending, setTrending] = useState<TrendingDest[]>([]);

  useEffect(() => {
    const load = async () => {
      const today = startOfTodayISO();
      const recent = fiveMinAgoISO();

      // Counts: total today, hotels today, transport today
      const [{ count: viewsToday }, { count: hotelsToday }, { count: ticketsToday }, recentRows, weekRows] = await Promise.all([
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", today),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", today).like("path", "/hotels%"),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", today).like("path", "/transport%"),
        supabase.from("page_views").select("session_id").gte("created_at", recent),
        supabase
          .from("page_views")
          .select("destination_id, session_id")
          .not("destination_id", "is", null)
          .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      const browsing = new Set((recentRows.data || []).map((r) => r.session_id).filter(Boolean)).size;

      // Aggregate trending destinations
      const map = new Map<string, { views: number; visitors: Set<string> }>();
      (weekRows.data || []).forEach((r) => {
        if (!r.destination_id) return;
        const e = map.get(r.destination_id) || { views: 0, visitors: new Set<string>() };
        e.views += 1;
        if (r.session_id) e.visitors.add(r.session_id);
        map.set(r.destination_id, e);
      });
      const list: TrendingDest[] = Array.from(map.entries())
        .map(([id, v]) => {
          const dest = destinations.find((d) => d.id === id);
          return { id, name: dest?.name || id, views: v.views, visitors: v.visitors.size };
        })
        .sort((a, b) => b.views - a.views)
        .slice(0, 6);

      setCounts({
        browsing: Math.max(browsing, 1),
        hotelsToday: hotelsToday || 0,
        ticketsToday: ticketsToday || 0,
        viewsToday: viewsToday || 0,
      });
      setTrending(list);
    };
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const liveStats = [
    { icon: Eye, label: "People Browsing Now", value: counts.browsing },
    { icon: Hotel, label: "Hotels Viewed Today", value: counts.hotelsToday },
    { icon: Ticket, label: "Transport Viewed Today", value: counts.ticketsToday },
    { icon: Search, label: "Total Views Today", value: counts.viewsToday },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Flame className="h-4 w-4 animate-pulse" />
            Live & Trending
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What's <span className="gradient-text">Trending</span> Right Now
          </h2>
          <p className="text-muted-foreground mt-2">Real visitor activity from this site</p>
        </div>

        {/* Live Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {liveStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-5 text-center"
            >
              <div className="absolute top-2 right-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              </div>
              <stat.icon className="h-7 w-7 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                <AnimatedNumber value={stat.value} />
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Trending Destinations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-foreground">Trending Destinations · Last 7 Days</h3>
          </div>
          <div className="divide-y divide-border/30">
            {trending.length === 0 && (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                Collecting visitor data — trending places will appear here as people explore.
              </div>
            )}
            {trending.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">#{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link to={`/destination/${dest.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                        {dest.name}
                      </Link>
                      {i < 3 && (
                        <span className="bg-destructive/10 text-destructive text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <Flame className="h-3 w-3" /> HOT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {dest.visitors.toLocaleString()} unique {dest.visitors === 1 ? "visitor" : "visitors"} this week
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{dest.views.toLocaleString()} views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Most Booked Hotels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-border/50 bg-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-foreground">Most Booked Hotels</h3>
            </div>
            <Link to="/hotels" className="text-xs text-primary font-medium hover:underline">
              View All Hotels →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {mostBookedHotels.map((hotel, i) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex gap-3">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-foreground text-sm truncate">{hotel.name}</h4>
                    <p className="text-xs text-muted-foreground">{hotel.destination}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="flex items-center gap-0.5 text-xs font-medium text-amber-500">
                        <Star className="h-3 w-3 fill-current" /> {hotel.rating}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        hotel.category === "Premium"
                          ? "bg-primary/10 text-primary"
                          : hotel.category === "Standard"
                          ? "bg-accent/10 text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {hotel.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="font-bold text-foreground">{hotel.bookings.toLocaleString()}</span> bookings
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingStats;
