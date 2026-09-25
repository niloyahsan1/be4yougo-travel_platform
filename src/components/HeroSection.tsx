import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1920&q=80",
    label: "Sajek Valley",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    label: "Cox's Bazar",
  },
  {
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1920&q=80",
    label: "Sylhet",
  },
  {
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&q=80",
    label: "Sundarbans",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides with smooth crossfade */}
      {slides.map((slide, i) => (
        <motion.div
          key={slide.label}
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.08,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4"
        >
          Travel smart. Explore deeper.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Before You Go
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-white/90 text-lg md:text-xl max-w-2xl mb-8"
        >
          Know every destination before you pack. Hotels, transport, costs, and local insights — all in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          <Link to="/destinations" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              Explore Destinations <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/compare" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border border-white/20">
              Compare Places
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === current
                ? "bg-white text-black shadow-md"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            }`}
          >
            {slide.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
