import HeroSection from "@/components/home/hero-section"
import DestinationExplorer from "@/components/home/destination-explorer"
import ExperienceShowcase from "@/components/home/experience-showcase"
import TravelStats from "@/components/home/travel-stats"
import TestimonialSlider from "@/components/home/testimonial-slider"
import NewsletterSection from "@/components/home/newsletter-section"
import FloatingCTA from "@/components/home/floating-cta"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DestinationExplorer />
      <ExperienceShowcase />
      <TravelStats />
      <TestimonialSlider />
      <NewsletterSection />
      <FloatingCTA />
    </main>
  )
}
