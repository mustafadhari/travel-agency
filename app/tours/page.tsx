"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import { getTours } from "@/lib/tours"
import { formatINR } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function ToursPage() {
  const allTours = getTours()
  
  // Filter states
  const [destination, setDestination] = useState("all")
  const [tourType, setTourType] = useState("all")
  const [priceRange, setPriceRange] = useState([1000, 50000])
  const [duration, setDuration] = useState([1, 30])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popularity")
  const [currentPage, setCurrentPage] = useState(1)
  const toursPerPage = 6

  // Filter tours based on selected criteria
  const filteredTours = useMemo(() => {
    let filtered = allTours

    // Filter by destination
    if (destination !== "all") {
      filtered = filtered.filter(tour => tour.continent?.toLowerCase() === destination)
    }

    // Filter by tour type
    if (tourType !== "all") {
      filtered = filtered.filter(tour => {
        const type = tour.type?.toLowerCase() || ""
        return type.includes(tourType)
      })
    }

    // Filter by price range
    filtered = filtered.filter(tour => 
      tour.price >= priceRange[0] && tour.price <= priceRange[1]
    )

    // Filter by duration
    filtered = filtered.filter(tour => {
      const tourDuration = parseInt(tour.duration?.split(' ')[0] || '0')
      return tourDuration >= duration[0] && tourDuration <= duration[1]
    })

    // Filter by services (highlights)
    if (selectedServices.length > 0) {
      filtered = filtered.filter(tour => {
        const highlights = tour.highlights?.map(h => h.toLowerCase()) || []
        return selectedServices.some(service => 
          highlights.some(highlight => highlight.includes(service))
        )
      })
    }

    return filtered
  }, [allTours, destination, tourType, priceRange, duration, selectedServices])

  // Sort tours
  const sortedTours = useMemo(() => {
    const sorted = [...filteredTours]
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "duration":
        return sorted.sort((a, b) => {
          const aDuration = parseInt(a.duration?.split(' ')[0] || '0')
          const bDuration = parseInt(b.duration?.split(' ')[0] || '0')
          return aDuration - bDuration
        })
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case "popularity":
      default:
        return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    }
  }, [filteredTours, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedTours.length / toursPerPage)
  const startIndex = (currentPage - 1) * toursPerPage
  const paginatedTours = sortedTours.slice(startIndex, startIndex + toursPerPage)

  // Handle service selection
  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Reset all filters
  const resetFilters = () => {
    setDestination("all")
    setTourType("all")
    setPriceRange([1000, 50000])
    setDuration([1, 30])
    setSelectedServices([])
    setSortBy("popularity")
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore Our Tours</h1>
        <p className="text-xl text-muted-foreground">
          Discover handcrafted journeys to the world's most extraordinary destinations
        </p>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="space-y-6 bg-card p-6 rounded-lg border">
            <div>
              <h3 className="text-lg font-semibold mb-4">Filter Tours</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="All Destinations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Destinations</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="north america">North America</SelectItem>
                    <SelectItem value="south america">South America</SelectItem>
                    <SelectItem value="oceania">Australia & Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tour-type">Tour Type</Label>
                <Select value={tourType} onValueChange={setTourType}>
                  <SelectTrigger id="tour-type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="private">Private Tours</SelectItem>
                    <SelectItem value="group">Group Tours</SelectItem>
                    <SelectItem value="honeymoon">Honeymoon Packages</SelectItem>
                    <SelectItem value="adventure">Adventure Tours</SelectItem>
                    <SelectItem value="cultural">Cultural Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Price Range (₹)</Label>
                  <span className="text-sm text-muted-foreground">
                    ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  max={100000}
                  min={0}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Duration (Days)</Label>
                  <span className="text-sm text-muted-foreground">
                    {duration[0]} - {duration[1]} days
                  </span>
                </div>
                <Slider 
                  max={30} 
                  min={1} 
                  step={1} 
                  value={duration} 
                  onValueChange={setDuration} 
                />
              </div>

              <div className="space-y-2">
                <Label>Services</Label>
                <div className="space-y-2">
                  {[
                    { id: "beach", label: "Beach & Islands" },
                    { id: "wildlife", label: "Wildlife & Safari" },
                    { id: "city", label: "City Exploration" },
                    { id: "cultural", label: "Cultural Immersion" },
                    { id: "adventure", label: "Adventure Activities" }
                  ].map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <label htmlFor={service.id} className="text-sm">
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex flex-col gap-2">
              <Button 
                className="w-full bg-brand-teal hover:bg-brand-navy"
                onClick={() => setCurrentPage(1)}
              >
                Apply Filters
              </Button>
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Tours List */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing {filteredTours.length} of {allTours.length} tours
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            {paginatedTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image 
                      src={tour.image || "/placeholder.svg"} 
                      alt={tour.title} 
                      fill 
                      className="object-cover" 
                    />
                    {tour.featured && (
                      <div className="absolute top-2 right-2 bg-brand-teal text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-2 hover:text-brand-teal transition-colors">
                          <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
                        </h3>
                        <div className="flex items-center text-muted-foreground text-sm mb-2">
                          <MapPin size={14} className="mr-1" />
                          {tour.location}
                        </div>
                      </div>

                      <div className="flex items-center mt-2 md:mt-0">
                        <Star size={16} className="text-brand-teal" />
                        <span className="ml-1 font-medium">{tour.rating}</span>
                        <span className="text-muted-foreground text-sm ml-1">({tour.reviews} reviews)</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground my-4 line-clamp-2">{tour.description}</p>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4 md:mb-0">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {tour.type}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-brand-teal mr-2">
                          {formatINR(tour.price)}
                        </div>
                        <span className="text-xs text-muted-foreground">per person</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex justify-end">
                      <Link href={`/tours/${tour.slug}`}>
                        <Button className="bg-brand-teal hover:bg-brand-navy">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  ←
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-8 h-8"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  →
                </Button>
              </div>
            </div>
          )}

          {paginatedTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No tours found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
