import type { Metadata } from "next"
import { CheckCircle, Clock, Shield, Users, Globe, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RequestCallbackButton from "@/components/request-callback-button"

export const metadata: Metadata = {
  title: "Visa Assistance Services | EasYourTour",
  description: "Professional visa assistance services for hassle-free travel planning. Expert guidance for all visa requirements worldwide.",
}

const visaServices = [
  {
    title: "Tourist Visa",
    description: "Seamless tourist visa processing for leisure travel",
    features: ["Fast processing", "Document assistance", "Application tracking"],
    icon: Globe,
  },
  {
    title: "Business Visa",
    description: "Professional business visa services for corporate travel",
    features: ["Priority processing", "Business documentation", "Interview preparation"],
    icon: Users,
  },
  {
    title: "Student Visa",
    description: "Comprehensive student visa support for education abroad",
    features: ["University guidance", "Financial documentation", "Visa interview prep"],
    icon: Award,
  },
  {
    title: "Work Visa",
    description: "Expert work visa assistance for employment opportunities",
    features: ["Job offer validation", "Skills assessment", "Work permit guidance"],
    icon: Shield,
  },
]

const countries = [
  { name: "UAE", flag: "🇦🇪", processing: "3-5 days" },
  { name: "Oman", flag: "🇴🇲", processing: "5-7 days" },
  { name: "Qatar", flag: "🇶🇦", processing: "5-7 days" },
  { name: "Egypt", flag: "🇪🇬", processing: "5-8 days" },
  { name: "Singapore", flag: "🇸🇬", processing: "3-5 days" },
  { name: "Malaysia", flag: "🇲🇾", processing: "2-4 days" },
  { name: "Thailand", flag: "🇹🇭", processing: "2-3 days" },
  { name: "Vietnam", flag: "🇻🇳", processing: "5-7 days" },
  { name: "Saudi Arabia - Umrah", flag: "🇸🇦", processing: "5-7 days" },
  { name: "Bahrain", flag: "🇧🇭", processing: "5-7 days" },
  { name: "Azerbaijan", flag: "🇦🇿", processing: "5-7 days" },
  { name: "United States", flag: "🇺🇸", processing: "5-7 days" },
  { name: "United Kingdom", flag: "🇬🇧", processing: "3-5 days" },
  { name: "Canada", flag: "🇨🇦", processing: "7-10 days" },
  { name: "Schengen Countries", flag: "🇪🇺", processing: "10-15 days" },
]

const benefits = [
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Expedited visa processing with priority handling"
  },
  {
    icon: Shield,
    title: "100% Success Rate",
    description: "High success rate with expert guidance"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated visa experts throughout the process"
  },
  {
    icon: CheckCircle,
    title: "Document Assistance",
    description: "Complete document preparation and verification"
  }
]

export default function VisaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-5"></div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Visa Made Simple
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Professional visa assistance services with expert guidance for hassle-free travel planning worldwide
            </p>
            <div className="flex justify-center">
              <RequestCallbackButton 
                group={false}
                serviceType="Visa Assistance"
                serviceLocation="Worldwide"
                className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg rounded-lg transition-colors"
              >
                Get Visa Assistance
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
              Why Choose Our Visa Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make visa applications simple, fast, and stress-free with our expert guidance
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

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Our Visa Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive visa assistance for all types of travel purposes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visaServices.map((service, index) => (
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
                            <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0" />
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

      {/* Countries Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide visa assistance for destinations worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {countries.map((country, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{country.flag}</div>
                  <h3 className="font-display font-semibold mb-1">{country.name}</h3>
                  <p className="text-sm text-brand-teal font-medium">{country.processing}</p>
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
            Ready to Start Your Visa Application?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get expert guidance and ensure a smooth visa application process
          </p>
          <RequestCallbackButton 
            group={false}
            serviceType="Visa Assistance"
            serviceLocation="Worldwide"
            className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg"
          >
            Get Started Today
          </RequestCallbackButton>
        </div>
      </section>
    </div>
  )
}
