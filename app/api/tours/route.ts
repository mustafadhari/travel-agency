import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const destination = searchParams.get("destination")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const tourType = searchParams.get("tourType")
    const duration = searchParams.get("duration")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const offset = (page - 1) * limit

    // Build dynamic query
    let query = `
      SELECT 
        t.*, 
        d.name as destination_name, 
        d.country, 
        d.continent
      FROM tours t
      LEFT JOIN destinations d ON t.destination_id = d.id
      WHERE t.status = 'active'
    `
    const params: any[] = []

    if (destination) {
      query += ` AND (d.name LIKE ? OR d.country LIKE ? OR t.title LIKE ?)`
      params.push(`%${destination}%`, `%${destination}%`, `%${destination}%`)
    }

    if (minPrice) {
      query += ` AND t.price >= ?`
      params.push(Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      query += ` AND t.price <= ?`
      params.push(Number.parseFloat(maxPrice))
    }

    if (tourType) {
      query += ` AND t.tour_type = ?`
      params.push(tourType)
    }

    if (duration) {
      query += ` AND t.duration_days = ?`
      params.push(Number.parseInt(duration))
    }

    // Add ordering and pagination
    query += ` ORDER BY t.rating DESC, t.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const tours = await executeQuery(query, params)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM tours t
      LEFT JOIN destinations d ON t.destination_id = d.id
      WHERE t.status = 'active'
    `
    const countParams: any[] = []

    if (destination) {
      countQuery += ` AND (d.name LIKE ? OR d.country LIKE ? OR t.title LIKE ?)`
      countParams.push(`%${destination}%`, `%${destination}%`, `%${destination}%`)
    }

    if (minPrice) {
      countQuery += ` AND t.price >= ?`
      countParams.push(Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      countQuery += ` AND t.price <= ?`
      countParams.push(Number.parseFloat(maxPrice))
    }

    if (tourType) {
      countQuery += ` AND t.tour_type = ?`
      countParams.push(tourType)
    }

    if (duration) {
      countQuery += ` AND t.duration_days = ?`
      countParams.push(Number.parseInt(duration))
    }

    const countResult = (await executeQuery(countQuery, countParams)) as any[]
    const total = countResult[0].total
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      tours,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Tours API error:", error)
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      destination_id,
      description,
      duration_days,
      price,
      tour_type,
      image_url,
      max_participants,
      difficulty_level,
    } = body

    const query = `
      INSERT INTO tours (
        title, slug, destination_id, description, duration_days, 
        price, tour_type, image_url, max_participants, difficulty_level
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const params = [
      title,
      slug,
      destination_id,
      description,
      duration_days,
      price,
      tour_type,
      image_url,
      max_participants,
      difficulty_level,
    ]

    const result = await executeQuery(query, params)

    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error("Create tour error:", error)
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 })
  }
}
</merged_code>
