// Central business data — sourced from the client's brochures & intake form.

// Prefix for raw asset URLs (e.g. <video>/<source>) that Next won't auto-rewrite.
// next/image handles basePath itself; this is only for plain HTML elements.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: "Hullathi Tours & Travels",
  fullName: "Hullathi Tours & Travels",
  tagline: "Explore · Experience · Enjoy",
  motto: "Your Trusted Travel Partner",
  founder: "Sivaraman",
  founderRole: "Founder & Managing Director",
  since: "2026",
  travellers: "1000+",
  // Two numbers — both offered everywhere. Primary WhatsApp vs primary voice differ per brochure.
  whatsapp: "919739526570",
  phones: [
    { label: "Reservations", display: "+91 97395 26570", tel: "919739526570" },
    { label: "Bookings", display: "+91 90929 26570", tel: "919092926570" },
  ],
  email: "Sivabeeman82@gmail.com",
  address: {
    line1: "41/1, Hullathi Village & Post",
    line2: "Ooty, The Nilgiris, Tamil Nadu — 643007",
    region: "Tamil Nadu, India",
  },
  mapsLink: "https://maps.app.goo.gl/TyfcKgHREXH4XnN39",
  mapsEmbed:
    "https://www.google.com/maps?q=Hullathi+Village,+Ooty,+The+Nilgiris,+643007&output=embed",
  hours: "Open 24 / 7",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contact" },
];

export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
export const mailLink = `mailto:${site.email}`;

export const usps = [
  "Customized Packages",
  "Trusted Local Experts",
  "Safe & Comfortable Journey",
  "24×7 Customer Support",
];

export const tourTypes = [
  "Family Tours",
  "Group Tours",
  "Honeymoon Packages",
  "Corporate Tours",
  "Weekend Getaways",
];

/* ----------------------------- Destinations ----------------------------- */

export type Destination = {
  slug: string;
  name: string;
  state: string;
  blurb: string;
  image: string;
  places: string[];
};

export const destinations: Destination[] = [
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    state: "Temples, Hill Stations & Scenic Beauty",
    blurb:
      "Our home state — misty Nilgiri hill stations, ancient temple towns and the southern tip of India.",
    image: "/images/tamilnadu-nilgiris-hills.jpg",
    places: [
      "Ooty",
      "Coonoor",
      "Kotagiri",
      "Mudumalai",
      "Kodaikanal",
      "Madurai",
      "Rameswaram",
      "Kanyakumari",
    ],
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    state: "Heritage, Hills & Rich Culture",
    blurb:
      "Royal Mysore, the coffee hills of Coorg & Chikmagalur and the heritage ruins of Hampi.",
    image: "/images/karnataka-mysore-palace.jpg",
    places: ["Mysore", "Coorg", "Chikmagalur", "Murudeshwar", "Dandeli", "Bangalore"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    state: "Backwaters, Nature & Tranquility",
    blurb:
      "God's own country — tea-clad Munnar, the wildlife of Thekkady and palm-lined Alleppey backwaters.",
    image: "/images/kerala-backwaters.jpg",
    places: ["Munnar", "Thekkady", "Wayanad", "Alleppey", "Kovalam", "Varkala"],
  },
];

/* -------- Full list of places we cover per state (with photos) -------- */

export type Place = { name: string; image: string };

