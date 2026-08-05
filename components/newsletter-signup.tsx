"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { toast } from "./ui/use-toast"

interface NewsletterFormData {
  email: string
  name?: string
  preferences?: {
    destinations?: string[]
    travelTypes?: string[]
    frequency?: string
  }
}

function NewsletterSignup({ className = "" }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<NewsletterFormData>()

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Thank you for subscribing! Check your email for confirmation.",
          variant: "default"
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to subscribe. Please try again.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light rounded-2xl p-8 text-white ${className}`}>
      <div className="max-w-md mx-auto text-center">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Get Travel Inspiration Delivered
        </h3>
        <p className="text-white/80 mb-8 font-sans">
          Subscribe for exclusive travel tips, destination guides, and special offers.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-left block text-sm font-medium text-white/90 mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/40"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1 text-left">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="name" className="text-left block text-sm font-medium text-white/90 mb-2">
              Name (optional)
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/40"
              {...register('name')}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-display font-semibold py-3 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
            </Button>
          </div>

          <p className="text-xs text-white/60 pt-3">
            By subscribing, you agree to our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
            You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  )
}

export default NewsletterSignup