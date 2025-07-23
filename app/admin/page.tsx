"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLogin from "@/components/admin/admin-login"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "true") {
      router.push("/admin/dashboard")
    }
  }, [router])

  return <AdminLogin />
}
