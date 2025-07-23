import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let query = `
      SELECT 
        i.*,
        t.title as tour_title,
        d.name as destination_name
      FROM inquiries i
      LEFT JOIN tours t ON i.tour_id = t.id
      LEFT JOIN destinations d ON t.destination_id = d.id
      WHERE 1=1
    `
    const params: any[] = []

    if (status) {
      query += " AND i.status = ?"
      params.push(status)
    }

    query += " ORDER BY i.created_at DESC LIMIT ? OFFSET ?"
    params.push(limit, offset)

    const inquiries = await executeQuery(query, params)

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM inquiries WHERE 1=1"
    const countParams: any[] = []

    if (status) {
      countQuery += " AND status = ?"
      countParams.push(status)
    }

    const countResult = (await executeQuery(countQuery, countParams)) as any[]
    const total = countResult[0].total
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Inquiries API error:", error)
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tour_id, name, email, phone, message, adults, children, preferred_date } = body

    const query = `
      INSERT INTO inquiries (
        tour_id, name, email, phone, message, 
        adults, children, preferred_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `

    const params = [tour_id || null, name, email, phone, message, adults || 1, children || 0, preferred_date || null]

    const result = await executeQuery(query, params)

    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error("Create inquiry error:", error)
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
  }
}
