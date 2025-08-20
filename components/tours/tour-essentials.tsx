import { Calendar, Clock, Users, Utensils, Home, Globe, Thermometer, CreditCard } from "lucide-react"

export default function TourEssentials() {
  const essentials = [
    {
      title: "Best Time to Visit",
      description: "March to October",
      icon: <Calendar className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Duration",
      description: "8 Days / 7 Nights",
      icon: <Clock className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Group Size",
      description: "Max 12 people",
      icon: <Users className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Meals Included",
      description: "Breakfast & Dinner",
      icon: <Utensils className="h-5 w-5 text-brand-teal mr-2" />,
    },
  ]

  const accommodation = [
    {
      title: "Accommodation",
      description: "4-star hotels & resorts",
      icon: <Home className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Transportation",
      description: "Private AC vehicle",
      icon: <Globe className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Weather",
      description: "Tropical climate",
      icon: <Thermometer className="h-5 w-5 text-brand-teal mr-2" />,
    },
    {
      title: "Payment",
      description: "Secure online booking",
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

      <div>
        <h3 className="text-xl font-semibold mb-4">Trip Essentials</h3>

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
