export interface SearchFilters {
  destination?: string
  checkIn?: Date
  checkOut?: Date
  adults?: number
  children?: number
  minPrice?: number
  maxPrice?: number
  tourType?: string
  duration?: number
}

export interface Tour {
  id: number
  title: string
  slug: string
  destination_id: number
  destination_name: string
  country: string
  continent: string
  description: string
  duration_days: number
  price: number
  tour_type: string
  image_url: string
  max_participants: number
  difficulty_level: string
  rating: number
  review_count: number
  status: string
  created_at: string
  updated_at: string
}

export interface SearchResult {
  tours: Tour[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function searchTours(filters: SearchFilters, page = 1): Promise<SearchResult> {
  try {
    const searchParams = new URLSearchParams()

    if (filters.destination) {
      searchParams.append("destination", filters.destination)
    }
    if (filters.minPrice) {
      searchParams.append("minPrice", filters.minPrice.toString())
    }
    if (filters.maxPrice) {
      searchParams.append("maxPrice", filters.maxPrice.toString())
    }
    if (filters.tourType) {
      searchParams.append("tourType", filters.tourType)
    }
    if (filters.duration) {
      searchParams.append("duration", filters.duration.toString())
    }

    searchParams.append("page", page.toString())
    searchParams.append("limit", "12")

    const response = await fetch(`/api/tours?${searchParams.toString()}`)

    if (!response.ok) {
      throw new Error("Failed to fetch tours")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Search error:", error)

    // Fallback to mock data if API fails
    const mockTours: Tour[] = [
      {
        id: 1,
        title: "Romantic Paris Getaway",
        slug: "romantic-paris-getaway",
        destination_id: 1,
        destination_name: "Paris",
        country: "France",
        continent: "Europe",
        description: "Experience the romance of Paris with visits to iconic landmarks.",
        duration_days: 5,
        price: 1299.0,
        tour_type: "Private Tour",
        image_url: "/placeholder.svg?height=400&width=600&text=Paris+Tour",
        max_participants: 8,
        difficulty_level: "Easy",
        rating: 4.8,
        review_count: 124,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Bali Cultural Adventure",
        slug: "bali-cultural-adventure",
        destination_id: 2,
        destination_name: "Bali",
        country: "Indonesia",
        continent: "Asia",
        description: "Immerse yourself in Balinese culture with temple visits and cooking classes.",
        duration_days: 8,
        price: 1899.0,
        tour_type: "Cultural Tour",
        image_url: "/placeholder.svg?height=400&width=600&text=Bali+Tour",
        max_participants: 12,
        difficulty_level: "Moderate",
        rating: 4.9,
        review_count: 98,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    return {
      tours: mockTours,
      pagination: {
        page: 1,
        limit: 12,
        total: mockTours.length,
        totalPages: 1,
      },
    }
  }
}

export async function getDestinations(search?: string): Promise<any[]> {
  try {
    const searchParams = new URLSearchParams()
    if (search) {
      searchParams.append("search", search)
    }

    const response = await fetch(`/api/destinations?${searchParams.toString()}`)

    if (!response.ok) {
      throw new Error("Failed to fetch destinations")
    }

    const data = await response.json()
    return data.destinations
  } catch (error) {
    console.error("Destinations fetch error:", error)

    // Fallback to mock data
    return [
      { id: 1, name: "Paris", country: "France", continent: "Europe" },
      { id: 2, name: "Bali", country: "Indonesia", continent: "Asia" },
      { id: 3, name: "Tokyo", country: "Japan", continent: "Asia" },
      { id: 4, name: "New York", country: "USA", continent: "North America" },
      { id: 5, name: "Rome", country: "Italy", continent: "Europe" },
    ]
  }
}
