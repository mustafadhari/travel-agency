export interface Tour {
  id: number
  title: string
  slug: string
  location: string
  country: string
  continent: string
  duration: string
  duration_days: number
  type: string
  price: number
  rating: number
  reviews: number
  image: string
  description: string
  featured: boolean
  difficulty_level: string
  max_participants: number
  highlights: string[]
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
  }[]
  inclusions: string[]
  exclusions: string[]
  accommodation: string
  transportation: string
  meals: string
  best_time: string
  weather: string
  visa_requirements: string
  payment_terms: string
  cancellation_policy: string
  images: string[]
  created_at: string
  updated_at: string
}

export const TOURS: Tour[] = [
  {
    id: 1,
    title: "Enchanting Bali Private Retreat",
    slug: "enchanting-bali-private-retreat",
    location: "Bali",
    country: "Indonesia",
    continent: "Asia",
    duration: "8 Days / 7 Nights",
    duration_days: 8,
    type: "Private Tour",
    price: 2499,
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg?height=400&width=600&text=Bali+Tour",
    description: "Experience the magic of Bali with our exclusive private tour package. From pristine beaches to ancient temples, immerse yourself in the island's rich culture and natural beauty.",
    featured: true,
    difficulty_level: "Easy",
    max_participants: 6,
    highlights: [
      "Private villa with infinity pool in Seminyak",
      "Sacred Monkey Forest and Ubud Palace",
      "Sunrise trek to Mount Batur",
      "Traditional Balinese cooking class",
      "Luxury spa treatments",
      "Sunset dinner at Tanah Lot Temple"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Arrive in Bali and transfer to your private villa. Welcome dinner with traditional Balinese dance performance.",
        activities: ["Airport pickup", "Villa check-in", "Welcome dinner", "Traditional dance"]
      },
      {
        day: 2,
        title: "Ubud Cultural Experience",
        description: "Explore the cultural heart of Bali with visits to sacred sites and traditional markets.",
        activities: ["Sacred Monkey Forest", "Ubud Palace", "Traditional market", "Rice terrace walk"]
      }
    ],
    inclusions: [
      "7 nights luxury villa accommodation",
      "All airport transfers",
      "Daily breakfast and 3 dinners",
      "Private English-speaking guide",
      "All entrance fees and activities",
      "Luxury spa treatment",
      "Traditional cooking class",
      "24/7 concierge service"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Tips and gratuities",
      "Alcoholic beverages"
    ],
    accommodation: "Luxury private villa with infinity pool in Seminyak",
    transportation: "Private air-conditioned vehicle with professional driver",
    meals: "7 breakfasts, 3 lunches, 3 dinners",
    best_time: "April to October (Dry Season)",
    weather: "Tropical climate with temperatures 26-30°C (79-86°F)",
    visa_requirements: "Most nationalities receive 30-day visa-free entry to Indonesia",
    payment_terms: "30% deposit required at booking, full payment 60 days before departure",
    cancellation_policy: "Free cancellation up to 90 days before departure, 50% refund 60-89 days before",
    images: [
      "/placeholder.svg?height=400&width=600&text=Bali+Beach",
      "/placeholder.svg?height=400&width=600&text=Bali+Temple",
      "/placeholder.svg?height=400&width=600&text=Bali+Villa",
      "/placeholder.svg?height=400&width=600&text=Bali+Sunset"
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Mystical Japan Adventure",
    slug: "mystical-japan-adventure",
    location: "Tokyo, Kyoto, Osaka",
    country: "Japan",
    continent: "Asia",
    duration: "10 Days / 9 Nights",
    duration_days: 10,
    type: "Group Tour",
    price: 3299,
    rating: 4.8,
    reviews: 98,
    image: "/placeholder.svg?height=400&width=600&text=Japan+Tour",
    description: "Discover the perfect blend of ancient traditions and modern wonders in Japan. Explore bustling Tokyo, historic Kyoto, and vibrant Osaka on this unforgettable journey.",
    featured: false,
    difficulty_level: "Moderate",
    max_participants: 12,
    highlights: [
      "Tokyo's modern marvels and traditional temples",
      "Historic Kyoto with ancient shrines",
      "Osaka's vibrant food culture",
      "Bullet train experience",
      "Cherry blossom viewing (seasonal)",
      "Traditional tea ceremony"
    ],
    itinerary: [
      {
        day: 1,
        title: "Tokyo Arrival",
        description: "Arrive in Tokyo and explore the modern metropolis.",
        activities: ["Airport pickup", "Hotel check-in", "Shibuya crossing", "Welcome dinner"]
      },
      {
        day: 2,
        title: "Tokyo Modern",
        description: "Explore Tokyo's modern attractions and shopping districts.",
        activities: ["Senso-ji Temple", "Asakusa district", "Tokyo Skytree", "Ginza shopping"]
      }
    ],
    inclusions: [
      "9 nights hotel accommodation",
      "All transportation including bullet train",
      "Daily breakfast and 3 dinners",
      "English-speaking guide",
      "All entrance fees",
      "Traditional tea ceremony",
      "Street food tour in Osaka"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Tips and gratuities",
      "Alcoholic beverages"
    ],
    accommodation: "4-star hotels in Tokyo, Kyoto, and Osaka",
    transportation: "Bullet train and private vehicle transfers",
    meals: "9 breakfasts, 3 lunches, 3 dinners",
    best_time: "March to May (Cherry Blossom) and September to November (Autumn Colors)",
    weather: "Temperate climate with four distinct seasons",
    visa_requirements: "Many nationalities can enter Japan visa-free for up to 90 days",
    payment_terms: "30% deposit required, full payment 60 days before departure",
    cancellation_policy: "Free cancellation up to 90 days before departure",
    images: [
      "/placeholder.svg?height=400&width=600&text=Tokyo+City",
      "/placeholder.svg?height=400&width=600&text=Kyoto+Temple",
      "/placeholder.svg?height=400&width=600&text=Osaka+Food",
      "/placeholder.svg?height=400&width=600&text=Japan+Train"
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Helper functions
export function getTours() {
  return TOURS
}

export function getTourBySlug(slug: string) {
  return TOURS.find(tour => tour.slug === slug)
}

export function getFeaturedTours() {
  return TOURS.filter(tour => tour.featured)
}

export function getToursByContinent(continent: string) {
  return TOURS.filter(tour => tour.continent === continent)
}

export function getToursByType(type: string) {
  return TOURS.filter(tour => tour.type === type)
}

export function searchTours(query: string) {
  const lowercaseQuery = query.toLowerCase()
  return TOURS.filter(tour => 
    tour.title.toLowerCase().includes(lowercaseQuery) ||
    tour.location.toLowerCase().includes(lowercaseQuery) ||
    tour.country.toLowerCase().includes(lowercaseQuery) ||
    tour.description.toLowerCase().includes(lowercaseQuery)
  )
}
