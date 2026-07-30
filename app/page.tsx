import HeroSection from "@/components/home/hero-section"
import DestinationExplorer from "@/components/home/destination-explorer"
import ExperienceShowcase from "@/components/home/experience-showcase"
import InstagramFeed from "@/components/home/instagram-feed"
import PopularTours from "@/components/home/popular-tours"
import TestimonialSlider from "@/components/home/testimonial-slider"
import NewsletterSection from "@/components/home/newsletter-section"
import FloatingCTA from "@/components/home/floating-cta"
import AboutUsSection from "@/components/home/about-us-section"

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <DestinationExplorer />
        <ExperienceShowcase />
        <AboutUsSection />
        <PopularTours />
        <TestimonialSlider />
        <NewsletterSection />
        {/* <FloatingCTA /> */}
        {/* <InstagramFeed /> */}
      </main>

      {/* JSON-LD Structured Data for TravelAgency */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "EasYourTour",
          "url": "https://easyourtour.com",
          "logo": "https://easyourtour.com/images/logo.png",
          "description": "Find and book the best travel services at affordable prices",
          "telephone": "+91-9876543210",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Travel Street",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400001",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.0760",
            "longitude": "72.8777"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "19:00"
            }
          ],
          "areaServed": "IN",
          "makesOffer": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "TouristTrip"
            }
          },
          "sameAs": [
            "https://facebook.com/easyourtour",
            "https://instagram.com/easyourtour",
            "https://twitter.com/easyourtour"
          ]
        }, null, 2)}
      </script>
    </>
  )
}
