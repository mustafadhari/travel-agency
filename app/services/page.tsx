import type { Metadata } from "next"
import { Plane, Hotel, Shield, Globe, Star, Users, Clock, Zap, Award, MapPin, Heart, CheckCircle, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RequestCallbackButton from "@/components/request-callback-button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Travel Services | EasYourTour",
  description: "Comprehensive travel services including flight bookings, hotel reservations, visa assistance, and travel insurance. Your one-stop solution for all travel needs.",
}

const services = [
  {
    title: "Flight Bookings",
    description: "Book premium flights to destinations worldwide with exclusive deals and offers from top airlines",
    icon: Plane,
    features: ["Domestic & International", "24/7 Booking", "Best Price Guarantee", "Instant Confirmation"],
    price: "Starting from ₹5,000",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    link: "/flights",
    popular: true,
  },
  {
    title: "Hotel Bookings",
    description: "Discover and book luxury hotels and accommodations worldwide. From budget to luxury, find your perfect stay",
    icon: Hotel,
    features: ["Luxury to Budget", "Verified Properties", "Instant Confirmation", "24/7 Support"],
    price: "Starting from ₹2,000",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    link: "/hotels",
    popular: false,
  },
  {
    title: "Tour Packages",
    description: "Curated tour packages to amazing destinations worldwide. From adventure to luxury, find your perfect journey",
    icon: Mountain,
    features: ["Curated Itineraries", "Expert Guides", "All-Inclusive Packages", "Flexible Options"],
    price: "Starting from ₹15,000",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    link: "/tours",
    popular: false,
  },
  {
    title: "Visa Assistance",
    description: "Professional visa assistance services with expert guidance for hassle-free travel planning worldwide",
    icon: Globe,
    features: ["Fast Processing", "100% Success Rate", "Expert Support", "Document Assistance"],
    price: "Starting from ₹1,500",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    link: "/visa",
    popular: false,
    hidden: true, // keep data but hide from UI
  },
  {
    title: "Travel Insurance",
    description: "Comprehensive travel insurance coverage for worry-free travel. Protect your journey with reliable plans",
    icon: Shield,
    features: ["Comprehensive Coverage", "24/7 Support", "Family Plans", "Instant Coverage"],
    price: "Starting from ₹500",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    link: "/travel-insurance",
    popular: false,
  },
]

const benefits = [
  {
    icon: Star,
    title: "Expert Guidance",
    description: "Professional travel experts to help you plan the perfect trip"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs"
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Safe and secure booking process with data protection"
  },
  {
    icon: Zap,
    title: "Best Deals",
    description: "Exclusive deals and offers not available elsewhere"
  }
]

const stats = [
  { number: "1,000+", label: "Happy Travelers" },
  { number: "20+", label: "Countries Covered" },
  { number: "24/7", label: "Customer Support" },
  { number: "98%", label: "Satisfaction Rate" },
]

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Amazing service! They helped me get my visa in just 3 days. Highly recommended!",
    rating: 5,
    service: "Visa Assistance"
  },
  {
    name: "Rahul Patel",
    location: "Delhi",
    text: "Best flight booking experience. Got great deals and excellent customer support.",
    rating: 5,
    service: "Flight Booking"
  },
  {
    name: "Anita Desai",
    location: "Bangalore",
    text: "Perfect hotel booking service. Found exactly what I was looking for within my budget.",
    rating: 5,
    service: "Hotel Booking"
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-5"></div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Complete Travel Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Your one-stop destination for all travel services. From flights to hotels, visas to insurance - we've got you covered
            </p>
            <div className="flex justify-center">
              <RequestCallbackButton 
                group={false}
                serviceType="General Travel Services"
                serviceLocation="Worldwide"
                className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg rounded-lg transition-colors"
              >
                Get Travel Quote
              </RequestCallbackButton>
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

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Our Travel Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive travel solutions designed to make your journey seamless and memorable
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services
              .filter((service) => !("hidden" in service && service.hidden))
              .map((service, index) => (
              <Card key={index} className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${service.popular ? 'ring-2 ring-brand-teal' : ''}`}>
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardContent className="relative p-8">
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-brand-teal text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Header with icon and title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
                      <div className="font-display font-bold text-xl text-brand-teal">
                        {service.price}
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Key Features</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-brand-teal rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Link href={service.link} className="flex-1">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-display font-semibold transition-all duration-300 group-hover:shadow-lg">
                        Learn More
                      </Button>
                    </Link>
                    <RequestCallbackButton 
                      group={false}
                      serviceType={service.title}
                      serviceLocation="Worldwide"
                      className="flex-1 bg-brand-teal hover:bg-brand-navy text-white font-display font-semibold transition-all duration-300 group-hover:shadow-lg"
                    >
                      Get Quote
                    </RequestCallbackButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Why Choose EasYourTour?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make travel planning simple, secure, and enjoyable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from travelers who chose our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                    <div className="text-xs bg-brand-teal/10 text-brand-teal px-2 py-1 rounded">
                      {testimonial.service}
                    </div>
                  </div>
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
            Get expert assistance for all your travel needs in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RequestCallbackButton 
              group={false}
              serviceType="General Travel Services"
              serviceLocation="Worldwide"
              className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg"
            >
              Get Started Today
            </RequestCallbackButton>
          </div>
        </div>
      </section>
    </div>
  )
}
