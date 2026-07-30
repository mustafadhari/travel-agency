"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  PenLine,
  Trash2,
  Eye,
  Globe,
  Plus,
  X,
  Save,
  Tag,
  Clock,
  Compass,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Search,
  ChevronLeft,
  UploadCloud,
  Loader2,
  MapPin,
  DollarSign,
  PlusCircle,
  MinusCircle,
  Info,
} from "lucide-react"

interface ItineraryItem {
  day: number
  title: string
  description: string
  activities: string[]
}

interface TourForm {
  title: string
  slug: string
  location: string
  country: string
  continent: string
  duration: string
  duration_days: number
  type: string
  price: number
  rating: number
  reviews: number
  image: string
  description: string
  featured: boolean
  difficulty_level: string
  max_participants: number
  highlights: string[]
  itinerary: ItineraryItem[]
  inclusions: string[]
  exclusions: string[]
  accommodation: string
  transportation: string
  meals: string
  best_time: string
  weather: string
  visa_requirements: string
  payment_terms: string
  cancellation_policy: string
  images: string[]
}

const emptyTourForm: TourForm = {
  title: "",
  slug: "",
  location: "",
  country: "",
  continent: "Asia",
  duration: "5 Days / 4 Nights",
  duration_days: 5,
  type: "Private Tour",
  price: 15000,
  rating: 5.0,
  reviews: 0,
  image: "",
  description: "",
  featured: false,
  difficulty_level: "Easy",
  max_participants: 10,
  highlights: [],
  itinerary: [{ day: 1, title: "Arrival", description: "Arrival and check-in.", activities: [] }],
  inclusions: [],
  exclusions: [],
  accommodation: "3-Star Hotel",
  transportation: "Private AC Car",
  meals: "Breakfast",
  best_time: "October to March",
  weather: "Pleasant",
  visa_requirements: "Visa on arrival / eVisa",
  payment_terms: "100% advance before tour start",
  cancellation_policy: "Non-refundable within 7 days of travel",
  images: [],
}

type ViewMode = "list" | "editor"
type ToastType = "success" | "error"
interface Toast {
  id: number
  type: ToastType
  message: string
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<ViewMode>("list")
  const [editingTour, setEditingTour] = useState<any | null>(null)
  const [form, setForm] = useState<TourForm>(emptyTourForm)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [filterContinent, setFilterContinent] = useState("all")

  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  // Temp item inputs
  const [newHighlight, setNewHighlight] = useState("")
  const [newInclusion, setNewInclusion] = useState("")
  const [newExclusion, setNewExclusion] = useState("")

