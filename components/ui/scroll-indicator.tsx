"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface ScrollIndicatorProps {
  className?: string
  color?: string
  size?: number
  targetId?: string
}

export function ScrollIndicator({ className, color = "white", size = 24, targetId }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <button
      type="button"
      aria-label="Scroll to content"
      className={cn(
        "flex flex-col items-center transition-opacity duration-300 cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-full",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
      onClick={handleClick}
    >
      <div className="animate-pulse-slow motion-reduce:animate-none">
        <ChevronDown size={size} color={color} aria-hidden="true" />
      </div>
    </button>
  )
}
