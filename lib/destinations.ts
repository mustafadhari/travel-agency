export interface DestinationItem {
  id: number
  slug: string
  name: string
  location: string
  image: string
  video?: string
  rating: number
  featured?: boolean
  images?: string[]
  description: string
  duration: string
  price: string
  bestTime: string
  highlights: string[]
  category: "domestic" | "international"
}

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 1,
    slug: "kerala",
    name: "Kerala",
    image: "/images/kerala6.jpg",
    video: "/images/kerala.mp4",
    location: "Kerala",
    rating: 4.8,
    description: "Experience the serene beauty of Munnar, a hill station nestled in the Western Ghats. Known for its sprawling tea plantations, misty mountains, and diverse wildlife, Munnar offers a perfect escape into nature's tranquility.",
    duration: "4-6 days",
    price: "From ₹9,999 per person",
    bestTime: "September to May",
    highlights: [
      "Visit the famous tea plantations and tea museum",
      "Explore Eravikulam National Park for wildlife",
      "Trek to Anamudi Peak, the highest point in South India",
      "Experience the beauty of Mattupetty Dam",
      "Stay in a plantation bungalow with mountain views",
    ],
    category: "domestic",
  },
  {
    id: 2,
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    image: "/images/manali.jpeg",
    location: "Himachal Pradesh",
    rating: 4.7,
    images: [
      "/images/spiti1.jpeg",
      "/images/spiti2.jpeg",
      "/images/spiti3.jpeg",
    ],
    description: "Discover the mystical Spiti Valley, a high-altitude desert valley known for its ancient monasteries, dramatic landscapes, and Tibetan Buddhist culture. This remote paradise offers an authentic Himalayan experience.",
    duration: "8-12 days",
    price: "From ₹18,999 per person",
    bestTime: "May to October",
    highlights: [
      "Visit ancient monasteries like Key Monastery",
      "Explore the stunning Chandratal Lake",
      "Experience the unique culture of Tabo village",
      "Trek through the beautiful Pin Valley",
      "Witness the dramatic landscapes of Kunzum Pass",
    ],
    category: "domestic",
  },
  {
    id: 3,
    slug: "rajasthan",
    name: "Rajasthan",
    image: "/images/jawai.jpeg",
    location: "Rajasthan",
    rating: 4.9,
    images: [
    ],
    video: "/images/rajasthan.mp4",
    description: "Experience the wild side of Rajasthan in Jawai, where leopards roam freely in the granite hills. This unique destination combines luxury with wildlife, offering intimate encounters with nature in a stunning landscape.",
    duration: "3-5 days",
    price: "From ₹25,999 per person",
    bestTime: "October to March",
    highlights: [
      "Leopard safari in the granite hills",
      "Stay in luxury tented camps",
      "Visit traditional Rabari villages",
      "Bird watching at Jawai Dam",
      "Experience rural Rajasthan culture",
    ],
    category: "domestic",
  },
  {
    id: 4,
    slug: "almaty",
    name: "Almaty",
    image: "/images/kazakhstan.jpeg",
    location: "Kazakhstan",
    rating: 4.8,
    images: [
      "/images/almaty1.jpeg",
      "/images/almaty2.jpeg",
      "/images/almaty3.jpeg",
    ],
    description: "Explore Almaty, Kazakhstan's largest city, nestled at the foothills of the majestic Tian Shan mountains. This vibrant city offers a perfect blend of Soviet history, modern architecture, and stunning natural landscapes.",
    duration: "5-7 days",
    price: "From $899 per person",
    bestTime: "April to October",
    highlights: [
      "Visit the iconic Zenkov Cathedral",
      "Explore the beautiful Big Almaty Lake",
      "Take the cable car to Kok Tobe",
      "Experience the Green Bazaar",
      "Hike in the nearby mountains",
    ],
    category: "international",
  },
  {
    id: 5,
    slug: "dubai",
    name: "Dubai",
    image: "/images/dubai.jpeg",
    location: "UAE",
    rating: 4.6,
    images: [
      "/images/dubai1.jpeg",
      "/images/dubai2.jpeg",
      "/images/dubai3.jpeg",
    ],
    description: "Experience the ultimate luxury and innovation in Dubai, where futuristic skyscrapers meet traditional Arabian culture. From world-class shopping to desert adventures, Dubai offers an unforgettable urban experience.",
    duration: "5-7 days",
    price: "From $1,299 per person",
    bestTime: "November to March",
    highlights: [
      "Visit the iconic Burj Khalifa",
      "Experience desert safari and dune bashing",
      "Shop at the world's largest mall",
      "Explore the historic Al Fahidi district",
      "Enjoy luxury dining and entertainment",
    ],
    category: "international",
  },
  {
    id: 6,
    slug: "cappadocia",
    name: "Cappadocia",
    image: "/images/turkey.jpeg",
    location: "Turkey",
    rating: 4.9,
    featured: true,
    images: [
      "/images/cappadocia1.jpeg",
      "/images/cappadocia2.jpeg",
      "/images/cappadocia3.jpeg",
    ],
    description: "Discover the magical landscape of Cappadocia, famous for its unique rock formations, hot air balloons, and ancient cave dwellings. This UNESCO World Heritage site offers a journey through time and nature's artistry.",
    duration: "4-6 days",
    price: "From $1,199 per person",
    bestTime: "April to October",
    highlights: [
      "Hot air balloon ride over the fairy chimneys",
      "Explore the underground cities",
      "Stay in a cave hotel",
      "Visit the Göreme Open Air Museum",
      "Experience traditional Turkish culture",
    ],
    category: "international",
  },
]


