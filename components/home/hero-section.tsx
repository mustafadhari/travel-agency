"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Compass, Users, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function HeroSection() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  // Inquiry form fields
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name.",
        variant: "destructive",
      })
      return
    }
    
    if (!phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number.",
        variant: "destructive",
      })
      return
    }
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)

    try {
      // Prepare inquiry data
      const inquiryData = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        submittedAt: new Date().toISOString(),
        source: "Hero Section Inquiry Form"
      }

      console.log('Submitting inquiry data:', inquiryData)
      
      // Send to API
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      let responseData
      try {
        responseData = await response.json()
      } catch (parseError) {
        console.error('Failed to parse response:', parseError)
        responseData = {}
      }

      console.log('Response data:', responseData)

      if (response.status >= 200 && response.status < 300) {
        toast({
          title: "Inquiry Submitted!",
          description: "Thank you for your inquiry. We'll contact you on WhatsApp shortly.",
        })
        
        // Reset form
        setName("")
        setPhone("")
        setEmail("")
      } else {
        console.error('API Error:', responseData)
        const errorMessage = responseData?.error || `HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-brand-navy to-brand-teal overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('/images/world.svg')] bg-cover bg-center bg-no-repeat"></div>
        </div>

        {/* Animated Circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-white/5 animate-pulse delay-1000"></div>

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q400,150 800,100 T1600,100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
          <path d="M0,200 Q400,250 800,200 T1600,200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-[90vh]">
        {/* Left Column - Text */}
        <motion.div
          key={isMounted ? "hero-left-mounted" : "hero-left-ssr"}
          initial={isMounted ? { opacity: 0, x: -50 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-5/12 mb-12 lg:mb-0"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <span className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Explore the world with EasYourTour
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Discover <span className="text-brand-light">Amazing</span> Tours
          </h1>

          <p className="text-xl text-white/80 mb-8 max-w-lg">
            Find and book unforgettable guided tours and travel services with expert local guides in over 100
            countries.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-white/80">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Compass className="h-6 w-6 text-brand-light" />
              </div>
              <div>
                <div className="text-lg font-medium text-white">100+ Tours</div>
                <div className="text-sm">Curated services</div>
              </div>
            </div>

            <div className="flex items-center text-white/80">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Users className="h-6 w-6 text-brand-light" />
              </div>
              <div>
                <div className="text-lg font-medium text-white">500+</div>
                <div className="text-sm">Happy travelers</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Inquiry Form */}
        <motion.div
          key={isMounted ? "hero-right-mounted" : "hero-right-ssr"}
          initial={isMounted ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-5/12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-5 border border-white/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              <Mail className="mr-2 h-4 w-4 text-brand-light" />
              Get Free Quote
            </h2>

            {/* Inquiry Form */}
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Label htmlFor="name" className="block text-white text-sm mb-1">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 h-11 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <Label htmlFor="phone" className="block text-white text-sm mb-1">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your 10 digit phone number"
                    className="w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 h-11 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <Label htmlFor="email" className="block text-white text-sm mb-1">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 h-11 focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="default"
                className="w-full h-11 bg-brand-light hover:bg-brand-light/90 text-brand-navy font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Submit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>


          </div>
        </motion.div>
      </div>

      {/* Bottom Curve */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-background"
        style={{
          borderTopLeftRadius: "50% 100%",
          borderTopRightRadius: "50% 100%",
        }}
      ></div>
    </div>
  )
}
