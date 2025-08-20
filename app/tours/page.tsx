import type { Metadata } from "next"
import TourFilters from "@/components/tours/tour-filters"
import ToursList from "@/components/tours/tours-list"
import PageHeader from "@/components/page-header"

export const metadata: Metadata = {
  title: "Explore Tours | EasYourTour",
  description: "Discover our handpicked selection of luxury tours and travel services around the world.",
}

export default function ToursPage() {
  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
      <PageHeader
        title="Explore Our Tours"
        description="Discover handcrafted journeys to the world's most extraordinary destinations"
      />
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <TourFilters />
        </div>
        <div className="lg:w-3/4">
          <ToursList />
        </div>
      </div>
    </div>
  )
}
