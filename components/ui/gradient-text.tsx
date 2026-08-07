import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  to?: string
  direction?: "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl"
}

export function GradientText({
  children,
  className,
  from = "text-brand-teal",
  to = "",
}: GradientTextProps) {
  return (
    <span
      className={cn("font-bold text-brand-teal dark:text-teal-400", className)}
    >
      {children}
    </span>
  )
}
