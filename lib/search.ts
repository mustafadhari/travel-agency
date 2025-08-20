import { searchTours } from "@/lib/tours"

// Legacy function for backward compatibility
export async function searchToursLegacy(query: string) {
  return searchTours(query)
}

// Keep the destinations data for now
const STATIC_DESTINATIONS = [
  { id: 1, name: "Paris", country: "France", continent: "Europe" },
  { id: 2, name: "Bali", country: "Indonesia", continent: "Asia" },
  { id: 3, name: "Tokyo", country: "Japan", continent: "Asia" },
  { id: 4, name: "New York", country: "USA", continent: "North America" },
  { id: 5, name: "Rome", country: "Italy", continent: "Europe" },
  { id: 6, name: "Serengeti", country: "Tanzania", continent: "Africa" },
  { id: 7, name: "Santorini", country: "Greece", continent: "Europe" },
]

export async function getDestinations(query?: string) {
  if (!query) {
    return STATIC_DESTINATIONS
  }

  const lowercaseQuery = query.toLowerCase()
  return STATIC_DESTINATIONS.filter(
    (destination) =>
      destination.name.toLowerCase().includes(lowercaseQuery) ||
      destination.country.toLowerCase().includes(lowercaseQuery) ||
      destination.continent.toLowerCase().includes(lowercaseQuery)
  )
}
