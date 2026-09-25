import { useMemo, useState } from "react";
import {
  HOTELS,
  GETTING_THERE,
  LOCAL_TRANSPORT,
  type TransportCard,
} from "@/data/resortGuide";

type DestKey = "bandarban" | "coxsbazar" | "tanguar";

const DEST_LABEL: Record<DestKey, string> = {
  bandarban: "Bandarban",
  coxsbazar: "Cox's Bazar",
  tanguar: "Tanguar Haor",
};

const fmt = (n: number) => "৳" + n.toLocaleString();

const parsePrice = (v: string): number | null => {
  const nums = v.replace(/,/g, "").match(/\d+/g);
  if (!nums || !v.includes("৳")) return null;
  return Math.max(...nums.map(Number));
};

interface TransportOption {
  key: string;
  group: string;
  label: string;
  display: string;
  price: number;
}
const collectTransportOptions = (cards: TransportCard[]): TransportOption[] => {
  const out: TransportOption[] = [];
  cards.forEach((c) => {
    c.rows.forEach((r) => {
      const p = parsePrice(r.value);
      if (p !== null) {
        out.push({
          key: `${c.title}::${r.label}`,
          group: c.title,
          label: r.label,
          display: r.value,
          price: p,
        });
      }
    });
  });
  return out;
};

function Line({ label, sub, value }: { label: string; sub?: string; value: number }) {
  return (
    <div className="flex justify-between gap-3">
      <div className="min-w-0">
        <div className="font-semibold">{label}</div>
        {sub && <div className="text-[11px] text-blue-100 truncate">{sub}</div>}
      </div>
      <div className="font-bold whitespace-nowrap">{fmt(Math.round(value))}</div>
    </div>
  );
}

interface Props {
  initialDest?: DestKey;
  showDestSwitcher?: boolean;
}

