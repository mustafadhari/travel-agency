import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface TourItineraryProps {
  itinerary: {
    day: number
    title: string
    description: string
    activities: string[]
  }[]
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {itinerary.map((day, index) => (
        <AccordionItem key={day.day} value={`day-${day.day}`}>
          <AccordionTrigger className="hover:text-brand-teal">
            <div className="flex items-center">
              <span className="bg-brand-teal/20 text-brand-teal w-8 h-8 rounded-full flex items-center justify-center mr-3">
                {index + 1}
              </span>
              <span>{day.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-11">
            <p className="text-muted-foreground mb-3">{day.description}</p>
            {day.activities && day.activities.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Activities:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {day.activities.map((activity, activityIndex) => (
                    <li key={activityIndex} className="flex items-start">
                      <span className="text-brand-teal mr-2">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
