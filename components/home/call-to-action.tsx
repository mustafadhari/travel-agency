import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-16 bg-brand-teal text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of travelers who trust us for their dream vacations. Book your next adventure today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-brand-teal hover:bg-gray-100">
            Book Now
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-brand-navy">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
