import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";
import { Search } from "lucide-react";

const Destinations = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const tags = ["all", "Beach", "Adventure", "Nature", "Culture", "Wildlife", "Tea", "Lake"];

  const filtered = destinations.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tagline.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || d.idealFor.includes(filter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            All <span className="gradient-text">Destinations</span>
          </h1>
          <p className="text-muted-foreground mb-8">Find your perfect destination in Bangladesh</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === tag
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                }`}
              >
                {tag === "all" ? "All" : tag}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No destinations found. Try a different search.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Destinations;
