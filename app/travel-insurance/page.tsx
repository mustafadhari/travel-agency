import type { Metadata } from "next"
import { Shield, Heart, Clock, Users, CheckCircle, Star, Zap, Award, Globe, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RequestCallbackButton from "@/components/request-callback-button"

export const metadata: Metadata = {
  title: "Travel Insurance Services | EasYourTour",
  description: "Comprehensive travel insurance coverage for worry-free travel. Protect your journey with our reliable insurance plans worldwide.",
}

const insurancePlans = [
  {
    title: "Basic Coverage",
    description: "Essential protection for budget-conscious travelers",
    price: "₹500",
    duration: "per trip",
    features: [
      "Medical expenses up to ₹5 Lakhs",
      "Trip cancellation coverage",
      "Lost baggage protection",
      "24/7 emergency assistance"
    ],
    icon: Shield,
    popular: false,
  },
  {
    title: "Standard Coverage",
    description: "Comprehensive protection for most travelers",
    price: "₹1,200",
    duration: "per trip",
    features: [
      "Medical expenses up to ₹10 Lakhs",
      "Trip cancellation & interruption",
      "Lost baggage & personal effects",
      "Flight delay compensation",
      "Emergency medical evacuation",
      "24/7 global assistance"
    ],
    icon: Heart,
    popular: true,
  },
  {
    title: "Premium Coverage",
    description: "Maximum protection for luxury travelers",
    price: "₹2,500",
    duration: "per trip",
    features: [
      "Medical expenses up to ₹25 Lakhs",
      "Comprehensive trip protection",
      "High-value item coverage",
      "Adventure sports coverage",
      "Pre-existing condition coverage",
      "VIP assistance services",
      "24/7 concierge support"
    ],
    icon: Award,
    popular: false,
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Comprehensive Coverage",
    description: "Protection for medical emergencies, trip cancellation, and more"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock emergency assistance worldwide"
  },
  {
    icon: Users,
    title: "Family Plans",
    description: "Special rates for family and group travel insurance"
  },
  {
    icon: Zap,
    title: "Instant Coverage",
    description: "Get covered immediately with instant policy activation"
  }
]

const coverageAreas = [
  { area: "Medical Expenses", icon: Heart, description: "Hospitalization and medical treatment" },
  { area: "Trip Cancellation", icon: Plane, description: "Coverage for cancelled trips" },
  { area: "Lost Baggage", icon: Shield, description: "Protection for lost or damaged luggage" },
  { area: "Flight Delays", icon: Clock, description: "Compensation for flight delays" },
  { area: "Emergency Evacuation", icon: Users, description: "Medical evacuation services" },
  { area: "Personal Liability", icon: Award, description: "Third-party liability coverage" },
]

const destinations = [
  { region: "Asia", countries: "50+ countries", coverage: "Comprehensive" },
  { region: "Europe", countries: "44 countries", coverage: "Full coverage" },
  { region: "Americas", countries: "35 countries", coverage: "Standard" },
  { region: "Africa", countries: "54 countries", coverage: "Basic" },
  { region: "Oceania", countries: "14 countries", coverage: "Comprehensive" },
  { region: "Middle East", countries: "18 countries", coverage: "Full coverage" },
]

export default function TravelInsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-5"></div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Travel with Peace of Mind
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Comprehensive travel insurance coverage for worry-free travel. Protect your journey with our reliable insurance plans worldwide
            </p>
            <div className="flex justify-center">
              <RequestCallbackButton 
                group={false}
                serviceType="Travel Insurance"
                serviceLocation="Worldwide"
                className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg rounded-lg transition-colors"
              >
                Get Insurance Quote
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
              Why Choose Our Travel Insurance?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive coverage and peace of mind for your travels
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

      {/* Insurance Plans Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Insurance Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect coverage for your travel needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insurancePlans.map((plan, index) => (
              <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'ring-2 ring-brand-teal' : ''}`}>
                <CardContent className="p-8">
                  {plan.popular && (
                    <div className="bg-brand-teal text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <plan.icon className="w-8 h-8 text-brand-teal" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold mb-2">{plan.title}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="font-display text-3xl font-bold text-brand-teal">{plan.price}</span>
                      <span className="text-gray-600">/{plan.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <RequestCallbackButton 
                      group={false}
                      serviceType={`Travel Insurance - ${plan.title}`}
                      serviceLocation="Worldwide"
                      className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-display font-semibold py-3"
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

      {/* Coverage Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              What We Cover
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage for all aspects of your travel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageAreas.map((coverage, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <coverage.icon className="w-6 h-6 text-brand-teal" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">{coverage.area}</h3>
                      <p className="text-sm text-gray-600">{coverage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Global Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Travel insurance coverage available worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {destinations.map((destination, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🌍</div>
                  <h3 className="font-display font-semibold mb-1">{destination.region}</h3>
                  <p className="text-sm text-gray-600 mb-2">{destination.countries}</p>
                  <span className="text-xs bg-brand-teal/10 text-brand-teal px-2 py-1 rounded">
                    {destination.coverage}
                  </span>
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
            Ready to Protect Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get comprehensive travel insurance coverage for worry-free travel
          </p>
          <RequestCallbackButton 
            group={false}
            serviceType="Travel Insurance"
            serviceLocation="Worldwide"
            className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg"
          >
            Get Insurance Now
          </RequestCallbackButton>
        </div>
      </section>
    </div>
  )
}
