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
    title: "Romantic Kerala Honeymoon Tour",
    slug: "kerala-honeymoon-tour",
    location: "Kerala",
    country: "India",
    continent: "Asia",
    duration: "5 Days / 4 Nights",
    duration_days: 5,
    type: "Private Honeymoon Tour",
    price: 18450,
    rating: 4.9,
    reviews: 186,
    image: "/images/kerala1.jpg?height=400&width=600&text=Kerala+Tour",
    description: "Celebrate your love amidst the rolling hills of Munnar, the spice-scented air of Thekkady, and the backwaters of Alleppey. This private Kerala honeymoon package is designed for couples seeking romance, tranquility, and memorable experiences in God's Own Country.",
    featured: true,
    difficulty_level: "Easy",
    max_participants: 2,
    highlights: [
      "Romantic stay amidst the misty tea gardens of Munnar",
      "Visit Eravikulam National Park and Mattupetty Lake",
      "Private spice plantation and Periyar wildlife exploration in Thekkady",
      "Traditional dinner and cultural shows (Kathakali, Kalaripayattu)",
      "Enchanting backwater stay in Alleppey with sunset views"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kochi – Journey to Munnar",
        description: "Your honeymoon begins as you arrive at Kochi Airport/Ernakulam station. A private AC car awaits to take you through winding roads, cascading waterfalls, and spice plantations to the hill station of Munnar.",
        activities: ["Airport pickup with flower bouquet", "Drive via Cheyappara & Valara Waterfalls", "Spice farm visit", "Romantic check-in at Munnar resort"]
      },
      {
        day: 2,
        title: "Munnar Sightseeing – Romance in the Hills",
        description: "Wake up to the cool mountain mist before exploring the best of Munnar. Walk together through tea plantations, explore the national park, and enjoy serene lakeside moments.",
        activities: ["Eravikulam National Park", "Tea museum & plantations", "Mattupetty Dam & Lake", "Echo Point & Blossom Garden"]
      },
      {
        day: 3,
        title: "Munnar to Thekkady – Spice of Romance",
        description: "A scenic drive leads you down to Thekkady, home to Kerala’s wildlife and spice heritage. Enjoy boating at Periyar Lake, spice shopping, and optional cultural shows in the evening.",
        activities: ["Scenic GAP road drive", "Periyar National Park boat safari", "Kathakali & Kalaripayattu show", "Spice plantation walk"]
      },
      {
        day: 4,
        title: "Thekkady to Alleppey – Backwater Bliss",
        description: "Head to Alleppey, the Venice of the East. Relax in a lake-facing cottage or enjoy an optional private houseboat cruise. The tranquility of the backwaters is the highlight of a Kerala honeymoon.",
        activities: ["Vembanad Lake views", "Alleppey Beach walk", "Backwater sunset", "Romantic candlelight dinner"]
      },
      {
        day: 5,
        title: "Departure from Kochi",
        description: "After breakfast, bid farewell to Kerala with cherished honeymoon memories. Private drop at Cochin Airport/Railway station.",
        activities: ["Breakfast at resort", "Leisure time", "Private transfer to Kochi drop point"]
      }
    ],
    inclusions: [
      "2 nights stay in Munnar resort",
      "1 night stay in Thekkady hotel",
      "1 night stay in Alleppey resort (cottage stay)",
      "Daily breakfast & dinner",
      "Romantic flower bed decoration (once during stay)",
      "Welcome bouquet & drinks on arrival",
      "Private AC sedan for transfers & sightseeing",
      "All parking, tolls, & driver allowances",
      "Meet & greet assistance at Kochi arrival",
    ],
    exclusions: [
        "Air fare / train fare",
        "Any adventure activities",
        "Entrance fees to monuments, gardens, and national parks",
        "Jeep safari at Eravikulam or Periyar",
        "Lunch & beverages",
        "Anything not mentioned in inclusions"
    ],
    accommodation: "Handpicked 3★ honeymoon-friendly resorts (Munnar – At Wood Resort, Thekkady – Spice Residency / Periyar Meadows, Alleppey – Lakeway Resort)",
    transportation: "Private AC Sedan with driver for entire trip",
    meals: "4 breakfasts & 4 dinners included",
    best_time: "October to March (Pleasant winter-spring months, ideal for honeymoon)",
    weather: "Cool & misty in Munnar (12-20°C), Pleasant Thekkady (18-25°C), Warm backwaters in Alleppey (22-30°C)",
    visa_requirements: "Not required for Indian citizens",
    payment_terms: "30% advance to confirm booking, balance before check-in",
    cancellation_policy: "Free cancellation up to 30 days before travel, 50% refund before 15 days, no refund within 7 days of travel",
    images: [
      "/images/kerala2.jpg",
      "/images/kerala3.jpg",
      "/images/kerala4.jpg"
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Kerala 3 Nights 4 Days Private Tour",
    slug: "kerala-3n-4d-private-tour",
    location: "Kerala",
    country: "India",
    continent: "Asia",
    duration: "4 Days / 3 Nights",
    duration_days: 4,
    type: "Private Tour",
    price: 10000,
    rating: 4.9,
    reviews: 116,
    image: "/images/kerala7.jpg",
    description: "Explore the natural beauty and cultural richness of Kerala on this 4-day tour. From the serene tea gardens of Munnar to the peaceful backwaters of Alleppey, experience relaxation and adventure in God's Own Country.",
    featured: true,
    difficulty_level: "Easy",
    max_participants: 2,
    highlights: [
      "Visit scenic Cheeyappara and Valara Waterfalls en route to Munnar",
      "Explore Eravikulam National Park and Tata Tea Museum",
      "Enjoy boating at Mattupetty Lake and the Echo Point",
      "Relax on a peaceful backwater cruise in Alleppey",
      "Discover traditional Kerala village life and cuisine"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Transfer to Munnar",
        description: "Arrive at Kochi Airport or Railway Station and transfer by private vehicle to the hill station Munnar, with stops at Cheeyappara and Valara Waterfalls. Check in and relax at the hotel for the evening.",
        activities: ["Airport pickup", "Scenic drive via Cheeyappara & Valara Waterfalls", "Hotel check-in", "Evening leisure"]
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        description: "Spend the day touring Munnar's natural attractions including Eravikulam National Park, Tata Tea Museum, Blossom Park, and Mattupetty Lake. Optional boating and photography opportunities abound.",
        activities: [
          "Eravikulam National Park visit",
          "Tea Museum exploration",
          "Walk in Blossom Park",
          "Boat ride at Mattupetty Lake",
          "Echo Point visit"
        ]
      },
      {
        day: 3,
        title: "Transfer to Alleppey and Backwater Experience",
        description: "After breakfast, transfer to Alleppey known for its tranquil backwaters. Check into your hotel and enjoy a serene day with an optional houseboat cruise to experience Kerala’s famed waterways and village life.",
        activities: [
          "Hotel check-out and drive to Alleppey",
          "Hotel check-in",
          "Optional private houseboat cruise",
          "Sunset over backwaters"
        ]
      },
      {
        day: 4,
        title: "Departure from Alleppey",
        description: "Enjoy a leisurely breakfast before your drop-off at Kochi Airport or Railway Station, concluding your memorable Kerala getaway.",
        activities: [
          "Breakfast at hotel",
          "Leisure time",
          "Private transfer to Kochi drop point"
        ]
      }
    ],
    inclusions: [
      "2 nights accommodation in Munnar",
      "1 night accommodation in Alleppey",
      "Daily breakfast",
      "Private AC vehicle for transfers and sightseeing",
      "All parking, tolls, and driver allowances",
      "Meet and greet assistance at Kochi arrival"
    ],
    exclusions: [
      "International and domestic flights",
      "Lunch and dinner except breakfast",
      "Entry fees, adventure activities, and optional excursions",
      "Personal expenses like tips, laundry, telephone",
      "Houseboat cruise fare and meals",
      "Travel insurance"
    ],
    accommodation: "Comfortable hotels in Munnar and Alleppey with scenic views and hospitable service",
    transportation: "Private AC Sedan vehicle throughout the tour",
    meals: "Breakfast only",
    best_time: "September to March (cool and pleasant climate ideal for travel)",
    weather: "Mild tropical climate with temperatures ranging 20-30°C",
    visa_requirements: "Visa required for international travelers; Indian citizens need valid ID",
    payment_terms: "30% advance booking deposit, balance before travel",
    cancellation_policy: "Free cancellation up to 15 days before departure, partial refunds for cancellations up to 7 days prior",
    images: [
      "/images/kerala8.jpg",
      "/images/kerala9.jpg"
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Kerala & Kanyakumari 6 Days / 5 Nights Tour",
    slug: "kerala-kanyakumari-5n-6d-tour",
    location: "Kerala",
    country: "India",
    continent: "Asia",
    duration: "6 Days / 5 Nights",
    duration_days: 6,
    type: "Private Tour",
    price: 17500,
    rating: 4.8,
    reviews: 112,
    image: "/images/kovalam-kerala.jpg",
    description: "Experience the best of South India with this enchanting 6-day tour. Visit the cool hill station of Munnar, the serene backwaters of Alleppey, and vibrant Kovalam Beach before exploring the southernmost point of India, Kanyakumari. A perfect blend of nature, culture, and coastal charm.",
    featured: true,
    difficulty_level: "Easy",
    max_participants: 2,
    highlights: [
      "Scenic waterfalls and tea plantations in Munnar",
      "Relaxing backwaters and houseboat options in Alleppey",
      "Visit to world’s largest bird sculpture at Jatayu Earth Centre",
      "Sunset views and water sports at Kovalam Beach",
      "Tour of historic temples and museums in Thiruvananthapuram",
      "Excursion to Kanyakumari, the southern tip of India"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Transfer to Munnar",
        description: "Arrive at Cochin Airport or Railway Station and meet your driver. Travel to Munnar with stops at the stunning Cheeyappara and Valara waterfalls. Check-in to your hotel and relax after the journey.",
        activities: [
          "Airport/Railway pickup",
          "Drive to Munnar via waterfalls",
          "Hotel check-in",
          "Evening relaxation"
        ]
      },
      {
        day: 2,
        title: "Munnar Sightseeing",
        description: "Explore Eravikulam National Park (closed 21 Jan to 15 Apr) and visit the Tata Tea Museum. See the beautiful photo point, Echo Point, and enjoy boating at Mattupetty Dam. Optional traditional cultural dance performance in the evening.",
        activities: [
          "Visit Eravikulam National Park",
          "Explore Tata Tea Museum",
          "Photo Point & Echo Point visit",
          "Boat ride at Mattupetty Dam",
          "Evening cultural program (optional)"
        ]
      },
      {
        day: 3,
        title: "Munnar to Alleppey - Backwater Stay",
        description: "After breakfast, head to Alleppey, the Venice of the East. Check in to your hotel or houseboat and enjoy a relaxed evening by the tranquil backwaters, with an option to cruise at sunset.",
        activities: [
          "Transfer to Alleppey",
          "Hotel/houseboat check-in",
          "Sunset boat or shikara ride (optional)",
          "Leisure evening"
        ]
      },
      {
        day: 4,
        title: "Allepey to Kovalam via Jatayu Earth Centre",
        description: "Enjoy a scenic drive along the Western Ghats to Kovalam. Stop to visit the impressive Jatayu Earth Centre, featuring the world’s largest bird sculpture, adventure park, and cable car rides. Reach Kovalam and check-in to your beach resort.",
        activities: [
          "Drive to Kovalam with sightseeing stops",
          "Visit Jatayu Earth Centre",
          "Hotel check-in at Kovalam",
          "Evening at Kovalam Beach to watch sunset"
        ]
      },
      {
        day: 5,
        title: "Kovalam and Thiruvananthapuram Exploration",
        description: "Spend the day discovering Thiruvananthapuram’s rich culture, including visits to the Sree Padmanabhaswamy Temple, Napier Museum, Zoo, and Science museum. Later, enjoy water sports or relax at Kovalam Beach and visit the iconic Kovalam Lighthouse.",
        activities: [
          "Visit Sree Padmanabhaswamy Temple",
          "Napier Museum and Zoo visit",
          "Science & Technology Museum",
          "Kovalam Beach activities and lighthouse visit"
        ]
      },
      {
        day: 6,
        title: "Departure from Kovalam",
        description: "After breakfast, get ready for your onward journey with a private transfer to Trivandrum Airport or Railway Station, carrying wonderful memories of your Kerala and Kanyakumari holiday.",
        activities: [
          "Breakfast at hotel",
          "Private transfer to airport or railway station",
          "Departure"
        ]
      }
    ],
    inclusions: [
      "2 nights accommodation in Munnar",
      "1 night accommodation in Alleppey (hotel or houseboat)",
      "2 nights accommodation in Kovalam resort",
      "Daily breakfast included",
      "Private air-conditioned vehicle and driver",
      "All parking, toll, and driver expenses",
      "Pick-up and drop-off assistance"
    ],
    exclusions: [
      "International and domestic flight/train tickets",
      "Lunch, dinner, and drinks except breakfast",
      "Entry fees for monuments and parks",
      "Optional cultural shows and activities",
      "Personal expenses like tips, laundry, phone calls",
      "Travel insurance"
    ],
    accommodation: "Comfortable and scenic hotels and resorts in Munnar, Alleppey, and Kovalam",
    transportation: "Private AC sedan throughout the tour",
    meals: "Breakfast only",
    best_time: "September to March (cool and pleasant climate ideal for travel)",
    weather: "Mild tropical climate with temperatures ranging 20-30°C",
    visa_requirements: "Visa required for international travelers; Indian citizens need valid ID",
    payment_terms: "30% advance booking deposit, balance before travel",
    cancellation_policy: "Free cancellation up to 15 days before departure, partial refunds for cancellations up to 7 days prior",
    images: [
      "/images/kerala10.jpg",
      "/images/kerala11.jpg"
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Romantic Shimla & Manali Honeymoon Tour",
    slug: "shimla-manali-honeymoon",
    location: "Himachal Pradesh",
    country: "India",
    continent: "Asia",
    duration: "6 Days / 5 Nights",
    duration_days: 6,
    type: "Private Honeymoon Tour",
    price: 21800,
    rating: 4.8,
    reviews: 98,
    image: "/images/manali3.jpg?height=400&width=600&text=Manali+Honeymoon",
    description: "Celebrate your togetherness with a romantic honeymoon in the snow-capped Himalayas. This Shimla–Kullu–Manali tour combines charming hill stations, scenic drives, apple orchards, and adventure-filled valleys. Perfect for couples who want to blend romance with a bit of playful adventure amidst the mountains.",
    featured: true,
    difficulty_level: "Easy",
    max_participants: 2,
    highlights: [
      "Cozy stay in beautiful mountain resorts at Shimla & Manali",
      "Walk hand-in-hand on the romantic Mall Road in Shimla",
      "Full-day excursion to Kufri with panoramic Himalayan views",
      "Adventure at Solang Valley – snow activities & cable car rides",
      "Private cab transfers for comfort and flexibility",
      "Romantic evening stroll through apple orchards and riverside valleys"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Chandigarh – Scenic Drive to Manali",
        description: "Meet & Greet at Chandigarh Airport / Railway Station and embark on a romantic drive to Manali passing green valleys and winding mountain roads.",
        activities: ["Private pickup", "Scenic hill drive", "Hotel check-in", "Evening leisure walk together"]
      },
      {
        day: 2,
        title: "Manali Local Sightseeing",
        description: "Discover Manali’s charm with your partner – from ancient temples to charming markets, spend a day exploring the town before enjoying a cozy dinner.",
        activities: ["Hadimba Devi Temple", "Van Vihar nature walk", "Club House", "Hot springs at Vashisht", "Shopping at Mall Road & IBEX Market"]
      },
      {
        day: 3,
        title: "Couple Adventure in Solang Valley",
        description: "A fun-filled day with your partner amidst snow and adventure – enjoy activities (optional) like skiing, zorbing, ropeway, or simply cozy up with snowy backdrops.",
        activities: ["Solang Valley", "Nehru Kund photo stop", "Adventure activities (optional)", "Evening at leisure in Manali"]
      },
      {
        day: 4,
        title: "Scenic Drive from Manali to Shimla via Kullu",
        description: "Journey through pine forests and river valleys, with romantic stops at Kullu and Pandoh Dam along the way.",
        activities: ["Pandoh Dam", "Beas & Kullu Valleys", "Handloom & Pashmina Shawl shopping", "Optional River Rafting & Paragliding in Kullu"]
      },
      {
        day: 5,
        title: "Shimla & Kufri Sightseeing",
        description: "Explore Kufri’s snow-capped beauty and Shimla’s colonial charm as you enjoy your last full day in the hills with your beloved.",
        activities: ["Kufri Hill Station", "Christ Church", "The Ridge & Scandal Point", "Viceregal Lodge", "Mall Road shopping & evening coffee date"]
      },
      {
        day: 6,
        title: "Departure from Shimla – Back to Chandigarh",
        description: "After breakfast, bid farewell to the Himalayas with unforgettable honeymoon moments as you drive back to Chandigarh.",
        activities: ["Breakfast at hotel", "Private transfer to Chandigarh Airport / Railway Station"]
      }
    ],
    inclusions: [
      "2 nights stay in Shimla resort",
      "3 nights stay in Manali resort",
      "Daily breakfast & dinner",
      "Welcome bouquet & drinks on arrival",
      "Romantic candlelight dinner (once during stay)",
      "Flower bed decoration (once during stay)",
      "Private sedan car for transfers & sightseeing",
      "Parking, Toll, Driver allowances included",
      "Pick up & drop from Chandigarh"
    ],
    exclusions: [
      "Air fare / train fare",
      "Adventure activities (skiing, paragliding, rafting, etc.)",
      "Entrance fees to monuments and parks",
      "Toy Train (Kalka–Shimla) tickets",
      "Heater charges at hotels (extra payment)",
      "Special Gala Dinner charges on Christmas / New Year",
      "Anything not mentioned in inclusions"
    ],
    accommodation: "Choice of 3★ or 4★ romantic hotels (Shimla – Apple Rose / Aranya Vilas, Manali – Wondercity / Manali Valley Resort)",
    transportation: "Private AC Sedan (AC may not operate in hill areas)",
    meals: "5 breakfasts & 5 dinners included",
    best_time: "December to March (Snow season) | April to June (Pleasant weather, summer honeymoon)",
    weather: "Cool to cold, temperatures range between 2°C – 15°C in winter; 10°C – 25°C in summer",
    visa_requirements: "Not required for Indian citizens",
    payment_terms: "30% advance to confirm booking, balance 1 week before travel",
    cancellation_policy: "Free cancellation up to 20 days before travel, 50% refund before 10 days, no refund within 7 days",
    images: [
      "/images/manali.jpeg?height=400&width=600",
      "/images/manali1.jpg?height=400&width=600",
      "/images/manali2.jpg?height=400&width=600",
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
