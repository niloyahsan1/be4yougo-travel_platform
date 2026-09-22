import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { newsItems } from "@/data/news";
import { Calendar, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import type { NewsItem } from "@/data/news";

const categories = ["All", ...Array.from(new Set(newsItems.map((n) => n.category)))];

const News = () => {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<NewsItem | null>(null);

  const filtered = category === "All" ? newsItems : newsItems.filter((n) => n.category === category);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Travel <span className="gradient-text">News</span>
          </h1>
          <p className="text-muted-foreground mb-8">Latest updates from Bangladesh's travel scene</p>

          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  category === cat ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground border border-border hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((news, i) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 card-hover cursor-pointer"
                onClick={() => setSelected(news)}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {news.category}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(news.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2 leading-snug">{news.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{news.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-primary text-xs font-medium">
                    Read More <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <Dialog open onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg leading-snug">{selected.title}</DialogTitle>
            </DialogHeader>
            <img src={selected.image} alt={selected.title} className="w-full h-56 object-cover rounded-xl" />
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">{selected.category}</span>
              <span>{new Date(selected.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{selected.content}</p>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default News;
