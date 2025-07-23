"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem("cta_dismissed")
      if (!dismissed) {
        setIsVisible(true)
      }
    }, 5000)

    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem("cta_dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-3">
          <h3 className="text-lg font-semibold">Ready for your next adventure?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Book now and get 15% off your first trip with us!
          </p>
        </div>
        <div className="flex space-x-2">
          <Link href="/contact" className="flex-1">
            <Button className="w-full bg-brand-teal hover:bg-brand-teal/90">Contact Us</Button>
          </Link>
          <Link href="/tours" className="flex-1">
            <Button variant="outline" className="w-full">
              View Tours
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
