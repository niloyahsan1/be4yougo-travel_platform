import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSun, CloudSnow, CloudLightning, Wind } from "lucide-react";
import { motion } from "framer-motion";

type Spot = { name: string; lat: number; lon: number; destId: string };

const spots: Spot[] = [
  { name: "Cox's Bazar", lat: 21.43, lon: 91.97, destId: "coxs-bazar" },
  { name: "Sajek", lat: 23.38, lon: 92.30, destId: "sajek-valley" },
  { name: "Sylhet", lat: 24.89, lon: 91.87, destId: "sylhet" },
  { name: "Bandarban", lat: 22.19, lon: 92.21, destId: "bandarban" },
  { name: "Sundarbans", lat: 21.95, lon: 89.18, destId: "sundarbans" },
  { name: "Kuakata", lat: 21.82, lon: 90.12, destId: "kuakata" },
];

// WMO weather code → icon + label
const codeMap = (code: number) => {
  if ([0].includes(code)) return { Icon: Sun, label: "Clear" };
  if ([1, 2].includes(code)) return { Icon: CloudSun, label: "Partly Cloudy" };
  if ([3].includes(code)) return { Icon: Cloud, label: "Cloudy" };
  if ([45, 48].includes(code)) return { Icon: Cloud, label: "Foggy" };
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { Icon: CloudRain, label: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { Icon: CloudSnow, label: "Snow" };
  if ([95, 96, 99].includes(code)) return { Icon: CloudLightning, label: "Storm" };
  return { Icon: Wind, label: "—" };
};

interface Reading { temp: number; code: number; }

const WeatherStrip = () => {
  const [data, setData] = useState<Record<string, Reading | null>>({});

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        spots.map(async (s) => {
          try {
            const r = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}&current=temperature_2m,weather_code`
            );
            const j = await r.json();
            return [s.name, { temp: Math.round(j.current.temperature_2m), code: j.current.weather_code }] as const;
          } catch {
            return [s.name, null] as const;
          }
        })
      );
      setData(Object.fromEntries(results));
    };
    fetchAll();
  }, []);

  return (
    <section className="py-12 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Live <span className="gradient-text">Weather</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Current conditions across top destinations</p>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">Source: Open-Meteo</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {spots.map((s, i) => {
            const reading = data[s.name];
            const { Icon, label } = reading ? codeMap(reading.code) : { Icon: Cloud, label: "Loading" };
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-background border border-border/50 p-4 text-center"
              >
                <p className="text-xs font-medium text-muted-foreground truncate">{s.name}</p>
                <Icon className="h-7 w-7 text-primary mx-auto my-2" />
                <p className="text-xl font-bold text-foreground">
                  {reading ? `${reading.temp}°C` : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WeatherStrip;
