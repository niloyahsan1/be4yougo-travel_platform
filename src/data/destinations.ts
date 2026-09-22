export interface Hotel {
  id: string;
  name: string;
  type: string;
  category: "Premium" | "Standard" | "Nice";
  priceRange: string;
  rating: number;
  amenities: string[];
  description: string;
  location: string;
  contact: string;
  bookingUrl?: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  bestTime: string;
  travelTime: string;
  idealFor: string[];
  costLevel: string;
  costBreakdown: { item: string; cost: string }[];
  tips: string[];
  mistakes: string[];
  microStory: string;
  hotels: Hotel[];
}

export const destinations: Destination[] = [
  {
    id: "sajek-valley",
    name: "Sajek Valley",
    tagline: "The Queen of Hills",
    description: "Perched at 1,800 feet above sea level in the Chittagong Hill Tracts, Sajek Valley offers breathtaking views of clouds rolling through lush green hills. The winding road to Sajek is an adventure itself, passing through indigenous villages and dense bamboo forests.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    bestTime: "October – March",
    travelTime: "10-12 hours from Dhaka",
    idealFor: ["Adventure", "Photography", "Nature"],
    costLevel: "$$",
    costBreakdown: [
      { item: "Transport (round trip)", cost: "৳2,500 – ৳4,000" },
      { item: "Accommodation (per night)", cost: "৳2,000 – ৳8,000" },
      { item: "Food (per day)", cost: "৳500 – ৳1,000" },
      { item: "Guide", cost: "৳500 – ৳1,000" },
    ],
    tips: ["Book accommodation in advance during peak season", "Carry warm clothing for chilly nights", "Start early to enjoy sunrise from Konglak Hill"],
    mistakes: ["Visiting during monsoon when roads are dangerous", "Not carrying enough cash – ATMs are scarce", "Underestimating the travel time"],
    microStory: "As the jeep climbed the final ridge, the clouds parted like curtains revealing an amphitheater of emerald hills. A Tripura woman smiled from her bamboo doorway, offering us handmade rice cakes. That moment – the mist, the warmth, the silence – was worth every bump on the road.",
    hotels: [
      { id: "h1", name: "Sajek Resort", type: "Resort", category: "Standard" as const, priceRange: "৳4,000 – ৳8,000", rating: 4.3, amenities: ["Mountain View", "Restaurant", "Parking", "Room Service"], description: "Hilltop resort with panoramic views of the valley and cloud formations.", location: "Ruilui Para, Sajek", contact: "+880-1700-000001", image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80" },
      { id: "h2", name: "Megh Machang", type: "Cottage", category: "Standard" as const, priceRange: "৳2,500 – ৳5,000", rating: 4.1, amenities: ["Balcony", "Wi-Fi", "Restaurant"], description: "Cozy bamboo cottages nestled among the clouds.", location: "Konglak Para, Sajek", contact: "+880-1700-000002", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&q=80" },
      { id: "h3", name: "Runmoy Resort", type: "Resort", category: "Standard" as const, priceRange: "৳3,000 – ৳6,000", rating: 4.0, amenities: ["Valley View", "Bonfire", "Restaurant", "Parking"], description: "Modern resort with traditional hill tract aesthetics.", location: "Sajek Valley Main Road", contact: "+880-1700-000003", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80" },
      { id: "h4", name: "Cloud Cottage Sajek", type: "Cottage", category: "Nice" as const, priceRange: "৳2,000 – ৳4,000", rating: 3.8, amenities: ["Mountain View", "Basic Kitchen"], description: "Budget-friendly cottages with stunning sunrise views.", location: "Ruilui Para", contact: "+880-1700-000004", image: "https://images.unsplash.com/photo-1517320964276-a002fa203177?w=600&q=80" },
      { id: "h5", name: "Sajek Hill View Resort", type: "Resort", category: "Premium" as const, priceRange: "৳5,000 – ৳10,000", rating: 4.5, amenities: ["Luxury Rooms", "Restaurant", "Wi-Fi", "Spa", "Parking"], description: "Premium hilltop property with the best amenities in Sajek.", location: "Konglak Hill", contact: "+880-1700-000005", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80" },
    ],
  },
  {
    id: "bandarban",
    name: "Bandarban",
    tagline: "Land of the Golden Pagoda",
    description: "Home to Bangladesh's highest peaks and the famous Golden Temple (Buddha Dhatu Jadi), Bandarban is a paradise for trekkers and culture enthusiasts. Nilgiri, the country's most accessible high peak, offers 360-degree panoramic views.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    bestTime: "November – March",
    travelTime: "8-10 hours from Dhaka",
    idealFor: ["Trekking", "Culture", "Adventure"],
    costLevel: "$$",
    costBreakdown: [
      { item: "Transport (round trip)", cost: "৳2,000 – ৳3,500" },
      { item: "Accommodation (per night)", cost: "৳1,500 – ৳7,000" },
      { item: "Food (per day)", cost: "৳400 – ৳800" },
      { item: "Nilgiri Entry + Jeep", cost: "৳3,000 – ৳5,000" },
    ],
    tips: ["Get army permission for remote areas", "Hire a local guide for trekking", "Visit Nilgiri at sunrise"],
    mistakes: ["Going without a guide to remote trails", "Skipping the Golden Temple", "Not bringing rain gear"],
    microStory: "The trail to Boga Lake was steep and unforgiving. Six hours of climbing through bamboo tunnels and crossing mountain streams. When we finally reached the crater lake, its mirror-still waters reflecting the sky, every ache dissolved into wonder.",
    hotels: [
      { id: "h6", name: "Hotel Hill Bird", type: "Hotel", category: "Standard" as const, priceRange: "৳2,000 – ৳5,000", rating: 4.0, amenities: ["City View", "Restaurant", "Wi-Fi", "Parking"], description: "Centrally located with views of the Bandarban hills.", location: "Main Road, Bandarban", contact: "+880-1700-000006", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80" },
      { id: "h7", name: "Nilgiri Resort", type: "Resort", category: "Premium" as const, priceRange: "৳5,000 – ৳12,000", rating: 4.6, amenities: ["Mountain View", "Restaurant", "Room Service", "Helipad"], description: "Government-run resort at Nilgiri peak with cloud-touching views.", location: "Nilgiri Hill Top", contact: "+880-1700-000007", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
      { id: "h8", name: "Sairu Hill Resort", type: "Resort", category: "Standard" as const, priceRange: "৳4,000 – ৳8,000", rating: 4.3, amenities: ["Swimming Pool", "Restaurant", "Spa", "Wi-Fi"], description: "Luxury resort with modern amenities amidst nature.", location: "Chimbuk Road, Bandarban", contact: "+880-1700-000008", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80" },
      { id: "h9", name: "Hotel Plaza Bandarban", type: "Hotel", category: "Nice" as const, priceRange: "৳1,500 – ৳3,500", rating: 3.7, amenities: ["Wi-Fi", "Restaurant", "AC Rooms"], description: "Clean budget hotel in the heart of town.", location: "Bandarban Town Center", contact: "+880-1700-000009", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" },
      { id: "h10", name: "Prantik Lake Resort", type: "Eco Lodge", category: "Standard" as const, priceRange: "৳3,000 – ৳6,000", rating: 4.1, amenities: ["Lake View", "Boating", "Restaurant", "Bonfire"], description: "Lakeside eco-retreat surrounded by hills.", location: "Prantik Lake, Bandarban", contact: "+880-1700-000010", image: "https://images.unsplash.com/photo-1502209524164-acea936639a2?w=600&q=80" },
      { id: "h11", name: "Chimbuk Hill Resort", type: "Resort", category: "Standard" as const, priceRange: "৳3,500 – ৳7,000", rating: 4.2, amenities: ["Mountain View", "Restaurant", "Parking"], description: "Scenic resort on the way to Nilgiri.", location: "Chimbuk Hill", contact: "+880-1700-000011", image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80" },
    ],
  },
  {
    id: "coxs-bazar",
    name: "Cox's Bazar",
    tagline: "World's Longest Natural Sea Beach",
    description: "Stretching 120 kilometers of unbroken sandy beach, Cox's Bazar is the crown jewel of Bangladesh tourism. From the lively Laboni Beach to the serene Himchari and Inani, there's a stretch for every mood.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    bestTime: "November – March",
    travelTime: "6-8 hours from Dhaka (or 1 hour flight)",
    idealFor: ["Beach", "Family", "Seafood"],
    costLevel: "$$$",
    costBreakdown: [
      { item: "Flight (round trip)", cost: "৳6,000 – ৳12,000" },
      { item: "Bus (round trip)", cost: "৳1,500 – ৳2,500" },
      { item: "Accommodation (per night)", cost: "৳2,000 – ৳15,000" },
      { item: "Food (per day)", cost: "৳500 – ৳1,500" },
    ],
    tips: ["Stay at Inani Beach for fewer crowds", "Try the dried fish market at Teknaf", "Visit Marine Drive for sunset"],
    mistakes: ["Swimming too far during high tide", "Only visiting Laboni Beach", "Going during peak holidays without booking"],
    microStory: "The Marine Drive road stretched endlessly, the Bay of Bengal crashing on one side, green hills on the other. We stopped at a fisherman's hut where his wife served us the freshest prawns we'd ever tasted, grilled over coconut husks on the beach.",
    hotels: [
      { id: "h12", name: "Long Beach Hotel", type: "Hotel", category: "Premium" as const, priceRange: "৳5,000 – ৳15,000", rating: 4.5, amenities: ["Sea View", "Pool", "Spa", "Restaurant", "Wi-Fi", "Gym"], description: "Premium beachfront hotel with world-class amenities.", location: "Kolatoli Beach, Cox's Bazar", contact: "+880-1700-000012", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80" },
      { id: "h13", name: "Ocean Paradise Hotel", type: "Hotel", category: "Premium" as const, priceRange: "৳6,000 – ৳18,000", rating: 4.6, amenities: ["Sea View", "Pool", "Spa", "Restaurant", "Bar", "Conference Hall"], description: "Iconic luxury hotel right on the beach.", location: "Kolatoli, Cox's Bazar", contact: "+880-1700-000013", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" },
      { id: "h14", name: "Sea Pearl Beach Resort", type: "Resort", category: "Standard" as const, priceRange: "৳4,000 – ৳12,000", rating: 4.3, amenities: ["Beach Access", "Pool", "Restaurant", "Kids Area"], description: "Family-friendly resort with direct beach access.", location: "Marine Drive, Cox's Bazar", contact: "+880-1700-000014", image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=600&q=80" },
      { id: "h15", name: "Mermaid Beach Resort", type: "Resort", category: "Standard" as const, priceRange: "৳3,500 – ৳10,000", rating: 4.2, amenities: ["Beach View", "Restaurant", "Pool", "Wi-Fi"], description: "Comfortable resort with great sea views.", location: "Kolatoli Beach", contact: "+880-1700-000015", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80" },
      { id: "h16", name: "Hotel The Cox Today", type: "Hotel", category: "Nice" as const, priceRange: "৳2,000 – ৳5,000", rating: 3.8, amenities: ["AC Rooms", "Restaurant", "Wi-Fi"], description: "Mid-range hotel close to the beach.", location: "Cox's Bazar Main Road", contact: "+880-1700-000016", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80" },
      { id: "h17", name: "Inani Royal Resort", type: "Resort", category: "Standard" as const, priceRange: "৳3,000 – ৳8,000", rating: 4.4, amenities: ["Private Beach", "Restaurant", "Bonfire", "Parking"], description: "Peaceful resort at the stunning Inani Beach.", location: "Inani Beach", contact: "+880-1700-000017", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80" },
      { id: "h18", name: "Sayeman Beach Resort", type: "Resort", category: "Premium" as const, priceRange: "৳8,000 – ৳25,000", rating: 4.7, amenities: ["Sea View", "Pool", "Spa", "Fine Dining", "Gym", "Conference"], description: "The most luxurious resort in Cox's Bazar.", location: "Kolatoli, Cox's Bazar", contact: "+880-1700-000018", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80" },
    ],
  },
  {
    id: "sylhet",
    name: "Sylhet",
    tagline: "The Land of Two Leaves and a Bud",
    description: "Famous for its rolling tea gardens, Sylhet is a green wonderland. Jaflong, Ratargul Swamp Forest, and Lalakhal add a mystical dimension to this northeastern gem.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800",
    bestTime: "October – March",
    travelTime: "4-5 hours from Dhaka",
    idealFor: ["Tea Gardens", "Nature", "Spiritual"],
    costLevel: "$$",
    costBreakdown: [
      { item: "Transport (round trip)", cost: "৳1,500 – ৳3,000" },
      { item: "Accommodation (per night)", cost: "৳1,500 – ৳6,000" },
      { item: "Food (per day)", cost: "৳400 – ৳800" },
      { item: "Boat at Lalakhal", cost: "৳1,500 – ৳3,000" },
    ],
    tips: ["Take the sunrise train from Dhaka", "Visit Ratargul early morning for mist", "Don't skip Lalakhal boat ride"],
    mistakes: ["Rushing through tea gardens", "Skipping Ratargul Swamp Forest", "Not trying local pithas"],
    microStory: "The boat glided through Lalakhal's turquoise waters, tea gardens climbing the hills on both sides. When the boatman started singing a Sufi song, the entire river seemed to slow down, as if listening.",
    hotels: [
      { id: "h19", name: "Grand Sultan Tea Resort", type: "Resort", category: "Premium" as const, priceRange: "৳8,000 – ৳20,000", rating: 4.7, amenities: ["Tea Garden View", "Pool", "Spa", "Golf", "Fine Dining", "Gym"], description: "Five-star resort set within a working tea estate.", location: "Srimangal Road, Sylhet", contact: "+880-1700-000019", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80" },
      { id: "h20", name: "Hotel Noorjahan Grand", type: "Hotel", category: "Standard" as const, priceRange: "৳3,000 – ৳7,000", rating: 4.0, amenities: ["City View", "Restaurant", "Wi-Fi", "Conference Hall"], description: "Business hotel with modern amenities in the city center.", location: "Sylhet City", contact: "+880-1700-000020", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80" },
      { id: "h21", name: "Nazimgarh Garden Resort", type: "Resort", category: "Premium" as const, priceRange: "৳5,000 – ৳12,000", rating: 4.4, amenities: ["Garden", "Pool", "Restaurant", "Spa", "Wi-Fi"], description: "Lush garden resort on the outskirts of Sylhet.", location: "Nazimgarh, Sylhet", contact: "+880-1700-000021", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" },
      { id: "h22", name: "Hotel Star Pacific", type: "Hotel", category: "Nice" as const, priceRange: "৳2,000 – ৳5,000", rating: 3.9, amenities: ["AC Rooms", "Restaurant", "Wi-Fi", "Parking"], description: "Reliable mid-range hotel in the heart of Sylhet.", location: "Zindabazar, Sylhet", contact: "+880-1700-000022", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" },
      { id: "h23", name: "Jaintia Hill Resort", type: "Eco Lodge", category: "Standard" as const, priceRange: "৳3,000 – ৳6,000", rating: 4.2, amenities: ["Hill View", "Nature Trail", "Restaurant", "Bonfire"], description: "Eco-friendly lodge surrounded by hills and tea gardens.", location: "Jaintiapur, Sylhet", contact: "+880-1700-000023", image: "https://images.unsplash.com/photo-1502209524164-acea936639a2?w=600&q=80" },
    ],
  },
  {
    id: "sreemangal",
    name: "Sreemangal",
    tagline: "Tea Capital of Bangladesh",
    description: "Sreemangal is a tea lover's paradise, with endless rows of manicured tea bushes stretching across gentle hills. The famous seven-layer tea is a must-try, and Lawachara National Park offers rare wildlife encounters.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
    bestTime: "September – February",
    travelTime: "4-5 hours from Dhaka",
    idealFor: ["Tea", "Wildlife", "Relaxation"],
    costLevel: "$",
    costBreakdown: [
      { item: "Transport (round trip)", cost: "৳1,200 – ৳2,500" },
      { item: "Accommodation (per night)", cost: "৳1,000 – ৳5,000" },
      { item: "Food (per day)", cost: "৳300 – ৳600" },
      { item: "Lawachara entry", cost: "৳50" },
    ],
    tips: ["Try seven-layer tea at Nilkantha Tea Cabin", "Visit Lawachara at dawn for wildlife", "Cycle through tea gardens"],
    mistakes: ["Missing Madhabpur Lake", "Not tasting fresh tea leaves", "Visiting only main gardens"],
    microStory: "Watching the tea garden workers pluck leaves with rhythmic precision under the golden afternoon light, I understood why they call Sreemangal the tea capital. Each leaf carried the story of this land.",
    hotels: [
      { id: "h24", name: "Grand Sultan Tea Resort", type: "Resort", category: "Premium" as const, priceRange: "৳8,000 – ৳20,000", rating: 4.7, amenities: ["Tea Garden", "Pool", "Spa", "Restaurant"], description: "Luxury tea resort with world-class facilities.", location: "Sreemangal", contact: "+880-1700-000024", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=80" },
      { id: "h25", name: "Tea Resort Sreemangal", type: "Resort", category: "Standard" as const, priceRange: "৳3,000 – ৳6,000", rating: 4.1, amenities: ["Garden View", "Restaurant", "Wi-Fi"], description: "Charming resort surrounded by tea gardens.", location: "Sreemangal Town", contact: "+880-1700-000025", image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80" },
      { id: "h26", name: "Lemon Garden Resort", type: "Eco Lodge", category: "Nice" as const, priceRange: "৳2,000 – ৳4,000", rating: 3.9, amenities: ["Garden", "Restaurant", "Nature Walk"], description: "Budget-friendly eco lodge amid lemon orchards.", location: "Sreemangal Road", contact: "+880-1700-000026", image: "https://images.unsplash.com/photo-1502209524164-acea936639a2?w=600&q=80" },
      { id: "h27", name: "Nishorgo Eco Cottage", type: "Cottage", category: "Standard" as const, priceRange: "৳1,500 – ৳3,500", rating: 4.0, amenities: ["Nature View", "Restaurant", "Bonfire"], description: "Cozy cottage near Lawachara National Park.", location: "Lawachara Area", contact: "+880-1700-000027", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&q=80" },
      { id: "h28", name: "Hotel Tea Town", type: "Hotel", category: "Nice" as const, priceRange: "৳1,000 – ৳2,500", rating: 3.6, amenities: ["AC Rooms", "Wi-Fi", "Restaurant"], description: "Simple and clean budget option in town.", location: "Sreemangal Town Center", contact: "+880-1700-000028", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" },
    ],
  },
  {
    id: "saint-martin",
    name: "Saint Martin's Island",
    tagline: "The Coral Paradise",
    description: "Bangladesh's only coral island, Saint Martin's is a tiny piece of paradise in the Bay of Bengal. Crystal-clear waters, coconut palms, and fresh seafood make it feel like a different world entirely.",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800",
    bestTime: "November – February",
    travelTime: "12-14 hours from Dhaka (bus + ship)",
    idealFor: ["Beach", "Snorkeling", "Escape"],
    costLevel: "$$",
    costBreakdown: [
      { item: "Transport (round trip)", cost: "৳3,000 – ৳5,000" },
      { item: "Ship ticket", cost: "৳600 – ৳1,200" },
      { item: "Accommodation (per night)", cost: "৳1,500 – ৳6,000" },
      { item: "Food (per day)", cost: "৳500 – ৳1,000" },
    ],
    tips: ["Go to Chera Dwip at low tide", "Try the coconut straight from the tree", "Book return ship tickets in advance"],
    mistakes: ["Going during rough sea season (April-Sept)", "Not bringing sunscreen", "Expecting luxury amenities"],
    microStory: "Lying on Chera Dwip's empty beach, watching bioluminescent plankton light up the waves at night – it was like the ocean was full of fallen stars. No Wi-Fi needed when nature puts on a show like that.",
    hotels: [
      { id: "h29", name: "Blue Marine Resort", type: "Resort", category: "Standard" as const, priceRange: "৳3,000 – ৳8,000", rating: 4.3, amenities: ["Sea View", "Restaurant", "Snorkeling", "Boat Tour"], description: "Best resort on the island with ocean views.", location: "Saint Martin's West Beach", contact: "+880-1700-000029", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80" },
      { id: "h30", name: "Hotel Saint Martin", type: "Hotel", category: "Nice" as const, priceRange: "৳2,000 – ৳5,000", rating: 3.9, amenities: ["Sea View", "Restaurant", "Generator"], description: "Reliable hotel near the main jetty.", location: "Saint Martin's Jetty Area", contact: "+880-1700-000030", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80" },
      { id: "h31", name: "Coral View Guest House", type: "Guest House", category: "Nice" as const, priceRange: "৳1,000 – ৳2,500", rating: 3.7, amenities: ["Fan Rooms", "Restaurant", "Garden"], description: "Budget guesthouse with a friendly atmosphere.", location: "Central Saint Martin's", contact: "+880-1700-000031", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80" },
      { id: "h32", name: "Naf Resort", type: "Resort", category: "Standard" as const, priceRange: "৳3,500 – ৳7,000", rating: 4.1, amenities: ["Beach Access", "Restaurant", "BBQ Area"], description: "Beachside resort with fresh seafood BBQ.", location: "Saint Martin's South Beach", contact: "+880-1700-000032", image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=600&q=80" },
      { id: "h33", name: "Dera Resort", type: "Resort", category: "Standard" as const, priceRange: "৳4,000 – ৳9,000", rating: 4.4, amenities: ["Ocean View", "Restaurant", "Private Beach", "Wi-Fi"], description: "Premium island resort with private beach area.", location: "Saint Martin's East Side", contact: "+880-1700-000033", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80" },
    ],
  },
  {
    id: "sundarbans",
    name: "Sundarbans",
    tagline: "Home of the Royal Bengal Tiger",
    description: "The world's largest mangrove forest and a UNESCO World Heritage Site, the Sundarbans is a labyrinth of tidal waterways, mudflats, and salt-tolerant trees. Home to the elusive Royal Bengal Tiger and hundreds of bird species.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800",
    bestTime: "November – February",
    travelTime: "8-10 hours from Dhaka (bus + boat)",
    idealFor: ["Wildlife", "Adventure", "Photography"],
    costLevel: "$$",
    costBreakdown: [
      { item: "Tour package (3 days)", cost: "৳8,000 – ৳20,000" },
      { item: "Transport to Khulna", cost: "৳800 – ৳1,500" },
      { item: "Forest permit", cost: "৳300 – ৳500" },
    ],
    tips: ["Book a 3-day tour for the best experience", "Bring binoculars for bird watching", "Stay quiet on the boat to spot wildlife"],
    mistakes: ["Taking a 1-day tour (too rushed)", "Making noise on boat trails", "Going without proper insect repellent"],
    microStory: "Dawn in the Sundarbans. The boat engine cut off, and silence wrapped around us like the morning mist. Then, through the mangrove roots, a flash of orange – a Royal Bengal Tiger drinking at the water's edge. My heart stopped, and the camera shook in my hands.",
    hotels: [
      { id: "h34", name: "Sundarban Tiger Camp", type: "Eco Lodge", category: "Premium" as const, priceRange: "৳5,000 – ৳12,000", rating: 4.3, amenities: ["Boat Tour", "Guide", "Meals Included", "Nature Walk"], description: "Eco-lodge inside the forest with guided wildlife tours.", location: "Sundarbans East", contact: "+880-1700-000034", image: "https://images.unsplash.com/photo-1502209524164-acea936639a2?w=600&q=80" },
      { id: "h35", name: "Royal Bengal Cruise", type: "Houseboat", category: "Premium" as const, priceRange: "৳8,000 – ৳20,000", rating: 4.6, amenities: ["Full Board", "AC Cabins", "Guide", "Deck View"], description: "Luxury houseboat cruise through the mangroves.", location: "Sundarbans Waterways", contact: "+880-1700-000035", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" },
      { id: "h36", name: "Hotel Castle Salam", type: "Hotel", category: "Nice" as const, priceRange: "৳1,500 – ৳4,000", rating: 3.8, amenities: ["AC Rooms", "Restaurant", "Wi-Fi", "Tour Desk"], description: "Base hotel in Khulna before entering the Sundarbans.", location: "Khulna City", contact: "+880-1700-000036", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80" },
      { id: "h37", name: "Sundarbans Eco Resort", type: "Eco Lodge", category: "Standard" as const, priceRange: "৳3,000 – ৳7,000", rating: 4.0, amenities: ["River View", "Meals", "Boat Tour", "Guide"], description: "Sustainable resort at the edge of the mangrove forest.", location: "Mongla, Sundarbans", contact: "+880-1700-000037", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80" },
      { id: "h38", name: "Mangrove Hideaway", type: "Cottage", category: "Standard" as const, priceRange: "৳2,500 – ৳5,000", rating: 3.9, amenities: ["River View", "Meals", "Nature Walk"], description: "Rustic cottages with authentic Sundarbans experience.", location: "Sundarbans Buffer Zone", contact: "+880-1700-000038", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=600&q=80" },
    ],
  },
  {
    id: "rangamati",
    name: "Rangamati",
    tagline: "Lake District of Bangladesh",
    description: "Built around the stunning Kaptai Lake, Rangamati is a serene hill district with indigenous culture, hanging bridges, and island-dotted waters. The Chakma and Marma communities add rich cultural layers to this beautiful destination.",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
    bestTime: "October – March",
    travelTime: "6-8 hours from Dhaka",
    idealFor: ["Lake", "Culture", "Relaxation"],
    costLevel: "$$",
    costBreakdown: [
      { item: "Transport (round trip)", cost: "৳1,800 – ৳3,000" },
      { item: "Accommodation (per night)", cost: "৳1,500 – ৳6,000" },
      { item: "Boat rental (full day)", cost: "৳2,000 – ৳5,000" },
      { item: "Food (per day)", cost: "৳400 – ৳800" },
    ],
    tips: ["Take a full-day boat tour of Kaptai Lake", "Visit Rajban Bihar Buddhist temple", "Try Chakma cuisine"],
    mistakes: ["Not spending enough time on the lake", "Skipping indigenous markets", "Going without booking boats in advance"],
    microStory: "Floating on Kaptai Lake at sunset, the water turned gold and the hills became silhouettes. A Chakma fisherman paddled past, his net draped like wings. 'Beautiful, no?' he said in broken Bengali. I could only nod.",
    hotels: [
      { id: "h39", name: "Parjatan Motel Rangamati", type: "Hotel", category: "Standard" as const, priceRange: "৳2,000 – ৳5,000", rating: 4.0, amenities: ["Lake View", "Restaurant", "Parking", "Garden"], description: "Government motel with excellent lake views.", location: "Deer Park Area, Rangamati", contact: "+880-1700-000039", image: "https://images.unsplash.com/photo-1502209524164-acea936639a2?w=600&q=80" },
      { id: "h40", name: "Hotel Green Castle", type: "Hotel", category: "Nice" as const, priceRange: "৳1,500 – ৳4,000", rating: 3.8, amenities: ["AC Rooms", "Restaurant", "Wi-Fi"], description: "Modern hotel in the town center.", location: "Rangamati Town", contact: "+880-1700-000040", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" },
      { id: "h41", name: "Lake Shore Resort", type: "Resort", category: "Standard" as const, priceRange: "৳3,000 – ৳7,000", rating: 4.2, amenities: ["Lake View", "Boat Tour", "Restaurant", "Garden"], description: "Beautiful lakeside resort with private boat access.", location: "Kaptai Lake Shore", contact: "+880-1700-000041", image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80" },
      { id: "h42", name: "Tribal Heritage Lodge", type: "Eco Lodge", category: "Standard" as const, priceRange: "৳2,000 – ৳4,500", rating: 4.1, amenities: ["Cultural Tours", "Local Cuisine", "Nature Walk"], description: "Experience indigenous hospitality and culture.", location: "Rangamati Hills", contact: "+880-1700-000042", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80" },
      { id: "h43", name: "Hanging Bridge Resort", type: "Resort", category: "Standard" as const, priceRange: "৳2,500 – ৳5,500", rating: 3.9, amenities: ["Lake View", "Restaurant", "Wi-Fi", "Parking"], description: "Named after the famous Rangamati hanging bridge nearby.", location: "Near Hanging Bridge", contact: "+880-1700-000043", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
    ],
  },
  {
    id: "kuakata",
    name: "Kuakata",
    tagline: "Daughter of the Sea",
    description: "Kuakata is the only beach in Bangladesh where you can watch both sunrise and sunset over the sea. This 18-kilometer beach also offers glimpses of the Rakhine Buddhist community and their centuries-old temples.",
    image: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800",
    bestTime: "November – March",
    travelTime: "8-10 hours from Dhaka",
    idealFor: ["Sunrise/Sunset", "Beach", "Culture"],
    costLevel: "$",
    costBreakdown: [
      { item: "Transport (round trip)", cost: "৳1,200 – ৳2,500" },
      { item: "Accommodation (per night)", cost: "৳1,000 – ৳4,000" },
      { item: "Food (per day)", cost: "৳300 – ৳600" },
      { item: "Boat to Gangamati", cost: "৳500 – ৳1,000" },
    ],
    tips: ["Wake up at 5 AM for sunrise", "Visit the Rakhine village", "Take a boat to mangrove areas"],
    mistakes: ["Missing sunrise", "Not visiting the Buddhist temples", "Expecting Cox's Bazar-level infrastructure"],
    microStory: "Standing at Kuakata at 5:30 AM, watching the sun emerge from the Bay of Bengal – a perfect orange disc rising from silver waters. Then turning around at 5:30 PM to see it sink into the same sea from the opposite direction. Where else in the world can you do that?",
    hotels: [
      { id: "h44", name: "Hotel Neelanjana", type: "Hotel", category: "Nice" as const, priceRange: "৳1,500 – ৳4,000", rating: 3.9, amenities: ["Sea View", "Restaurant", "Parking"], description: "Popular hotel with good beach views.", location: "Kuakata Beach Road", contact: "+880-1700-000044", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80" },
      { id: "h45", name: "Kuakata Beach Resort", type: "Resort", category: "Standard" as const, priceRange: "৳2,500 – ৳6,000", rating: 4.1, amenities: ["Beach Access", "Restaurant", "Wi-Fi", "Garden"], description: "Beachfront resort with modern facilities.", location: "Kuakata Main Beach", contact: "+880-1700-000045", image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=600&q=80" },
      { id: "h46", name: "Sagar Kannya Hotel", type: "Hotel", category: "Nice" as const, priceRange: "৳1,000 – ৳2,500", rating: 3.6, amenities: ["Fan/AC Rooms", "Restaurant"], description: "Budget-friendly option close to the beach.", location: "Kuakata Market Area", contact: "+880-1700-000046", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" },
      { id: "h47", name: "Sunrise Point Resort", type: "Resort", category: "Standard" as const, priceRange: "৳2,000 – ৳5,000", rating: 4.0, amenities: ["Sunrise View", "Restaurant", "Beach Access", "Parking"], description: "Perfectly positioned for watching sunrise.", location: "Kuakata East Beach", contact: "+880-1700-000047", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80" },
      { id: "h48", name: "Bay View Guest House", type: "Guest House", category: "Nice" as const, priceRange: "৳800 – ৳2,000", rating: 3.5, amenities: ["Fan Rooms", "Basic Kitchen", "Beach Access"], description: "Simple and affordable with bay views.", location: "Kuakata Village", contact: "+880-1700-000048", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80" },
    ],
  },
  {
    id: "tanguar-haor",
    name: "Tanguar Haor",
    tagline: "Wetland Wonderland",
    description: "A Ramsar Wetland of International Importance, Tanguar Haor is a vast freshwater wetland in Sunamganj. During monsoon, it becomes an endless lake dotted with villages on stilts, and in winter, migratory birds turn it into a birdwatcher's dream.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    bestTime: "December – February (birds) / July – September (water)",
    travelTime: "6-8 hours from Dhaka",
    idealFor: ["Birdwatching", "Nature", "Photography"],
    costLevel: "$",
    costBreakdown: [
      { item: "Transport to Sunamganj", cost: "৳800 – ৳1,500" },
      { item: "Boat (full day)", cost: "৳3,000 – ৳8,000" },
      { item: "Guide", cost: "৳500 – ৳1,000" },
      { item: "Food (per day)", cost: "৳300 – ৳500" },
    ],
    tips: ["Hire a local boat with a guide", "Bring binoculars for bird watching", "Camp on a watch tower for sunrise"],
    mistakes: ["Going without a local guide", "Not bringing waterproof bags", "Expecting phone signal everywhere"],
    microStory: "Our boat drifted into a channel where thousands of migratory birds had gathered – bar-headed geese, pintails, and pochards. The boatman whispered, 'They come from Siberia every year. They know this place is safe.' In that moment, this wetland felt like the most important place on Earth.",
    hotels: [
      { id: "h49", name: "Tanguar Haor Houseboat", type: "Houseboat", category: "Premium" as const, priceRange: "৳5,000 – ৳12,000", rating: 4.4, amenities: ["Full Board", "Guide", "Fishing", "Bird Watching"], description: "Sleep on the water and wake up to bird songs.", location: "Tanguar Haor", contact: "+880-1700-000049", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" },
      { id: "h50", name: "Hotel Surma", type: "Hotel", category: "Nice" as const, priceRange: "৳1,000 – ৳2,500", rating: 3.5, amenities: ["AC Rooms", "Restaurant", "Wi-Fi"], description: "Base hotel in Sunamganj town.", location: "Sunamganj Town", contact: "+880-1700-000050", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80" },
      { id: "h51", name: "Haor Heritage Camp", type: "Eco Lodge", category: "Standard" as const, priceRange: "৳3,000 – ৳6,000", rating: 4.1, amenities: ["Boat Tour", "Meals", "Guide", "Bird Watching"], description: "Eco camp at the edge of the haor.", location: "Near Tanguar Haor", contact: "+880-1700-000051", image: "https://images.unsplash.com/photo-1502209524164-acea936639a2?w=600&q=80" },
      { id: "h52", name: "Wetland Watch Lodge", type: "Eco Lodge", category: "Standard" as const, priceRange: "৳2,500 – ৳5,000", rating: 4.0, amenities: ["Watchtower", "Meals", "Guide", "Binoculars"], description: "Lodge with watchtower for bird observation.", location: "Tanguar Haor Perimeter", contact: "+880-1700-000052", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80" },
      { id: "h53", name: "River View Guest House", type: "Guest House", category: "Nice" as const, priceRange: "৳800 – ৳1,800", rating: 3.4, amenities: ["Basic Rooms", "Restaurant"], description: "Simple guesthouse by the river in Sunamganj.", location: "Sunamganj Riverside", contact: "+880-1700-000053", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80" },
    ],
  },
];

export const getAllHotels = (): (Hotel & { destination: string; destinationId: string })[] => {
  return destinations.flatMap((dest) =>
    dest.hotels.map((hotel) => ({
      ...hotel,
      destination: dest.name,
      destinationId: dest.id,
    }))
  );
};
