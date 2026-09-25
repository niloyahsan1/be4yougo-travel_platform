import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, MapPin, Hotel, Bus, BarChart3, Map, BookOpen, Info, Calculator, Newspaper, CalendarDays, Moon, ChevronDown, Compass, Heart, Users, Wallet } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = { label: string; path: string; icon: ReactNode; soon?: boolean; highlight?: boolean };

const mainNavItems: NavItem[] = [
  { label: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
  { label: "Destinations", path: "/destinations", icon: <MapPin className="h-4 w-4" /> },
  { label: "Trip Guide", path: "/trip-guide", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Budget Planner", path: "/trip-budget", icon: <Wallet className="h-4 w-4" />, highlight: true },
  { label: "Compare", path: "/compare", icon: <BarChart3 className="h-4 w-4" /> },
];

const moreNavItems: NavItem[] = [
  { label: "Hotels", path: "/hotels", icon: <Hotel className="h-4 w-4" />, soon: true },
  { label: "Honeymoon", path: "/honeymoon", icon: <Heart className="h-4 w-4" />, soon: true },
  { label: "Bondhu (Friends)", path: "/friends-plan", icon: <Users className="h-4 w-4" />, soon: true },
  { label: "Day Trips", path: "/day-trips", icon: <Compass className="h-4 w-4" />, soon: true },
  { label: "Transport", path: "/transport", icon: <Bus className="h-4 w-4" />, soon: true },
  { label: "Budget (Quick)", path: "/budget", icon: <Calculator className="h-4 w-4" /> },
  { label: "Trip Planner", path: "/trip-planner", icon: <Map className="h-4 w-4" /> },
  { label: "News", path: "/news", icon: <Newspaper className="h-4 w-4" /> },
  { label: "Events", path: "/events", icon: <CalendarDays className="h-4 w-4" /> },
  { label: "Full Moon", path: "/full-moon", icon: <Moon className="h-4 w-4" /> },
  { label: "Stories", path: "/stories", icon: <BookOpen className="h-4 w-4" /> },
  { label: "About", path: "/about", icon: <Info className="h-4 w-4" /> },
];

const allNavItems = [...mainNavItems, ...moreNavItems];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMoreActive = moreNavItems.some((item) => location.pathname === item.path);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card shadow-lg" : "bg-card/90 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logoImg} alt="Before You Go" className="h-9 w-9 sm:h-10 sm:w-10 object-contain" />
            <span className="text-sm sm:text-base font-bold gradient-text inline">Before You Go</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              if (item.highlight) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`ml-1 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-all duration-200 shadow-md ring-1 ring-blue-500/40 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-[1.03]"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 border ${
                  isMoreActive || moreOpen
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                }`}
              >
                {!isMoreActive && !moreOpen && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                  </span>
                )}
                <span>More</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-card rounded-xl border border-border shadow-xl overflow-hidden"
                  >
                    {moreNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center justify-between gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                          location.pathname === item.path
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/70 hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {item.icon}
                          {item.label}
                        </span>
                        {item.soon && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                            Soon
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-4 py-4 grid grid-cols-2 gap-1">
              {allNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.soon && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                      Soon
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
