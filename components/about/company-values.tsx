import { Card, CardContent } from "@/components/ui/card"
import { Heart, Globe, Sparkles, Users, ShieldCheck, Leaf } from "lucide-react"

export default function CompanyValues() {
  const values = [
    {
      title: "Passion for Travel",
      description: "We're passionate about creating unforgettable travel experiences that inspire and delight our customers.",
      icon: <Heart className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Global Expertise",
      description: "Our team of travel experts has extensive knowledge of destinations worldwide, ensuring you get the best advice.",
      icon: <Globe className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Quality Service",
      description: "We maintain the highest standards of service quality, from initial consultation to post-trip support.",
      icon: <Sparkles className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We listen to your needs and tailor experiences to exceed expectations.",
      icon: <Users className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Trust & Reliability",
      description: "Build lasting relationships based on trust, transparency, and reliable service delivery.",
      icon: <ShieldCheck className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Sustainable Travel",
      description: "We promote responsible tourism practices that benefit local communities and preserve natural environments.",
      icon: <Leaf className="h-8 w-8 text-brand-teal" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {values.map((value, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="mb-4">{value.icon}</div>
            <h3 className="text-lg font-bold mb-2">{value.title}</h3>
            <p className="text-muted-foreground">{value.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
