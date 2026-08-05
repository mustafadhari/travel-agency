"use client"

import { Facebook, Twitter, Linkedin, Copy } from "lucide-react"
import { toast } from "./ui/use-toast"
import { Button } from "./ui/button"

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.597-1.002-5.04-2.828-6.868-1.826-1.828-4.267-2.83-6.864-2.831-5.409 0-9.809 4.397-9.813 9.802-.001 1.8.468 3.559 1.356 5.111L1.182 21.8l4.89-1.28c1.558.85 3.13 1.28 4.575 1.28zm11.026-6.195c-.3-.15-1.774-.875-2.026-.967-.25-.09-.433-.135-.615.135-.183.27-.707.874-.866 1.054-.16.18-.32.2-.62.05-1.748-.875-3.076-2.062-4.103-3.834-.27-.464.27-.43.774-1.434.09-.18.044-.337-.022-.487-.067-.15-.615-1.484-.843-2.033-.222-.534-.447-.461-.615-.471-.16-.007-.34-.01-.52-.01-.18 0-.472.067-.719.337-.247.27-.942.922-.942 2.248s.965 2.601 1.098 2.782c.135.18 1.9 2.9 4.606 4.07 1.637.708 2.673.818 3.633.675 1.07-.158 1.774-.875 2.026-1.484.25-.61.25-1.129.176-1.246-.074-.118-.27-.18-.57-.33z"/>
  </svg>
)

function SocialShare({
  title = "Check out this travel guide",
  url = "",
  className = ""
}: {
  title?: string
  url?: string
  className?: string
}) {
  const currentUrl = url || typeof window !== 'undefined' ? window.location.href : ''
  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
    toast({
      title: "Link copied!",
      description: "The URL has been copied to your clipboard.",
      variant: "default"
    })
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-600 mr-2">Share:</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-blue-600"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-blue-400"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-blue-700"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-green-600"
        onClick={() => window.open(shareLinks.whatsapp, '_blank')}
        aria-label="Share on WhatsApp"
      >
        <WhatsAppIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-gray-800"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default SocialShare