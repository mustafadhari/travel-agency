"use client"

import type React from "react"
import { ArrowRight, Phone, Award, Heart, Users, Clock, MapPin, Shield, Globe, Hotel, CheckCircle } from "lucide-react"

export default function AboutUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            About EasYourTour
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Crafting unforgettable travel experiences since 2024. We're passionate about making your travel dreams come true.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Company Story */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2024, EasYourTour was born from a simple yet powerful vision: to make travel accessible,
              enjoyable, and hassle-free for everyone. We believe that travel has the power to transform lives,
              broaden perspectives, and create lasting memories.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a small team of passionate travel enthusiasts has grown into a trusted travel partner
              for thousands of customers. Our journey has been driven by a commitment to excellence, customer satisfaction,
              and the belief that every traveler deserves an exceptional experience.
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Our Track Record
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                  <Users className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">1,000+ Travelers Served</h4>
                  <p className="text-gray-600 text-sm">
                    Since our inception in 2024, we've helped over 1,000 customers create unforgettable travel memories
                    across diverse destinations worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                  <Shield className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">98% Satisfaction Rate</h4>
                  <p className="text-gray-600 text-sm">
                    Based on post-trip surveys and reviews across Google, TripAdvisor, and social media platforms.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                  <Globe className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">30+ Destinations</h4>
                  <p className="text-gray-600 text-sm">
                    Expertly curated experiences in over 30 countries across five continents, from Himalayan treks
                    to tropical beach getaways.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Our Services
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                  <Hotel className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Custom Tour Packages</h4>
                  <p className="text-gray-600 text-sm">
                    Tailor-made itineraries designed around your interests, budget, and travel style. From romantic
                    getaways to family adventures, we create personalized experiences that exceed expectations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                  <Users className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Group Travel Solutions</h4>
                  <p className="text-gray-600 text-sm">
                    Specialized coordination for corporate retreats, educational trips, wedding parties, and special
                    events. We handle logistics so you can focus on the experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                  <Shield className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Travel Protection</h4>
                  <p className="text-gray-600 text-sm">
                    Comprehensive travel insurance options, visa assistance, and 24/7 emergency support to ensure
                    your peace of mind throughout your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h2 className="text-center font-display text-3xl font-bold text-gray-900 mb-8">
            Trusted by Travelers Worldwide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                <Award className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Certified Travel Agency</h4>
                <p className="text-gray-600 text-sm">
                  IATA accredited and licensed by the Ministry of Tourism, ensuring compliance with international
                  travel standards and regulations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                <Heart className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Customer Satisfaction</h4>
                <p className="text-gray-600 text-sm">
                  98% satisfaction rate based on post-trip surveys, with countless 5-star reviews across
                  Google, TripAdvisor, and social media platforms.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                <Users className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Experienced Guides</h4>
                <p className="text-gray-600 text-sm">
                  All our local guides are certified professionals with extensive knowledge of history, culture,
                  and safety protocols in their respective regions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 flex items-center justify-center bg-brand-teal/10 rounded-full flex-shrink-0">
                <Clock className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                <p className="text-gray-600 text-sm">
                  Our dedicated support team is available around the clock before, during, and after your trip
                  to assist with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Overview */}
        <div className="mt-20">
          <h2 className="text-center font-display text-3xl font-bold text-gray-900 mb-8">
            Explore Our Destinations
          </h2>
          <p className="text-center text-gray-600 max-w-4xl mx-auto mb-12">
            From the snow-capped peaks of the Himalayas to the tropical beaches of Southeast Asia, we offer
            expertly curated experiences in over 30 countries across five continents.
          </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[300px] overflow-hidden rounded-lg">
                <img src="/images/kerala6.jpg" alt="Destinations collage" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-2">Popular Regions</h3>
                <div className="space-y-2">
                  <p className="flex items-start space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span>India: Himalayas, Rajasthan, Kerala, Goa & More</span>
                  </p>
                  <p className="flex items-start space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span>Southeast Asia: Thailand, Vietnam, Bali, Cambodia</span>
                  </p>
                  <p className="flex items-start space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span>Europe: Italy, France, Spain, Switzerland, UK</span>
                  </p>
                  <p className="flex items-start space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span>Americas: USA, Canada, Peru, Costa Rica</span>
                  </p>
                </div>
              </div>
            </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 pt-16 border-t border-gray-200 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Let our travel experts craft your perfect itinerary. Whether you're dreaming of a romantic getaway,
            family adventure, or solo exploration, we're here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/destinations" className="inline-flex items-center justify-center px-6 py-3 bg-brand-teal text-white font-medium rounded-lg hover:bg-brand-teal/90 transition-colors">
              Browse Destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-brand-teal text-brand-teal font-medium rounded-lg hover:bg-brand-teal/50 transition-colors">
              Get Personalized Help
              <Phone className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}