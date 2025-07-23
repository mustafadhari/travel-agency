import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")

    let query = "SELECT * FROM destinations WHERE 1=1"
    const params: any[] = []

    if (search) {
      query += " AND (name LIKE ? OR country LIKE ?)"
      params.push(`%${search}%`, `%${search}%`)
    }

    if (featured === "true") {
      query += " AND is_featured = true"
    }

    query += " ORDER BY name ASC"

    const destinations = await executeQuery(query, params)

    return NextResponse.json({ destinations })
  } catch (error) {
    console.error("Destinations API error:", error)
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, country, continent, description, image_url, thumbnail_url, is_featured } = body

    const query = `
      INSERT INTO destinations (name, country, continent, description, image_url, thumbnail_url, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const params = [name, country, continent, description, image_url, thumbnail_url, is_featured || false]

    const result = await executeQuery(query, params)

    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error("Create destination error:", error)
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 })
  }
}
