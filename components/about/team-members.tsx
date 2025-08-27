import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export default function TeamMembers() {
  const team = [
    {
      name: "Ali Asgar",
      role: "Co-Founder",
      bio: "With over 20 years in luxury travel, Sarah has visited 75 countries across all seven continents.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Mustafa",
      role: "Co-Founder",
      bio: "Born in Singapore and educated in Australia, Michael brings unique insights to our Asian destinations.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Zahra",
      role: "Luxury Services Manager",
      bio: "A former tour guide in Spain, Elena has intimate knowledge of Europe's hidden gems and cultural treasures.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "James Wilson",
      role: "Adventure Travel Director",
      bio: "An avid mountaineer and scuba diver, James curates our most exciting adventure services.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Priya Patel",
      role: "Luxury Services Manager",
      bio: "Previously with a five-star hotel chain, Priya specializes in creating unforgettable luxury moments for our clients.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Okafor",
      role: "Africa Specialist",
      bio: "Born and raised in Kenya, David's passion for wildlife conservation informs our sustainable safari services.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {team.map((member, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
          <div className="relative h-64">
            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-brand-teal mb-2">{member.role}</p>
            <p className="text-muted-foreground mb-4">{member.bio}</p>
            <div className="flex space-x-2">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin size={18} />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
