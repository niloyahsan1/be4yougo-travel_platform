import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/data/destinations";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Stories = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Travel <span className="gradient-text">Stories</span>
          </h1>
          <p className="text-muted-foreground mb-12">
            Real experiences from real travelers across Bangladesh
          </p>

          <div className="space-y-8">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/destination/${dest.id}`} className="group block">
                  <div className="bg-card rounded-2xl overflow-hidden border border-border/50 card-hover md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{dest.name}</span>
                        <span className="text-xs text-muted-foreground">{dest.tagline}</span>
                      </div>
                      <p className="text-muted-foreground italic leading-relaxed">
                        "{dest.microStory}"
                      </p>
                      <p className="mt-4 text-xs font-semibold text-primary">
                        Read more about {dest.name} →
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Stories;
