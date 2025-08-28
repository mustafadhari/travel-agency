"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Send, Loader2 } from "lucide-react"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || 
        !formData.phone.trim() || !formData.inquiryType || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Enquiry Submitted!",
          description: result.message || "Thank you for your enquiry. We will get back to you soon.",
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
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Failed to submit enquiry. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast({
        title: "Submission Failed",
        description: "Failed to submit enquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium">
            First Name *
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="mt-1"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name *
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-1"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="inquiryType" className="text-sm font-medium">
          Type of Inquiry *
        </Label>
        <Select 
          value={formData.inquiryType} 
          onValueChange={(value) => handleInputChange('inquiryType', value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select inquiry type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
            <SelectItem value="Tour Booking">Tour Booking</SelectItem>
            <SelectItem value="Flight Booking">Flight Booking</SelectItem>
            <SelectItem value="Hotel Booking">Hotel Booking</SelectItem>
            <SelectItem value="Visa Assistance">Visa Assistance</SelectItem>
            <SelectItem value="Travel Insurance">Travel Insurance</SelectItem>
            <SelectItem value="Custom Package">Custom Package</SelectItem>
            <SelectItem value="Partnership">Partnership</SelectItem>
            <SelectItem value="Complaint">Complaint</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium">
          Message *
        </Label>
        <Textarea
          id="message"
          placeholder="Please describe your inquiry in detail..."
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="mt-1 min-h-[120px] resize-none"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-brand-teal hover:bg-brand-navy text-white font-semibold py-3"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        * Required fields. We respect your privacy and will never share your information.
      </p>
    </form>
  )
}
