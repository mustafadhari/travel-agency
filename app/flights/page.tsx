import type { Metadata } from "next"
import { Plane, Clock, Shield, Star, MapPin, Users, Zap, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RequestCallbackButton from "@/components/request-callback-button"

export const metadata: Metadata = {
  title: "Flight Booking Services | EasYourTour",
  description: "Book premium flights to destinations worldwide with exclusive deals and offers. Partner with top airlines for the best travel experience.",
}

const airlines = [
  { name: "Emirates", logo: "✈️", rating: 4.8, routes: "150+ destinations" },
  { name: "Indigo", logo: "✈️", rating: 4.7, routes: "160+ destinations" },
  { name: "SpiceJet", logo: "✈️", rating: 4.9, routes: "130+ destinations" },
  { name: "Air Arabia", logo: "✈️", rating: 4.6, routes: "220+ destinations" },
  { name: "Vistara", logo: "✈️", rating: 4.5, routes: "200+ destinations" },
  { name: "Air India", logo: "✈️", rating: 4.3, routes: "100+ destinations" },
]

const benefits = [
  {
    icon: Clock,
    title: "24/7 Booking",
    description: "Book flights anytime, anywhere with our round-the-clock service"
  },
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description: "We guarantee the best prices or we'll match any competitor"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated travel experts to help with your booking"
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Get instant booking confirmation and e-tickets"
  }
]

const popularRoutes = [
  { from: "Mumbai", to: "Dubai", price: "₹15,000", duration: "3h 15m" },
  { from: "Dubai", to: "Ahmedabad", price: "₹15,000", duration: "3h 30m" },
  { from: "Bangalore", to: "Singapore", price: "₹18,000", duration: "4h 45m" },
  { from: "Chennai", to: "Kuala Lumpur", price: "₹22,000", duration: "4h 20m" },
  { from: "Hyderabad", to: "Abu Dhabi", price: "₹28,000", duration: "3h 45m" },
  { from: "Kolkata", to: "Bangkok", price: "₹20,000", duration: "3h 30m" },
]

const services = [
  {
    title: "Domestic Flights",
    description: "Connect across India with major domestic carriers",
    features: ["All major cities", "Daily flights", "Flexible booking"],
    icon: MapPin,
  },
  {
    title: "International Flights",
    description: "Global destinations with premium international airlines",
    features: ["Worldwide coverage", "Premium carriers", "Visa assistance"],
    icon: Globe,
  },
  {
    title: "Group Bookings",
    description: "Special rates and services for group travel",
    features: ["Bulk discounts", "Coordinated travel", "Group support"],
    icon: Users,
  },
  {
    title: "Business Class",
    description: "Premium business class bookings for corporate travel",
    features: ["Priority boarding", "Lounge access", "Flexible tickets"],
    icon: Award,
  },
]

export default function FlightsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-5"></div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Fly with Confidence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Book premium flights to destinations worldwide with exclusive deals and offers from top airlines
            </p>
            <div className="flex justify-center">
              <RequestCallbackButton 
                group={false}
                serviceType="Flight Booking"
                serviceLocation="Worldwide"
                className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg rounded-lg transition-colors"
              >
                Book Your Flight
              </RequestCallbackButton>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Why Book with Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make flight booking simple, affordable, and stress-free
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

      {/* Airlines Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Partner Airlines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We partner with world-class airlines to bring you the best flight options
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {airlines.map((airline, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{airline.logo}</div>
                  <h3 className="font-display font-semibold mb-1">{airline.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{airline.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">{airline.routes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Our Flight Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive flight booking services for all your travel needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-brand-teal" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-brand-teal flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Popular Routes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most popular flight routes with competitive pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-teal" />
                      <span className="font-medium">{route.from}</span>
                    </div>
                    <Plane className="w-4 h-4 text-gray-400" />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-teal" />
                      <span className="font-medium">{route.to}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{route.duration}</span>
                    </div>
                    <span className="font-display font-semibold text-brand-teal">{route.price}</span>
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
            Ready to Book Your Flight?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get the best deals and expert assistance for your flight booking
          </p>
          <RequestCallbackButton 
            group={false}
            serviceType="Flight Booking"
            serviceLocation="Worldwide"
            className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg"
          >
            Book Now
          </RequestCallbackButton>
        </div>
      </section>
    </div>
  )
}
