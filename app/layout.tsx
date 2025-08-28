import type React from "react"
import type { Metadata } from "next"
import { Lato, Raleway } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import EnquiryPopup from "@/components/enquiry-popup"

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato"
})

const raleway = Raleway({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway"
})

export const metadata: Metadata = {
  title: "EasYourTour - Make your Travel Easy & Affordable",
  description: "Find and book the best travel services at affordable prices",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} ${raleway.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <EnquiryPopup />
        </ThemeProvider>
      </body>
    </html>
  )
}
