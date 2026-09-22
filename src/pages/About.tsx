import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plane, Heart, Target, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="gradient-text">Before You Go</span>
          </h1>

          <div className="bg-card rounded-2xl p-8 border border-border/50 mb-10">
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Before You Go</strong> is not a booking site. It's not a blog. It's a <strong className="text-primary">decision-first travel media platform</strong> designed to help you understand a destination in seconds.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We believe that the best travel decisions are informed ones. Whether you're choosing between Sajek Valley and Bandarban, figuring out if Cox's Bazar is worth the hype, or just looking for the best time to visit the Sundarbans — we give you everything you need to decide, compare, and go.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Target, title: "Our Mission", desc: "Make travel in Bangladesh accessible, transparent, and informed for every traveler." },
              { icon: Heart, title: "Our Values", desc: "Authenticity over hype. Real costs, real stories, real insights from the ground." },
              { icon: Users, title: "Who We're For", desc: "First-timers, solo travelers, families, adventure seekers — anyone exploring Bangladesh." },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-card rounded-2xl p-8 border border-border/50">
            <Plane className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Made with ❤️ for Bangladesh
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every destination, every hotel, every cost breakdown is curated with care. 
              We're here to make your next trip unforgettable — before you even leave home.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
