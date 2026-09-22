import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Check, X, Minus, Search, Wallet, MapPin, Sun, CloudRain, Leaf, Snowflake, Sparkles, Hotel as HotelIcon, Bus, Bike, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HOTELS,
  GETTING_THERE,
  LOCAL_TRANSPORT,
  type Hotel,
  type Tier,
  type Confirmed,
} from "@/data/resortGuide";

type DestKey = "bandarban" | "coxsbazar" | "tanguar";
type LocKey = DestKey | "sajek" | "sundarban";
type SeasonKey = "summer" | "monsoon" | "autumn" | "winter";
type TabKey = "hotels" | "getting" | "local";

const DEST_LABEL: Record<DestKey, string> = {
  bandarban: "Bandarban",
  coxsbazar: "Cox's Bazar",
  tanguar: "Tanguar Haor",
};

const LOCATIONS: { key: LocKey; label: string; available: boolean }[] = [
  { key: "bandarban", label: "Bandarban", available: true },
  { key: "coxsbazar", label: "Cox's Bazar", available: true },
  { key: "tanguar", label: "Tanguar Haor", available: true },
  { key: "sajek", label: "Sajek Valley", available: false },
  { key: "sundarban", label: "Sundarban", available: false },
];

const SEASONS: { key: SeasonKey; label: string; icon: typeof Sun }[] = [
  { key: "summer", label: "Summer", icon: Sun },
  { key: "monsoon", label: "Monsoon", icon: CloudRain },
  { key: "autumn", label: "Autumn", icon: Leaf },
  { key: "winter", label: "Winter", icon: Snowflake },
];

const SEASONAL_TIPS: Record<DestKey, Record<SeasonKey, string>> = {
  bandarban: {
    summer: "Summer (Mar–May): hot and dry in the hills. Start treks early; carry plenty of water and light cotton clothing.",
    monsoon: "Monsoon (Jun–Sep): waterfalls like Nafakhum and Jadipai are at their best, but roads to Thanchi/Ruma can close. Book hill resorts early and confirm road status.",
    autumn: "Autumn (Oct–Nov): clear skies, lush green hills, and the most photogenic season. Great for Nilgiri, Nilachal, and Boga Lake.",
    winter: "Winter (Dec–Feb): cool nights (12–18°C), perfect for trekking and bonfires. Carry a light jacket; resorts get busy around year-end.",
  },
  coxsbazar: {
    summer: "Summer (Mar–May): hot and humid (30–35°C). Sea is usually calm — good for swimming early morning and evening.",
    monsoon: "Monsoon (Jun–Sep): rough seas, frequent rain, lifeguard restrictions. Hotel rates are at their lowest if you don't mind the weather.",
    autumn: "Autumn (Oct–Nov): pleasant, fewer crowds, and the sea is calming down. A great sweet spot between monsoon and peak season.",
    winter: "Winter (Dec–Feb): peak season. Cool, sunny days and calm sea — book accommodations 2–4 weeks ahead, especially weekends.",
  },
  tanguar: {
    summer: "Spring/Pre-monsoon (Feb–May): Shimul Bagan blooms red in Feb–Mar. Water level low, some spots boat-inaccessible by April. Very hot in May.",
    monsoon: "Monsoon (Jun–Sep) — THE best season. Vast sea-like open water, dramatic skies. Boats run direct from Saheb Bari Ghat, Sunamganj. Book houseboats 2–3 weeks early.",
    autumn: "Autumn (Oct): water still high, fewer crowds, pleasant weather. A great sweet spot before winter bird season kicks in.",
    winter: "Winter (Nov–Mar): peak birdwatching — 200+ species incl. Siberian migratory birds. Water low — boats board from Solemanpur Bazar. Carry a warm layer for nights on water.",
  },
};

const fmt = (n: number) => "৳" + n.toLocaleString();
const range = (a: number, b: number) => (a === b ? fmt(a) : `${fmt(a)}–${fmt(b)}`);

// (Budget calculator moved to TripBudgetCalculator component used by /trip-budget page)

const tierClass: Record<Tier, string> = {
  Budget: "bg-sky-50 text-sky-700 border-sky-200",
  "Mid-range": "bg-blue-50 text-blue-700 border-blue-200",
  "Luxury": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Ultra Luxury": "bg-blue-600 text-white border-blue-700",
};

