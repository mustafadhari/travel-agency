import HeroSection from "@/components/home/hero-section"
import DestinationExplorer from "@/components/home/destination-explorer"
import ExperienceShowcase from "@/components/home/experience-showcase"
import InstagramFeed from "@/components/home/instagram-feed"
import PopularTours from "@/components/home/popular-tours"
import TestimonialSlider from "@/components/home/testimonial-slider"
import NewsletterSection from "@/components/home/newsletter-section"
import FloatingCTA from "@/components/home/floating-cta"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <DestinationExplorer />
      <ExperienceShowcase />
      <PopularTours />
      <TestimonialSlider />
      <NewsletterSection />
      {/* <FloatingCTA /> */}
      {/* <InstagramFeed /> */}
    </main>
  )
}
