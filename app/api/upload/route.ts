import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: "No file selected" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Set up destination: public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    // Generate safe unique filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const uniqueName = `${Date.now()}-${safeName}`
    const filePath = path.join(uploadDir, uniqueName)

    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueName}`,
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, error: error.message || "Failed to save file" }, { status: 500 })
  }
}
