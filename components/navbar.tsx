"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Globe, Sun, Moon, ChevronDown, Phone } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { DESTINATIONS } from "@/lib/destinations"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const isHome = pathname === "/"
  const isSolid = isScrolled || !isHome

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const openWhatsApp = () => {
    const phoneNumber = "+918652681571" // Replace with your actual company number
    const message = "Hi! I'm interested in booking a tour. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const destinationItems = DESTINATIONS.map((d) => ({ name: d.name, path: `/destinations/${d.slug}`, category: d.category }))
  const domesticItems = destinationItems.filter((d) => d.category === "domestic")
  const internationalItems = destinationItems.filter((d) => d.category === "international")
  const navLinks = [
    {
      name: "International",
      path: "/destinations/international",
      dropdown: true,
      items: [],
    },
    {
      name: "India",
      path: "/destinations/india",
      dropdown: true,
      items: [],
    },
    {
      name: "Services",
      path: "/services",
      dropdown: true,
      items: [
        { name: "Flight Tickets", path: "/flights" },
        { name: "Hotel Bookings", path: "/hotels" },
        { name: "Visa Assistance", path: "/visa" },
        { name: "Tour Packages", path: "/tours" },
        { name: "Travel Insurance", path: "/travel-insurance" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSolid
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-black/25 to-transparent backdrop-blur-[2px] text-white",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32 sm:h-12 sm:w-40 md:h-16 md:w-58">
              <Image
                src="/images/logo.png"
                alt="EasYourTour"
                fill
                className={cn(
                  "object-contain",
                  // When navbar is transparent over the hero, invert the logo for contrast
                  !isSolid ? "brightness-0 invert drop-shadow" : "",
                )}
                priority
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.path}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                      isActive(link.path)
                        ? "text-brand-teal"
                        : isSolid
                          ? "text-foreground hover:text-brand-teal"
                          : "text-white hover:text-brand-light",
                    )}
                    onMouseEnter={() => setActiveDropdown(link.name)}
                  >
                    {link.name} <ChevronDown className="h-4 w-4" />
                  </Link>
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "absolute top-full left-0 mt-2 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-xl",
                          link.name === "Services" ? "w-48" : "w-64"
                        )}
                      >
                        {link.name === "International" ? (
                          <div className="p-3 w-64">
                            <div className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">International Destinations</div>
                            <div className="grid grid-cols-1 gap-1">
                              {internationalItems.map((item) => (
                                <Link
                                  key={item.path}
                                  href={item.path}
                                  className="px-2 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : link.name === "India" ? (
                          <div className="p-3 w-64">
                            <div className="mb-2 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">India Destinations</div>
                            <div className="grid grid-cols-1 gap-1">
                              {domesticItems.map((item) => (
                                <Link
                                  key={item.path}
                                  href={item.path}
                                  className="px-2 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : link.name === "Services" ? (
                          <div className="p-2 w-40">
                            <div className="grid grid-cols-1 gap-0">
                              {link.items?.map((item) => (
                                <Link
                                  key={item.path}
                                  href={item.path}
                                  className="px-2 py-1.5 text-sm rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "text-brand-teal"
                      : isSolid
                        ? "text-foreground hover:text-brand-teal"
                        : "text-white hover:text-brand-light",
                  )}
                >
                  {link.name}
                </Link>
              ),
            )}
          </nav>


          <div className="hidden lg:flex items-center gap-2">

            <Button
              onClick={openWhatsApp}
              className={cn(
                "ml-2 rounded-full",
                isSolid
                  ? "bg-brand-teal hover:bg-brand-navy text-white"
                  : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white",
              )}
            >
              <Phone className="h-4 w-4 mr-2" />
              +91 86526 81571
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full", !isSolid && "text-white hover:bg-white/20")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-center mb-8 mt-4">
                <div className="relative h-10 w-32 sm:h-12 sm:w-40">
                  <Image src="/images/logo.png" alt="EasYourTour" fill className="object-contain" />
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.name} className="space-y-2">
                      <span className="font-medium text-lg">{link.name}</span>
                      <div className="pl-4 space-y-2 border-l border-gray-200 dark:border-gray-800">
                        {link.name === "International" && (
                          <>
                            <div className="text-xs uppercase text-gray-500">International</div>
                            {internationalItems.map((item) => (
                              <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} className="block text-muted-foreground hover:text-brand-teal">
                                {item.name}
                              </Link>
                            ))}
                          </>
                        )}
                        {link.name === "India" && (
                          <>
                            <div className="text-xs uppercase text-gray-500">India</div>
                            {domesticItems.map((item) => (
                              <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} className="block text-muted-foreground hover:text-brand-teal">
                                {item.name}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-brand-teal ${
                        isActive(link.path) ? "text-brand-teal" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ),
                )}
                <div className="mt-4 pt-4 border-t">
                  <Button onClick={openWhatsApp} className="w-full bg-brand-teal hover:bg-brand-navy">
                    <Phone className="h-4 w-4 mr-2" />
                    +91 86526 81571
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, tours, experiences..."
                  className="pl-10 pr-10 py-6 text-base rounded-full"
                  autoFocus
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-brand-teal hover:bg-brand-navy"
                >
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
