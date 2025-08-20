"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      image: "/images/testimonial1.jpeg?height=100&width=100",
      text: "Our Bali private tour exceeded all expectations. The attention to detail, from the luxury accommodations to the personalized excursions, made this the trip of a lifetime. Our guide was knowledgeable and friendly, making us feel like locals.",
      tour: "Enchanting Bali Private Retreat",
    },
    {
      id: 2,
      name: "David & Emma Thompson",
      location: "London, UK",
      image: "/images/testimonial1.jpeg?height=100&width=100",
      text: "The Greek Islands cruise was absolutely magical. Every detail was perfectly arranged, from the seamless transfers to the exclusive services on each island. EasYourTour truly understands luxury travel.",
      tour: "Greek Islands Luxury Cruise",
    },
    {
      id: 3,
      name: "Hiroshi Tanaka",
      location: "Tokyo, Japan",
      image: "/images/testimonial1.jpeg?height=100&width=100",
      text: "The Swiss Alps expedition was breathtaking. The accommodations were first-class, and our guide's knowledge of the region enhanced the experience. EasYourTour handled every detail flawlessly.",
      tour: "Majestic Swiss Alps Expedition",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-16 bg-brand-teal/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their unforgettable services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -top-6 left-8 bg-brand-teal rounded-full p-3">
              <Quote className="h-6 w-6 text-white" />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg border">
              <div className="text-center">
                <p className="text-lg md:text-xl text-muted-foreground mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="ml-4 text-left">
                    <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
                <p className="font-medium text-brand-teal">Tour: {testimonials[currentIndex].tour}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
