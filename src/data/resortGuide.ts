export type Confirmed = 1 | 2 | 0; // 1 = ✓, 2 = ~, 0 = ✗
export type Tier = "Budget" | "Mid-range" | "Luxury" | "Ultra Luxury";

export interface Room {
  t: string;
  sz: string;
  g: string;
  v: string;
  p: number;
  n: string;
}

export interface Hotel {
  name: string;
  stars: number;
  tier: Tier;
  loc: string;
  wash: Confirmed;
  bal: Confirmed;
  meal: Confirmed;
  note: string;
  rooms: Room[];
}

export interface TransportRow {
  label: string;
  value: string;
}
export interface TransportCard {
  title: string;
  rows: TransportRow[];
  note?: string;
}

export type ResortDest = "bandarban" | "coxsbazar" | "tanguar";

export const HOTELS: Record<ResortDest, Hotel[]> = {
  bandarban: [
    { name: "Sairu Hill Resorts", stars: 5, tier: "Ultra Luxury", loc: "Shualock, Chimbuk Rd, 18 km from town", wash: 1, bal: 1, meal: 1,
      note: "+15% VAT on all rates. Advance booking mandatory. Shimul Tola Cabin sleeps 6.",
      rooms: [
        { t: "Premium (Couple)", sz: "600 sft", g: "2", v: "Sea & Hill", p: 18000, n: "Landscaped terrace garden, private balcony, high ceiling" },
        { t: "Executive King", sz: "570 sft", g: "2", v: "Sea & Hill", p: 16000, n: "Private toilet, shower stall, natural setting, balcony" },
        { t: "Executive Twin", sz: "570 sft", g: "2", v: "Sea & Hill", p: 16000, n: "2 single beds — same facilities as Executive King" },
        { t: "Shangu View Terrace (3 pax)", sz: "340 sft", g: "3", v: "Shangu River & Hill", p: 15000, n: "Terrace, single + bunk bed, AC" },
        { t: "Shangu View (3 pax)", sz: "340 sft", g: "3", v: "Shangu River & Hill", p: 13000, n: "Private balcony, single + bunk bed" },
        { t: "Shimul Tola Cabin (6 pax)", sz: "750 sft", g: "6", v: "Hill", p: 25000, n: "A-frame cabin by an 80 ft Shimul tree, group option" },
      ] },
    { name: "Labah Tong Hill Resort", stars: 5, tier: "Ultra Luxury", loc: "Chimbuk Rd, 1.5–3 km from town", wash: 1, bal: 1, meal: 1,
      note: "Includes: free breakfast, welcome drinks, tea/coffee in-room, free pickup/drop from town. Infinity pool. Lunch/dinner charged separately.",
      rooms: [
        { t: "Yaa Tong Nest 401 & 402", sz: "484 sft", g: "2", v: "Hill panoramic", p: 15000, n: "Top-tier suite, 2 rooms — most reviewed" },
        { t: "Yaa Tong Premium (rooms 201–302)", sz: "N/A", g: "2", v: "Valley & Hill", p: 13000, n: "4 rooms on floors 2–3" },
        { t: "Yaa Tong Executive (rooms 501–506)", sz: "N/A", g: "2", v: "Hill", p: 11000, n: "6 rooms, balcony confirmed" },
        { t: "Yaa Tong Deluxe (rooms 101–102)", sz: "N/A", g: "2", v: "Hill", p: 9000, n: "2 rooms, positively reviewed" },
      ] },
    { name: "Nilgiri Hill Resort", stars: 5, tier: "Ultra Luxury", loc: "Nilgiri Hills, 47 km from town, 2,400 ft altitude", wash: 1, bal: 1, meal: 1,
      note: "Army-managed. Requires Army officer reference + Brigade HQ permit. Book 1 month ahead minimum. Set-menu meals on-site. Cloud-level views.",
      rooms: [
        { t: "Prantik Cottage (Premium)", sz: "N/A", g: "2", v: "Hill", p: 10000, n: "Hill-view balcony, fridge, sofa, TV, WiFi, geyser, rooftop access" },
        { t: "Rangdhanu (Honeymoon Cottage)", sz: "N/A", g: "2", v: "Hill", p: 8000, n: "Balcony, dressing table, geyser, TV" },
        { t: "Standard Named Cottage", sz: "N/A", g: "2", v: "Hill", p: 8000, n: "8 cottages: Meghdoot, Akashlina, Marma, Inshaya, Ikhiai, Maruipre, Maruifong, Nilanjana" },
        { t: "Tent (4-bed)", sz: "N/A", g: "4", v: "Outdoor", p: 2500, n: "Basic tent, 4 beds" },
      ] },
    { name: "Greenpeak Resorts", stars: 4, tier: "Luxury", loc: "Recha, 0.5 km from Meghla", wash: 1, bal: 1, meal: 1,
      note: "Weekend/peak premiums apply. Family packages available.",
      rooms: [
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "Hill", p: 5000, n: "AC, restaurant access" },
        { t: "Luxury Cottage", sz: "N/A", g: "3", v: "Hill panoramic", p: 8000, n: "Private cottage" },
        { t: "Hill-View Cottage (premium)", sz: "N/A", g: "4", v: "Hill", p: 13000, n: "Largest option" },
      ] },
    { name: "Fanush Resort", stars: 3, tier: "Mid-range", loc: "Nilachal Tiger Para — 9-min walk to Nilachol", wash: 1, bal: 1, meal: 1,
      note: "Free continental breakfast included. 24-hr room service. Bicycle hire. Soundproofed rooms. 7 AC rooms total.",
      rooms: [
        { t: "Standard Single (balcony)", sz: "N/A", g: "1", v: "Garden", p: 3500, n: "Balcony, LED TV, AC, private bath with bidet & shower" },
        { t: "Deluxe Double / Family (balcony)", sz: "N/A", g: "2–4", v: "Garden / Patio", p: 5000, n: "Private bath, balcony, WiFi, AC" },
        { t: "Family Room (terrace access)", sz: "N/A", g: "4", v: "Garden", p: 6000, n: "Terrace access, soundproofed, AC" },
      ] },
    { name: "Hillside Resort Milonchhori", stars: 4, tier: "Mid-range", loc: "Milonchhori, 4 km on Chimbuk Rd", wash: 1, bal: 0, meal: 1,
      note: "Authentic indigenous food. Group discounts. Guide service. Sangu River views.",
      rooms: [
        { t: "Dormitory (6–10 pax)", sz: "N/A", g: "6–10", v: "Sangu River", p: 900, n: "Per person rate" },
        { t: "Non-AC Standard", sz: "N/A", g: "2", v: "Hill", p: 2500, n: "Basic room" },
        { t: "AC Room", sz: "N/A", g: "2", v: "Sangu River", p: 5600, n: "Air-conditioned" },
      ] },
    { name: "Boisabi Resort", stars: 4, tier: "Mid-range", loc: "Bandarban hills", wash: 1, bal: 1, meal: 1,
      note: "Weekend packages. Meal packages on request.",
      rooms: [
        { t: "Standard", sz: "N/A", g: "2", v: "Hill", p: 3500, n: "" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "Hill", p: 5500, n: "" },
        { t: "Cottage", sz: "N/A", g: "4", v: "Hill", p: 8000, n: "" },
      ] },
    { name: "Ecosense Resort", stars: 4, tier: "Mid-range", loc: "Nilachol area, Bandarban", wash: 1, bal: 1, meal: 2,
      note: "Eco-friendly. Family duplex sleeps 8. Daily housekeeping.",
      rooms: [
        { t: "Deluxe Double Hill View", sz: "N/A", g: "2", v: "Hill", p: 3000, n: "AC, daily housekeeping" },
        { t: "Family Duplex Mountain View", sz: "N/A", g: "8", v: "Mountain", p: 7000, n: "2 bed + 1 queen — sleeps 8" },
      ] },
    { name: "Nilachol Nilambori Resort", stars: 3, tier: "Budget", loc: "Nilachol Tourism Complex, 3.5 km from town", wash: 1, bal: 1, meal: 1,
      note: "Free breakfast included. +15% service charge. 3 cottages × 2 rooms = 6 total. Guests may remain past sunset (general tourists cannot).",
      rooms: [
        { t: "Couple Room (cottage, balcony)", sz: "N/A", g: "2", v: "Hill & Sangu River (1,600 ft)", p: 3000, n: "Balcony, dining area, writing table, free breakfast" },
      ] },
    { name: "Bandarban Bono Nibas Hill Resort", stars: 3, tier: "Mid-range", loc: "Bandarban hills", wash: 1, bal: 1, meal: 2,
      note: "Family-friendly. Group packages. 7 room types.",
      rooms: [
        { t: "Deluxe Single", sz: "240 sft", g: "1", v: "Hill", p: 2000, n: "1 double bed" },
        { t: "Premium Single", sz: "240 sft", g: "1", v: "Hill", p: 2200, n: "1 double bed" },
        { t: "Deluxe Double", sz: "260 sft", g: "2", v: "N/A", p: 2500, n: "1 double bed" },
        { t: "Deluxe Duplex Hill View", sz: "259 sft", g: "2", v: "Hill", p: 2800, n: "1 queen bed" },
        { t: "Deluxe Double or Twin", sz: "280 sft", g: "4", v: "Hill", p: 3200, n: "2 double beds" },
        { t: "Honeymoon Double", sz: "259 sft", g: "2", v: "Mountain", p: 3500, n: "Special decor" },
        { t: "Family Cottage", sz: "280 sft", g: "4", v: "Hill", p: 3800, n: "2 queen beds" },
      ] },
    { name: "Holiday Inn Resort Bandarban", stars: 3, tier: "Mid-range", loc: "Near Meghla, Bandarban", wash: 1, bal: 2, meal: 1,
      note: "+15% service charge. Tour packages available.",
      rooms: [
        { t: "Standard Room", sz: "N/A", g: "2", v: "Lake", p: 2500, n: "" },
        { t: "Cottage", sz: "N/A", g: "4", v: "Garden / Lake", p: 4000, n: "" },
        { t: "Tent (2 pax)", sz: "N/A", g: "2", v: "Outdoor", p: 600, n: "Extra bed ৳200" },
      ] },
    { name: "Tong Resort", stars: 3, tier: "Mid-range", loc: "Bandarban", wash: 1, bal: 2, meal: 1,
      note: "Free breakfast and WiFi included in all rates.",
      rooms: [
        { t: "Standard Room", sz: "N/A", g: "2", v: "Hill", p: 2000, n: "Free breakfast included" },
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "Hill", p: 3000, n: "Free breakfast included" },
        { t: "Family Room", sz: "N/A", g: "4", v: "Hill", p: 4500, n: "Free breakfast included" },
      ] },
    { name: "River View Hotel & Resort", stars: 3, tier: "Mid-range", loc: "Islampur, Bandarban riverfront", wash: 1, bal: 1, meal: 2,
      note: "Sangu River views. River tour combo packages available.",
      rooms: [
        { t: "Standard", sz: "N/A", g: "2", v: "Sangu River", p: 2000, n: "" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "Sangu River", p: 3000, n: "" },
        { t: "River-View Premier", sz: "N/A", g: "4", v: "Sangu River", p: 4000, n: "" },
      ] },
    { name: "Hotel Night Heaven", stars: 3, tier: "Budget", loc: "Near Meghla, 5 km from town", wash: 1, bal: 2, meal: 1,
      note: "Free breakfast and welcome drinks. Seminar room (50 pax). Rent-a-car service.",
      rooms: [
        { t: "Non-AC Standard", sz: "N/A", g: "2", v: "Garden", p: 2200, n: "" },
        { t: "Standard Twin Non-AC", sz: "N/A", g: "2", v: "Garden", p: 2500, n: "" },
        { t: "Four Bed Non-AC", sz: "N/A", g: "4", v: "N/A", p: 3500, n: "" },
        { t: "AC Room", sz: "N/A", g: "2", v: "Garden", p: 4000, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "N/A", p: 5500, n: "" },
      ] },
    { name: "Hotel Hill View", stars: 3, tier: "Budget", loc: "Bus Stand, Bandarban Main Rd", wash: 1, bal: 2, meal: 1,
      note: "Conference room 100 pax. Chinese/Thai/Bengali restaurant.",
      rooms: [
        { t: "Single / Couple", sz: "N/A", g: "1–2", v: "Town", p: 1500, n: "" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "Town", p: 2200, n: "" },
        { t: "Super Deluxe", sz: "N/A", g: "2", v: "Town", p: 3000, n: "" },
        { t: "Royal Suite", sz: "N/A", g: "2", v: "Town", p: 3500, n: "" },
        { t: "VIP Suite", sz: "N/A", g: "4", v: "Town", p: 5000, n: "" },
      ] },
    { name: "Hotel Hilton Residence", stars: 3, tier: "Budget", loc: "Near city bus stand, Bandarban", wash: 1, bal: 1, meal: 2,
      note: "AC double with balcony + geyser confirmed by guest reviews.",
      rooms: [
        { t: "Standard Non-AC", sz: "N/A", g: "2", v: "Town", p: 1000, n: "" },
        { t: "Deluxe AC", sz: "N/A", g: "2", v: "N/A", p: 2500, n: "" },
        { t: "AC Double with Balcony + Geyser", sz: "N/A", g: "2", v: "Hill", p: 3500, n: "Balcony confirmed by guests" },
        { t: "Family Room", sz: "N/A", g: "4", v: "N/A", p: 4000, n: "Large bedroom" },
      ] },
    { name: "Parjatan Motel Megla", stars: 3, tier: "Budget", loc: "Meghla, Bandarban", wash: 1, bal: 2, meal: 2,
      note: "Government-run (BPC). Meghla park access. Group rates.",
      rooms: [
        { t: "Standard Room", sz: "N/A", g: "2", v: "N/A", p: 1000, n: "" },
        { t: "Cottage", sz: "N/A", g: "4", v: "Garden", p: 3000, n: "" },
      ] },
    { name: "Hotel D'More Bandarban", stars: 3, tier: "Budget", loc: "Bandarban town center", wash: 1, bal: 0, meal: 1,
      note: "Buffet breakfast included. No notable balcony at this property.",
      rooms: [
        { t: "Standard Room", sz: "N/A", g: "2", v: "Town", p: 1000, n: "" },
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "Town", p: 2500, n: "Room 3002 reviewed positively" },
        { t: "Triple Room", sz: "N/A", g: "3", v: "Town", p: 3000, n: "" },
      ] },
    { name: "Hotel Plaza Bandarban", stars: 3, tier: "Budget", loc: "Bandarban town", wash: 1, bal: 2, meal: 2,
      note: "Central town-center hotel.",
      rooms: [
        { t: "Standard", sz: "N/A", g: "2", v: "Town", p: 1500, n: "" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "Town", p: 2000, n: "" },
        { t: "Family", sz: "N/A", g: "4", v: "Town", p: 3000, n: "" },
      ] },
    { name: "Hotel Purbani", stars: 2, tier: "Budget", loc: "Bandarban Sadar", wash: 1, bal: 0, meal: 1,
      note: "Group food packages. Off-season 20% discount.",
      rooms: [
        { t: "Single", sz: "N/A", g: "1", v: "Town", p: 800, n: "" },
        { t: "Double", sz: "N/A", g: "2", v: "Town", p: 1500, n: "" },
        { t: "Couple / Group Bed", sz: "N/A", g: "4", v: "Town", p: 2200, n: "" },
      ] },
    { name: "Hotel Paharika", stars: 2, tier: "Budget", loc: "Bandarban Sadar", wash: 1, bal: 0, meal: 0,
      note: "Group and off-season discounts available.",
      rooms: [
        { t: "Single", sz: "N/A", g: "1", v: "N/A", p: 900, n: "" },
        { t: "Double", sz: "N/A", g: "2", v: "N/A", p: 1400, n: "" },
        { t: "Triple", sz: "N/A", g: "3", v: "N/A", p: 1800, n: "" },
      ] },
    { name: "Hotel Four Star", stars: 2, tier: "Budget", loc: "Near Shoilo Propat waterfall", wash: 1, bal: 0, meal: 0,
      note: "Close to Shoilo Propat waterfall.",
      rooms: [
        { t: "Single", sz: "N/A", g: "1", v: "N/A", p: 450, n: "" },
        { t: "Double / Couple", sz: "N/A", g: "2", v: "N/A", p: 900, n: "" },
        { t: "Triple", sz: "N/A", g: "3", v: "N/A", p: 1400, n: "" },
        { t: "4-Bed", sz: "N/A", g: "4", v: "N/A", p: 2250, n: "" },
      ] },
    { name: "Hotel Green Hill", stars: 2, tier: "Budget", loc: "Bandarban", wash: 1, bal: 0, meal: 0,
      note: "18 rooms, 30+ pax capacity. Guide arrangement service.",
      rooms: [
        { t: "Single", sz: "N/A", g: "1", v: "N/A", p: 400, n: "" },
        { t: "Double", sz: "N/A", g: "2", v: "N/A", p: 800, n: "" },
        { t: "Triple", sz: "N/A", g: "3", v: "N/A", p: 1500, n: "" },
      ] },
    { name: "Hotel Prue Abashika", stars: 1, tier: "Budget", loc: "Bandarban Sadar", wash: 1, bal: 0, meal: 0,
      note: "Cheapest accommodation in Bandarban. 32 rooms.",
      rooms: [
        { t: "Single Bed", sz: "N/A", g: "1", v: "N/A", p: 150, n: "Starting price" },
        { t: "Double Bed", sz: "N/A", g: "2", v: "N/A", p: 400, n: "" },
        { t: "Special Double", sz: "N/A", g: "2", v: "N/A", p: 800, n: "" },
      ] },
  ],
  coxsbazar: [
    { name: "Sea Pearl Beach Resort & Spa", stars: 5, tier: "Ultra Luxury", loc: "Jaliapalong, Inani Beach — 493 rooms, 15 acres", wash: 1, bal: 1, meal: 1,
      note: "Balconies only in suite category — not in standard/studio rooms (confirmed by management). Extra bed ৳3,000. Breakfast ৳1,650/adult. Kids 0–5 free. Water park on-site.",
      rooms: [
        { t: "Superior Hill View", sz: "N/A", g: "2", v: "Hill", p: 8500, n: "No balcony in this category" },
        { t: "Superior King Garden View", sz: "N/A", g: "2", v: "Garden", p: 9000, n: "" },
        { t: "Studio King (Sea View)", sz: "N/A", g: "2", v: "Sea", p: 11000, n: "No balcony — confirmed by management" },
        { t: "Premier (Sea View)", sz: "N/A", g: "2", v: "Sea", p: 13000, n: "" },
        { t: "Executive Suite (Hill View)", sz: "720 sft", g: "2", v: "Hill", p: 16000, n: "Kitchenette, balcony, Jacuzzi" },
        { t: "Executive Suite (Sea View)", sz: "720 sft", g: "2", v: "Sea", p: 18000, n: "Kitchenette, balcony, Jacuzzi" },
        { t: "Royal Family Suite", sz: "1050 sft", g: "4", v: "Sea & Hill", p: 25000, n: "2 bedrooms, kitchenette" },
        { t: "Royal Paradise Suite", sz: "2020 sft", g: "6", v: "Sea", p: 40000, n: "2 bedrooms, full luxury" },
        { t: "Presidential Suite", sz: "2500 sft", g: "6", v: "Panoramic", p: 60000, n: "Top-tier" },
      ] },
    { name: "Sayeman Beach Resort", stars: 5, tier: "Ultra Luxury", loc: "Marine Drive Rd, Kolatoli Beach — 228 rooms", wash: 1, bal: 1, meal: 1,
      note: "Breakfast ৳1,500/adult (buffet, 6:30–10 AM). Infinity pool, Tararom Spa, airport shuttle. Note: new construction nearby may affect sea view in some rooms.",
      rooms: [
        { t: "Superior Room", sz: "N/A", g: "2", v: "Hill / Garden", p: 8500, n: "" },
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "Sea / Hill", p: 10000, n: "" },
        { t: "Super Deluxe", sz: "N/A", g: "2", v: "Sea", p: 11000, n: "" },
        { t: "King Room (Sea View)", sz: "N/A", g: "2", v: "Sea", p: 12000, n: "" },
        { t: "Suite (Sea View)", sz: "N/A", g: "2", v: "Sea", p: 13000, n: "Off-season rate ~৳11,000" },
      ] },
    { name: "Ocean Paradise Hotel & Resort", stars: 5, tier: "Ultra Luxury", loc: "Cox's Bazar beach road", wash: 1, bal: 1, meal: 1,
      note: "Breakfast included in rates. 2 pools, conference center, steam room.",
      rooms: [
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "Pool / Garden", p: 7000, n: "Breakfast included" },
        { t: "Superior Room", sz: "N/A", g: "2", v: "Sea", p: 9000, n: "" },
        { t: "Connecting Family Room", sz: "N/A", g: "4", v: "N/A", p: 14000, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "Sea", p: 18000, n: "" },
      ] },
    { name: "Long Beach Hotel", stars: 5, tier: "Ultra Luxury", loc: "Near Cox's Bazar beach", wash: 1, bal: 1, meal: 1,
      note: "Pool, gym, billiards, rooftop restaurant, conference rooms, airport shuttle.",
      rooms: [
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "Beach / Garden", p: 9300, n: "" },
        { t: "Premium Room", sz: "N/A", g: "2", v: "Sea", p: 12000, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "Sea", p: 16000, n: "" },
        { t: "Rooftop Room", sz: "N/A", g: "2", v: "Panoramic", p: 18000, n: "Rooftop restaurant access" },
      ] },
    { name: "BAYWATCH Cox's Bazar", stars: 5, tier: "Ultra Luxury", loc: "Beachfront, Cox's Bazar", wash: 1, bal: 1, meal: 1,
      note: "Private beach, pools, multiple restaurants.",
      rooms: [
        { t: "Deluxe Sea View", sz: "N/A", g: "2", v: "Sea", p: 8000, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "Sea", p: 14000, n: "" },
        { t: "Connecting Suite", sz: "N/A", g: "4", v: "Sea", p: 20000, n: "" },
      ] },
    { name: "Seagull Hotel", stars: 5, tier: "Ultra Luxury", loc: "Hotel Motel Zone, Cox's Bazar", wash: 1, bal: 1, meal: 1,
      note: "Multiple suite view categories. Restaurants, conference, spa.",
      rooms: [
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "N/A", p: 7000, n: "" },
        { t: "Hill View Suite", sz: "N/A", g: "2", v: "Hill", p: 11000, n: "" },
        { t: "Tamarisk View Suite", sz: "N/A", g: "2", v: "Tamarisk", p: 11000, n: "" },
        { t: "Ocean View Suite", sz: "N/A", g: "2", v: "Ocean", p: 12000, n: "" },
        { t: "Premium Suite", sz: "N/A", g: "2", v: "Sea", p: 18000, n: "" },
      ] },
    { name: "Mermaid Beach Resort", stars: 5, tier: "Luxury", loc: "Marine Drive, near Inani Beach", wash: 1, bal: 1, meal: 1,
      note: "Eco-certified. 30 rooms only. Private beach, organic seafood, bicycles, in-room massage.",
      rooms: [
        { t: "Standard Balcony Room", sz: "N/A", g: "2", v: "Garden / Beach", p: 5500, n: "Minibar, 42-inch TV, 24-hr service" },
        { t: "Deluxe Balcony Room", sz: "N/A", g: "2", v: "Sea / Beach", p: 8000, n: "In-room massage available" },
        { t: "Beach Villa", sz: "N/A", g: "4", v: "Direct beach", p: 15000, n: "Private premium option" },
      ] },
    { name: "Ramada by Wyndham Cox's Bazar", stars: 5, tier: "Luxury", loc: "Kolatoli Beach", wash: 1, bal: 1, meal: 1,
      note: "International brand. Wyndham loyalty discounts.",
      rooms: [
        { t: "Superior Room", sz: "N/A", g: "2", v: "N/A", p: 6000, n: "" },
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "Sea", p: 8000, n: "" },
        { t: "Family Room", sz: "N/A", g: "4", v: "N/A", p: 11000, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "Sea", p: 16000, n: "" },
      ] },
    { name: "Hotel The Cox Today", stars: 5, tier: "Luxury", loc: "Near Laboni Beach", wash: 1, bal: 1, meal: 1,
      note: "Pool, spa, business conference facilities.",
      rooms: [
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "N/A", p: 5000, n: "" },
        { t: "Sea View Room", sz: "N/A", g: "2", v: "Sea", p: 8000, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "Sea", p: 14000, n: "" },
      ] },
    { name: "DERA Resort & Spa", stars: 4, tier: "Luxury", loc: "Cox's Bazar", wash: 1, bal: 1, meal: 1,
      note: "Wellness focus. Spa + stay packages.",
      rooms: [
        { t: "Deluxe Room", sz: "N/A", g: "2", v: "N/A", p: 4500, n: "" },
        { t: "Spa Suite", sz: "N/A", g: "2", v: "N/A", p: 7000, n: "Spa access included" },
        { t: "Villa", sz: "N/A", g: "4", v: "Garden", p: 10000, n: "" },
      ] },
    { name: "Best Western Heritage", stars: 4, tier: "Luxury", loc: "Steps from Cox's Bazar Sea Beach", wash: 1, bal: 1, meal: 1,
      note: "Free parking. Garden. Beach steps away.",
      rooms: [
        { t: "Standard Room", sz: "N/A", g: "2", v: "Garden", p: 3500, n: "" },
        { t: "Superior Room", sz: "N/A", g: "2", v: "Sea / Garden", p: 5500, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "Sea", p: 9000, n: "" },
      ] },
    { name: "Royal Pearl Suites", stars: 4, tier: "Luxury", loc: "Cox's Bazar", wash: 1, bal: 1, meal: 1,
      note: "Free continental breakfast 8:30–10:30 AM. Outdoor pool.",
      rooms: [
        { t: "Standard Double (City View)", sz: "N/A", g: "2", v: "City", p: 4000, n: "" },
        { t: "Deluxe Double (Balcony, City View)", sz: "280 sft", g: "2", v: "City", p: 5500, n: "Balcony confirmed, soundproofed, bathtub" },
        { t: "Superior Studio Suite", sz: "N/A", g: "2", v: "City", p: 7000, n: "" },
      ] },
    { name: "Pebble Stone Sea Resort", stars: 4, tier: "Mid-range", loc: "Cox's Bazar", wash: 1, bal: 1, meal: 2,
      note: "Rating 4.5/5 (272 reviews). Outdoor pool, spa, pet-friendly.",
      rooms: [
        { t: "Standard (Pool Access)", sz: "N/A", g: "2", v: "Pool", p: 3520, n: "AC, WiFi, private bath" },
        { t: "Spa Room", sz: "N/A", g: "2", v: "Garden", p: 5500, n: "Spa facilities" },
        { t: "Deluxe Pet-Friendly", sz: "N/A", g: "2", v: "Garden", p: 8000, n: "" },
      ] },
    { name: "Hotel Hyperion Sea World", stars: 4, tier: "Mid-range", loc: "Cox's Bazar", wash: 1, bal: 1, meal: 1,
      note: "20% discounts available on some platforms.",
      rooms: [
        { t: "Standard Sea View", sz: "N/A", g: "2", v: "Sea", p: 3500, n: "" },
        { t: "Deluxe Sea View", sz: "N/A", g: "2", v: "Sea", p: 5000, n: "" },
        { t: "Family Room", sz: "N/A", g: "4", v: "N/A", p: 7000, n: "" },
      ] },
    { name: "Windy Terrace Boutique Hotel", stars: 3, tier: "Mid-range", loc: "Cox's Bazar", wash: 1, bal: 1, meal: 1,
      note: "Breakfast included on Booking.com rate. Bar on site.",
      rooms: [
        { t: "Boutique Room (balcony)", sz: "N/A", g: "2", v: "N/A", p: 3700, n: "Bar access, excellent service" },
        { t: "Deluxe Boutique", sz: "N/A", g: "2", v: "Beach", p: 7000, n: "" },
      ] },
    { name: "Laguna Beach Hotel & Resort", stars: 3, tier: "Mid-range", loc: "Cox's Bazar", wash: 1, bal: 1, meal: 1,
      note: "Pool access, restaurant, beach nearby.",
      rooms: [
        { t: "Standard Room", sz: "N/A", g: "2", v: "N/A", p: 3000, n: "" },
        { t: "Sea View Room", sz: "N/A", g: "2", v: "Sea", p: 4500, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "Sea", p: 6500, n: "" },
      ] },
    { name: "Prime Park Hotel", stars: 3, tier: "Budget", loc: "Plot 58, Block C, Kolatoli", wash: 1, bal: 2, meal: 1,
      note: "Free breakfast + airport shuttle included in all rates. Coffee shop, business center.",
      rooms: [
        { t: "Standard Room", sz: "N/A", g: "2", v: "City", p: 3200, n: "Free breakfast + airport shuttle" },
        { t: "Superior Room", sz: "N/A", g: "2", v: "City", p: 4500, n: "" },
        { t: "Family Room", sz: "N/A", g: "4", v: "N/A", p: 7000, n: "" },
      ] },
    { name: "Hotel Amin International", stars: 3, tier: "Budget", loc: "Near Kolatoli & Dolphin bus stand", wash: 1, bal: 2, meal: 2,
      note: "Staff fridge for medicine. bKash payment accepted.",
      rooms: [
        { t: "Standard AC", sz: "N/A", g: "2", v: "City", p: 2300, n: "" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "N/A", p: 3500, n: "" },
        { t: "Family Room", sz: "N/A", g: "4", v: "N/A", p: 5000, n: "" },
      ] },
    { name: "Hotel Sea Cox", stars: 3, tier: "Budget", loc: "Cox's Bazar", wash: 1, bal: 0, meal: 2,
      note: "ATM, 24-hr desk, room service, WiFi.",
      rooms: [
        { t: "Standard AC", sz: "N/A", g: "2", v: "N/A", p: 2200, n: "" },
        { t: "Family Room", sz: "N/A", g: "4", v: "N/A", p: 3500, n: "" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "N/A", p: 5000, n: "" },
      ] },
    { name: "Muscat Holiday Resort", stars: 3, tier: "Budget", loc: "Cox's Bazar", wash: 1, bal: 0, meal: 2,
      note: "Cheapest resort in Cox's Bazar. 24-hr desk.",
      rooms: [
        { t: "Standard", sz: "N/A", g: "2", v: "N/A", p: 900, n: "Starting rate" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "N/A", p: 2000, n: "" },
        { t: "Family", sz: "N/A", g: "4", v: "N/A", p: 4000, n: "" },
      ] },
    { name: "Hotel Sea Queen", stars: 3, tier: "Budget", loc: "Cox's Bazar town", wash: 1, bal: 0, meal: 0,
      note: "Best budget option near beach.",
      rooms: [
        { t: "Standard", sz: "N/A", g: "2", v: "Town", p: 1200, n: "" },
        { t: "AC Family", sz: "N/A", g: "4", v: "N/A", p: 2500, n: "" },
        { t: "Deluxe", sz: "N/A", g: "2", v: "N/A", p: 4000, n: "" },
      ] },
    { name: "Hotel Makkah", stars: 3, tier: "Budget", loc: "Near sea beach, Cox's Bazar", wash: 1, bal: 0, meal: 0,
      note: "Clean AC rooms. Near beach.",
      rooms: [
        { t: "AC Family Room", sz: "N/A", g: "2–4", v: "City", p: 1500, n: "Private bathroom" },
        { t: "Deluxe AC", sz: "N/A", g: "2", v: "City", p: 2500, n: "" },
        { t: "Suite", sz: "N/A", g: "2", v: "City", p: 4000, n: "" },
      ] },
    { name: "Hotel Auster Echo", stars: 3, tier: "Budget", loc: "Near beach, Cox's Bazar", wash: 1, bal: 0, meal: 0,
      note: "24-hr front desk. Restaurant.",
      rooms: [
        { t: "Standard", sz: "N/A", g: "2", v: "N/A", p: 1700, n: "" },
        { t: "Family", sz: "N/A", g: "4", v: "N/A", p: 4500, n: "" },
      ] },
    { name: "Hotel Sea Crown", stars: 2, tier: "Budget", loc: "Cox's Bazar", wash: 1, bal: 0, meal: 0,
      note: "Basic budget option.",
      rooms: [
        { t: "Standard", sz: "N/A", g: "2", v: "N/A", p: 1200, n: "" },
        { t: "Family", sz: "N/A", g: "4", v: "N/A", p: 3500, n: "" },
      ] },
  ],
  tanguar: [
    { name: "Green Haven Houseboat", stars: 5, tier: "Ultra Luxury", loc: "Sunamganj — Sunamganj Ghat departure, up to 12 pax", wash: 1, bal: 1, meal: 1,
      note: "Per-person rate, fully inclusive (2D/1N). AC cabins, rooftop seating, BBQ evening, music. Book 2–3 weeks ahead for weekends.",
      rooms: [
        { t: "AC Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 18000, n: "Royal experience — full board + BBQ + welcome drinks" },
        { t: "AC Cabin (low season)", sz: "N/A", g: "1", v: "Haor", p: 12000, n: "Same boat, off-peak rate" },
      ] },
    { name: "Phalki Premium Houseboat", stars: 5, tier: "Ultra Luxury", loc: "Sunamganj — up to 20 pax. Contact: 01875-112222", wash: 1, bal: 1, meal: 1,
      note: "Per-person rate, all-inclusive. Verandah cabin, attached bath, on-board guide. 10–30% discount in some seasons.",
      rooms: [
        { t: "Verandah Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 14000, n: "Includes 2D/1N stay + all meals + guide" },
        { t: "Verandah Cabin (low season)", sz: "N/A", g: "1", v: "Haor", p: 10500, n: "Discounted off-peak rate" },
      ] },
    { name: "The Captain Houseboat", stars: 4, tier: "Luxury", loc: "Sunamganj — up to 15 pax. kitebangladesh.com", wash: 1, bal: 1, meal: 1,
      note: "Per-person all-inclusive. Lock-door cabin, local cuisine, welcome drinks, modern amenities.",
      rooms: [
        { t: "Premium Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 12000, n: "Top deck cabin, attached bath" },
        { t: "Standard Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 8000, n: "Same boat, lower-deck cabin" },
      ] },
    { name: "Bonedi (Bojra) Houseboat", stars: 4, tier: "Luxury", loc: "Sunamganj — up to 20 pax. fb.com/BonediTanguar", wash: 1, bal: 1, meal: 1,
      note: "Six-boat fleet. Covers Barikka Tila, Jadukata, Shimul Bagan. Per-person all-inclusive.",
      rooms: [
        { t: "Weekend Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 5000, n: "Friday/Saturday departures" },
        { t: "Weekday Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 4000, n: "Sun–Thu — best value" },
      ] },
    { name: "Haorjatrik (Avijatrik) Houseboat", stars: 4, tier: "Luxury", loc: "Sunamganj — up to 20 pax. Avijatrik page", wash: 1, bal: 1, meal: 1,
      note: "Per-person all-inclusive (2D/1N). Also operates Promodini boats in Rangamati.",
      rooms: [
        { t: "Premium Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 10000, n: "All meals + guide + life jacket" },
        { t: "Standard Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 5000, n: "Shared cabin option" },
      ] },
    { name: "Batan Houseboat", stars: 4, tier: "Luxury", loc: "Madhyanagar Ghat — up to 25 pax. hoihullor.com", wash: 1, bal: 1, meal: 1,
      note: "Scenic Netrokona/Madhyanagar route. Trained chef on board. Per-person all-inclusive.",
      rooms: [
        { t: "Cabin (per person, base)", sz: "N/A", g: "1", v: "Haor", p: 5000, n: "Includes meals + guide + life jacket" },
      ] },
    { name: "Premium Houseboat (AC) — Couple Package", stars: 5, tier: "Ultra Luxury", loc: "Sunamganj Ghat — private couple cabin", wash: 1, bal: 1, meal: 1,
      note: "Package price is for 2 people (couple). 2D/1N, 5–6 meals, AC cabin with balcony. Welcome drinks + toiletries.",
      rooms: [
        { t: "AC Couple Cabin (per couple)", sz: "N/A", g: "2", v: "Haor", p: 24000, n: "Full AC luxury couple experience" },
        { t: "Non-AC Luxury Couple (balcony)", sz: "N/A", g: "2", v: "Haor", p: 19000, n: "Balcony cabin + attached bath" },
        { t: "Non-AC Premium Couple", sz: "N/A", g: "2", v: "Haor", p: 15000, n: "Private couple cabin, all meals" },
      ] },
    { name: "Standard Houseboat (Shared)", stars: 3, tier: "Mid-range", loc: "Sunamganj / Tahirpur — typical group package", wash: 1, bal: 0, meal: 1,
      note: "Per-person, all-inclusive (boat + food + guide + life jacket + spot tours). 5–6 meals over 2D/1N.",
      rooms: [
        { t: "Twin Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 8500, n: "Upper bound — premium standard" },
        { t: "Shared Cabin (per person)", sz: "N/A", g: "1", v: "Haor", p: 5000, n: "Standard package starting rate" },
      ] },
    { name: "Budget Shared Houseboat", stars: 2, tier: "Budget", loc: "Group package — Tahirpur Ghat. 10–15 pax dorm.", wash: 1, bal: 0, meal: 1,
      note: "Cheapest all-inclusive haor stay. Boat + food + guide + life jacket + small dinghy.",
      rooms: [
        { t: "Shared Dormitory (per person)", sz: "N/A", g: "1", v: "Haor", p: 5000, n: "2D/1N — upper bound" },
        { t: "Shared Dormitory (per person, base)", sz: "N/A", g: "1", v: "Haor", p: 4000, n: "Starting rate, off-peak" },
      ] },
    { name: "Haor Bilash Guest House", stars: 4, tier: "Mid-range", loc: "Sunamganj town — near centre, quiet area", wash: 1, bal: 2, meal: 2,
      note: "Best in-town option for haor travellers. Hot water available. Some rooms AC.",
      rooms: [
        { t: "AC Double", sz: "N/A", g: "2", v: "Town", p: 2500, n: "Hot water, AC" },
        { t: "Non-AC Double", sz: "N/A", g: "2", v: "Town", p: 1500, n: "Hot water" },
        { t: "Triple", sz: "N/A", g: "3", v: "Town", p: 2000, n: "3-bed family" },
        { t: "Single", sz: "N/A", g: "1", v: "Town", p: 800, n: "" },
      ] },
    { name: "Hotel Nurani", stars: 2, tier: "Budget", loc: "Sunamganj town", wash: 1, bal: 0, meal: 0,
      note: "Mid-range town option. Some rooms AC.",
      rooms: [
        { t: "AC Double", sz: "N/A", g: "2", v: "Town", p: 1500, n: "" },
        { t: "Non-AC Double", sz: "N/A", g: "2", v: "Town", p: 1000, n: "" },
        { t: "Single", sz: "N/A", g: "1", v: "Town", p: 800, n: "" },
      ] },
    { name: "Haor Bilash Wooden House", stars: 2, tier: "Budget", loc: "Tekerghat — haor side, near Niladri Lake", wash: 1, bal: 0, meal: 0,
      note: "Budget wooden lodging on the haor itself. Closest to Niladri & Shimul Bagan.",
      rooms: [
        { t: "Wooden Room (upper)", sz: "N/A", g: "2", v: "Haor", p: 1000, n: "Basic, wooden floors" },
        { t: "Wooden Room (base)", sz: "N/A", g: "2", v: "Haor", p: 500, n: "Cheapest haor-side stay" },
      ] },
    { name: "Sunamganj Budget Guesthouse", stars: 1, tier: "Budget", loc: "Sunamganj town", wash: 0, bal: 0, meal: 0,
      note: "Very basic. Shared bathroom possible. Walk-in only.",
      rooms: [
        { t: "Double", sz: "N/A", g: "2", v: "Town", p: 700, n: "Shared bathroom possible" },
        { t: "Single", sz: "N/A", g: "1", v: "Town", p: 300, n: "Very basic" },
      ] },
  ],
};

export const GETTING_THERE: Record<ResortDest, TransportCard[]> = {
  bandarban: [
    { title: "Dhaka → Bandarban (direct bus)", rows: [
      { label: "Shyamoli Paribahan (Non-AC)", value: "৳620" },
      { label: "Saudia / S.Alam / Unique (Non-AC)", value: "৳550–600" },
      { label: "Dolphin Services (Non-AC)", value: "৳600" },
      { label: "Hanif Enterprise (Non-AC)", value: "৳620+" },
      { label: "Green Saint Martin Express", value: "৳950" },
      { label: "Journey time", value: "7–10 hrs" },
      { label: "Departure hub", value: "Saidabad / Fakirapool ~10 PM" },
    ], note: "No direct AC bus Dhaka→Bandarban. For AC comfort: Dhaka→Chittagong (AC bus/train), then Chittagong→Bandarban (Non-AC)." },
    { title: "Chittagong → Bandarban", rows: [
      { label: "Purobi / Purbani / Pubali bus", value: "৳70–80" },
      { label: "Departure terminal", value: "Bahaddarhat, Chittagong" },
      { label: "Frequency", value: "Every 30 min, morning–evening" },
      { label: "Journey time", value: "2–3 hrs (75 km)" },
      { label: "Private car / CNG hire", value: "৳2,000–4,000" },
    ], note: "Chittagong is the main gateway. Most Dhaka travellers connect here." },
    { title: "Sylhet → Bandarban", rows: [
      { label: "Train: Sylhet → Ctg (Udayan/Parabat)", value: "৳200–700" },
      { label: "Then bus: Ctg → Bandarban", value: "৳70–80" },
      { label: "Total budget route", value: "~৳300–780" },
      { label: "Total journey time", value: "~10–12 hrs" },
      { label: "Flight: Sylhet (ZYL) → Ctg (CGP)", value: "৳4,000–8,000" },
      { label: "Private car", value: "৳8,000–14,000" },
    ], note: "No direct bus. Best budget route: Sylhet → Chittagong by train, then bus to Bandarban." },
    { title: "Cox's Bazar → Bandarban", rows: [
      { label: "Purbani Bus (from Laaldighi)", value: "৳150–200" },
      { label: "Journey time", value: "~3 hrs" },
      { label: "Private car / jeep", value: "৳3,000–5,000" },
    ] },
    { title: "Dhaka → Chittagong (AC options — gateway)", rows: [
      { label: "Green Line / Shohagh / Silk Line (AC bus)", value: "৳700–1,200" },
      { label: "Train (Subarna / Turna / Mahanagar)", value: "৳270–1,300" },
      { label: "Flight (Biman / NovoAir / US-Bangla)", value: "৳3,000–7,000" },
      { label: "Bus journey time", value: "4–5 hrs" },
      { label: "Train journey time", value: "4.5–6 hrs" },
    ] },
  ],
  coxsbazar: [
    { title: "Dhaka → Cox's Bazar (direct)", rows: [
      { label: "Non-AC bus (S.Alam, Shyamoli…)", value: "৳700–900" },
      { label: "AC bus (Green Line, Hanif…)", value: "৳1,200–1,800" },
      { label: "Flight (Biman / US-Bangla / NovoAir)", value: "৳3,500–8,000" },
      { label: "Journey by bus", value: "9–12 hrs" },
    ] },
    { title: "Dhaka → Chittagong (AC options — gateway)", rows: [
      { label: "Green Line / Shohagh / Silk Line (AC bus)", value: "৳700–1,200" },
      { label: "Train (Subarna / Turna / Mahanagar)", value: "৳270–1,300" },
      { label: "Flight (Biman / NovoAir / US-Bangla)", value: "৳3,000–7,000" },
      { label: "Bus journey time", value: "4–5 hrs" },
      { label: "Train journey time", value: "4.5–6 hrs" },
    ], note: "Chittagong is the main gateway; onward by road to Cox's Bazar (~4 hrs)." },
  ],
  tanguar: [
    { title: "Dhaka → Sunamganj (direct bus)", rows: [
      { label: "Non-AC bus (ENA, Shyamoli NR, Hanif, Mamun)", value: "৳550–900" },
      { label: "AC bus (ENA / Shyamoli only)", value: "৳1,200–1,500" },
      { label: "Departure hub", value: "Sayedabad / Mohakhali" },
      { label: "Distance", value: "~296 km" },
      { label: "Journey time", value: "6–7 hours" },
    ], note: "Most popular and direct way. Overnight buses are convenient." },
    { title: "Dhaka → Sylhet → Sunamganj (train + bus)", rows: [
      { label: "Train: Dhaka → Sylhet (Paharika/Upaban Express)", value: "৳300–800" },
      { label: "Bus: Sylhet (Humayun Chattar) → Sunamganj", value: "৳145–200" },
      { label: "Total journey time", value: "~7–8 hrs" },
      { label: "Distance", value: "~350 km" },
    ], note: "Train ride is more comfortable than bus. Non-AC bus ৳145, AC ৳200 on Sylhet→Sunamganj." },
    { title: "Chittagong → Sunamganj", rows: [
      { label: "Bus: CTG → Sylhet", value: "৳350–700" },
      { label: "Train: CTG → Sylhet (Paharika/Udayan Exp.)", value: "৳150–600" },
      { label: "Bus: Sylhet → Sunamganj", value: "৳145–200" },
      { label: "Total time", value: "~7–9 hrs" },
    ], note: "Via Sylhet — multiple daily buses and trains from Chittagong." },
    { title: "Scenic route — Dhaka via Netrokona", rows: [
      { label: "Train: Dhaka → Mohanganj (Haor Express)", value: "৳150–400" },
      { label: "Auto / Laguna: Mohanganj → Madhyanagar Bazar", value: "৳50–150" },
      { label: "Troller: Madhyanagar → Tanguar Haor", value: "৳3,000–6,000 total" },
      { label: "Total journey", value: "~9 hrs (scenic)" },
    ], note: "Most scenic route — through multiple wetlands & canals. Best for monsoon." },
    { title: "Sunamganj → Tahirpur Ghat (last mile)", rows: [
      { label: "CNG / Laguna (shared, per person)", value: "৳50–100" },
      { label: "Reserved CNG (private)", value: "৳1,500–2,000" },
      { label: "Distance", value: "~50 km" },
      { label: "Travel time", value: "1.5–2 hours" },
    ], note: "Boats depart Tahirpur Ghat for the haor. In monsoon, you can skip this and board direct from Saheb Bari Ghat in Sunamganj." },
  ],
};

export const LOCAL_TRANSPORT: Record<ResortDest, TransportCard[]> = {
  bandarban: [
    { title: "Town → Nilachol (5 km)", rows: [
      { label: "CNG auto-rickshaw (round trip)", value: "৳500–1,000" },
      { label: "Chander Gari / Jeep (round trip)", value: "৳800–2,000" },
      { label: "Shared pickup van (per person)", value: "৳50–80" },
      { label: "Road toll — CNG/Auto", value: "৳30" },
      { label: "Road toll — Jeep/Chander Gari", value: "৳60" },
      { label: "Nilachol entry fee", value: "৳30/person" },
      { label: "Travel time", value: "15–20 min" },
    ], note: "Peak season: prices rise 30–50%. Negotiate before boarding. Staying at Nilachol Nilambori Resort lets guests remain after sunset." },
    { title: "Chander Gari day packages", rows: [
      { label: "Pkg 1 — Golden Temple + Meghla + Nilachol", value: "৳5,000" },
      { label: "Pkg 2 — Nilgiri + Chimbuk + Shoilo Propat + Milonchori", value: "৳6,000" },
      { label: "Pkg 3 — Full circuit (all major spots)", value: "৳7,000–9,000" },
      { label: "Pkg 4 — Ruma + Boga Lake", value: "৳6,000 + night ৳3,000" },
      { label: "Capacity per vehicle", value: "6 persons" },
    ], note: "+15% service charge on all packages. Fuel included. Split 6 ways = very economical per person." },
    { title: "Within Bandarban town", rows: [
      { label: "Rickshaw (short hop)", value: "৳20–50" },
      { label: "CNG within town", value: "৳50–150" },
      { label: "CNG to Meghla (~3 km)", value: "৳80–150" },
      { label: "Meghla Park entry", value: "৳20/person" },
      { label: "Motorbike hire (full day)", value: "৳800–1,500" },
    ] },
    { title: "Leaving Bandarban", rows: [
      { label: "Bandarban → Chittagong", value: "৳70–80" },
      { label: "Bandarban → Cox's Bazar", value: "৳150–200" },
      { label: "Bandarban → Dhaka (Non-AC bus)", value: "৳550–950" },
      { label: "Bandarban → Nilgiri (Chander Gari, vehicle)", value: "৳3,000–4,000" },
    ], note: "No train from Bandarban. Nearest station: Chittagong. Nilgiri requires Army Brigade HQ permit — arrange weeks ahead." },
  ],
  coxsbazar: [],
  tanguar: [
    { title: "Troller / Engine Boat (self-catered)", rows: [
      { label: "Small troller (5–8 pax) — day trip", value: "৳3,000" },
      { label: "Small troller — 1 night", value: "৳6,000" },
      { label: "Medium troller (10–15 pax) — day", value: "৳4,500" },
      { label: "Medium troller — 1 night", value: "৳7,500" },
      { label: "Large troller (15–25 pax) — day", value: "৳7,500" },
      { label: "Large troller — 1 night", value: "৳12,000" },
      { label: "Boatman cooking fee", value: "৳200–400/day" },
    ], note: "Boat-hire only — bring/buy groceries at Tahirpur. Check for toilet, life jackets, samiana, light/fan before hiring." },
    { title: "Speed boat / Direct charter (monsoon)", rows: [
      { label: "Engine boat (slow) — Sunamganj → Haor", value: "৳2,500" },
      { label: "Speed boat — Sunamganj → Haor", value: "৳6,500" },
      { label: "Duration (engine boat)", value: "~5 hours" },
      { label: "Duration (speed boat)", value: "~2 hours" },
      { label: "Depart from", value: "Saheb Bari Ghat, Sunamganj" },
    ], note: "Monsoon only — water levels must be high. In winter use CNG to Solemanpur + troller." },
    { title: "Houseboat package (all-inclusive)", rows: [
      { label: "Budget shared (10–15 pax) — 2D/1N", value: "৳5,000/person" },
      { label: "Standard houseboat — 2D/1N", value: "৳8,500/person" },
      { label: "Premium Non-AC — 2D/1N", value: "৳12,000/person" },
      { label: "Premium AC — 2D/1N", value: "৳20,000/person" },
      { label: "Couple AC package — 2D/1N", value: "৳24,000/couple" },
    ], note: "Includes boat + 5–6 meals + guide + life jacket + spot tours. Book 2–3 weeks ahead for weekends/holidays." },
    { title: "Tourist spots — local hops", rows: [
      { label: "Niladri Lake (bike/auto from Tekerghat)", value: "৳200/person" },
      { label: "Shimul Bagan (Feb–Mar bloom)", value: "৳150" },
      { label: "Barikka Tila (bike, return)", value: "৳100" },
      { label: "Jadukata River (bike from Tekerghat)", value: "৳100" },
      { label: "Lackmachara Waterfall (on foot/bike)", value: "৳100" },
      { label: "Watch Tower / Swamp forest", value: "Included in boat" },
      { label: "Entry fees (all spots)", value: "Free" },
    ], note: "Most haor spots have NO entry fee. Negotiate bike/auto rates at Tekerghat." },
    { title: "Groceries (self-catered trips)", rows: [
      { label: "Fresh haor fish (hilsa/রুই/বোয়াল)", value: "৳200–500/kg" },
      { label: "Deshi duck (whole bird)", value: "৳600–900" },
      { label: "Deshi chicken (whole bird)", value: "৳400–700" },
      { label: "Rice", value: "৳60–80/kg" },
      { label: "Bottled water (1.5L)", value: "৳25–35" },
      { label: "Spice kit + oil + onion", value: "৳200–400" },
      { label: "Total for 2D group of 10", value: "৳3,000–6,000" },
    ], note: "Buy fish directly from floating fish markets on the haor — much cheaper than Tahirpur bazar. NO ATMs at Tahirpur, withdraw in Sunamganj." },
  ],
};