function Flag({ state, label }: { state: Confirmed; label: string }) {
  const map = {
    1: { icon: <Check className="h-3.5 w-3.5" />, cls: "bg-blue-50 text-blue-700 border-blue-200" },
    2: { icon: <Minus className="h-3.5 w-3.5" />, cls: "bg-slate-50 text-slate-500 border-slate-200" },
    0: { icon: <X className="h-3.5 w-3.5" />, cls: "bg-rose-50 text-rose-600 border-rose-200" },
  } as const;
  const { icon, cls } = map[state];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2 py-1 rounded-md border ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

function HotelCard({ h, open, onToggle, priceCap }: { h: Hotel; open: boolean; onToggle: () => void; priceCap: number }) {
  const minP = Math.min(...h.rooms.map((r) => r.p));
  const maxP = Math.max(...h.rooms.map((r) => r.p));
  const visible = priceCap ? h.rooms.filter((r) => r.p <= priceCap) : h.rooms;

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-all ${open ? "border-blue-500 shadow-lg shadow-blue-100" : "border-slate-200 hover:border-blue-400 hover:shadow-md"}`}>
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-5 flex items-start gap-4 hover:bg-blue-50/40 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{h.name}</h3>
            <span className="text-amber-500 text-sm tracking-tight">{"★".repeat(h.stars)}</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">{h.loc}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tierClass[h.tier]}`}>
              {h.tier}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white border border-blue-700">
              {range(minP, maxP)}/night
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Flag state={h.wash} label="Attached Washroom" />
            <Flag state={h.bal} label="Balcony" />
            <Flag state={h.meal} label="Meal Package" />
          </div>
        </div>
        <ChevronDown
          className={`h-6 w-6 shrink-0 mt-1 transition-all ${open ? "rotate-180 text-blue-600" : "text-slate-400"}`}
        />
      </button>
      {open && (
        <div className="border-t border-blue-100 overflow-x-auto">
          <table className="w-full text-xs min-w-[560px]">
            <thead>
              <tr className="bg-blue-50/60 text-[10px] uppercase tracking-wider text-blue-900">
                <th className="text-left font-semibold px-3 py-2">Room Type</th>
                <th className="text-left font-semibold px-3 py-2">Size</th>
                <th className="text-left font-semibold px-3 py-2">Guests</th>
                <th className="text-left font-semibold px-3 py-2">View</th>
                <th className="text-left font-semibold px-3 py-2">Price</th>
                <th className="text-left font-semibold px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-blue-50/30">
                  <td className="px-3 py-2 font-medium text-slate-900">{r.t}</td>
                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap">{r.sz === "N/A" ? "—" : r.sz}</td>
                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap">{r.g}</td>
                  <td className="px-3 py-2 text-slate-600">{r.v}</td>
                  <td className="px-3 py-2 font-bold text-blue-700 whitespace-nowrap">
                    {fmt(r.p)}
                    <span className="text-[10px] text-slate-400 font-normal ml-0.5">/night</span>
                  </td>
                  <td className="px-3 py-2 text-slate-500">{r.n || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {h.note && (
            <div className="px-4 py-2 text-[11px] text-blue-900/70 bg-blue-50/40 border-t border-blue-100 italic">
              {h.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TransportGrid({ cards }: { cards: typeof GETTING_THERE.bandarban }) {
  if (!cards.length) {
    return (
      <div className="text-center py-12 text-sm text-slate-400 border border-dashed border-slate-200 rounded-lg">
        Local transport data not documented in this guide yet.
      </div>
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.title} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all">
          <h3 className="text-sm font-bold text-blue-900 pb-2 mb-2 border-b-2 border-blue-100">{c.title}</h3>
          <div className="space-y-1">
            {c.rows.map((r) => (
              <div key={r.label} className="flex justify-between gap-2 text-xs py-1 border-b border-slate-50 last:border-0">
                <span className="text-slate-600">{r.label}</span>
                <span className="font-bold text-blue-700 text-right whitespace-nowrap">{r.value}</span>
              </div>
            ))}
          </div>
          {c.note && (
            <div className="mt-3 text-[11px] text-blue-900/70 bg-blue-50/50 rounded-md px-2.5 py-2 leading-relaxed border border-blue-100">
              {c.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const ResortGuide = () => {
  return <ResortGuideInner />;
};

const ResortGuideInner = () => {
  const [dest, setDest] = useState<DestKey>("bandarban");
  const [season, setSeason] = useState<SeasonKey | null>(null);
  const [tab, setTab] = useState<TabKey>("hotels");
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<Tier | "">("");
  const [priceCap, setPriceCap] = useState(0);
  const [needWash, setNeedWash] = useState(false);
  const [needBal, setNeedBal] = useState(false);
  const [needMeal, setNeedMeal] = useState(false);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggleOpen = (i: number) =>
    setOpenSet((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const switchDest = (d: DestKey) => {
    setDest(d);
    setOpenSet(new Set());
    setQuery("");
    setTier("");
    setPriceCap(0);
    setNeedWash(false);
    setNeedBal(false);
    setNeedMeal(false);
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return HOTELS[dest].filter((h) => {
      if (q && !h.name.toLowerCase().includes(q) && !h.loc.toLowerCase().includes(q)) return false;
      if (tier && h.tier !== tier) return false;
      if (priceCap && Math.min(...h.rooms.map((r) => r.p)) > priceCap) return false;
      if (needWash && h.wash !== 1) return false;
      if (needBal && h.bal !== 1) return false;
      if (needMeal && h.meal === 0) return false;
      return true;
    });
  }, [dest, query, tier, priceCap, needWash, needBal, needMeal]);

  const stats = useMemo(() => {
    const cnt: Record<Tier, number> = { Budget: 0, "Mid-range": 0, Luxury: 0, "Ultra Luxury": 0 };
    filtered.forEach((h) => (cnt[h.tier] += 1));
    const allP = filtered.flatMap((h) => h.rooms.map((r) => r.p));
    return { cnt, minP: allP.length ? Math.min(...allP) : 0 };
  }, [filtered]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Hero header */}
      <div className="pt-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-blue-700 bg-white px-3 py-1 rounded-full mb-4 shadow-sm">
            <Sparkles className="h-3 w-3" /> Trip Guide
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">Trip Guide</h1>
          <p className="text-sm md:text-base text-blue-50 max-w-2xl">
            Your perfect getaway starts here — make it exactly the way you want!
          </p>
          <Link
            to="/trip-budget"
            className="group inline-flex items-center gap-2 mt-5 pl-2 pr-4 py-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 text-blue-900 text-xs font-extrabold shadow-lg shadow-amber-500/30 ring-2 ring-white/40 hover:shadow-xl hover:scale-[1.03] hover:ring-white/70 transition-all"
          >
            <span className="h-6 w-6 rounded-full bg-blue-700 text-white inline-flex items-center justify-center shadow-inner">
              <Wallet className="h-3.5 w-3.5" />
            </span>
            <span className="tracking-wide uppercase">Open Budget Planner</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="pb-16 px-4 -mt-8">
        <div className="max-w-6xl mx-auto">

          {/* Selector Card */}
          <div className="bg-white border border-blue-100 rounded-2xl p-5 md:p-6 mb-6 shadow-lg shadow-blue-200/40 space-y-5">
            {/* Location */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 mb-2.5">
                <MapPin className="h-3.5 w-3.5" /> Which location are you aiming for?
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {LOCATIONS.map((l) => {
                  const active = l.available && dest === l.key;
                  return (
                    <button
                      key={l.key}
                      onClick={() => l.available && switchDest(l.key as DestKey)}
                      disabled={!l.available}
                      title={l.available ? "" : "Coming soon"}
                      className={`relative py-2.5 px-3 rounded-xl text-sm font-bold border transition-all ${
                        active
                          ? "bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-200"
                          : l.available
                          ? "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-700"
                          : "bg-slate-50 text-slate-400 border-dashed border-slate-200 cursor-not-allowed"
                      }`}
                    >
                      {l.label}
                      {!l.available && (
                        <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Season */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2.5">
                Choose your ideal season
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {SEASONS.map((s) => {
                  const Icon = s.icon;
                  const active = season === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setSeason(active ? null : s.key)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-bold border inline-flex items-center justify-center gap-1.5 transition-all ${
                        active
                          ? "bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-200"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-700"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customize your stay */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2.5">
                Customize your stay
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { checked: needWash, set: setNeedWash, label: "Attached Washroom Only" },
                  { checked: needBal, set: setNeedBal, label: "Balcony Only" },
                  { checked: needMeal, set: setNeedMeal, label: "Meal Package Only" },
                ].map((o) => (
                  <label
                    key={o.label}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                      o.checked
                        ? "bg-blue-50 border-blue-400 text-blue-800"
                        : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={o.checked}
                      onChange={(e) => o.set(e.target.checked)}
                      className="accent-blue-600 h-4 w-4"
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Seasonal tip banner */}
          {season && (
            <div className="mb-5 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 shadow-sm">
              <div className="shrink-0 h-7 w-7 rounded-full bg-blue-600 text-white inline-flex items-center justify-center">
                {(() => {
                  const Icon = SEASONS.find((s) => s.key === season)!.icon;
                  return <Icon className="h-3.5 w-3.5" />;
                })()}
              </div>
              <div className="flex-1 leading-relaxed">
                <div className="font-bold mb-0.5">
                  {SEASONS.find((s) => s.key === season)!.label} in {DEST_LABEL[dest]}
                </div>
                {SEASONAL_TIPS[dest][season]}
              </div>
              <button
                onClick={() => setSeason(null)}
                className="shrink-0 text-blue-700 hover:text-blue-900"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Inner tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {([
              ["hotels", "Where to Stay", HotelIcon],
              ["getting", "How to Get There", Bus],
              ["local", "Getting Around", Bike],
            ] as [TabKey, string, typeof HotelIcon][]).map(([k, label, Icon]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  tab === k
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-[1.02]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-700"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Big Budget Planner banner */}
          <Link
            to="/trip-budget"
            className="group relative overflow-hidden flex items-center justify-between gap-4 mb-6 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-300/40 hover:shadow-xl hover:scale-[1.01] transition-all"
          >
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-300/30 blur-2xl" />
            <div className="flex items-center gap-3 relative">
              <div className="h-11 w-11 shrink-0 rounded-full bg-amber-300 text-blue-900 inline-flex items-center justify-center shadow-lg ring-2 ring-white/40">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-300 text-blue-900 px-2 py-0.5 rounded-full mb-1">
                  <Sparkles className="h-2.5 w-2.5" /> New
                </div>
                <div className="text-base md:text-lg font-extrabold leading-tight">Plan your total spend for {DEST_LABEL[dest]}</div>
                <div className="text-[11px] md:text-xs text-blue-50 opacity-90">Real hotel + transport prices, added up live — no surprises.</div>
              </div>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-blue-700 text-xs font-extrabold shadow-md group-hover:bg-amber-300 group-hover:text-blue-900 transition-colors">
              Open Budget Planner <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {tab === "hotels" && (
            <>
              <div className="bg-white border border-blue-100 rounded-xl p-4 mb-4 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-500" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name or location…"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as Tier | "")}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-w-[130px]"
                >
                  <option value="">All tiers</option>
                  <option value="Budget">Budget</option>
                  <option value="Mid-range">Mid-range</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Ultra Luxury">Ultra Luxury</option>
                </select>
                <select
                  value={priceCap}
                  onChange={(e) => setPriceCap(parseInt(e.target.value) || 0)}
                  className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 min-w-[130px]"
                >
                  <option value="0">Any price</option>
                  <option value="3000">Up to ৳3,000</option>
                  <option value="5000">Up to ৳5,000</option>
                  <option value="8000">Up to ৳8,000</option>
                  <option value="15000">Up to ৳15,000</option>
                  <option value="25000">Up to ৳25,000</option>
                </select>
              </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-600 mb-4 items-center">
                <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-blue-600" /> Confirmed</span>
                <span className="inline-flex items-center gap-1"><Minus className="h-3 w-3 text-slate-400" /> Likely / on request</span>
                <span className="inline-flex items-center gap-1"><X className="h-3 w-3 text-rose-500" /> Not confirmed</span>
                <span className="text-slate-400">— Click any card to expand room types & pricing</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-5">
                {[
                  ["Properties", filtered.length],
                  ["Budget", stats.cnt.Budget],
                  ["Mid-range", stats.cnt["Mid-range"]],
                  ["Luxury+", stats.cnt.Luxury + stats.cnt["Ultra Luxury"]],
                  ["Starts from", stats.minP ? fmt(stats.minP) : "—"],
                ].map(([label, val], i) => (
                  <div
                    key={label as string}
                    className={`rounded-xl px-3.5 py-3 border min-w-0 ${
                      i === 0
                        ? "bg-blue-600 border-blue-700 text-white"
                        : "bg-white border-blue-100"
                    }`}
                  >
                    <div className={`text-[11px] font-semibold uppercase tracking-wider truncate ${i === 0 ? "text-blue-100" : "text-slate-500"}`}>{label}</div>
                    <div className={`text-xl font-bold mt-0.5 ${i === 0 ? "text-white" : "text-blue-700"}`}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Hotel list */}
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-sm text-slate-400">No results match your filters.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filtered.map((h) => {
                    const idx = HOTELS[dest].indexOf(h);
                    return (
                      <HotelCard
                        key={h.name}
                        h={h}
                        open={openSet.has(idx)}
                        onToggle={() => toggleOpen(idx)}
                        priceCap={priceCap}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}

          {tab === "getting" && <TransportGrid cards={GETTING_THERE[dest]} />}
          {tab === "local" && <TransportGrid cards={LOCAL_TRANSPORT[dest]} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResortGuide;