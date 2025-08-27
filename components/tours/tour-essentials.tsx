import { Calendar, Clock, Users, Utensils, Home, Globe, Thermometer, CreditCard } from "lucide-react"
import { Tour } from "@/lib/tours"

interface TourEssentialsProps {
  tour: Tour
}

export default function TourEssentials({ tour }: TourEssentialsProps) {
  const essentials = [
    {
      title: "Best Time to Visit",
      description: tour.best_time,
      icon: <Calendar className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Duration",
      description: tour.duration,
      icon: <Clock className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Group Size",
      description: `Max ${tour.max_participants} people`,
      icon: <Users className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Meals Included",
      description: tour.meals,
      icon: <Utensils className="h-5 w-5 text-brand-teal mr-2" />,
    },
  ]

  const accommodation = [
    {
      title: "Accommodation",
      description: tour.accommodation,
      icon: <Home className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Transportation",
      description: tour.transportation,
      icon: <Globe className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Weather",
      description: tour.weather,
      icon: <Thermometer className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Payment",
      description: tour.payment_terms,
      icon: <CreditCard className="h-5 w-5 text-brand-teal mr-2" />,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {essentials.map((item, index) => (
          <div key={index} className="bg-muted p-4 rounded-lg">
            <div className="flex items-center mb-2">
              {item.icon}
              <h4 className="font-semibold">{item.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="space-y-4">
          {accommodation.map((item, index) => (
            <div key={index}>
              <div className="flex items-center mb-2">
                {item.icon}
                <h4 className="font-semibold">{item.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground ml-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