const TripBudgetCalculator = ({ initialDest = "bandarban", showDestSwitcher = true }: Props) => {
  const [dest, setDest] = useState<DestKey>(initialDest);
  const hotels = HOTELS[dest];
  const [hotelIdx, setHotelIdx] = useState(0);
  const [roomIdx, setRoomIdx] = useState(0);
  const [nights, setNights] = useState<number | "">(2);
  const [guests, setGuests] = useState<number | "">(2);
  const [needWash, setNeedWash] = useState(false);
  const [needBal, setNeedBal] = useState(false);
  const [needMeal, setNeedMeal] = useState(false);
  const [mealPerPerson, setMealPerPerson] = useState<number | "">("");
  const [gettingKey, setGettingKey] = useState("");
  const [localKey, setLocalKey] = useState("");

  const filteredHotels = useMemo(() => {
    return hotels
      .map((h, i) => ({ h, i }))
      .filter(({ h }) => {
        if (needWash && h.wash !== 1) return false;
        if (needBal && h.bal !== 1) return false;
        if (needMeal && h.meal === 0) return false;
        return true;
      });
  }, [hotels, needWash, needBal, needMeal]);

  const safeHotelIdx = filteredHotels.find((x) => x.i === hotelIdx)
    ? hotelIdx
    : filteredHotels[0]?.i ?? 0;
  const hotel = hotels[safeHotelIdx];
  const room = hotel?.rooms[Math.min(roomIdx, (hotel?.rooms.length ?? 1) - 1)];

  const gettingOpts = useMemo(() => collectTransportOptions(GETTING_THERE[dest]), [dest]);
  const localOpts = useMemo(() => collectTransportOptions(LOCAL_TRANSPORT[dest]), [dest]);

  const gettingPick = gettingOpts.find((o) => o.key === gettingKey);
  const localPick = localOpts.find((o) => o.key === localKey);

  const numNights = typeof nights === "number" ? Math.max(0, nights) : 0;
  const numGuests = typeof guests === "number" ? Math.max(1, guests) : 1;
  const numMeal = typeof mealPerPerson === "number" ? Math.max(0, mealPerPerson) : 0;

  const hotelTotal = (room?.p ?? 0) * numNights;
  const mealTotal = numMeal * numNights * numGuests;
  const gettingTotal = (gettingPick?.price ?? 0) * numGuests;
  const localTotal = localPick?.price ?? 0;
  const grand = hotelTotal + mealTotal + gettingTotal + localTotal;
  const perPerson = grand / numGuests;

  return (
    <div className="space-y-5">
      {showDestSwitcher && (
        <div className="grid grid-cols-3 gap-1.5 bg-white border border-blue-100 rounded-2xl p-1.5 shadow-sm">
          {(["bandarban", "coxsbazar", "tanguar"] as DestKey[]).map((d) => (
            <button
              key={d}
              onClick={() => { setDest(d); setHotelIdx(0); setRoomIdx(0); setGettingKey(""); setLocalKey(""); }}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${
                dest === d
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:bg-blue-50"
              }`}
            >
              {DEST_LABEL[d]}
            </button>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr,360px] gap-5">
        <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Plan your trip budget</h2>
            <p className="text-xs text-slate-500">
              Pick a hotel, room and transport — we'll add it all up using the exact prices from our guide.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Filter hotels by</div>
            <div className="flex flex-wrap gap-2">
              {[
                ["Attached washroom only", needWash, setNeedWash],
                ["Balcony only", needBal, setNeedBal],
                ["Meal package only", needMeal, setNeedMeal],
              ].map(([label, val, set]) => (
                <button
                  key={label as string}
                  onClick={() => (set as (b: boolean) => void)(!(val as boolean))}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                    val
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
                  }`}
                >
                  {label as string}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Hotel</span>
              <select
                value={safeHotelIdx}
                onChange={(e) => { setHotelIdx(parseInt(e.target.value)); setRoomIdx(0); }}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {filteredHotels.map(({ h, i }) => (
                  <option key={i} value={i}>{h.name} ({h.tier})</option>
                ))}
                {filteredHotels.length === 0 && <option>— no hotels match filters —</option>}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Room type</span>
              <select
                value={roomIdx}
                onChange={(e) => setRoomIdx(parseInt(e.target.value))}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {hotel?.rooms.map((r, i) => (
                  <option key={i} value={i}>{r.t} — {fmt(r.p)}/night</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Nights</span>
              <input
                type="number"
                min={1}
                value={nights}
                placeholder="2"
                onChange={(e) => {
                  const val = e.target.value;
                  setNights(val === "" ? "" : Math.max(1, parseInt(val) || 1));
                }}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Guests</span>
              <input
                type="number"
                min={1}
                value={guests}
                placeholder="2"
                onChange={(e) => {
                  const val = e.target.value;
                  setGuests(val === "" ? "" : Math.max(1, parseInt(val) || 1));
                }}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Meal ৳/person/night</span>
              <input
                type="number"
                min={0}
                value={mealPerPerson}
                placeholder="e.g. 800"
                onChange={(e) => {
                  const val = e.target.value;
                  setMealPerPerson(val === "" ? "" : Math.max(0, parseInt(val) || 0));
                }}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Getting there (per person)</span>
              <select
                value={gettingKey}
                onChange={(e) => setGettingKey(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">— None —</option>
                {gettingOpts.map((o) => (
                  <option key={o.key} value={o.key}>{o.group} · {o.label} ({o.display})</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Local transport (flat)</span>
              <select
                value={localKey}
                onChange={(e) => setLocalKey(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">— None —</option>
                {localOpts.map((o) => (
                  <option key={o.key} value={o.key}>{o.group} · {o.label} ({o.display})</option>
                ))}
                {localOpts.length === 0 && <option disabled>Not documented for this destination</option>}
              </select>
            </label>
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Transport values use the upper bound from our guide. Prices exclude VAT/service unless noted.
          </p>
        </div>

        <aside className="bg-blue-600 text-white rounded-2xl p-5 shadow-md shadow-blue-200 h-fit lg:sticky lg:top-24">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-100 mb-1">Estimated total</div>
          <div className="text-4xl font-bold mb-1">{fmt(Math.round(grand))}</div>
          <div className="text-xs text-blue-100 mb-5">≈ {fmt(Math.round(perPerson))} per person</div>

          <div className="space-y-2 text-sm border-t border-blue-500 pt-4">
            <Line
              label={`Hotel (${numNights} night${numNights === 1 ? "" : "s"})`}
              sub={room?.t}
              value={hotelTotal}
            />
            {mealTotal > 0 && (
              <Line
                label="Meals"
                sub={`${numGuests} guest${numGuests === 1 ? "" : "s"} × ${numNights} night${numNights === 1 ? "" : "s"} × ৳${numMeal}`}
                value={mealTotal}
              />
            )}
            {gettingPick && (
              <Line
                label="Getting there"
                sub={`${gettingPick.label} × ${numGuests} guest${numGuests === 1 ? "" : "s"}`}
                value={gettingTotal}
              />
            )}
            {localPick && (
              <Line label="Local transport" sub={localPick.label} value={localTotal} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TripBudgetCalculator;