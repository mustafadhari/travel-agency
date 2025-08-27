"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Pages can dispatch: window.dispatchEvent(new CustomEvent('open-enquiry', { detail: { group: true } }))
export default function EnquiryPopup() {
  const pathname = usePathname()
  const { toast } = useToast()

  // Declare hooks unconditionally
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isGroup, setIsGroup] = useState(false)
  const [departure, setDeparture] = useState("")
  const [travellers, setTravellers] = useState(1)
  const [tourInfo, setTourInfo] = useState<{ title?: string; location?: string }>({})

  const isHome = pathname === "/"

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent).detail || {}
      setIsGroup(!!detail.group)
      setTourInfo({
        title: detail.tourTitle || "",
        location: detail.tourLocation || ""
      })
      setOpen(true)
    }
    window.addEventListener("open-enquiry", handleOpen as EventListener)
    return () => window.removeEventListener("open-enquiry", handleOpen as EventListener)
  }, [])

  if (isHome) return null

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !email.trim()) {
      toast({ title: "Missing info", description: "Please fill name, phone and email.", variant: "destructive" })
      return
    }
    if (isGroup && !departure) {
      toast({ title: "Departure date required", description: "Please choose a date.", variant: "destructive" })
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          phone, 
          email, 
          message: message || undefined,
          tourTitle: tourInfo.title || undefined,
          destination: tourInfo.location || undefined,
          departure: isGroup ? departure : undefined, 
          travellers: isGroup ? travellers : undefined, 
          submittedAt: new Date().toISOString(), 
          source: "popup" 
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      toast({ title: "Enquiry sent", description: "We will contact you shortly." })
      setOpen(false)
      setName("")
      setPhone("")
      setEmail("")
      setMessage("")
      setDeparture("")
      setTravellers(1)
      setIsGroup(false)
      setTourInfo({})
    } catch (err) {
      toast({ title: "Failed to submit", description: "Please try again.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {tourInfo.title ? `Inquire about ${tourInfo.title}` : "Request a callback"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3 mt-2">
          {tourInfo.title && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Tour:</strong> {tourInfo.title}
                {tourInfo.location && <><br /><strong>Location:</strong> {tourInfo.location}</>}
              </p>
            </div>
          )}
          <div>
            <Label htmlFor="eq-name">Name</Label>
            <Input id="eq-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div>
            <Label htmlFor="eq-phone">Phone</Label>
            <Input id="eq-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone" required />
          </div>
          <div>
            <Label htmlFor="eq-email">Email</Label>
            <Input id="eq-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <Label htmlFor="eq-message">Message (Optional)</Label>
            <Textarea 
              id="eq-message" 
              value={message} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} 
              placeholder="Tell us more about your requirements..." 
              rows={3}
            />
          </div>
          {isGroup && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="eq-depart">Departure date</Label>
                <Input id="eq-depart" type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} required={isGroup} />
              </div>
              <div>
                <Label htmlFor="eq-trav">Travellers</Label>
                <Input id="eq-trav" type="number" min={1} value={travellers} onChange={(e) => setTravellers(Number(e.target.value))} />
              </div>
            </div>
          )}
          <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-navy" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
