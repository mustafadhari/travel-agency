"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
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
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          email: formData.email,
          message: `Inquiry Type: ${formData.inquiryType}\n\n${formData.message}`,
          submittedAt: new Date().toISOString(),
          source: "contact-form"
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you shortly.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: ""
      })

    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast({
        title: "Failed to send message",
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

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      inquiryType: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input 
            id="first-name" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name" 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input 
            id="last-name" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name" 
            required 
          />
        </div>
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
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number" 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry-type">Inquiry Type</Label>
        <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
          <SelectTrigger id="inquiry-type">
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="booking">Booking Information</SelectItem>
            <SelectItem value="tour">Tour Package Inquiry</SelectItem>
            <SelectItem value="flight">Flight Booking</SelectItem>
            <SelectItem value="hotel">Hotel Reservation</SelectItem>
            <SelectItem value="visa">Visa Assistance</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea 
          id="message" 
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Please provide details about your inquiry" 
          rows={5} 
          required 
        />
      </div>

      <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-navy" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
