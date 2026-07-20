"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Clock, Calendar, Tag, ChevronRight, BookOpen, TrendingUp } from "lucide-react"
import type { BlogPost } from "@/lib/blog-types"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blog", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const published = (data.posts as BlogPost[]).filter((p) => p.status === "published")
        setPosts(published)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))]

  const filtered = posts.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Spacer so hero starts below the fixed navbar (h-20 = 80px) */}
      <div className="h-20" />

      {/* ── Hero — matches About/Tours/Contact pattern ─────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[url('/images/world.svg')] bg-no-repeat bg-center bg-cover opacity-5" />

        <div className="relative container mx-auto px-4 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="font-display text-sm font-semibold tracking-wider uppercase">Travel Journal</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-5 leading-tight">
              Stories &amp; <span className="text-brand-light">Guides</span>
            </h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto mb-10 font-sans">
              Inspiration, destination guides, and insider tips to make every journey unforgettable.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search articles, destinations, tips…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-4 rounded-xl bg-white/15 backdrop-blur border border-white/25 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filters ────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white sticky top-20 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-teal text-white shadow"
                    : "text-gray-500 hover:bg-gray-100 hover:text-brand-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-14">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="bg-gray-200 h-52" />
                <div className="p-5 space-y-3">
                  <div className="bg-gray-200 h-3 rounded w-1/3" />
                  <div className="bg-gray-200 h-5 rounded" />
                  <div className="bg-gray-200 h-3 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-500 font-sans">Try a different search term or category</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && activeCategory === "All" && search === "" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-14"
              >
                <div className="flex items-center gap-3 mb-5">
                  <TrendingUp className="w-5 h-5 text-brand-teal" />
                  <span className="font-display text-sm font-bold text-brand-teal uppercase tracking-wider">Featured Story</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 grid md:grid-cols-2">
                    <div className="relative h-72 md:h-auto overflow-hidden">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-display font-bold">
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 font-sans">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(featured.publishedAt || featured.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {featured.readTime} min read
                        </span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-teal transition-colors leading-snug">
                        {featured.title}
                      </h2>
                      <p className="text-gray-500 font-sans leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featured.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-xs bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-full font-sans">
                            <Tag className="w-3 h-3" />{tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-2 text-brand-teal font-display font-semibold group-hover:gap-3 transition-all">
                        Read Story <ChevronRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {(activeCategory === "All" && search === "" ? rest : filtered).map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute top-4 left-4 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-display font-bold">
                          {post.category}
                        </span>
                        <span className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full font-sans">
                          <Clock className="w-3 h-3" />{post.readTime} min
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5 font-sans">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        <h3 className="font-display text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-teal transition-colors leading-snug flex-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-sans leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-gray-100">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-full font-sans">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
