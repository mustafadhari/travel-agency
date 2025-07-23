"use client"

import { useState } from "react"
import { Users, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TravelersData {
  adults: number
  children: number
}

interface TravelersSelectorProps {
  travelers: TravelersData
  onTravelersChange: (travelers: TravelersData) => void
  className?: string
}

export function TravelersSelector({ travelers, onTravelersChange, className }: TravelersSelectorProps) {
  const [open, setOpen] = useState(false)

  const updateTravelers = (type: "adults" | "children", increment: boolean) => {
    const newTravelers = { ...travelers }

    if (increment) {
      newTravelers[type] += 1
    } else {
      if (type === "adults" && newTravelers.adults > 1) {
        newTravelers.adults -= 1
      } else if (type === "children" && newTravelers.children > 0) {
        newTravelers.children -= 1
      }
    }

    onTravelersChange(newTravelers)
  }

  const totalTravelers = travelers.adults + travelers.children
  const displayText = `${totalTravelers} ${totalTravelers === 1 ? "Traveler" : "Travelers"}`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white",
            className,
          )}
        >
          <Users className="mr-2 h-4 w-4 text-white/70" />
          <span className="text-white">{displayText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white border border-gray-200 shadow-lg" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Adults</div>
              <div className="text-sm text-gray-500">Ages 13 or above</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-gray-300 bg-transparent"
                onClick={() => updateTravelers("adults", false)}
                disabled={travelers.adults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium text-gray-900">{travelers.adults}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-gray-300 bg-transparent"
                onClick={() => updateTravelers("adults", true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Children</div>
              <div className="text-sm text-gray-500">Ages 2-12</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-gray-300 bg-transparent"
                onClick={() => updateTravelers("children", false)}
                disabled={travelers.children <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium text-gray-900">{travelers.children}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-gray-300 bg-transparent"
                onClick={() => updateTravelers("children", true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
