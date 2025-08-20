"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function SpecialOffers() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const offers = [
    {
      id: 1,
      title: "Early Bird Discount",
      description: "Book 60 days in advance and save up to 25% on selected tours",
      image: "/placeholder.svg?height=300&width=400",
      color: "from-brand-teal/20 to-brand-navy/20",
    },
    {
      id: 2,
      title: "Group Travel Savings",
      description: "Travel with 6+ people and enjoy exclusive group discounts",
      image: "/placeholder.svg?height=300&width=400",
      color: "from-brand-navy/20 to-brand-teal/20",
    },
    {
      id: 3,
      title: "Last Minute Deals",
      description: "Grab amazing deals on tours departing within 30 days",
      image: "/placeholder.svg?height=300&width=400",
      color: "from-brand-teal/20 to-brand-navy/20",
    },
  ]

  const scrollPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const scrollNext = () => {
    if (activeIndex < offers.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <Badge
              variant="outline"
              className="mb-3 px-3 py-1 border-brand-teal/200 bg-brand-teal/50 text-brand-teal-700 dark:bg-brand-teal/20 dark:text-brand-teal-400 dark:border-brand-teal/800"
            >
              Limited Time
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Special Offers & Deals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mt-2">
              Limited-time offers on our most exclusive packages. Book now to secure these special rates.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={scrollPrev}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={scrollNext}
              disabled={activeIndex === offers.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {offers.map((offer) => (
              <Card
                key={offer.id}
                className="min-w-full lg:min-w-[calc(33.333%-1rem)] overflow-hidden border-none shadow-lg"
              >
                <div className={cn("relative bg-gradient-to-r p-6 rounded-xl", offer.color)}>
                                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 text-brand-teal px-3 py-1 rounded-full font-bold text-sm z-10 shadow-md">
                  {offer.discount}
                </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                      <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{offer.title}</h3>
                      <p className="text-muted-foreground mb-4">{offer.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-6">
                        <Clock size={16} className="mr-2" />
                        Valid until: {offer.validUntil}
                      </div>
                      <Link href={`/tours/${offer.slug}`}>
                        <Button className="w-full bg-brand-teal hover:bg-brand-navy rounded-full">View Offer</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center mt-8">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full mx-1 transition-all",
                index === activeIndex ? "bg-brand-teal w-6" : "bg-gray-300 dark:bg-gray-700",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
