export interface NewsItem {
  id: string;
  title: string;
  image: string;
  description: string;
  content: string;
  date: string;
  category: string;
}

export interface TravelEvent {
  id: string;
  name: string;
  location: string;
  destinationId: string;
  date: string;
  endDate?: string;
  description: string;
  image: string;
}

export interface FullMoonDate {
  date: string;
  name: string;
  bestDestinations: { name: string; why: string }[];
}

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    title: "Cox's Bazar Marine Drive Extension Completed",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    description: "The iconic Marine Drive road has been extended by 40km, offering even more stunning coastal views.",
    content: "The Bangladesh government has completed the extension of the famous Marine Drive coastal road in Cox's Bazar. The new 40km stretch connects Inani Beach to Teknaf, opening up previously inaccessible beaches and fishing villages to tourists. The road offers breathtaking views of the Bay of Bengal on one side and lush green hills on the other.",
    date: "2026-03-25",
    category: "Infrastructure",
  },
  {
    id: "n2",
    title: "Sundarbans Gets New Eco-Tourism Guidelines",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600",
    description: "New regulations aim to protect wildlife while enhancing the visitor experience in the world's largest mangrove forest.",
    content: "The Forest Department has introduced comprehensive eco-tourism guidelines for the Sundarbans. These include limits on daily visitors, mandatory local guides, noise restrictions, and plastic-free zones. The guidelines also introduce new watchtower-based observation points for tiger spotting.",
    date: "2026-03-20",
    category: "Regulation",
  },
  {
    id: "n3",
    title: "Direct Flights to Cox's Bazar from Sylhet Launched",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600",
    description: "US-Bangla Airlines introduces twice-weekly direct flights connecting Sylhet to Cox's Bazar.",
    content: "Travelers from Sylhet can now fly directly to Cox's Bazar without transiting through Dhaka. US-Bangla Airlines has launched a twice-weekly service that cuts travel time from 12+ hours by road to just 1.5 hours by air.",
    date: "2026-03-15",
    category: "Transport",
  },
  {
    id: "n4",
    title: "Sajek Valley Road Upgrade Makes Travel Safer",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    description: "Major road improvements reduce travel time to Sajek Valley and improve safety during monsoon season.",
    content: "The Roads and Highways Department has completed a major upgrade to the road connecting Khagrachari to Sajek Valley. The improvements include wider roads, proper drainage, and guardrails on dangerous curves, making the scenic drive safer especially during the rainy season.",
    date: "2026-03-10",
    category: "Infrastructure",
  },
  {
    id: "n5",
    title: "Bangladesh Tourism Board Launches 'Visit Bangladesh 2026'",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600",
    description: "A new campaign to attract 2 million international tourists with special packages and visa-on-arrival for 50 countries.",
    content: "The Bangladesh Tourism Board has launched an ambitious campaign to boost international tourism. The 'Visit Bangladesh 2026' initiative includes visa-on-arrival for citizens of 50 countries, curated tour packages, and partnerships with international travel agencies.",
    date: "2026-03-05",
    category: "Tourism",
  },
  {
    id: "n6",
    title: "Saint Martin's Island Limits Daily Visitors",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600",
    description: "To protect the coral ecosystem, Saint Martin's now allows a maximum of 2,000 visitors per day.",
    content: "In a landmark conservation decision, the government has imposed a daily visitor cap of 2,000 on Saint Martin's Island. The move aims to protect the fragile coral reef ecosystem and prevent overcrowding during peak season. Advance booking through a new online portal is now required.",
    date: "2026-02-28",
    category: "Conservation",
  },
];

export const travelEvents: TravelEvent[] = [
  {
    id: "e1",
    name: "Pohela Boishakh Festival",
    location: "Nationwide",
    destinationId: "sylhet",
    date: "2026-04-14",
    description: "Bengali New Year celebrations with colorful processions, traditional food, and cultural performances across the country.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600",
  },
  {
    id: "e2",
    name: "Rash Mela",
    location: "Kuakata",
    destinationId: "kuakata",
    date: "2026-11-15",
    endDate: "2026-11-18",
    description: "The largest Hindu religious fair at Kuakata beach, attracting thousands of devotees and tourists alike.",
    image: "https://images.unsplash.com/photo-1500375592497-5f8b0ce33d8a?w=600",
  },
  {
    id: "e3",
    name: "Tribal Cultural Festival",
    location: "Rangamati",
    destinationId: "rangamati",
    date: "2026-12-01",
    endDate: "2026-12-03",
    description: "Annual celebration of indigenous culture with traditional dances, handicrafts, and local cuisine.",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600",
  },
  {
    id: "e4",
    name: "Beach Carnival Cox's Bazar",
    location: "Cox's Bazar",
    destinationId: "coxs-bazar",
    date: "2026-12-25",
    endDate: "2026-12-31",
    description: "Week-long beach festival with concerts, water sports, food stalls, and fireworks on the world's longest beach.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  },
  {
    id: "e5",
    name: "Tea Festival",
    location: "Sreemangal",
    destinationId: "sreemangal",
    date: "2026-10-15",
    endDate: "2026-10-17",
    description: "Celebration of Bangladesh's tea heritage with garden tours, tea tasting, and cultural programs.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600",
  },
  {
    id: "e6",
    name: "Migratory Bird Festival",
    location: "Tanguar Haor",
    destinationId: "tanguar-haor",
    date: "2027-01-10",
    endDate: "2027-01-12",
    description: "Birdwatching event during peak migratory season with guided boat tours and photography workshops.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600",
  },
];

export const fullMoonDates: FullMoonDate[] = [
  {
    date: "2026-04-12",
    name: "Pink Moon",
    bestDestinations: [
      { name: "Cox's Bazar", why: "Moonrise over the Bay of Bengal creates a silver pathway on the water" },
      { name: "Kuakata", why: "Watch the full moon from the same beach where you saw sunrise and sunset" },
    ],
  },
  {
    date: "2026-05-12",
    name: "Flower Moon",
    bestDestinations: [
      { name: "Sajek Valley", why: "Clouds bathed in moonlight create an ethereal mountain experience" },
      { name: "Bandarban", why: "Nilgiri peak offers 360° views under moonlight" },
    ],
  },
  {
    date: "2026-06-10",
    name: "Strawberry Moon",
    bestDestinations: [
      { name: "Saint Martin's Island", why: "Bioluminescent plankton + full moon = magical night beach" },
      { name: "Rangamati", why: "Kaptai Lake shimmers under the full moon" },
    ],
  },
  {
    date: "2026-07-10",
    name: "Buck Moon",
    bestDestinations: [
      { name: "Sundarbans", why: "Monsoon full moon over the mangroves – hauntingly beautiful" },
      { name: "Tanguar Haor", why: "Vast wetland reflects the full moon like a mirror" },
    ],
  },
  {
    date: "2026-08-08",
    name: "Sturgeon Moon",
    bestDestinations: [
      { name: "Cox's Bazar", why: "Monsoon beach under full moon – dramatic waves and light" },
      { name: "Sylhet", why: "Tea gardens glow silver under the full moon" },
    ],
  },
  {
    date: "2026-09-07",
    name: "Harvest Moon",
    bestDestinations: [
      { name: "Sreemangal", why: "Golden tea fields under the harvest moon" },
      { name: "Kuakata", why: "Both sunrise and moonrise from the same spot" },
    ],
  },
];
