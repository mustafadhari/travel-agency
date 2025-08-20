import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import { getTours } from "@/lib/tours"

export default function ToursList() {
  const tours = getTours()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Showing {tours.length} tours</p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="border rounded-md p-1 text-sm">
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Duration</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
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

                <p className="text-muted-foreground my-4">{tour.description}</p>

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
                    <div className="text-2xl font-bold text-brand-teal mr-2">${tour.price}</div>
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

      <div className="mt-8 flex justify-center">
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" className="w-8 h-8">
            1
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8">
            2
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8">
            ...
          </Button>
        </div>
      </div>
    </div>
  )
}