export const statePlaces: Record<StateSlug, Place[]> = {
  "tamil-nadu": [
    { name: "Ooty", image: "/images/places/tn-ooty.jpg" },
    { name: "Coonoor", image: "/images/places/tn-coonoor.jpg" },
    { name: "Kotagiri", image: "/images/places/tn-kotagiri.jpg" },
    { name: "Mudumalai", image: "/images/places/tn-mudumalai.jpg" },
    { name: "Masinagudi", image: "/images/tamilnadu-nilgiris-hills.jpg" },
    { name: "Coimbatore", image: "/images/places/tn-coimbatore.jpg" },
    { name: "Kodiveri", image: "/images/places/tn-kodiveri.jpg" },
    { name: "Kodaikanal", image: "/images/places/tn-kodaikanal.jpg" },
    { name: "Valparai", image: "/images/places/tn-valparai.jpg" },
    { name: "Thanjavur", image: "/images/places/tn-thanjavur.jpg" },
    { name: "Trichy", image: "/images/places/tn-trichy.jpg" },
    { name: "Kumbakonam", image: "/images/places/tn-kumbakonam.jpg" },
    { name: "Madurai", image: "/images/places/tn-madurai.jpg" },
    { name: "Rameswaram", image: "/images/places/tn-rameswaram.jpg" },
    { name: "Kanyakumari", image: "/images/places/tn-kanyakumari.jpg" },
    { name: "Chennai", image: "/images/places/tn-chennai.jpg" },
    { name: "Pondicherry", image: "/images/places/tn-pondicherry.jpg" },
    { name: "Courtallam", image: "/images/places/tn-courtallam.jpg" },
  ],
  kerala: [
    { name: "Cochin", image: "/images/places/kl-cochin.jpg" },
    { name: "Trivandrum", image: "/images/places/kl-trivandrum.jpg" },
    { name: "Kovalam", image: "/images/places/kl-kovalam.jpg" },
    { name: "Alleppey", image: "/images/places/kl-alleppey.jpg" },
    { name: "Thekkady", image: "/images/places/kl-thekkady.jpg" },
    { name: "Munnar", image: "/images/places/kl-munnar.jpg" },
    { name: "Vagamon", image: "/images/places/kl-vagamon.jpg" },
    { name: "Wayanad", image: "/images/places/kl-wayanad.jpg" },
    { name: "Varkala", image: "/images/places/kl-varkala.jpg" },
    { name: "Nelliyampathy", image: "/images/places/kl-nelliyampathy.jpg" },
  ],
  karnataka: [
    { name: "Mysore", image: "/images/places/ka-mysore.jpg" },
    { name: "Coorg", image: "/images/places/ka-coorg.jpg" },
    { name: "Chikmagalur", image: "/images/places/ka-chikmagalur.jpg" },
    { name: "Dandeli", image: "/images/places/ka-dandeli.jpg" },
    { name: "Murudeshwar", image: "/images/places/ka-murudeshwar.jpg" },
    { name: "Sakleshpur", image: "/images/places/ka-sakleshpur.jpg" },
    { name: "Bangalore", image: "/images/places/ka-bangalore.jpg" },
  ],
};

/* ------------------------------- Packages -------------------------------- */

export type ItineraryDay = { day: string; title: string; items: string[] };

export type StateSlug = "tamil-nadu" | "kerala" | "karnataka";

export type Pkg = {
  slug: string;
  title: string;
  states: StateSlug[];
  nights: number;
  days: number;
  duration: string;
  region: string;
  ideal: string;
  blurb: string;
  image: string;
  badge?: string;
  route: string[];
  highlights: string[];
  inclusions: string[];
  itinerary: ItineraryDay[];
};

