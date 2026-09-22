import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ComingSoon = ({ feature }: { feature: string }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-lg w-full text-center bg-card border border-border/60 rounded-3xl p-10 shadow-sm">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary mb-5">
            <Sparkles className="h-8 w-8" />
          </div>
          <div className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
            Coming Soon
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">{feature}</h1>
          <p className="text-muted-foreground text-sm mb-7">
            We're polishing this experience. It will be available to everyone very soon — stay tuned!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;