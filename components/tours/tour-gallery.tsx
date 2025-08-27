"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface TourGalleryProps {
  images: string[]
}

export default function TourGallery({ images }: TourGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length)

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxOpen])

  return (
    <div className="space-y-4">
      {/* Masonry-style responsive grid without cropping */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:_balance]
                      [&>*]:mb-3">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="block w-full rounded-xl overflow-hidden bg-muted hover:opacity-95 transition"
          >
            <Image
              src={src}
              alt={`Tour image ${index + 1}`}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[95vw] p-0 bg-transparent border-none shadow-none">
          <DialogHeader>
            <DialogTitle>Image preview</DialogTitle>
          </DialogHeader>
          <div className="relative w-[95vw] h-[80vh] rounded-xl overflow-hidden pointer-events-none">
            <Image
              src={images[activeIndex]}
              alt={`Preview ${activeIndex + 1}`}
              fill
              sizes="95vw"
              className="object-contain pointer-events-auto"
            />

            {/* Close button */}
            <DialogClose asChild>
              <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 pointer-events-auto">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </DialogClose>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 pointer-events-auto"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 pointer-events-auto"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