export const packages: Pkg[] = [
  {
    slug: "ooty-coonoor",
    title: "Ooty & Coonoor Getaway",
    states: ["tamil-nadu"],
    nights: 2,
    days: 3,
    duration: "3 Days · 2 Nights",
    region: "Tamil Nadu",
    ideal: "Couples & Families",
    blurb:
      "Escape to the Queen of Hills. Breathe in the rain and feel alive in nature across two of the Nilgiris' loveliest towns.",
    image: "/images/tamilnadu-nilgiris-hills.jpg",
    badge: "Monsoon Special",
    route: ["Ooty", "Coonoor"],
    highlights: [
      "Botanical Garden",
      "Doddabetta Peak",
      "Tea Gardens",
      "Sim's Park",
      "Lamb's Rock",
    ],
    inclusions: [
      "Premium stay",
      "Daily breakfast",
      "Local sightseeing",
      "Pickup & drop",
      "All taxes included",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Ooty",
        items: ["Arrival & check-in", "Botanical Garden", "Ooty Lake boating", "Overnight in Ooty"],
      },
      {
        day: "Day 2",
        title: "Ooty Sightseeing",
        items: ["Doddabetta Peak", "Tea factory & gardens", "Rose Garden", "Overnight in Ooty"],
      },
      {
        day: "Day 3",
        title: "Coonoor & Departure",
        items: ["Sim's Park", "Lamb's Rock", "Tea estates", "Departure with memories"],
      },
    ],
  },
  {
    slug: "ooty-pykara-mudumalai",
    title: "Ooty · Pykara · Mudumalai · Coonoor",
    states: ["tamil-nadu"],
    nights: 3,
    days: 4,
    duration: "4 Days · 3 Nights",
    region: "Tamil Nadu",
    ideal: "Groups · Best for groups",
    blurb:
      "Travel together, memories forever. A monsoon group special weaving lakes, waterfalls and a Mudumalai wildlife safari.",
    image: "/images/ooty-viewpoint.jpg",
    badge: "Group Special",
    route: ["Ooty", "Pykara", "Mudumalai", "Coonoor"],
    highlights: [
      "Pykara Lake & Falls",
      "Mudumalai Safari",
      "Elephant Camp",
      "Tea Gardens",
    ],
    inclusions: [
      "Comfortable stay",
      "Daily breakfast & dinner",
      "Mudumalai wildlife safari",
      "All transfers & sightseeing",
      "Mineral water",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Ooty",
        items: ["Arrival & drop", "Botanical Garden", "Ooty Lake", "Overnight in Ooty"],
      },
      {
        day: "Day 2",
        title: "Pykara Sightseeing",
        items: ["Pykara Lake", "Pykara Waterfalls", "Doddabetta Peak", "Tea factory", "Overnight in Ooty"],
      },
      {
        day: "Day 3",
        title: "Mudumalai Safari",
        items: ["Mudumalai wildlife safari", "Elephant Camp", "Back to Ooty", "Overnight in Ooty"],
      },
      {
        day: "Day 4",
        title: "Coonoor & Departure",
        items: ["Coonoor sightseeing", "Sim's Park", "Tea gardens", "Departure"],
      },
    ],
  },
  {
    slug: "valparai-athirapally",
    title: "Valparai & Athirapally",
    states: ["tamil-nadu", "kerala"],
    nights: 2,
    days: 3,
    duration: "3 Days · 2 Nights",
    region: "Tamil Nadu · Kerala",
    ideal: "Where hills meet waterfalls",
    blurb:
      "Escape to nature — endless tea gardens, cool climate and the spectacular Athirapally falls on the Kerala border.",
    image: "/images/hill-trek.jpg",
    badge: "Nature Escape",
    route: ["Coimbatore", "Valparai", "Athirapally"],
    highlights: [
      "Nallamudi View Point",
      "Aliyar Dam",
      "Monkey Falls",
      "Athirapally Waterfalls",
    ],
    inclusions: [
      "Accommodation",
      "Daily breakfast",
      "All sightseeing",
      "Private vehicle",
      "Toll, parking & driver allowance",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Coimbatore → Valparai",
        items: ["Pickup from Coimbatore", "Scenic drive to Valparai", "Nallamudi View Point", "Overnight in Valparai"],
      },
      {
        day: "Day 2",
        title: "Valparai Local Sightseeing",
        items: ["Tea estate walk", "Aliyar Dam", "Monkey Falls", "Sholayar Dam viewpoint", "Overnight in Valparai"],
      },
      {
        day: "Day 3",
        title: "Valparai → Athirapally",
        items: ["Drive to Athirapally", "Athirapally Waterfalls", "Drive back to Coimbatore", "Drop at destination"],
      },
    ],
  },
  {
    slug: "kodaikanal-honeymoon",
    title: "Kodaikanal Honeymoon",
    states: ["tamil-nadu"],
    nights: 2,
    days: 3,
    duration: "3 Days · 2 Nights",
    region: "Tamil Nadu",
    ideal: "A romantic escape just for two",
    blurb:
      "Begin your forever in the lap of nature. Love, nature, togetherness — a romantic Kodaikanal escape for couples.",
    image: "/images/ooty-viewpoint.jpg",
    badge: "Honeymoon Special",
    route: ["Kodaikanal"],
    highlights: [
      "Coaker's Walk",
      "Kodai Lake",
      "Bryant Park",
      "Silver Cascade",
      "Pillar Rocks",
    ],
    inclusions: [
      "Romantic stay & private cottage",
      "Candlelight dinner",
      "Flower & bed decoration",
      "Sightseeing & local tour",
      "Pickup & drop",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Lakeside",
        items: ["Arrival & romantic check-in", "Kodai Lake boating", "Coaker's Walk sunset", "Candlelight dinner"],
      },
      {
        day: "Day 2",
        title: "Kodaikanal Sightseeing",
        items: ["Bryant Park", "Pillar Rocks", "Pine Forest", "Silver Cascade", "Overnight stay"],
      },
      {
        day: "Day 3",
        title: "Departure",
        items: ["Leisurely breakfast", "Local shopping", "Departure with memories"],
      },
    ],
  },
  {
    slug: "karnataka-heritage",
    title: "Mysore · Coorg · Chikmagalur",
    states: ["karnataka"],
    nights: 4,
    days: 5,
    duration: "5 Days · 4 Nights",
    region: "Karnataka",
    ideal: "Heritage & coffee country",
    blurb:
      "Royal palaces, misty coffee estates and rich culture — the heritage heart of Karnataka, end to end.",
    image: "/images/karnataka-mysore-palace.jpg",
    route: ["Mysore", "Coorg", "Chikmagalur"],
    highlights: [
      "Mysore Palace",
      "Coffee Estates",
      "Abbey Falls",
      "Mullayanagiri",
    ],
    inclusions: [
      "Hand-picked stays",
      "Daily breakfast",
      "Private vehicle & driver",
      "All sightseeing",
      "Toll & parking",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Mysore",
        items: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "Overnight in Mysore"],
      },
      {
        day: "Day 2-3",
        title: "Coorg",
        items: ["Coffee estate tour", "Abbey Falls", "Raja's Seat", "Dubare Elephant Camp"],
      },
      {
        day: "Day 4-5",
        title: "Chikmagalur & Departure",
        items: ["Mullayanagiri peak", "Coffee museum", "Hebbe Falls", "Departure"],
      },
    ],
  },
  {
    slug: "kerala-backwaters-hills",
    title: "Munnar · Thekkady · Alleppey",
    states: ["kerala"],
    nights: 4,
    days: 5,
    duration: "5 Days · 4 Nights",
    region: "Kerala",
    ideal: "Backwaters & tea hills",
    blurb:
      "Tea-clad Munnar, the spice forests of Thekkady and a private Alleppey houseboat night — God's own country.",
    image: "/images/kerala-backwaters.jpg",
    route: ["Munnar", "Thekkady", "Alleppey"],
    highlights: [
      "Tea Gardens",
      "Periyar Wildlife",
      "Spice Plantations",
      "Houseboat Cruise",
    ],
    inclusions: [
      "Hand-picked stays",
      "Daily breakfast",
      "Private vehicle & driver",
      "Houseboat cruise",
      "All sightseeing",
    ],
    itinerary: [
      {
        day: "Day 1-2",
        title: "Munnar",
        items: ["Tea gardens & museum", "Eravikulam Park", "Mattupetty Dam", "Echo Point"],
      },
      {
        day: "Day 3",
        title: "Thekkady",
        items: ["Periyar wildlife", "Spice plantation tour", "Boat ride", "Overnight in Thekkady"],
      },
      {
        day: "Day 4-5",
        title: "Alleppey & Departure",
        items: ["Alleppey houseboat", "Backwater cruise", "Overnight on houseboat", "Departure"],
      },
    ],
  },
];

