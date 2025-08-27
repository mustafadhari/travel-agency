"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface TourInquiryFormProps {
  tourTitle?: string
  tourLocation?: string
}

export default function TourInquiryForm({ tourTitle, tourLocation }: TourInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          destination: tourLocation || "",
          message: formData.message,
          tourTitle: tourTitle || "",
          submittedAt: new Date().toISOString(),
          source: "tour-inquiry-form"
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      toast({
        title: "Inquiry submitted successfully!",
        description: "We'll get back to you shortly.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      })

    } catch (error) {
      console.error("Error submitting inquiry:", error)
      toast({
        title: "Failed to submit inquiry",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            name="phone"
            type="tel" 
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Your Question</Label>
          <Textarea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="What would you like to know about this tour?" 
            rows={3} 
            required 
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-navy" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  )
}
