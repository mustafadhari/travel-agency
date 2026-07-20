import { NextResponse } from "next/server"
import { getPostById, updatePost, deletePost, generateSlug, calculateReadTime } from "@/lib/blog"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const post = getPostById(params.id)
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, post })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, excerpt, content, author, category, tags, coverImage, status } = body

    const updates: Record<string, unknown> = {}
    if (title !== undefined) {
      updates.title = title
      updates.slug = generateSlug(title)
    }
    if (excerpt !== undefined) updates.excerpt = excerpt
    if (content !== undefined) {
      updates.content = content
      updates.readTime = calculateReadTime(content)
    }
    if (author !== undefined) updates.author = author
    if (category !== undefined) updates.category = category
    if (tags !== undefined) updates.tags = tags
    if (coverImage !== undefined) updates.coverImage = coverImage
    if (status !== undefined) updates.status = status

    const post = updatePost(params.id, updates)
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, post })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = deletePost(params.id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Post deleted" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 })
  }
}