export function getPackagesByState(state: string) {
  return packages.filter((p) => p.states.includes(state as StateSlug));
}

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

/* ------------------------------ Inclusions ------------------------------- */

export const inclusions = [
  {
    key: "stay",
    title: "Hand-picked Stays",
    desc: "Deluxe rooms, cottages, home stays and resorts — vetted for cleanliness, views and warm service.",
    image: "/images/stay-suite-1.jpg",
  },
  {
    key: "breakfast",
    title: "Daily Breakfast",
    desc: "Wake to fresh South Indian breakfasts — crisp dosas, soft idlis and filter coffee.",
    image: "/images/breakfast-dosa.jpg",
  },
  {
    key: "vehicle",
    title: "Private Vehicle",
    desc: "Sedan, SUV, Innova, Tempo Traveller or bus — clean, well-maintained, with experienced local drivers.",
    image: "/images/vehicle-kia-carens.jpg",
  },
];

export const stayTypes = ["Deluxe Rooms", "Cottages", "Home Stay", "Resorts"];

export const fleet = [
  { name: "Sedan", type: "Comfort · up to 4 guests", image: "/images/vehicle-sedan.jpg" },
  { name: "SUV", type: "Premium · up to 6 guests", image: "/images/vehicle-suv.jpg" },
  { name: "Innova", type: "Spacious · up to 7 guests", image: "/images/vehicle-innova.jpg" },
  { name: "Tempo Traveller", type: "Groups · up to 12 guests", image: "/images/vehicle-tempo-traveller.jpg" },
  { name: "Bus", type: "Large groups · 20+ guests", image: "/images/vehicle-bus.jpg" },
];

