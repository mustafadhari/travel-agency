import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { DESTINATIONS } from "@/lib/destinations"

export const metadata = {
  title: "India Destinations | EasYourTour",
  description: "Explore India destinations available at EasYourTour",
}

export default function IndiaDestinationsPage() {
  const list = DESTINATIONS.filter((d) => d.category === "domestic")

  return (
    <main className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">India Destinations</h1>
          <p className="text-muted-foreground">Browse our curated destinations in India</p>
        </div>

        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((d) => (
              <Link key={d.slug} href={`/destinations/${d.slug}`} className="group relative overflow-hidden rounded-xl">
                <div className="aspect-[4/3]">
                  <Image
                    src={d.image || "/placeholder.svg"}
                    alt={d.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-semibold">{d.name}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="h-4 w-4 mr-1" /> {d.location}
                  </div>
                </div>
                {d.featured && (
                  <span className="absolute top-3 right-3 bg-brand-teal text-white text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/destinations">
            <Button className="bg-brand-navy hover:bg-brand-navy/90">All Destinations</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
