"use client"

import { useState, useEffect, useCallback, lazy, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  PenLine,
  Trash2,
  Eye,
  Globe,
  FileText,
  Plus,
  X,
  Save,
  Tag,
  Clock,
  BookOpen,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Search,
  ChevronLeft,
  UploadCloud,
  Loader2,
} from "lucide-react"
import type { BlogPost } from "@/lib/blog-types"
import { BLOG_CATEGORIES } from "@/lib/blog-types"
import dynamic from "next/dynamic"

const WysiwygEditor = dynamic(() => import("@/components/blog/wysiwyg-editor"), { ssr: false })

// ─── Types ─────────────────────────────────────────────────────────────────
type ViewMode = "list" | "editor"
type ToastType = "success" | "error"
interface Toast { id: number; type: ToastType; message: string }

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  author: "Mustafa Dhariwala",
  category: "Travel Tips",
  tags: "",
  coverImage: "",
  status: "draft" as BlogPost["status"],
}

// ───────────────────────────────────────────────────────────────────────────
export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<ViewMode>("list")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")
  const [uploadingCover, setUploadingCover] = useState(false)

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingCover(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setForm((f) => ({ ...f, coverImage: data.url }))
        addToast("success", "Cover image uploaded successfully!")
      } else {
        addToast("error", data.error || "Upload failed")
      }
    } catch (err) {
      console.error(err)
      addToast("error", "An error occurred during cover upload.")
    } finally {
      setUploadingCover(false)
    }
  }

  // ── Fetch ──────────────────────────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    try {
      const r = await fetch("/api/blog", { cache: "no-store" })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const data = await r.json()
      setPosts(data.posts || [])
    } catch (e) {
      addToast("error", "Failed to load posts — check server")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  // ── Toast ──────────────────────────────────────────────────────────────
  const addToast = (type: ToastType, message: string) => {
    const id = Date.now()
    setToasts((t) => [...t, { id, type, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }

  // ── Editor helpers ─────────────────────────────────────────────────────
  const openCreate = () => {
    setForm(emptyForm)
    setEditingPost(null)
    setView("editor")
  }

  const openEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(", "),
      coverImage: post.coverImage,
      status: post.status,
    })
    setEditingPost(post)
    setView("editor")
  }

  const closeEditor = () => {
    setView("list")
    setEditingPost(null)
    setForm(emptyForm)
  }

  // ── Save ───────────────────────────────────────────────────────────────
  const handleSave = async (overrideStatus?: BlogPost["status"]) => {
    if (!form.title.trim()) { addToast("error", "Title is required"); return }
    if (!form.content.trim()) { addToast("error", "Content is required"); return }
    setSaving(true)
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: overrideStatus ?? form.status,
      }
      const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog"
      const method = editingPost ? "PUT" : "POST"
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const data = await r.json()
      if (data.success) {
        addToast("success", editingPost ? "Post updated!" : "Post created!")
        await fetchPosts()
        closeEditor()
      } else {
        addToast("error", data.error || "Something went wrong")
      }
    } catch { addToast("error", "Failed to save post") }
    finally { setSaving(false) }
  }

  // ── Delete ─────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const r = await fetch(`/api/blog/${id}`, { method: "DELETE" })
      const data = await r.json()
      if (data.success) { addToast("success", "Post deleted"); await fetchPosts() }
      else addToast("error", "Failed to delete post")
    } catch { addToast("error", "Failed to delete post") }
    finally { setDeleteConfirm(null) }
  }

  // ── Toggle publish ─────────────────────────────────────────────────────
  const togglePublish = async (post: BlogPost) => {
    const newStatus = post.status === "published" ? "draft" : "published"
    try {
      const r = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await r.json()
      if (data.success) { addToast("success", newStatus === "published" ? "Published!" : "Moved to draft"); await fetchPosts() }
    } catch { addToast("error", "Failed to update") }
  }

  const filtered = posts.filter((p) => {
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || p.status === filterStatus
    return matchSearch && matchStatus
  })

  const publishedCount = posts.filter((p) => p.status === "published").length
  const draftCount = posts.filter((p) => p.status === "draft").length
  const wordCount = form.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-20">
      {/* ── Toasts ──────────────────────────────────────────────────────── */}
      <div className="fixed top-4 right-4 z-[200] space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div key={toast.id} initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl pointer-events-auto ${toast.type === "success" ? "bg-teal-600 text-white" : "bg-red-600 text-white"}`}>
              {toast.type === "success" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span className="text-sm font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Delete confirm modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full text-center">
              <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Delete Article?</h3>
              <p className="text-slate-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-sm font-medium transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          EDITOR VIEW
      ════════════════════════════════════════════════════════════════════ */}
      {view === "editor" && (
        <div className="flex flex-col min-h-screen">
          {/* Editor top bar */}
          <div className="sticky top-20 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={closeEditor} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">{editingPost ? "Edit Article" : "New Article"}</p>
                <p className="text-xs text-slate-500">{wordCount} words · ~{Math.max(1, Math.ceil(wordCount / 200))} min read</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`hidden sm:inline px-3 py-1 rounded-full text-xs font-medium ${form.status === "published" ? "bg-teal-500/20 text-teal-400" : "bg-amber-500/20 text-amber-400"}`}>
                {form.status === "published" ? "Published" : "Draft"}
              </span>
              <button onClick={() => handleSave("draft")} disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm font-medium transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{saving ? "Saving…" : "Save Draft"}</span>
              </button>
              <button onClick={() => handleSave("published")} disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{saving ? "Publishing…" : "Publish"}</span>
              </button>
            </div>
          </div>

          {/* Editor body */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-auto">
            {/* Main */}
            <div className="lg:col-span-2 p-6 space-y-5">
              <input type="text" placeholder="Article title…"
                value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full bg-transparent text-3xl md:text-4xl font-bold text-white placeholder-slate-700 border-none outline-none" />
              <div className="h-px bg-slate-800" />
              <textarea placeholder="Short excerpt / summary shown on blog listing…"
                value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={2} className="w-full bg-transparent text-lg text-slate-400 placeholder-slate-600 border-none outline-none resize-none leading-relaxed" />
              <div className="h-px bg-slate-800" />
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Content</p>
              <WysiwygEditor
                value={form.content}
                onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                placeholder="Start writing your article… Use the toolbar to add headings, lists, images, and more."
              />
            </div>

            {/* Sidebar */}
            <div className="border-t lg:border-t-0 lg:border-l border-slate-800 p-6 space-y-6 bg-slate-900/30">
              <h3 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">Article Settings</h3>

              {/* Cover Image */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Cover Image</label>
                {form.coverImage ? (
                  <div className="relative h-36 rounded-xl overflow-hidden mb-3 border border-slate-700 group bg-slate-950">
                    <Image src={form.coverImage} alt="Cover" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, coverImage: "" }))}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all shadow z-10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-700 hover:border-teal-500/50 rounded-xl p-4 text-center cursor-pointer transition-colors relative bg-slate-950/50 mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      {uploadingCover ? (
                        <>
                          <Loader2 className="w-5 h-5 text-teal-400 animate-spin mx-auto" />
                          <div className="text-xs text-slate-300 font-medium">Uploading cover...</div>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-5 h-5 text-slate-400 mx-auto" />
                          <div className="text-xs text-slate-300 font-medium">Upload cover image file</div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <input type="url" placeholder="Or paste image URL instead…"
                  value={form.coverImage} onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500 transition-colors" />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-teal-500 transition-colors">
                  {BLOG_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Author</label>
                <input type="text" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-teal-500 transition-colors" />
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Tags (comma separated)</label>
                <input type="text" placeholder="Bali, Adventure, Budget"
                  value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500 transition-colors" />
                {form.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {form.tags.split(",").filter(Boolean).map((tag) => (
                      <span key={tag} className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full">{tag.trim()}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["draft", "published"] as const).map((s) => (
                    <button key={s} onClick={() => setForm((f) => ({ ...f, status: s }))}
                      className={`py-2 rounded-xl text-sm font-medium transition-all ${form.status === s ? (s === "published" ? "bg-teal-600 text-white" : "bg-amber-600 text-white") : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                      {s === "published" ? "Published" : "Draft"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button onClick={() => handleSave("published")} disabled={saving}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" /> Publish Now
                </button>
                <button onClick={() => handleSave("draft")} disabled={saving}
                  className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          LIST VIEW
      ════════════════════════════════════════════════════════════════════ */}
      {view === "list" && (
        <div className="flex flex-col min-h-screen">
          {/* Top bar */}
          <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-20 z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors shrink-0">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Home</span>
                </Link>
                <span className="text-slate-700">|</span>
                <span className="font-bold text-white text-sm sm:text-base">Blog Admin</span>
                <span className="text-slate-700">|</span>
                <Link href="/admin/tours" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Tours Admin</Link>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href="/blog" target="_blank"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800">
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">View Blog</span>
                </Link>
                <button onClick={openCreate}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-teal-900/40">
                  <Plus className="w-4 h-4" />
                  New Article
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: BookOpen, label: "Total", value: posts.length, color: "text-blue-400", bg: "bg-blue-500/10" },
                { icon: Globe, label: "Published", value: publishedCount, color: "text-teal-400", bg: "bg-teal-500/10" },
                { icon: FileText, label: "Drafts", value: draftCount, color: "text-amber-400", bg: "bg-amber-500/10" },
                { icon: Clock, label: "Read Time", value: `${posts.reduce((s, p) => s + p.readTime, 0)} min`, color: "text-purple-400", bg: "bg-purple-500/10" },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="Search articles…" value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-teal-500 transition-colors" />
              </div>
              <div className="flex gap-2">
                {(["all", "published", "draft"] as const).map((s) => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${filterStatus === s ? "bg-teal-600 text-white" : "bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts list */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {loading ? (
                <div className="divide-y divide-slate-800">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-5 flex items-center gap-4 animate-pulse">
                      <div className="w-16 h-16 rounded-xl bg-slate-800 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-800 rounded w-1/2" />
                        <div className="h-3 bg-slate-800 rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">✍️</div>
                  <h3 className="text-lg font-bold text-slate-400 mb-1">
                    {search || filterStatus !== "all" ? "No articles match your filter" : "No articles yet"}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6">
                    {search || filterStatus !== "all" ? "Try a different search or filter" : "Create your first blog post to get started"}
                  </p>
                  {!search && filterStatus === "all" && (
                    <button onClick={openCreate}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-xl text-sm font-semibold transition-colors">
                      <Plus className="w-4 h-4" /> Write First Article
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {filtered.map((post) => (
                    <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-start gap-4 p-4 sm:p-5 hover:bg-slate-800/40 transition-colors group">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-800">
                        {post.coverImage && <Image src={post.coverImage} alt={post.title} fill className="object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.status === "published" ? "bg-teal-500/20 text-teal-400" : "bg-amber-500/20 text-amber-400"}`}>
                            {post.status}
                          </span>
                          <span className="text-xs text-slate-500 hidden sm:inline">{post.category}</span>
                        </div>
                        <h3 className="font-semibold text-white text-sm sm:text-base truncate">{post.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 hidden sm:block line-clamp-1">{post.excerpt}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-600">
                          <span className="hidden sm:inline">{post.author}</span>
                          <span>{new Date(post.updatedAt).toLocaleDateString("en-IN")}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                        </div>
                      </div>
                      {/* Actions — always visible on mobile, hover on desktop */}
                      <div className="flex items-center gap-1.5 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        {post.status === "published" && (
                          <Link href={`/blog/${post.slug}`} target="_blank"
                            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <button onClick={() => togglePublish(post)}
                          className={`p-2 rounded-lg transition-colors ${post.status === "published" ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400" : "bg-teal-500/20 hover:bg-teal-500/30 text-teal-400"}`}
                          title={post.status === "published" ? "Unpublish" : "Publish"}>
                          {post.status === "published" ? <FileText className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                        </button>
                        <button onClick={() => openEdit(post)}
                          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors" title="Edit">
                          <PenLine className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(post.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