/* ------------------------------- Reviews --------------------------------- */

export const reviews = [
  {
    name: "Aravind Kumar",
    role: "Group trip · Ooty + Mudumalai",
    avatar: "/images/ooty-viewpoint.jpg",
    rating: 5,
    text: "From the pickup to the Mudumalai safari, everything was perfectly arranged. Our driver felt like family by day three. Truly hassle-free.",
  },
  {
    name: "Priya & Sanjay",
    role: "Honeymoon · Kodaikanal",
    avatar: "/images/resort-pool.jpg",
    rating: 5,
    text: "The candlelight dinner and the cottage Sivaraman's team picked were so romantic. Local tips we'd never have found on our own. Worth every rupee.",
  },
  {
    name: "Deepa Nair",
    role: "Family tour · Munnar + Alleppey",
    avatar: "/images/kerala-village-aerial.jpg",
    rating: 5,
    text: "We were nine people and they handled the whole week flawlessly — clean Tempo Traveller, great breakfasts, zero stress. Highly recommend Hullathi.",
  },
  {
    name: "Rohit Menon",
    role: "Heritage tour · Mysore + Coorg",
    avatar: "/images/karnataka-bangalore.jpg",
    rating: 5,
    text: "Mysore Palace at night was unforgettable. The team is responsive on WhatsApp at any hour — genuinely 24/7. Will book again.",
  },
];

/* ------------------------------- Gallery --------------------------------- */

export const galleryImages = [
  { src: "/images/kerala-backwaters.jpg", alt: "Houseboat on Kerala backwaters", span: "tall" },
  { src: "/images/tamilnadu-temple-1.jpg", alt: "Temple gopuram at golden hour", span: "wide" },
  { src: "/images/karnataka-mysore-palace.jpg", alt: "Mysuru Palace illuminated at night" },
  { src: "/images/tamilnadu-nilgiris-hills.jpg", alt: "Green Nilgiri hills near Ooty" },
  { src: "/images/resort-pool.jpg", alt: "Resort pool at sunset", span: "wide" },
  { src: "/images/karnataka-murudeshwar.jpg", alt: "Murudeshwar coast, Karnataka" },
  { src: "/images/cuisine-thali-2.jpg", alt: "South Indian thali" },
  { src: "/images/ooty-viewpoint.jpg", alt: "Travellers at an Ooty viewpoint", span: "tall" },
  { src: "/images/stay-suite-1.jpg", alt: "Premium hotel suite" },
  { src: "/images/kerala-village-aerial.jpg", alt: "Aerial view of a Kerala village", span: "wide" },
  { src: "/images/dining-1.jpg", alt: "Fine dining interior" },
  { src: "/images/hill-trek.jpg", alt: "Hilltop trek in the Western Ghats" },
  { src: "/images/tamilnadu-temple-2.jpg", alt: "Temple tower at dusk" },
  { src: "/images/stay-room-2.jpg", alt: "Comfortable hill-stay room" },
];
