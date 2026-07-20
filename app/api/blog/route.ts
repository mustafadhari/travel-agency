import { NextResponse } from "next/server"
import { getAllPosts, createPost, generateSlug, calculateReadTime } from "@/lib/blog"

export async function GET() {
  try {
    const posts = getAllPosts()
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, excerpt, content, author, category, tags, coverImage, status } = body

    if (!title || !content || !author) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const slug = generateSlug(title)
    const readTime = calculateReadTime(content)

    const post = createPost({
      title,
      slug,
      excerpt: excerpt || content.substring(0, 160).replace(/#+\s/g, "") + "...",
      content,
      author,
      category: category || "Travel Tips",
      tags: tags || [],
      coverImage: coverImage || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      status: status || "draft",
      readTime,
    })

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}
