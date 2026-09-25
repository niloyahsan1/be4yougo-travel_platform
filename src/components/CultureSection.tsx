import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const items = [
  {
    bn: "পহেলা বৈশাখ",
    en: "Pohela Boishakh",
    desc: "The Bengali New Year — vibrant processions, panta-ilish, and the unmistakable Mongol Shobhajatra.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    accent: "from-rose-500/80 to-orange-500/80",
  },
  {
    bn: "জামদানি",
    en: "Jamdani Weave",
    desc: "UNESCO-recognised hand-loom heritage from Sonargaon, woven thread by thread for centuries.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    accent: "from-fuchsia-500/80 to-purple-600/80",
  },
  {
    bn: "ভাষা শহীদ",
    en: "Language Movement",
    desc: "21st February — the world's Mother Language Day — born from Dhaka's streets in 1952.",
    image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=800",
    accent: "from-emerald-500/80 to-teal-600/80",
  },
  {
    bn: "ইলিশ ও পান্তা",
    en: "Hilsa & Panta Bhat",
    desc: "Fermented rice, smoky hilsa, green chillies — the soul-food of every Bengali household.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
    accent: "from-amber-500/80 to-red-500/80",
  },
  {
    bn: "রিকশা চিত্র",
    en: "Rickshaw Art",
    desc: "Dhaka's moving canvases — folk paintings on the back of every cycle rickshaw, now a global icon.",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800",
    accent: "from-sky-500/80 to-indigo-600/80",
  },
  {
    bn: "নকশী কাঁথা",
    en: "Nakshi Kantha",
    desc: "Layered cotton quilts hand-stitched with stories of village life, passed mother to daughter.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800",
    accent: "from-pink-500/80 to-rose-600/80",
  },
];

const CultureSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* subtle paisley-inspired ornament */}
      <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--primary)) 0, transparent 40%), radial-gradient(circle at 80% 60%, hsl(var(--primary)) 0, transparent 40%)",
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            ৬৪ জেলার গল্প • Stories of 64 Districts
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Soul of <span className="gradient-text">Bangladesh</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Beyond the destinations — the rituals, threads, flavours and verses that make this land feel like home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.en}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden border border-border/50 card-hover bg-card"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={it.image}
                  alt={it.en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${it.accent} mix-blend-multiply opacity-60`} />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white/90 text-xs font-medium tracking-wide">{it.en}</p>
                  <h3 className="text-white font-bold text-2xl leading-tight" style={{ fontFamily: "'Hind Siliguri', system-ui, sans-serif" }}>
                    {it.bn}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
          >
            Read traveler stories from across Bangladesh →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
