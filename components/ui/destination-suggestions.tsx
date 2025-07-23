"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { getDestinations } from "@/lib/search"

interface Destination {
  id: number
  name: string
  country: string
  continent: string
}

interface DestinationSuggestionsProps {
  query: string
  onSelect: (destination: string) => void
  isVisible: boolean
}

export function DestinationSuggestions({ query, onSelect, isVisible }: DestinationSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Destination[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      setLoading(true)
      try {
        const destinations = await getDestinations(query)
        setSuggestions(destinations.slice(0, 5))
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [query])

  if (!isVisible) return null

  return (
    <div className="absolute z-50 w-full mt-1 bg-white rounded-xl border border-gray-200 shadow-xl max-h-60 overflow-y-auto">
      {loading && (
        <div className="p-3 text-center text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      )}

      {!loading && suggestions.length === 0 && query.length >= 2 && (
        <div className="p-3 text-center text-gray-500">No destinations found</div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="py-2">
          {suggestions.map((destination) => (
            <button
              key={destination.id}
              onClick={() => onSelect(`${destination.name}, ${destination.country}`)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
            >
              <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">{destination.name}</div>
                <div className="text-sm text-gray-500">
                  {destination.country}, {destination.continent}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading && suggestions.length === 0 && query.length < 2 && (
        <div className="py-2">
          <div className="px-4 py-2 text-sm text-gray-500">Popular destinations:</div>
          {["Paris, France", "Bali, Indonesia", "Tokyo, Japan", "New York, USA", "Rome, Italy"].map((dest) => (
            <button
              key={dest}
              onClick={() => onSelect(dest)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
            >
              <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
              <div className="font-medium text-gray-900">{dest}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
