import type { Metadata } from "next"
import { Users, Star, Globe, Shield, Heart, Award, Clock, CheckCircle, MapPin, Phone, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | EasYourTour",
  description: "Learn about our company, mission, values, and the team behind EasYourTour Travel. Discover our journey in crafting unforgettable travel experiences.",
}

const stats = [
  { number: "1,000+", label: "Happy Travelers", icon: Users },
  { number: "20+", label: "Countries Covered", icon: Globe },
  { number: "24/7", label: "Customer Support", icon: Clock },
  { number: "98%", label: "Satisfaction Rate", icon: Star },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "We prioritize our customers' needs and satisfaction above everything else"
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description: "Building lasting relationships through honest and reliable service"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for excellence in every aspect of our travel services"
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "Deep knowledge and experience in international travel"
  }
]

const team = [
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    image: "👩‍💼",
    description: "Passionate travel enthusiast with 10+ years in the industry"
  },
  {
    name: "Rahul Patel",
    role: "Head of Operations",
    image: "👨‍💼",
    description: "Expert in travel logistics and customer experience"
  },
  {
    name: "Anita Desai",
    role: "Travel Consultant",
    image: "👩‍💻",
    description: "Specialist in international destinations and visa services"
  },
  {
    name: "Vikram Singh",
    role: "Customer Success",
    image: "👨‍💻",
    description: "Dedicated to ensuring every traveler has an amazing experience"
  }
]

const milestones = [
  {
    year: "2024",
    title: "Company Founded",
    description: "EasYourTour was established with a vision to make travel accessible and enjoyable"
  },
  {
    year: "2024",
    title: "First 100 Travelers",
    description: "Successfully served our first 100 happy customers"
  },
  {
    year: "2024",
    title: "Service Expansion",
    description: "Launched comprehensive travel services including flights, hotels, and tours"
  },
  {
    year: "2024",
    title: "Digital Platform",
    description: "Launched our modern website to serve customers better"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-5"></div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              About EasYourTour
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Crafting unforgettable travel experiences since 2024. We're passionate about making your travel dreams come true.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <Button className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg rounded-lg transition-colors">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-brand-teal" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-brand-teal mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2024, EasYourTour was born from a simple yet powerful vision: to make travel accessible, 
                  enjoyable, and hassle-free for everyone. We believe that travel has the power to transform lives, 
                  broaden perspectives, and create lasting memories.
                </p>
                <p>
                  What started as a small team of passionate travel enthusiasts has grown into a trusted travel partner 
                  for thousands of customers. Our journey has been driven by a commitment to excellence, customer satisfaction, 
                  and the belief that every traveler deserves an exceptional experience.
                </p>
                <p>
                  Today, we offer comprehensive travel services including flight bookings, hotel reservations, 
                  visa assistance, tour packages, and travel insurance. Our team of experts works tirelessly to 
                  ensure that every journey is not just a trip, but an unforgettable adventure.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-teal to-brand-navy rounded-2xl p-8 text-white">
                <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed">
                  To provide exceptional travel experiences that inspire, connect, and enrich the lives of our customers, 
                  while making travel planning simple and enjoyable.
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-light/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind your perfect travel experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-brand-teal font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our growth and success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div className="font-display text-2xl font-bold text-brand-teal mb-2">{milestone.year}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-navy to-brand-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let us help you create unforgettable travel memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg">
                Explore Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-navy font-display font-semibold px-8 py-4 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
