import type { Metadata } from "next"
import { Hotel, Star, MapPin, Users, Shield, Zap, Award, Bed, Wifi, Car, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RequestCallbackButton from "@/components/request-callback-button"

export const metadata: Metadata = {
  title: "Hotel Booking Services | EasYourTour",
  description: "Discover and book luxury hotels and accommodations worldwide. From budget to luxury, find the perfect place to stay for your next adventure.",
}

const hotelCategories = [
  {
    title: "Luxury Hotels",
    description: "5-star accommodations with premium amenities",
    features: ["Spa & wellness", "Fine dining", "Concierge service"],
    icon: Award,
    price: "₹15,000+",
  },
  {
    title: "Business Hotels",
    description: "Perfect for corporate travelers and meetings",
    features: ["Business center", "Meeting rooms", "High-speed internet"],
    icon: Users,
    price: "₹8,000+",
  },
  {
    title: "Boutique Hotels",
    description: "Unique, intimate accommodations with character",
    features: ["Personalized service", "Local charm", "Exclusive amenities"],
    icon: Hotel,
    price: "₹6,000+",
  },
  {
    title: "Resort & Spa",
    description: "Relaxing getaways with wellness facilities",
    features: ["Spa treatments", "Recreation activities", "All-inclusive packages"],
    icon: Bed,
    price: "₹12,000+",
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description: "We guarantee the best rates or we'll match any competitor"
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Get immediate booking confirmation and room details"
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your needs"
  },
  {
    icon: Star,
    title: "Verified Properties",
    description: "All hotels are personally verified for quality assurance"
  }
]

const popularDestinations = [
  { city: "Mumbai", hotels: "500+", avgPrice: "₹8,000", image: "🏙️" },
  { city: "Delhi", hotels: "400+", avgPrice: "₹7,500", image: "🏛️" },
  { city: "Bangalore", hotels: "300+", avgPrice: "₹6,500", image: "🌆" },
  { city: "Chennai", hotels: "250+", avgPrice: "₹6,000", image: "🏢" },
  { city: "Hyderabad", hotels: "200+", avgPrice: "₹5,500", image: "🏰" },
  { city: "Kolkata", hotels: "180+", avgPrice: "₹5,000", image: "🏘️" },
]

const amenities = [
  { name: "Free WiFi", icon: Wifi },
  { name: "Parking", icon: Car },
  { name: "Restaurant", icon: Utensils },
  { name: "Spa", icon: Award },
  { name: "Pool", icon: Hotel },
  { name: "Gym", icon: Users },
]

const featuredHotels = [
  {
    name: "Taj Palace",
    location: "Mumbai",
    rating: 4.9,
    price: "₹25,000",
    image: "🏨",
    amenities: ["Spa", "Pool", "Fine Dining"]
  },
  {
    name: "Oberoi Hotels",
    location: "Delhi",
    rating: 4.8,
    price: "₹22,000",
    image: "🏨",
    amenities: ["Business Center", "Spa", "Restaurant"]
  },
  {
    name: "ITC Hotels",
    location: "Bangalore",
    rating: 4.7,
    price: "₹18,000",
    image: "🏨",
    amenities: ["Gym", "Pool", "Bar"]
  },
  {
    name: "Leela Palace",
    location: "Chennai",
    rating: 4.9,
    price: "₹20,000",
    image: "🏨",
    amenities: ["Spa", "Beach Access", "Fine Dining"]
  },
]

export default function HotelsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-10"></div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Stay in Style
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover and book luxury hotels and accommodations worldwide. From budget to luxury, find your perfect stay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RequestCallbackButton 
                group={false}
                serviceType="Hotel Booking"
                serviceLocation="Worldwide"
                className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg"
              >
                Book Your Stay
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
              Why Book Hotels with Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make hotel booking simple, secure, and rewarding
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

      {/* Hotel Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Hotel Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide range of accommodations to suit your needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hotelCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <category.icon className="w-6 h-6 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-semibold mb-2">{category.title}</h3>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                      </div>
                    </div>
                    <span className="font-display font-semibold text-brand-teal text-lg">{category.price}</span>
                  </div>
                  <ul className="space-y-2">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-brand-teal flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Featured Hotels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked luxury properties for the ultimate stay experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{hotel.image}</div>
                  <h3 className="font-display font-semibold mb-1">{hotel.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{hotel.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.map((amenity, amenityIndex) => (
                      <span key={amenityIndex} className="text-xs bg-brand-teal/10 text-brand-teal px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="font-display font-semibold text-brand-teal">{hotel.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most popular cities with extensive hotel options
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{destination.image}</div>
                  <h3 className="font-display font-semibold mb-1">{destination.city}</h3>
                  <p className="text-sm text-gray-600 mb-2">{destination.hotels}</p>
                  <p className="text-sm text-brand-teal font-medium">{destination.avgPrice}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Popular Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find hotels with the amenities that matter most to you
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <amenity.icon className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="font-display font-semibold text-sm">{amenity.name}</h3>
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
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Find the perfect accommodation for your next adventure
          </p>
          <RequestCallbackButton 
            group={false}
            serviceType="Hotel Booking"
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
