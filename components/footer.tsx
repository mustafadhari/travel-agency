import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
          <div className="lg:col-span-4">
            <div className="mb-6">
              <div className="relative h-16 w-64">
                <Image
                  src="/images/logo.png"
                  alt="EasYourTour"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </div>
            <p className="mb-6 text-gray-400 max-w-md">
              Making your travel easy and affordable since 2024. We specialize in crafting unforgettable journeys
              tailored to your preferences and budget.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-brand-teal transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/easyourtourr" target="_blank" className="text-gray-400 hover:text-brand-teal transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-brand-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Travel Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/flights" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Flight Booking
                </Link>
              </li>
              <li>
                <Link href="/visa" className="text-gray-400 hover:text-brand-teal transition-colors">
                Visa Assistance
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/travel-insurance" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Travel Insurance
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-400 hover:text-brand-teal transition-colors">
                Hotel Reservations
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-brand-teal mt-1" />
                <span className="text-gray-400">
                  Vikas Naka
                  <br />
                  Dombivli East, Mumbai, Maharashtra, India 421203
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-teal" />
                <span className="text-gray-400">
                  <a href="tel:+918652681571">+91 86526-81571</a> / <a href="tel:+971585087152">+971 58 5087152</a>
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-teal" />
                <span className="text-gray-400">
                  <a href="mailto:info@easyourtour.com">info@easyourtour.com</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} EasYourTour. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/faq" className="text-gray-400 hover:text-white text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
