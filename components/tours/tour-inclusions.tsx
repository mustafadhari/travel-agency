import { Check, X } from "lucide-react"

interface TourInclusionsProps {
  inclusions?: string[]
  exclusions?: string[]
  isExclusions?: boolean
}

export default function TourInclusions({ inclusions, exclusions, isExclusions }: TourInclusionsProps) {
  if (isExclusions) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">What's Not Included</h3>
        <ul className="space-y-2">
          {exclusions?.map((item, index) => (
            <li key={index} className="flex items-start">
              <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">What's Included</h3>
      <ul className="space-y-2">
        {inclusions?.map((item, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
