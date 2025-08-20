import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <MapPin className="h-5 w-5 text-brand-teal mt-1 mr-3" />
        <div>
          <h3 className="font-semibold mb-1">Our Office</h3>
          <p className="text-muted-foreground">
            Vikas Naka, Dombivli East<br />
            Mumbai, Maharashtra, 421203<br />
            India
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Phone className="h-5 w-5 text-brand-teal mt-1 mr-3" />
        <div>
          <h3 className="font-semibold mb-1">Phone</h3>
          <p className="text-muted-foreground">
            India: +91 86526 81571<br />
            UAE: +971 86526 81571<br />
            Support: +91 7021158831
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Mail className="h-5 w-5 text-brand-teal mt-1 mr-3" />
        <div>
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-muted-foreground">
            info@easyourtour.com
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <Clock className="h-5 w-5 text-brand-teal mt-1 mr-3" />
        <div>
          <h3 className="font-semibold mb-1">Business Hours</h3>
          <p className="text-muted-foreground">
            Monday - Friday: 9:00 AM - 6:00 PM<br />
            Saturday: 10:00 AM - 4:00 PM<br />
            Sunday: Closed
          </p>
          <span className="text-brand-teal font-medium">24/7 Emergency Travel Support Available</span>
        </div>
      </div>
    </div>
  )
}
