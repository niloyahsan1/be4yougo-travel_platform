import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { busProviders, trainRoutes, airlines } from "@/data/transport";
import { Bus, Train, Plane, ExternalLink, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Transport = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Transport & <span className="gradient-text">Fares</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            Book buses, trains, and flights to your destination
          </p>

          {/* Bus Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Bus className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Bus Services</h2>
                <p className="text-xs text-muted-foreground">AC & Non-AC coaches across Bangladesh</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {busProviders.map((bus, i) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 card-hover"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-4">
                    <h3 className="font-bold text-primary-foreground text-base">{bus.name}</h3>
                    <span className="text-primary-foreground/80 text-xs font-medium inline-block mt-0.5 bg-primary-foreground/15 px-2 py-0.5 rounded-full">{bus.type}</span>
                  </div>

                  {/* Routes */}
                  <div className="p-5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Routes</p>
                    <div className="space-y-2 mb-4">
                      {bus.routes.map((route) => (
                        <div key={route} className="flex items-center gap-2 text-sm text-foreground">
                          <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{route}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fare Range</p>
                        <p className="text-base font-bold text-primary">{bus.fareRange}</p>
                      </div>
                      <a href={bus.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="rounded-full px-5 shadow-md">
                          Book Ticket <ExternalLink className="ml-1.5 h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Train Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Train className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Train Routes</h2>
                <p className="text-xs text-muted-foreground">Bangladesh Railway intercity services</p>
              </div>
            </div>
            <div className="space-y-3">
              {trainRoutes.map((train, i) => (
                <motion.div
                  key={train.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden card-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
                    {/* Train Name */}
                    <div className="md:w-44 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <Train className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-sm">{train.name}</h3>
                          <span className="text-[10px] text-muted-foreground">{train.frequency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex-1 flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="text-sm font-semibold text-foreground">{train.from}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-1">
                        <div className="h-px flex-1 bg-border" />
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" /> {train.duration}
                        </div>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">To</p>
                        <p className="text-sm font-semibold text-foreground">{train.to}</p>
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="flex items-center gap-4 md:w-56 flex-shrink-0 justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fare</p>
                        <p className="text-base font-bold text-primary">{train.fare}</p>
                      </div>
                      <a href={train.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="rounded-full px-4 shadow-md">
                          Book <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Airlines Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Airlines</h2>
                <p className="text-xs text-muted-foreground">Domestic flights across Bangladesh</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {airlines.map((airline, i) => (
                <motion.div
                  key={airline.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 card-hover"
                >
                  <div className="bg-gradient-to-r from-sky-500 to-blue-500 px-5 py-4">
                    <h3 className="font-bold text-primary-foreground text-base">{airline.name}</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">Routes</p>
                    <div className="space-y-2 mb-4">
                      {airline.routes.map((route) => (
                        <div key={route} className="flex items-center gap-2 text-sm text-foreground">
                          <Plane className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{route}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fare Range</p>
                        <p className="text-base font-bold text-primary">{airline.fareRange}</p>
                      </div>
                      <a href={airline.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="rounded-full px-5 shadow-md">
                          Book <ExternalLink className="ml-1.5 h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Transport;
