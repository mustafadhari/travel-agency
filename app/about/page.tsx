import type { Metadata } from "next"
import PageHeader from "@/components/page-header"
import TeamMembers from "@/components/about/team-members"
import CompanyValues from "@/components/about/company-values"
import OurStory from "@/components/about/our-story"

export const metadata: Metadata = {
  title: "About Us | EasYourTour",
  description: "Learn about our company, mission, values, and the team behind EasYourTour Travel.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
      <PageHeader title="About EasYourTour" description="Crafting unforgettable travel services since 2024" />

      <div className="mt-12">
        <OurStory />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <CompanyValues />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
        <TeamMembers />
      </div>
    </div>
  )
}
