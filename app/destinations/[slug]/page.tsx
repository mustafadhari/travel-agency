import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Clock, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { DESTINATIONS } from "@/lib/destinations"

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Find destination from our centralized data
  const destination = DESTINATIONS.find(d => d.slug === slug)

  if (!destination) {
    // Gracefully redirect unknown slugs to the destinations index instead of crashing
    redirect("/destinations")
  }

  // Get destination details from the static data
  const destinationDetails = {
    title: destination.name,
    duration: destination.duration,
    price: destination.price,
    rating: destination.rating,
    reviews: 124,
    description: destination.description,
    highlights: destination.highlights,
    bestTime: destination.bestTime,
  }

  return (
    <main className="pt-28">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <Link
              href="/destinations"
              className="inline-flex items-center text-white mb-6 hover:text-brand-teal transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to destinations
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{destination.name}</h1>
            <div className="flex items-center text-white/90">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{destination.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Destination Overview</h2>
            <p className="text-muted-foreground mb-8">{destinationDetails.description}</p>

            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
            <ul className="space-y-2 mb-8">
              {destinationDetails.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-brand-teal/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-brand-teal text-sm">✓</span>
                  </div>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Dynamic Images Section */}
            {destination.images && destination.images.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                  {destination.images.map((image, index) => (
                    <div key={index} className="break-inside-avoid mb-4 rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`${destination.name} gallery ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Plan Your Trip</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-brand-teal mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Recommended Duration</p>
                    <p className="text-sm text-muted-foreground">{destinationDetails.duration}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-brand-teal mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Best Time to Visit</p>
                    <p className="text-sm text-muted-foreground">{destinationDetails.bestTime}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="h-5 w-5 text-brand-teal mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Perfect For</p>
                    <p className="text-sm text-muted-foreground">Couples, Families, Solo Travelers</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <p className="text-lg font-bold text-brand-teal">{destinationDetails.price}</p>
                <p className="text-sm text-muted-foreground">
                  Includes accommodations, transfers, and selected activities
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-brand-teal hover:bg-brand-navy">Book This Trip</Button>
                <Button variant="outline" className="w-full">
                  Request Custom Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
