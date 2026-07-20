// Client-safe constants — no Node.js modules imported here
export const BLOG_CATEGORIES = [
  "Travel Tips",
  "Destinations",
  "Adventure",
  "Culture",
  "Food & Cuisine",
  "Budget Travel",
  "Luxury Travel",
  "Honeymoon",
  "Family Travel",
  "Solo Travel",
]

export type BlogStatus = "draft" | "published"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  coverImage: string
  status: BlogStatus
  createdAt: string
  updatedAt: string
  publishedAt?: string
  readTime: number
}
