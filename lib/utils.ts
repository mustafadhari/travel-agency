import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatINR(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value
  if (!isFinite(Number(num))) return String(value)
  return new Intl.NumberFormat("en-IN").format(Number(num))
}
