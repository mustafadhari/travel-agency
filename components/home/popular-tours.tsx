"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Heart, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getFeaturedTours } from "@/lib/tours"

export default function PopularTours() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const tours = getFeaturedTours()

  const toggleFavorite = (tourId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-3 px-3 py-1 border-brand-teal/200 bg-brand-teal/50 text-brand-teal-700 dark:bg-brand-teal/20 dark:text-brand-teal-400 dark:border-brand-teal/800"
          >
            Explore the World
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Tours</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most sought-after travel services that combine adventure, luxury, and unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tours.map((tour) => (
            <Link href={`/tours/${tour.slug}`} key={tour.id}>
              <Card
                className="overflow-hidden group h-full transition-all duration-300 hover:shadow-lg border-transparent hover:border-brand-teal/200 dark:hover:border-brand-teal/800"
                onMouseEnter={() => setHoveredCard(tour.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={(e) => toggleFavorite(tour.id, e)}
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4 transition-colors",
                          favorites.includes(tour.id) ? "fill-brand-teal text-brand-teal" : "text-gray-600",
                        )}
                      />
                    </button>
                  </div>
                  {tour.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-brand-teal hover:bg-brand-teal">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div>
                      <Badge variant="outline" className="bg-white/20 backdrop-blur-sm border-white/10 text-white">
                        {tour.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-white bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                      <Star className="h-3 w-3 fill-brand-teal text-brand-teal" />
                      <span>{tour.rating}</span>
                      <span className="opacity-80">({tour.reviews})</span>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-brand-teal transition-colors line-clamp-1">
                    {tour.title}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{tour.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <Calendar size={14} className="mr-1 flex-shrink-0" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="font-bold text-lg text-brand-teal">
                    ₹{tour.price.toLocaleString()}
                    <span className="text-xs text-muted-foreground font-normal">/person</span>
                  </div>
                </CardContent>
                <div className="pt-0 px-6 pb-6">
                  <Button
                    variant="outline"
                    className="w-full rounded-full group-hover:bg-brand-teal group-hover:text-white group-hover:border-brand-teal transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/tours">
            <Button className="bg-brand-teal hover:bg-brand-navy rounded-full px-8">View All Tours</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
