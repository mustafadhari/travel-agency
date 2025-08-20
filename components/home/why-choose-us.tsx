import { Award, Clock, CreditCard, HeartHandshake, ShieldCheck, Users } from "lucide-react"

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Expert Travel Planning",
      description: "Our experienced travel consultants create personalized itineraries tailored to your preferences and budget.",
      icon: <Award className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: "24/7 Travel Support",
      description: "Round-the-clock assistance ensures you have help whenever you need it, anywhere in the world.",
      icon: <ShieldCheck className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: "Local Expertise",
      description: "Deep knowledge of destinations with insider access to hidden gems and authentic experiences.",
      icon: <Users className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: "Best Price Guarantee",
      description: "We guarantee the best prices for your travel packages, with price matching and exclusive deals.",
      icon: <HeartHandshake className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: "Flexible Booking",
      description: "Easy booking and modification options with transparent cancellation policies for your peace of mind.",
      icon: <Clock className="h-10 w-10 text-brand-teal" />,
    },
    {
      title: "Secure Payments",
      description: "Safe and secure payment processing with multiple payment options and full financial protection.",
      icon: <CreditCard className="h-10 w-10 text-brand-teal" />,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose EasYourTour</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to making your travel dreams a reality with unparalleled service and attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
