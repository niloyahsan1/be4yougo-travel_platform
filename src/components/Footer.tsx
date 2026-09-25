import logoImg from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src={logoImg} alt="Before You Go" className="h-8 w-8 object-contain" />
            <span className="font-bold gradient-text">Before You Go</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Know every destination before you pack. Your decision-first travel companion.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Explore</h4>
          <div className="space-y-2">
            <Link to="/destinations" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Destinations</Link>
            <Link to="/hotels" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Hotels</Link>
            <Link to="/transport" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Transport & Fares</Link>
            <Link to="/compare" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Compare</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Content</h4>
          <div className="space-y-2">
            <Link to="/stories" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Stories</Link>
            <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Book</h4>
          <div className="space-y-2">
            <Link to="/hotels" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              <span>Hotel Booking</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Soon
              </span>
            </Link>
            <Link to="/transport" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Buy Bus Tickets</Link>
            <Link to="/transport" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Train Tickets</Link>
            <Link to="/transport" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Flight Tickets</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Before You Go. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
