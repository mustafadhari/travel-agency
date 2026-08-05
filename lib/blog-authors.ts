// EasyOurTour Blog Authors
// These represent our team's collective expertise areas

export const BLOG_AUTHORS: Record<string, any> = {
  'easyourtour-team': {
    id: 'easyourtour-team',
    name: 'EasyOurTour Team',
    bio: 'Our collective voice of travel consultants, local guides, and customer happiness experts. With decades of combined experience across India and international destinations, we bring you the most comprehensive and practical travel advice based on real customer experiences and local insights.',
    avatar: '/images/blog-authors/team-avatar.jpg',
    expertise: [
      'Indian destinations',
      'Customer success stories',
      'Travel planning tips',
      'Industry trends',
      'Budget travel strategies',
      'Luxury experiences'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/easyourtour',
      instagram: 'https://instagram.com/easyourtour',
      linkedin: 'https://linkedin.com/company/easyourtour'
    }
  },
  'destination-expert': {
    id: 'destination-expert',
    name: 'Destination Expert',
    bio: 'Our local destination specialists with first-hand knowledge of Indian and international hotspots. Each guide brings years of on-the-ground experience, cultural insights, and hidden gem discoveries to help you travel like a local.',
    avatar: '/images/blog-authors/destination-expert.jpg',
    expertise: [
      'Local cultural insights',
      'Off-the-beaten-path destinations',
      'Seasonal travel recommendations',
      'Cultural etiquette',
      'Language tips',
      'Regional cuisine'
    ]
  },
  'adventure-specialist': {
    id: 'adventure-specialist',
    name: 'Adventure Specialist',
    bio: 'Certified trekking guides and adventure travel experts with extensive experience in the Himalayas and beyond. Our adventure team focuses on safety, proper gear selection, and responsible outdoor exploration.',
    avatar: '/images/blog-authors/adventure-specialist.jpg',
    expertise: [
      'Himalayan trekking',
      'Safety protocols',
      'Gear recommendations',
      'Wildlife encounters',
      'Responsible adventure travel',
      'Physical preparation'
    ]
  },
  'budget-travel-guru': {
    id: 'budget-travel-guru',
    name: 'Budget Travel Guru',
    bio: 'Masters of stretching your travel rupee further. Our budget experts have explored 30+ countries on shoestring budgets and know all the tricks to help you experience more for less without sacrificing quality.',
    avatar: '/images/blog-authors/budget-guru.jpg',
    expertise: [
      'Budget accommodation',
      'Transportation hacks',
      'Free attractions',
      'Local eating tips',
      'Deal hunting',
      'Itinerary optimization'
    ]
  },
  'luxury-concierge': {
    id: 'luxury-concierge',
    name: 'Luxury Concierge',
    bio: 'Our VIP travel designers specializing in exclusive, high-end experiences. From private tours to boutique accommodations, we craft unforgettable luxury journeys tailored to your exact preferences.',
    avatar: '/images/blog-authors/luxury-concierge.jpg',
    expertise: [
      'VIP experiences',
      'Private tours',
      'Boutique hotels',
      'Personalized itineraries',
      'Celebrity travel',
      'Honeymoon planning'
    ]
  }
}

export type BlogAuthor = typeof BLOG_AUTHORS[keyof typeof BLOG_AUTHORS]

export function getAuthorById(id: string): BlogAuthor {
  return BLOG_AUTHORS[id] || BLOG_AUTHORS['easyourtour-team']
}