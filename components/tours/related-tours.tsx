import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Star } from "lucide-react"
import { getTours } from "@/lib/tours"
import { formatINR } from "@/lib/utils"

interface RelatedToursProps {
  currentTourId: number
}

export default function RelatedTours({ currentTourId }: RelatedToursProps) {
  const allTours = getTours()
  const relatedTours = allTours
    .filter(tour => tour.id !== currentTourId)
    .slice(0, 3)

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Services You Might Enjoy</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden group">
            <div className="relative h-48">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{tour.title}</h3>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 mr-1" />
                    <span>{tour.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{tour.description}</p>
              <div className="flex justify-between items-center">
                <div className="font-bold text-brand-teal">
                  ₹{formatINR(tour.price)}
                  <span className="text-sm text-muted-foreground font-normal">/person</span>
                </div>
                <Link href={`/tours/${tour.slug}`}>
                  <Button size="sm" variant="outline">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
