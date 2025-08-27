import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import { getTourBySlug } from "@/lib/tours"
import TourGallery from "@/components/tours/tour-gallery"
import TourItinerary from "@/components/tours/tour-itinerary"
import TourInclusions from "@/components/tours/tour-inclusions"
import TourEssentials from "@/components/tours/tour-essentials"
import TourPricing from "@/components/tours/tour-pricing"
import RelatedTours from "@/components/tours/related-tours"
import RequestCallbackButton from "@/components/request-callback-button"

interface TourPageProps {
  params: Promise<{ slug: string }>
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = getTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  const isGroupTour = /group/i.test(tour.type || "")

  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-white/20 backdrop-blur-sm border-white/10 text-white text-xs">
                {tour.type}
              </Badge>
              {tour.featured && (
                <Badge className="bg-brand-teal text-xs">Featured</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">{tour.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{tour.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current flex-shrink-0" />
                <span>{tour.rating} ({tour.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Pricing & Callback Section */}
        <div className="lg:hidden mb-8">
          <div className="space-y-4">
            <TourPricing price={tour.price} isGroup={isGroupTour} />
            <RequestCallbackButton 
              group={isGroupTour} 
              tourTitle={tour.title}
              tourLocation={tour.location}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tour</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Tour Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-teal mr-2">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <TourItinerary itinerary={tour.itinerary} />

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TourInclusions inclusions={tour.inclusions} />
              <TourInclusions exclusions={tour.exclusions} isExclusions />
            </div>

            {/* Essentials */}
            <TourEssentials tour={tour} />
            {/* Gallery */}
            <TourGallery images={tour.images} />
          </div>
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Pricing */}
            <TourPricing price={tour.price} isGroup={isGroupTour} />
            <div className="mt-6">
              <RequestCallbackButton 
                group={isGroupTour} 
                tourTitle={tour.title}
                tourLocation={tour.location}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <RelatedTours currentTourId={tour.id} />
    </div>
  )
}
