"use client"

import { Button } from "@/components/ui/button"

interface RequestCallbackButtonProps {
  group?: boolean
  className?: string
  tourTitle?: string
  tourLocation?: string
}

export default function RequestCallbackButton({ 
  group = false, 
  className,
  tourTitle,
  tourLocation 
}: RequestCallbackButtonProps) {
  return (
    <Button
      className={className || "w-full bg-brand-teal hover:bg-brand-navy"}
      onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry', { 
        detail: { 
          group,
          tourTitle,
          tourLocation
        } 
      }))}
    >
      {tourTitle ? "Inquire about this tour" : "Request a callback"}
    </Button>
  )
}
