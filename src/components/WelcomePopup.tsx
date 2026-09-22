import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Compass, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(30, "Phone too long")
    .regex(/^[0-9+\-()\s]+$/, "Only digits and + - ( ) allowed"),
  location: z.string().trim().min(1, "Location is required").max(100, "Location too long"),
});

const WelcomePopup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const signed = localStorage.getItem("welcome-signed");
    if (!signed) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse({ name, phone, location });
    if (!parsed.success) {
      toast({
        title: "Please check your details",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { name: n, phone: p, location: l } = parsed.data;
    const { error } = await supabase
      .from("visitor_signups")
      .insert({ name: n!, phone: p!, location: l! });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    localStorage.setItem("welcome-signed", "true");
    toast({ title: `Welcome, ${parsed.data.name}!`, description: "You're all set to explore." });
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
        onClick={() => setShow(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-card rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <Compass className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to Before You Go
            </h2>
            <p className="text-muted-foreground text-sm">
              Tell us a bit about you so we can personalize your trip.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={30}
                inputMode="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground/80 mb-1.5 block">I am from</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                maxLength={100}
                placeholder="City / District"
                className="w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Saving..." : "Continue"}
            </button>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomePopup;
