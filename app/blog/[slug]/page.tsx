"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Calendar, Tag, User, Share2, ChevronRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog-types"
import { getAuthorById } from "@/lib/blog-authors"
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/blog-schema"
import SocialShare from "@/components/social-share"

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content)
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' target='_blank' rel='noopener'>$1</a>")
    .replace(/^---$/gm, "<hr />")
    .replace(
      /\|(.+)\|\n\|[-|]+\|\n((?:\|.+\|\n?)+)/gm,
      (match) => {
        const rows = match.trim().split("\n")
        const headers = rows[0].split("|").filter(Boolean).map((h) => h.trim())
        const bodyRows = rows.slice(2).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()))
        return `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${bodyRows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      }
    )
    .replace(/^(?!<[hultap]).+$/gm, (line) => (line.trim() ? `<p>${line}</p>` : ""))
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blog", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const published = (data.posts as BlogPost[]).filter((p) => p.status === "published")
        const found = published.find((p) => p.slug === slug)
        if (found) {
          // Enhance post with author data and schema
          const author = getAuthorById(found.author.id || 'easyourtour-team')
          const postWithAuthor = {
            ...found,
            author: author,
            schemaMarkup: generateBlogPostSchema({ ...found, author }),
            breadcrumbSchema: generateBreadcrumbSchema(slug, found.title)
          }
          setPost(postWithAuthor)
          setRelated(published.filter((p) => p.id !== found.id && p.category === found.category).slice(0, 3))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({ title: post.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-28 animate-pulse space-y-6">
          <div className="bg-gray-200 h-96 rounded-2xl" />
          <div className="bg-gray-200 h-8 rounded w-3/4" />
          {[1, 2, 3].map((i) => <div key={i} className="bg-gray-200 h-4 rounded" />)}
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Article not found</h2>
          <Link href="/blog" className="text-brand-teal hover:underline font-sans">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const htmlContent = isHtmlContent(post.content) ? post.content : renderMarkdown(post.content)

  return (
    <div className="min-h-screen bg-white">
      {/* Spacer so cover image starts below the fixed navbar */}
      <div className="h-20" />

      {/* Cover with gradient overlay */}
      <div className="relative h-[55vh] min-h-[420px]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/75" />

        {/* Back button */}
        <div className="absolute top-0 left-0 right-0 pt-6 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-sans transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-brand-teal text-white px-4 py-1.5 rounded-full text-sm font-display font-bold mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-snug drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-200 font-sans">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <strong className="text-gray-700 font-display font-semibold">{typeof post.author === 'string' ? post.author : post.author?.name}</strong>
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {post.readTime} min read
          </span>
          <div className="ml-auto">
            <SocialShare
              title={post.title}
              className="justify-end"
            />
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1.5 text-sm text-brand-teal bg-brand-teal/10 px-4 py-1.5 rounded-full font-sans">
              <Tag className="w-3.5 h-3.5" />{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-br from-brand-navy via-brand-teal to-brand-light rounded-2xl p-8 md:p-10 text-center text-white">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">Ready to Start Your Adventure?</h3>
          <p className="text-white/80 font-sans mb-7 text-lg">
            Let EasYourTour craft a personalised itinerary tailored just for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-brand-navy px-7 py-3.5 rounded-full font-display font-bold hover:bg-white/90 transition-colors shadow-lg"
          >
            Get a Free Quote <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="bg-gray-50 py-16 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">More from <span className="text-brand-teal">{post.category}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-44 overflow-hidden">
                      <Image src={rel.coverImage} alt={rel.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-brand-teal font-display font-bold">{rel.category}</span>
                      <h3 className="font-display font-bold text-gray-900 mt-1.5 group-hover:text-brand-teal transition-colors line-clamp-2">{rel.title}</h3>
                      <p className="text-xs text-gray-400 mt-2.5 flex items-center gap-1 font-sans">
                        <Clock className="w-3 h-3" />{rel.readTime} min read
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .blog-content { color: #374151; line-height: 1.85; font-size: 1.0625rem; font-family: "Lato", "Lato Fallback", sans-serif; }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3 { font-family: "Raleway", "Raleway Fallback", sans-serif; font-weight: 700; color: #004677; }
        .blog-content h1 { font-size: 2rem; margin: 2rem 0 1rem; }
        .blog-content h2 { font-size: 1.5rem; margin: 2rem 0 0.75rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
        .blog-content h3 { font-size: 1.2rem; margin: 1.5rem 0 0.5rem; color: #007A78; }
        .blog-content p { margin-bottom: 1.25rem; }
        .blog-content ul { list-style: disc; padding-left: 1.75rem; margin-bottom: 1.25rem; }
        .blog-content ol { list-style: decimal; padding-left: 1.75rem; margin-bottom: 1.25rem; }
        .blog-content li { margin-bottom: 0.4rem; }
        .blog-content blockquote { border-left: 4px solid #007A78; padding: 1rem 1.25rem; margin: 1.5rem 0; background: #f0faf9; border-radius: 0 12px 12px 0; color: #4b5563; font-style: italic; }
        .blog-content a { color: #007A78; text-decoration: underline; }
        .blog-content a:hover { color: #004677; }
        .blog-content hr { border: none; border-top: 2px solid #e5e7eb; margin: 2.5rem 0; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.875rem; overflow-x: auto; display: block; }
        .blog-content th { background: #004677; color: white; padding: 0.75rem 1rem; text-align: left; font-weight: 700; border: 1px solid #004677; font-family: "Raleway", "Raleway Fallback", sans-serif; white-space: nowrap; }
        .blog-content td { padding: 0.625rem 1rem; border: 1px solid #e2e8f0; vertical-align: top; }
        .blog-content tr:nth-child(even) td { background: #f8fafc; }
        .blog-content tr:hover td { background: #eff6ff; }
        .blog-content figure { margin: 1.5rem 0; text-align: center; }
        .blog-content figure img { max-width: 100%; max-height: 480px; object-fit: cover; display: block; margin: 0 auto; border-radius: 12px; }
        .blog-content figcaption { padding: 0.5rem 1rem; font-size: 0.85rem; color: #6b7280; font-style: italic; text-align: center; }
        .blog-content img { max-width: 100%; border-radius: 12px; margin: 1rem 0; }
        .blog-content strong { font-weight: 700; color: #111827; }
        /* TOC Box */
        .blog-content .toc-box { background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%); border: 1.5px solid #007A78; border-radius: 16px; padding: 1.5rem 1.75rem; margin: 2rem 0 2.5rem; }
        .blog-content .toc-header { font-family: "Raleway", "Raleway Fallback", sans-serif; font-size: 1.15rem; font-weight: 800; color: #004677; margin-bottom: 0.4rem; }
        .blog-content .toc-intro { font-size: 0.9rem; color: #6b7280; margin-bottom: 1rem; }
        .blog-content .toc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem; }
        .blog-content .toc-link { display: block; background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.65rem 1rem; font-size: 0.875rem; color: #004677 !important; font-family: "Lato", "Lato Fallback", sans-serif; font-weight: 600; text-decoration: none !important; transition: all 0.2s ease; }
        .blog-content .toc-link:hover { background: #007A78 !important; color: white !important; border-color: #007A78; transform: translateY(-1px); }
        @media (max-width: 640px) { .blog-content .toc-grid { grid-template-columns: 1fr; } }
      `}</style>
      {/* JSON-LD Structured Data */}
      {post.schemaMarkup && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.schemaMarkup }} />
      )}
      {post.breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.breadcrumbSchema }} />
      )}
    </div>
  )
}
