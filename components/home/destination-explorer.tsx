"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface Destination {
  id: number
  name: string
  image: string
  location: string
  rating: number
  featured?: boolean
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Bali",
    image: "/placeholder.svg?height=600&width=800",
    location: "Indonesia",
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    name: "Santorini",
    image: "/placeholder.svg?height=600&width=800",
    location: "Greece",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Kyoto",
    image: "/placeholder.svg?height=600&width=800",
    location: "Japan",
    rating: 4.9,
    featured: true,
  },
  {
    id: 4,
    name: "Maldives",
    image: "/placeholder.svg?height=600&width=800",
    location: "South Asia",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Paris",
    image: "/placeholder.svg?height=600&width=800",
    location: "France",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Machu Picchu",
    image: "/placeholder.svg?height=600&width=800",
    location: "Peru",
    rating: 4.9,
    featured: true,
  },
]

export default function DestinationExplorer() {
  const [activeTab, setActiveTab] = useState<"all" | "featured">("all")
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredDestinations(destinations)
    } else {
      setFilteredDestinations(destinations.filter((d) => d.featured))
    }
  }, [activeTab])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6">
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-center space-y-4 text-center mb-12 reveal-animation",
            inView && "revealed",
          )}
        >
          <div className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-sm text-brand-teal dark:bg-brand-teal/20">
            Explore Destinations
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover Your Dream Destination
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Explore our handpicked selection of stunning destinations around the world, from tropical paradises to
            historic cities.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full border border-gray-200 p-1 dark:border-gray-800">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                activeTab === "all"
                  ? "bg-brand-teal text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              All Destinations
            </button>
            <button
              onClick={() => setActiveTab("featured")}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                activeTab === "featured"
                  ? "bg-brand-teal text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              Featured
            </button>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 staggered-animation",
            inView && "revealed",
          )}
        >
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-xl hover-lift transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">{destination.location}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-white text-xs ml-1">{destination.rating}</span>
                    </div>
                  </div>
                  <Link href={`/destinations/${destination.name.toLowerCase()}`} className="mt-3 block">
                    <Button className="w-full bg-white text-brand-navy hover:bg-white/90 border-none">
                      Explore <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              {destination.featured && (
                <div className="absolute top-4 right-4 bg-brand-teal text-white text-xs font-medium px-2 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/destinations">
            <Button className="bg-brand-navy hover:bg-brand-navy/90">
              View All Destinations <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
