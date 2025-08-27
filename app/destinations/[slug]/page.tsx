import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Clock, ChevronLeft, Star } from "lucide-react"
import Link from "next/link"
import { DESTINATIONS } from "@/lib/destinations"
import { getTours } from "@/lib/tours"
import RequestCallbackButton from "@/components/request-callback-button"

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

  // Filter tours that belong to this destination (match by destination name or location)
  const allTours = getTours()
  const toursForDestination = allTours.filter(tour => {
    const dl = destination.name.toLowerCase()
    const loc = (destination.location || destination.name).toLowerCase()
    return (
      tour.location.toLowerCase().includes(dl) ||
      tour.location.toLowerCase().includes(loc) ||
      tour.country.toLowerCase().includes(loc)
    )
  })

  return (
    <main className="pt-28">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh]">
        {destination.video ? (
          <video
            src={destination.video}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
        )}
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
            {/* Tours in this Destination */}
            {toursForDestination.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Tours in {destination.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {toursForDestination.map(tour => (
                    <Link key={tour.id} href={`/tours/${tour.slug}`} className="group block rounded-xl overflow-hidden border">
                      <div className="relative aspect-[4/3]">
                        <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        {tour.featured && (
                          <span className="absolute top-3 right-3 bg-brand-teal text-white text-xs font-medium px-2 py-1 rounded-full">Featured</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-teal transition-colors">{tour.title}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{tour.duration}</span>
                          <span className="flex items-center"><Star className="h-4 w-4 text-brand-teal mr-1" />{tour.rating}</span>
                        </div>
                        <div className="mt-3 text-brand-teal font-bold">₹{tour.price} <span className="text-xs text-muted-foreground font-normal">per person</span></div>
                      </div>
                    </Link>
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

              <RequestCallbackButton 
                group={false} 
                tourTitle={`${destination.name} Destination`}
                tourLocation={destination.location}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
