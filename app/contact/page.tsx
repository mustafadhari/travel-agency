import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock, MessageCircle, Users, Star, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | EasYourTour",
  description: "Get in touch with our travel experts for inquiries, bookings, or assistance. We're here to help you plan your perfect trip.",
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Vikas Naka, Dombivli East, Mumbai, Maharashtra, India 421203",
    action: "Get Directions"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 86526-81571",
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "info@easyourtour.com",
    action: "Send Email"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Monday - Sunday: 9 AM - 8 PM",
    action: "24/7 Support Available"
  }
]

const faqs = [
  {
    question: "How can I book a tour?",
    answer: "You can book a tour by calling us, sending us an email, or filling out the contact form on this page. Our travel experts will get back to you within 24 hours."
  },
  {
    question: "Do you provide visa assistance?",
    answer: "Yes, we provide comprehensive visa assistance for various countries. Our experts will guide you through the entire process and ensure all documents are properly prepared."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including bank transfers, UPI, and online payments. We'll provide you with secure payment options for your convenience."
  },
  {
    question: "Can you customize tour packages?",
    answer: "Absolutely! We specialize in creating customized tour packages tailored to your preferences, budget, and travel style. Just let us know your requirements."
  }
]

const reasons = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced travel professionals with deep knowledge of destinations worldwide"
  },
  {
    icon: Star,
    title: "Quality Service",
    description: "Committed to providing exceptional service and memorable travel experiences"
  },
  {
    icon: CheckCircle,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs and emergencies"
  }
]

export default function ContactPage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-5"></div>
        
        <div className="relative container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Ready to start your journey? Our travel experts are here to help you plan the perfect trip
            </p>
            <div className="flex justify-center">
              <a href="tel:+918652681571">
                <Button className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg rounded-lg transition-colors">
                  Call Us Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us for all your travel needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-brand-teal" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{info.title}</h3>
                  <p className="text-gray-600 mb-4">{info.details}</p>
                  <Button variant="outline" className="text-brand-teal border-brand-teal hover:bg-brand-teal hover:text-white">
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Fill out the form below and our travel experts will get back to you within 24 hours
              </p>
              
              <ContactForm />
            </div>
            
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
                Why Choose Us?
              </h2>
              <div className="space-y-6">
                {reasons.map((reason, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <reason.icon className="w-6 h-6 text-brand-teal" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{reason.title}</h3>
                          <p className="text-gray-600">{reason.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-brand-teal/10 rounded-2xl">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
                  Quick Response Guarantee
                </h3>
                <p className="text-gray-600 mb-4">
                  We understand that travel planning can be time-sensitive. That's why we guarantee a response within 24 hours for all inquiries.
                </p>
                <div className="flex items-center gap-2 text-brand-teal font-semibold">
                  <Clock className="w-5 h-5" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Find Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our office or get directions to our location
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-brand-teal to-brand-navy rounded-2xl p-8 text-white mb-8">
                <h3 className="font-display text-2xl font-bold mb-4">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-teal-200 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-teal-100">Vikas Naka, Dombivli East, Mumbai, Maharashtra, India 421203</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-teal-200 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-teal-100">+91 86526-81571 / +971 58 5087152</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-teal-200 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-teal-100">info@easyourtour.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-display text-xl font-semibold text-gray-900">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * 24/7 customer support available for emergencies
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.3585237028487!2d73.11294917527759!3d19.223200547334805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7953d15bdefcd%3A0x76cae7aeddaa95f8!2sEASYOURTOUR!5e0!3m2!1sen!2sin!4v1756405602023!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EasYourTour Office Location"
                ></iframe>
              </div>
              <div className="absolute top-4 right-4">
                <a 
                  href="https://maps.google.com/?q=Vikas+Naka,+Dombivli+East,+Mumbai,+Maharashtra,+India+421203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow font-semibold text-sm"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
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
            Ready to Start Planning?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let's work together to create your perfect travel experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-white text-brand-navy hover:bg-white/90 font-display font-semibold px-8 py-4 text-lg">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
