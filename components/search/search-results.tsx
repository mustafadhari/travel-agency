"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import { searchTours } from "@/lib/tours"

interface SearchResultsProps {
  destination?: string
  date?: string
  duration?: string
  travelers?: string
  adults?: string
  children?: string
}

export default function SearchResults({
  destination = "",
  date = "",
  duration = "",
  travelers = "",
  adults = "1",
  children = "0",
}: SearchResultsProps) {
  // Use the centralized search function
  const results = searchTours(destination)

  return (
    <div>
      {/* Search Summary */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Search Results</h3>
        <div className="text-sm text-muted-foreground">
          {destination && <span>Destination: {destination}</span>}
          {date && <span className="ml-4">Date: {date}</span>}
          {duration && <span className="ml-4">Duration: {duration}</span>}
          {adults && <span className="ml-4">Adults: {adults}</span>}
          {children && <span className="ml-4">Children: {children}</span>}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Found {results.length} tour{results.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="border rounded-md p-1 text-sm">
            <option>Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Duration</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <Card key={result.id} className="overflow-hidden group">
            <div className="relative h-48">
              <Image
                src={result.image}
                alt={result.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {result.featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-brand-teal text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{result.title}</h3>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>{result.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{result.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 mr-1" />
                    <span>{result.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{result.description}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Users className="h-3 w-3 mr-1" />
                <span>Max {result.max_participants} people</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-brand-teal">
                  ${result.price.toLocaleString()}
                  <span className="text-sm text-muted-foreground font-normal">/person</span>
                </div>
                <Link href={`/tours/${result.slug}`}>
                  <Button size="sm" variant="outline">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {results.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No tours found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or browse all our available tours.
          </p>
          <Link href="/tours">
            <Button>Browse All Tours</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
