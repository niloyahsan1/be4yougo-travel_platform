import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fullMoonDates } from "@/data/news";
import { Moon, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const getCountdown = (dateStr: string) => {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
};

const getNextFullMoon = () => {
  const now = Date.now();
  return fullMoonDates.find((fm) => new Date(fm.date).getTime() > now);
};

const FullMoon = () => {
  const nextMoon = getNextFullMoon();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Full Moon <span className="gradient-text">Calendar</span>
          </h1>
          <p className="text-muted-foreground mb-10">Plan your trip around the best full moon experiences</p>

          {/* Next Full Moon Hero */}
          {nextMoon && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-8 md:p-10 mb-12 text-white"
            >
              <div className="absolute top-4 right-6 opacity-10">
                <Moon className="h-40 w-40" />
              </div>
              <div className="relative z-10">
                <p className="text-white/70 text-sm font-medium mb-1">Next Full Moon</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-1">{nextMoon.name}</h2>
                <p className="text-white/80 text-lg mb-4">
                  {new Date(nextMoon.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </p>
                {getCountdown(nextMoon.date) !== null && (
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold text-lg">{getCountdown(nextMoon.date)}</span>
                    <span className="text-sm">days to go</span>
                  </div>
                )}
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-medium text-white/70">Best Destinations</p>
                  {nextMoon.bestDestinations.map((d) => (
                    <div key={d.name} className="flex items-start gap-2 bg-white/10 rounded-xl p-3">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">{d.name}</p>
                        <p className="text-white/70 text-xs">{d.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* All Full Moon Dates */}
          <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Full Moons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fullMoonDates.map((fm, i) => {
              const days = getCountdown(fm.date);
              const isPast = days === null;
              return (
                <motion.div
                  key={fm.date}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  className={`bg-card rounded-2xl border p-5 ${isPast ? "opacity-50 border-border/30" : "border-border/50 card-hover"}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Moon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{fm.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {new Date(fm.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    {days !== null && (
                      <span className="ml-auto text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full">
                        {days}d
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {fm.bestDestinations.map((d) => (
                      <div key={d.name} className="flex items-start gap-1.5 text-xs">
                        <MapPin className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                        <span><strong className="text-foreground">{d.name}</strong> – <span className="text-muted-foreground">{d.why}</span></span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FullMoon;
