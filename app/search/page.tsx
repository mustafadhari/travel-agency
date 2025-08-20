import { Suspense } from "react"
import type { Metadata } from "next"
import SearchResults from "@/components/search/search-results"
import PageHeader from "@/components/page-header"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Search Results | EasYourTour",
  description: "Find your perfect travel experience with our search results.",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const destination = typeof params.destination === "string" ? params.destination : ""
  const date = typeof params.date === "string" ? params.date : ""
  const duration = typeof params.duration === "string" ? params.duration : ""
  const travelers = typeof params.travelers === "string" ? params.travelers : ""
  const adults = typeof params.adults === "string" ? params.adults : "1"
  const children = typeof params.children === "string" ? params.children : "0"

  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
      <PageHeader
        title="Search Results"
        description={`Showing travel options ${destination ? `for ${destination}` : ""}`}
      />

      <div className="mt-6 bg-muted/30 p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-2">Search Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destination && (
            <div>
              <span className="text-sm text-muted-foreground">Destination:</span>
              <p className="font-medium">{destination}</p>
            </div>
          )}
          {date && (
            <div>
              <span className="text-sm text-muted-foreground">Date:</span>
              <p className="font-medium">{date}</p>
            </div>
          )}
          {duration && (
            <div>
              <span className="text-sm text-muted-foreground">Duration:</span>
              <p className="font-medium">{duration}</p>
            </div>
          )}
          {travelers && (
            <div>
              <span className="text-sm text-muted-foreground">Travelers:</span>
              <p className="font-medium">
                {adults} Adult{Number.parseInt(adults) !== 1 ? "s" : ""}
                {Number.parseInt(children) > 0 && `, ${children} Child${Number.parseInt(children) !== 1 ? "ren" : ""}`}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand-teal" />
              <span className="ml-2 text-lg">Loading search results...</span>
            </div>
          }
        >
          <SearchResults
            destination={destination}
            date={date}
            duration={duration}
            travelers={travelers}
            adults={adults}
            children={children}
          />
        </Suspense>
      </div>
    </div>
  )
}
