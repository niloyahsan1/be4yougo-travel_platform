export interface BusProvider {
  id: string;
  name: string;
  routes: string[];
  fareRange: string;
  type: string;
  bookingUrl: string;
  contact: string;
}

export interface TrainRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  fare: string;
  duration: string;
  frequency: string;
  bookingUrl: string;
}

export interface Airline {
  id: string;
  name: string;
  routes: string[];
  fareRange: string;
  bookingUrl: string;
}

export const busProviders: BusProvider[] = [
  { id: "b1", name: "Shyamoli Paribahan", routes: ["Dhaka → Cox's Bazar", "Dhaka → Chittagong", "Dhaka → Sylhet"], fareRange: "৳800 – ৳1,600", type: "AC / Non-AC", bookingUrl: "https://www.shohoz.com", contact: "+880-2-9000001" },
  { id: "b2", name: "Green Line Paribahan", routes: ["Dhaka → Cox's Bazar", "Dhaka → Chittagong", "Dhaka → Khulna"], fareRange: "৳1,000 – ৳2,000", type: "AC Luxury", bookingUrl: "https://www.shohoz.com", contact: "+880-2-9000002" },
  { id: "b3", name: "Hanif Enterprise", routes: ["Dhaka → Cox's Bazar", "Dhaka → Bandarban", "Dhaka → Khulna", "Dhaka → Kuakata"], fareRange: "৳700 – ৳1,500", type: "AC / Non-AC", bookingUrl: "https://www.shohoz.com", contact: "+880-2-9000003" },
  { id: "b4", name: "Soudia", routes: ["Dhaka → Sylhet", "Dhaka → Sreemangal", "Dhaka → Sunamganj"], fareRange: "৳600 – ৳1,200", type: "AC / Non-AC", bookingUrl: "https://www.shohoz.com", contact: "+880-2-9000004" },
  { id: "b5", name: "Desh Travels", routes: ["Dhaka → Rangamati", "Dhaka → Khagrachhari", "Dhaka → Bandarban"], fareRange: "৳800 – ৳1,400", type: "AC / Non-AC", bookingUrl: "https://www.shohoz.com", contact: "+880-2-9000005" },
  { id: "b6", name: "S. Alam Transport", routes: ["Dhaka → Cox's Bazar", "Dhaka → Chittagong", "Dhaka → Teknaf"], fareRange: "৳900 – ৳1,800", type: "AC Luxury", bookingUrl: "https://www.shohoz.com", contact: "+880-2-9000006" },
];

export const trainRoutes: TrainRoute[] = [
  { id: "t1", name: "Subarna Express", from: "Dhaka (Kamalapur)", to: "Chittagong", fare: "৳350 – ৳1,200", duration: "5-6 hours", frequency: "Daily", bookingUrl: "https://eticket.railway.gov.bd" },
  { id: "t2", name: "Parabat Express", from: "Dhaka (Kamalapur)", to: "Sylhet", fare: "৳300 – ৳950", duration: "4-5 hours", frequency: "Daily", bookingUrl: "https://eticket.railway.gov.bd" },
  { id: "t3", name: "Sundarban Express", from: "Dhaka (Kamalapur)", to: "Khulna", fare: "৳250 – ৳800", duration: "8-9 hours", frequency: "Daily", bookingUrl: "https://eticket.railway.gov.bd" },
  { id: "t4", name: "Upakul Express", from: "Dhaka (Kamalapur)", to: "Noakhali (for Kuakata)", fare: "৳200 – ৳650", duration: "5-6 hours", frequency: "Daily", bookingUrl: "https://eticket.railway.gov.bd" },
  { id: "t5", name: "Jayantika Express", from: "Dhaka (Kamalapur)", to: "Sylhet", fare: "৳300 – ৳950", duration: "5-6 hours", frequency: "Daily", bookingUrl: "https://eticket.railway.gov.bd" },
];

export const airlines: Airline[] = [
  { id: "a1", name: "Biman Bangladesh Airlines", routes: ["Dhaka → Cox's Bazar", "Dhaka → Chittagong", "Dhaka → Sylhet"], fareRange: "৳3,500 – ৳8,000", bookingUrl: "https://www.bfrogi.com" },
  { id: "a2", name: "US-Bangla Airlines", routes: ["Dhaka → Cox's Bazar", "Dhaka → Chittagong", "Dhaka → Sylhet", "Dhaka → Jessore"], fareRange: "৳3,000 – ৳7,000", bookingUrl: "https://www.usbair.com" },
  { id: "a3", name: "Novoair", routes: ["Dhaka → Cox's Bazar", "Dhaka → Chittagong", "Dhaka → Sylhet"], fareRange: "৳3,500 – ৳9,000", bookingUrl: "https://www.flynovoair.com" },
];
