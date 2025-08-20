"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { DESTINATIONS } from "@/lib/destinations"

interface DestinationSuggestionsProps {
  query: string
  onSelect: (destination: string) => void
  isVisible: boolean
}

export function DestinationSuggestions({ query, onSelect, isVisible }: DestinationSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      setLoading(true)
      try {
        // Filter destinations from our destinations page
        const filteredDestinations = DESTINATIONS.filter((destination) =>
          destination.name.toLowerCase().includes(query.toLowerCase()) ||
          destination.location.toLowerCase().includes(query.toLowerCase())
        )
        
        // Limit to 5 suggestions
        setSuggestions(filteredDestinations.slice(0, 5))
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
    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl max-h-60 overflow-y-auto">
      {loading && (
        <div className="p-3 text-center text-gray-500 dark:text-gray-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-teal mx-auto"></div>
        </div>
      )}

      {!loading && suggestions.length === 0 && query.length >= 2 && (
        <div className="p-3 text-center text-gray-500 dark:text-gray-400">
          <div className="mb-2">No exact matches found</div>
          <div className="text-sm">You can still enter your desired destination</div>
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="py-2">
          {suggestions.map((destination) => (
            <button
              key={destination.id}
              onClick={() => onSelect(`${destination.name}, ${destination.location}`)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center transition-colors"
            >
              <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{destination.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {destination.location} • {destination.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading && suggestions.length === 0 && query.length < 2 && (
        <div className="py-2">
          <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">Popular destinations:</div>
          {DESTINATIONS.slice(0, 5).map((destination) => (
            <button
              key={destination.id}
              onClick={() => onSelect(`${destination.name}, ${destination.location}`)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center transition-colors"
            >
              <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{destination.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{destination.location}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
