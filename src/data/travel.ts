import {
  Plane,
  Hotel,
  CarFront,
  Files,
  Compass,
  HeartHandshake,
  BadgeDollarSign,
  Headphones,
  ShieldCheck,
  Globe2,
} from "lucide-react";

export type ServiceKey = "flights" | "hotels" | "visa" | "cars";
export const services = [
  {
    id: "flights" as const,
    name: "Flight Booking",
    short: "Flights",
    icon: Plane,
    title: "A better way to take off.",
    description:
      "From spontaneous escapes to the journey of a lifetime. Find a flight that fits your plans.",
    image: "/images/flight.jpg",
    bullets: [
      "Domestic & international routes",
      "Economy to first class",
      "Flexible travel options",
    ],
    cta: "Find your flight",
  },
  {
    id: "hotels" as const,
    name: "Hotel Booking",
    short: "Hotels",
    icon: Hotel,
    title: "Somewhere worth staying.",
    description:
      "A room with a view. A little local character. Discover stays that become part of the story.",
    image: "/images/hotel.jpg",
    bullets: [
      "Boutique & luxury collections",
      "Family-friendly stays",
      "Options for every budget",
    ],
    cta: "Find your stay",
  },
  {
    id: "visa" as const,
    name: "Visa Services",
    short: "Visa",
    icon: Files,
    title: "Less paperwork. More possibility.",
    description:
      "Make sense of your next step with thoughtful document guidance and travel visa assistance.",
    image: "/images/visa.jpg",
    bullets: [
      "Application guidance",
      "Document preparation",
      "Tourist & business categories",
    ],
    cta: "Explore visa services",
  },
  {
    id: "cars" as const,
    name: "Car Rental",
    short: "Cars",
    icon: CarFront,
    title: "Take the scenic route.",
    description:
      "The freedom to follow your own itinerary. Explore sample vehicles for every kind of road trip.",
    image: "/images/car.jpg",
    bullets: [
      "Economy to premium vehicles",
      "Airport pickup options",
      "Flexible rental periods",
    ],
    cta: "Find your drive",
  },
];
export const destinations = [
  {
    slug: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    description: "Barefoot days. Endless blue.",
    image: "/images/maldives.jpg",
    price: 1290,
    tag: "THE ART OF DOING NOTHING",
  },
  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Türkiye",
    description: "Two continents. A thousand stories.",
    image: "/images/istanbul.jpg",
    price: 690,
    tag: "WHERE WORLDS MEET",
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    description: "Extraordinary, in every direction.",
    image: "/images/dubai.jpg",
    price: 790,
    tag: "BEYOND THE EXPECTED",
  },
  {
    slug: "paris",
    name: "Paris",
    country: "France",
    description: "A little romance. A lot to discover.",
    image: "/images/paris.jpg",
    price: 1090,
    tag: "ALWAYS A GOOD IDEA",
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    description: "Beautifully unfamiliar. Instantly unforgettable.",
    image: "/images/tokyo.jpg",
    price: 1490,
    tag: "FIND YOUR NEW FAVORITE",
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    description: "Timeless streets. A fresh perspective.",
    image: "/images/london.jpg",
    price: 1190,
    tag: "A CLASSIC, REIMAGINED",
  },
];
export const packages = [
  {
    destination: "Maldives",
    name: "The island state of mind",
    duration: "6 days · 5 nights",
    image: "/images/maldives.jpg",
    price: 1290,
    rating: "4.9",
    includes: "Ocean-view stay · Breakfast · Transfers",
  },
  {
    destination: "Istanbul",
    name: "A tale of two continents",
    duration: "5 days · 4 nights",
    image: "/images/istanbul.jpg",
    price: 690,
    rating: "4.8",
    includes: "Boutique hotel · City walk · Transfers",
  },
  {
    destination: "Dubai",
    name: "City lights & desert nights",
    duration: "5 days · 4 nights",
    image: "/images/dubai.jpg",
    price: 790,
    rating: "4.9",
    includes: "Premium hotel · Desert tour · Transfers",
  },
];
export const values = [
  {
    icon: Compass,
    title: "Made around you",
    text: "Personalized plans for your pace, your interests, and your idea of a perfect escape.",
  },
  {
    icon: ShieldCheck,
    title: "Every detail, considered",
    text: "Clear guidance from the first question to the last item on your travel checklist.",
  },
  {
    icon: BadgeDollarSign,
    title: "More value, less guesswork",
    text: "Thoughtful choices and transparent indicative pricing, with no hidden promises.",
  },
  {
    icon: Headphones,
    title: "A human touch",
    text: "Dedicated assistance when you need a second opinion or a little local inspiration.",
  },
  {
    icon: HeartHandshake,
    title: "Easy from the start",
    text: "Flights, stays, documents, and drives, thoughtfully brought together.",
  },
  {
    icon: Globe2,
    title: "A world of possibilities",
    text: "Fresh perspectives on beloved places and the corners you haven’t discovered yet.",
  },
];
export const testimonials = [
  {
    name: "Sarah Mitchell",
    country: "United Kingdom",
    initials: "SM",
    quote:
      "Every little detail felt considered. From our beautiful island stay to the effortless itinerary, it was exactly the escape we had been dreaming of.",
    trip: "An island escape in the Maldives",
    image: "/images/portrait.jpg",
  },
  {
    name: "Omar Hassan",
    country: "United Arab Emirates",
    initials: "OH",
    quote:
      "We wanted to see a different side of Istanbul. The thoughtful recommendations and perfectly paced days made the whole experience feel personal.",
    trip: "Five memorable days in Istanbul",
    image: "/images/istanbul.jpg",
  },
  {
    name: "Amelia Chen",
    country: "Singapore",
    initials: "AC",
    quote:
      "A wonderful balance of adventure and time to slow down. The little neighborhood discoveries were the moments we’ll remember most.",
    trip: "A new perspective on Tokyo",
    image: "/images/tokyo.jpg",
  },
];
export const flights = [
  {
    id: "flight-1",
    name: "Emirates",
    code: "EK 625",
    time: "09:30 — 11:05",
    duration: "2h 35m",
    detail: "Nonstop · Cabin baggage included",
    price: 285,
  },
  {
    id: "flight-2",
    name: "Qatar Airways",
    code: "QR 611",
    time: "14:20 — 19:40",
    duration: "6h 20m",
    detail: "1 stop · Checked bag included",
    price: 245,
  },
  {
    id: "flight-3",
    name: "Turkish Airlines",
    code: "TK 709",
    time: "06:10 — 13:25",
    duration: "8h 15m",
    detail: "1 stop · Meal included",
    price: 325,
  },
];
export const hotels = [
  {
    id: "hotel-1",
    name: "The Palm Residence",
    location: "Waterfront district",
    image: "/images/hotel.jpg",
    rating: "4.9",
    detail: "Pool · Breakfast · Free Wi-Fi",
    price: 185,
  },
  {
    id: "hotel-2",
    name: "Maison & Garden",
    location: "Historic quarter",
    image: "/images/stay.jpg",
    rating: "4.8",
    detail: "Garden · Restaurant · Free Wi-Fi",
    price: 125,
  },
  {
    id: "hotel-3",
    name: "The Horizon Retreat",
    location: "Coastal promenade",
    image: "/images/maldives.jpg",
    rating: "4.9",
    detail: "Beach · Spa · Airport transfer",
    price: 245,
  },
];
export const cars = [
  {
    id: "car-1",
    name: "Toyota Corolla or similar",
    category: "Economy",
    detail: "5 seats · Automatic · 2 bags",
    price: 39,
    image: "/images/economy.jpg",
  },
  {
    id: "car-2",
    name: "Mercedes C-Class or similar",
    category: "Luxury",
    detail: "5 seats · Automatic · 3 bags",
    price: 95,
    image: "/images/car.jpg",
  },
  {
    id: "car-3",
    name: "Toyota RAV4 or similar",
    category: "SUV",
    detail: "5 seats · Automatic · 4 bags",
    price: 69,
    image: "/images/suv.jpg",
  },
];
export const visaCountries = [
  "United Arab Emirates",
  "Türkiye",
  "France",
  "United Kingdom",
  "Japan",
  "Maldives",
];
export const visaFaqs = [
  {
    question: "Does an inquiry guarantee a visa?",
    answer:
      "No. This website is a demonstration and does not submit applications. In a real application, only the relevant government or consulate can make a visa decision.",
  },
  {
    question: "Which documents might I need?",
    answer:
      "Common examples include a valid passport, photographs, itinerary, accommodation details, and financial evidence. Requirements depend on nationality, destination, and visa category. Always check the relevant official consulate.",
  },
  {
    question: "How long does processing take?",
    answer:
      "There is no processing service on this demo. Actual processing times vary by country, application type, and individual circumstances. Check current guidance from the destination’s official authority.",
  },
];
