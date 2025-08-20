import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, Users, Globe, ShieldCheck } from "lucide-react"

export default function VisaServices() {
  const services = [
    {
      title: "Document Preparation",
      description: "We help you gather and prepare all required documents for your visa application.",
      icon: <FileText className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Application Processing",
      description: "Our experts handle the entire application process from start to finish.",
      icon: <Clock className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Interview Preparation",
      description: "Get ready for your visa interview with our comprehensive preparation guidance.",
      icon: <CheckCircle className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your visa-related questions and concerns.",
      icon: <Users className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Global Coverage",
      description: "Visa services for destinations worldwide with local expertise.",
      icon: <Globe className="h-8 w-8 text-brand-teal" />,
    },
    {
      title: "Guaranteed Service",
      description: "Our commitment to ensuring your visa application is processed efficiently.",
      icon: <ShieldCheck className="h-8 w-8 text-brand-teal" />,
    },
  ]

  return (
    <div>
      <p className="text-lg mb-8">
        Our professional visa assistance services take the stress out of travel planning. Whether you need a tourist
        visa, business visa, or work permit, our experienced team will guide you through the entire process.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
