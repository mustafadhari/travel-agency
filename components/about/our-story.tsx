import Image from "next/image"

export default function OurStory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <div className="space-y-4">
          <p>
            We started EasYourTour in 2024 with a simple promise: plan trips the way people actually travel—personal, flexible, and stress‑free. One year in, that promise guides every itinerary, call, and confirmation sent.
          </p>
          <h2 className="text-2xl font-bold mb-4">Why we began</h2>
          <p>
            After years inside traditional travel, our founders kept seeing the same thing: cookie‑cutter packages, slow replies, and fine print that made planning harder than the trip. EasYourTour was built to flip that script real humans, real advice, and technology that makes planning feel effortless.
          </p>
          <h2 className="text-2xl font-bold mb-4">What we do today</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Luxury travel planning made easy: flights, hotels, transfers, visas, activities, and on‑trip support—handled end‑to‑end by a dedicated consultant.</li>
            <li>
            Personalized itineraries: trips shaped around budget, pace, and interests, from relaxed beach breaks to family‑friendly circuits and once‑in‑a‑lifetime escapes.
            </li>
            <li>
            India travel specialists: strong on‑ground partners across Kerala, Rajasthan, Goa, Himachal, and the Northeast, plus growing international coverage.
            </li>
          </ul>
          <p>
            Today, EasYourTour stands as a testament to the power of following your passion. Our team of expert travel
            consultants, many of whom have lived or worked in our featured destinations, bring unparalleled knowledge
            and insight to every itinerary we create.
          </p>
        </div>
      </div>
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <Image src="/images/about.png?height=800&width=600" alt="EasYourTour team" fill className="object-cover" />
      </div>
    </div>
  )
}