  // Fetch
  const fetchTours = useCallback(async () => {
    try {
      const res = await fetch("/api/tours", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load tours")
      const data = await res.json()
      setTours(data.tours || [])
    } catch (e) {
      addToast("error", "Failed to load tours from server")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTours()
  }, [fetchTours])

  // Toast helper
  const addToast = (type: ToastType, message: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, type, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }

  // slug generator
  const generateTourSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: generateTourSlug(title),
    }))
  }

  // Open creation
  const openCreate = () => {
    setForm(emptyTourForm)
    setEditingTour(null)
    setView("editor")
  }

  // Open edit
  const openEdit = (tour: any) => {
    setForm({
      title: tour.title || "",
      slug: tour.slug || "",
      location: tour.location || "",
      country: tour.country || "",
      continent: tour.continent || "Asia",
      duration: tour.duration || "5 Days / 4 Nights",
      duration_days: tour.duration_days || 5,
      type: tour.type || "Private Tour",
      price: tour.price || 0,
      rating: tour.rating || 5.0,
      reviews: tour.reviews || 0,
      image: tour.image || "",
      description: tour.description || "",
      featured: tour.featured || false,
      difficulty_level: tour.difficulty_level || "Easy",
      max_participants: tour.max_participants || 10,
      highlights: tour.highlights || [],
      itinerary: tour.itinerary || [],
      inclusions: tour.inclusions || [],
      exclusions: tour.exclusions || [],
      accommodation: tour.accommodation || "",
      transportation: tour.transportation || "",
      meals: tour.meals || "",
      best_time: tour.best_time || "",
      weather: tour.weather || "",
      visa_requirements: tour.visa_requirements || "",
      payment_terms: tour.payment_terms || "",
      cancellation_policy: tour.cancellation_policy || "",
      images: tour.images || [],
    })
    setEditingTour(tour)
    setView("editor")
  }

  const closeEditor = () => {
    setView("list")
    setEditingTour(null)
    setForm(emptyTourForm)
  }

  // Upload main image
  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.success) {
        setForm((f) => ({ ...f, image: data.url }))
        addToast("success", "Main image uploaded successfully!")
      } else {
        addToast("error", data.error || "Upload failed")
      }
    } catch {
      addToast("error", "Upload error")
    } finally {
      setUploadingImage(false)
    }
  }

  // Upload gallery image
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingGallery(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.success) {
        setForm((f) => ({ ...f, images: [...f.images, data.url] }))
        addToast("success", "Gallery image added!")
      } else {
        addToast("error", data.error || "Upload failed")
      }
    } catch {
      addToast("error", "Upload error")
    } finally {
      setUploadingGallery(false)
    }
  }

  // Save tour
  const handleSave = async () => {
    if (!form.title || !form.location || !form.country) {
      addToast("error", "Please fill in Title, Location, and Country fields.")
      return
    }
    setSaving(true)
    try {
      const method = editingTour ? "PUT" : "POST"
      const url = editingTour ? `/api/tours/${editingTour.id}` : "/api/tours"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        addToast("success", editingTour ? "Tour updated!" : "Tour created successfully!")
        closeEditor()
        fetchTours()
      } else {
        addToast("error", data.error || "Failed to save tour")
      }
    } catch {
      addToast("error", "Failed to communicate with server")
    } finally {
      setSaving(false)
    }
  }

  // Delete
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/tours/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        addToast("success", "Tour deleted successfully!")
        setDeleteConfirm(null)
        fetchTours()
      } else {
        addToast("error", data.error || "Failed to delete")
      }
    } catch {
      addToast("error", "Server communication error")
    }
  }

  // Itinerary handlers
  const addItineraryDay = () => {
    setForm((f) => ({
      ...f,
      itinerary: [
        ...f.itinerary,
        {
          day: f.itinerary.length + 1,
          title: "New Day",
          description: "",
          activities: [],
        },
      ],
    }))
  }

  const removeItineraryDay = (index: number) => {
    setForm((f) => {
      const updated = f.itinerary.filter((_, i) => i !== index)
      // re-index days
      const reindexed = updated.map((item, i) => ({ ...item, day: i + 1 }))
      return { ...f, itinerary: reindexed }
    })
  }

  const updateItineraryField = (index: number, field: keyof ItineraryItem, val: any) => {
    setForm((f) => {
      const updated = [...f.itinerary]
      updated[index] = { ...updated[index], [field]: val }
      return { ...f, itinerary: updated }
    })
  }

  // Filter & Search
  const filteredTours = tours.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.country.toLowerCase().includes(search.toLowerCase())

    const matchContinent =
      filterContinent === "all" ||
      t.continent?.toLowerCase() === filterContinent.toLowerCase()

    return matchSearch && matchContinent
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-20">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-[200] space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-white pointer-events-auto ${
                toast.type === "success"
                  ? "bg-teal-650/90 border-teal-500 backdrop-blur-md"
                  : "bg-red-950/90 border-red-500 backdrop-blur-md"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Dialog */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Delete Tour Package?</h3>
            <p className="text-sm text-slate-400 mb-6">This will permanently remove this tour package from the search and booking engine.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Mode */}
      {view === "editor" && (
        <div className="flex flex-col min-h-screen">
          {/* Top Bar */}
          <div className="sticky top-20 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={closeEditor} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">{editingTour ? "Edit Tour" : "New Tour Package"}</p>
                <p className="text-xs text-slate-500">{form.duration} · ₹{form.price.toLocaleString()}/person</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{saving ? "Saving…" : "Save Tour"}</span>
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-auto">
            {/* Left Col - Core fields */}
            <div className="lg:col-span-2 p-6 space-y-6">
              {/* Title & Slug */}
              <div>
                <input
                  type="text"
                  placeholder="Tour Title (e.g. Majestic Meghalaya Gateway)"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-transparent text-3xl font-bold text-white placeholder-slate-700 border-none outline-none mb-2"
                />
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Slug:</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="bg-transparent text-slate-400 outline-none border-b border-transparent hover:border-slate-800 focus:border-teal-500 px-1 w-80"
                  />
                </div>
              </div>

              <div className="h-px bg-slate-800" />

              {/* Description */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block uppercase tracking-wider font-semibold">Overview Description</label>
                <textarea
                  placeholder="Describe this tour's essence, destinations covered, and target travelers..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-650 outline-none focus:border-teal-500 leading-relaxed resize-none"
                />
              </div>

              {/* Highlights List Builder */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block uppercase tracking-wider font-semibold">Key Highlights</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a highlight (e.g., Double Decker Living Root Bridge trek)..."
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newHighlight.trim()) {
                        setForm((f) => ({ ...f, highlights: [...f.highlights, newHighlight.trim()] }))
                        setNewHighlight("")
                      }
                    }}
                    className="px-4 bg-slate-800 hover:bg-slate-700 rounded-xl text-teal-400"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  {form.highlights.map((h, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm">
                      <span className="text-slate-300">{h}</span>
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }))}
                        className="text-red-400 hover:text-red-500"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Day-by-Day Itinerary</label>
                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="text-xs flex items-center gap-1 text-teal-400 hover:text-teal-300"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Day
                  </button>
                </div>

                <div className="space-y-4">
                  {form.itinerary.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="bg-teal-600/20 text-teal-450 border border-teal-500/20 text-xs px-3 py-1 rounded-full font-bold">
                          Day {item.day}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(idx)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-550 block mb-1">Day Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateItineraryField(idx, "title", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-550 block mb-1">Activities (comma separated)</label>
                          <input
                            type="text"
                            placeholder="Activity 1, Activity 2..."
                            value={item.activities.join(", ")}
                            onChange={(e) =>
                              updateItineraryField(
                                idx,
                                "activities",
                                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-550 block mb-1">Day Activities Description</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => updateItineraryField(idx, "description", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-teal-500 leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col - Metadata / Side Settings */}
            <div className="border-t lg:border-t-0 lg:border-l border-slate-800 p-6 space-y-6 bg-slate-900/20">
              <h3 className="font-semibold text-slate-400 text-xs uppercase tracking-wider">Tour Details</h3>

              {/* Main Image */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block font-medium">Main Showcase Image</label>
                {form.image ? (
                  <div className="relative h-44 rounded-xl overflow-hidden mb-3 border border-slate-800 bg-slate-950 group">
                    <Image src={form.image} alt="Showcase" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-2 right-2 p-1.5 bg-red-650 text-white rounded-full transition-all shadow z-10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-800 hover:border-teal-550 rounded-xl p-6 text-center cursor-pointer transition-colors relative bg-slate-950/60 mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      disabled={uploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      {uploadingImage ? (
                        <>
                          <Loader2 className="w-6 h-6 text-teal-400 animate-spin mx-auto" />
                          <div className="text-xs text-slate-450 font-medium">Uploading image...</div>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-6 h-6 text-slate-500 mx-auto" />
                          <div className="text-xs text-slate-400 font-medium">Upload tour main image</div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <input
                  type="url"
                  placeholder="Or paste image URL link..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-350 outline-none focus:border-teal-500"
                />
              </div>

              {/* Location, Country & Continent */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Location</label>
                  <input
                    type="text"
                    placeholder="Munnar"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Country</label>
                  <input
                    type="text"
                    placeholder="India"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Continent</label>
                <select
                  value={form.continent}
                  onChange={(e) => setForm({ ...form, continent: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                >
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Australia">Australia & Oceania</option>
                </select>
              </div>

              {/* Price, Duration & Days */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Price (₹)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Duration Label</label>
                  <input
                    type="text"
                    placeholder="5 Days / 4 Nights"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Duration (Days)</label>
                  <input
                    type="number"
                    value={form.duration_days}
                    onChange={(e) => setForm({ ...form, duration_days: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Tour Type</label>
                  <input
                    type="text"
                    placeholder="Private Honeymoon Tour"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Number of Reviews</label>
                  <input
                    type="number"
                    value={form.reviews}
                    onChange={(e) => setForm({ ...form, reviews: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between bg-slate-900/40 border border-slate-850 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-teal-405" />
                  <span className="text-xs text-slate-350">Feature this tour package</span>
                </div>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded border-slate-800 text-teal-600 focus:ring-teal-500 w-4 h-4 bg-slate-900 cursor-pointer"
                />
              </div>

              {/* Essentials info */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Accommodation</label>
                  <input type="text" value={form.accommodation} onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Transportation</label>
                  <input type="text" value={form.transportation} onChange={(e) => setForm({ ...form, transportation: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Meals Plan</label>
                  <input type="text" value={form.meals} onChange={(e) => setForm({ ...form, meals: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Best Time to Visit</label>
                  <input type="text" value={form.best_time} onChange={(e) => setForm({ ...form, best_time: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Visa Policy</label>
                  <input type="text" value={form.visa_requirements} onChange={(e) => setForm({ ...form, visa_requirements: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 block mb-0.5">Difficulty Level</label>
                    <select value={form.difficulty_level} onChange={(e) => setForm({ ...form, difficulty_level: e.target.value })}
                      className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500 bg-slate-950">
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                      <option value="Difficult">Difficult</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-0.5">Max Group Size</label>
                    <input type="number" value={form.max_participants} onChange={(e) => setForm({ ...form, max_participants: Number(e.target.value) })}
                      className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Weather Conditions</label>
                  <input type="text" value={form.weather} onChange={(e) => setForm({ ...form, weather: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Payment Terms</label>
                  <textarea rows={2} value={form.payment_terms} onChange={(e) => setForm({ ...form, payment_terms: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-2 text-xs outline-none focus:border-teal-500 resize-none leading-normal" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-0.5">Cancellation Policy</label>
                  <textarea rows={2} value={form.cancellation_policy} onChange={(e) => setForm({ ...form, cancellation_policy: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-2 text-xs outline-none focus:border-teal-500 resize-none leading-normal" />
                </div>
              </div>

              {/* Inclusions / Exclusions list builder */}
              <div className="h-px bg-slate-800" />

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block font-semibold">Inclusions</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="Daily breakfast..." value={newInclusion} onChange={(e) => setNewInclusion(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                  <button type="button" onClick={() => {
                    if (newInclusion.trim()) {
                      setForm((f) => ({ ...f, inclusions: [...f.inclusions, newInclusion.trim()] }))
                      setNewInclusion("")
                    }
                  }} className="px-3 bg-slate-800 text-teal-400 rounded-lg text-xs">+</button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {form.inclusions.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-teal-900/25 border border-teal-500/20 text-teal-350 px-2 py-0.5 rounded text-xs">
                      {item}
                      <button type="button" onClick={() => setForm((f) => ({ ...f, inclusions: f.inclusions.filter((_, i) => i !== idx) }))} className="text-teal-500 hover:text-red-400 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block font-semibold">Exclusions</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="Flights charges..." value={newExclusion} onChange={(e) => setNewExclusion(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-teal-500" />
                  <button type="button" onClick={() => {
                    if (newExclusion.trim()) {
                      setForm((f) => ({ ...f, exclusions: [...f.exclusions, newExclusion.trim()] }))
                      setNewExclusion("")
                    }
                  }} className="px-3 bg-slate-800 text-teal-400 rounded-lg text-xs">+</button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {form.exclusions.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 bg-red-950/25 border border-red-500/20 text-red-350 px-2 py-0.5 rounded text-xs">
                      {item}
                      <button type="button" onClick={() => setForm((f) => ({ ...f, exclusions: f.exclusions.filter((_, i) => i !== idx) }))} className="text-red-500 hover:text-white font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery upload */}
              <div className="h-px bg-slate-800" />

              <div>
                <label className="text-xs text-slate-400 mb-2 block font-medium">Gallery Showcase Images</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {form.images.map((gImg, idx) => (
                    <div key={idx} className="relative h-20 border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
                      <Image src={gImg} alt="Gallery" fill className="object-cover" />
                      <button type="button" onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))}
                        className="absolute top-1 right-1 p-1 bg-red-650 hover:bg-red-500 text-white rounded-full transition-all">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  <div className="border border-dashed border-slate-800 hover:border-teal-500/50 rounded-lg h-20 flex items-center justify-center relative cursor-pointer bg-slate-950/40">
                    <input type="file" accept="image/*" onChange={handleGalleryUpload} disabled={uploadingGallery}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {uploadingGallery ? (
                      <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
                    ) : (
                      <Plus className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List Mode */}
      {view === "list" && (
        <div className="flex flex-col min-h-screen">
          {/* Action Header */}
          <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-20 z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors shrink-0">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Home</span>
                </Link>
                <span className="text-slate-700">|</span>
                <Link href="/admin/blog" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Blog Admin</Link>
                <span className="text-slate-700">|</span>
                <span className="font-bold text-white text-sm sm:text-base">Tours Admin</span>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button onClick={openCreate}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-650 hover:bg-teal-500 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-teal-900/40">
                  <Plus className="w-4 h-4" />
                  <span>Add Tour Package</span>
                </button>
              </div>
            </div>
          </div>

          {/* List Content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
            {/* Filter Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/30 border border-slate-800/80 p-4 rounded-2xl">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500 transition-colors"
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto justify-end overflow-x-auto">
                {["All", "Asia", "Europe", "Africa", "North America"].map((cont) => (
                  <button
                    key={cont}
                    onClick={() => setFilterContinent(cont === "All" ? "all" : cont)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      (cont === "All" && filterContinent === "all") || (cont !== "All" && filterContinent.toLowerCase() === cont.toLowerCase())
                        ? "bg-teal-605 border-teal-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-450 hover:text-white"
                    }`}
                  >
                    {cont}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
                <p className="text-slate-500 text-sm">Loading tour packages...</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl">
                <p className="text-slate-400 text-lg mb-1">No tours found</p>
                <p className="text-slate-600 text-xs">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <div key={tour.id} className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition-colors">
                    {/* Cover image */}
                    <div className="relative h-48 bg-slate-950">
                      {tour.image ? (
                        <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-650 text-xs bg-slate-950">No main image</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-teal-650 text-white font-bold text-xs px-2.5 py-1 rounded-md">
                        {tour.duration}
                      </div>
                      {tour.featured && (
                        <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-xxs tracking-wider uppercase px-2 py-0.5 rounded-full shadow">
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center text-slate-300 text-xs gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal-400" />
                          <span>{tour.location}, {tour.country}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-bold text-slate-100 group-hover:text-teal-450 transition-colors leading-snug line-clamp-2 mb-2">
                          {tour.title}
                        </h3>
                        <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">{tour.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-850 flex items-center justify-between">
                        <div className="text-sm font-semibold text-slate-300">
                          ₹{tour.price.toLocaleString()} <span className="text-xxs font-normal text-slate-500">/ person</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={() => openEdit(tour)} className="p-2 text-slate-450 hover:text-teal-400 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg transition-colors">
                            <PenLine className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteConfirm(tour.id)} className="p-2 text-slate-450 hover:text-red-400 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <Link href={`/tours/${tour.slug}`} target="_blank" className="p-2 text-slate-450 hover:text-white bg-slate-900/60 hover:bg-slate-850 border border-slate-800 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
