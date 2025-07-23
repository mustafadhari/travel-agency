"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, Globe, Compass, Calendar, Users } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { TravelersSelector } from "@/components/ui/travelers-selector"
import { DestinationSuggestions } from "@/components/ui/destination-suggestions"
import { format } from "date-fns"

export default function HeroSection() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [duration, setDuration] = useState("")
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 })
  const [isSearching, setIsSearching] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Construct search query parameters
    const params = new URLSearchParams()
    params.append("type", "tours")
    if (destination) params.append("destination", destination)
    if (selectedDate) params.append("date", format(selectedDate, "yyyy-MM-dd"))
    if (duration) params.append("duration", duration)

    const totalTravelers = travelers.adults + travelers.children
    if (totalTravelers > 0) {
      params.append("travelers", totalTravelers.toString())
      params.append("adults", travelers.adults.toString())
      params.append("children", travelers.children.toString())
    }

    // Navigate to search results page
    router.push(`/search?${params.toString()}`)
  }

  const handleDestinationSelect = (selected: string) => {
    setDestination(selected)
    setShowDestinationSuggestions(false)
  }

  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-brand-navy to-brand-teal overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('/placeholder.svg?height=1200&width=2000&text=World+Map')] bg-cover bg-center"></div>
        </div>

        {/* Animated Circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-white/5 animate-pulse delay-1000"></div>

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q400,150 800,100 T1600,100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
          <path d="M0,200 Q400,250 800,200 T1600,200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-[90vh]">
        {/* Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-5/12 mb-12 lg:mb-0"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <span className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Explore the world with confidence
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Discover <span className="text-brand-light">Amazing</span> Tours
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-lg">
            Find and book unforgettable guided tours and travel experiences with expert local guides in over 100
            countries.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-white/80">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Compass className="h-6 w-6 text-brand-light" />
              </div>
              <div>
                <div className="text-lg font-medium text-white">1000+ Tours</div>
                <div className="text-sm">Curated experiences</div>
              </div>
            </div>

            <div className="flex items-center text-white/80">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Users className="h-6 w-6 text-brand-light" />
              </div>
              <div>
                <div className="text-lg font-medium text-white">500K+</div>
                <div className="text-sm">Happy travelers</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-6/12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Compass className="mr-3 h-6 w-6 text-brand-light" />
              Find Your Perfect Tour
            </h2>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative md:col-span-2">
                  <label className="block text-white text-sm mb-1">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="w-full pl-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 h-12 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onFocus={() => setShowDestinationSuggestions(true)}
                    />
                  </div>
                  <DestinationSuggestions
                    query={destination}
                    onSelect={handleDestinationSelect}
                    isVisible={showDestinationSuggestions}
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-1">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" /> When
                    </span>
                  </label>
                  <DatePicker
                    date={selectedDate}
                    setDate={setSelectedDate}
                    className="h-12 border border-white/20 bg-white/10 text-white rounded-xl hover:bg-white/20"
                    placeholder="Select date"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm mb-1">Duration</label>
                  <select
                    className="w-full h-12 pl-4 bg-white/10 border border-white/20 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="">Any duration</option>
                    <option value="1-3">1-3 days</option>
                    <option value="4-7">4-7 days</option>
                    <option value="8-14">8-14 days</option>
                    <option value="15+">15+ days</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-1">
                  <label className="block text-white text-sm mb-1">
                    <span className="flex items-center">
                      <Users className="mr-1 h-4 w-4" /> Travelers
                    </span>
                  </label>
                  <TravelersSelector
                    travelers={travelers}
                    onTravelersChange={setTravelers}
                    className="h-12 bg-white/10 border-white/20 text-white rounded-xl"
                  />
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 bg-brand-light hover:bg-brand-light/90 text-brand-navy font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin mr-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Find Tours
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Popular Destinations */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/70 text-sm">Popular Tours:</span>
                {["Bali Adventure", "Tokyo Explorer", "Paris Discovery", "African Safari", "Greek Islands"].map(
                  (tour) => (
                    <button
                      key={tour}
                      onClick={() => setDestination(tour)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                    >
                      {tour}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Curve */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-background"
        style={{
          borderTopLeftRadius: "50% 100%",
          borderTopRightRadius: "50% 100%",
        }}
      ></div>
    </div>
  )
}
