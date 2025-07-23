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
        b.*,
        t.title as tour_title,
        t.price as tour_price,
        d.name as destination_name
      FROM bookings b
      LEFT JOIN tours t ON b.tour_id = t.id
      LEFT JOIN destinations d ON t.destination_id = d.id
      WHERE 1=1
    `
    const params: any[] = []

    if (status) {
      query += " AND b.status = ?"
      params.push(status)
    }

    query += " ORDER BY b.created_at DESC LIMIT ? OFFSET ?"
    params.push(limit, offset)

    const bookings = await executeQuery(query, params)

    // Get total count
    let countQuery = "SELECT COUNT(*) as total FROM bookings WHERE 1=1"
    const countParams: any[] = []

    if (status) {
      countQuery += " AND status = ?"
      countParams.push(status)
    }

    const countResult = (await executeQuery(countQuery, countParams)) as any[]
    const total = countResult[0].total
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Bookings API error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tour_id,
      guest_name,
      guest_email,
      guest_phone,
      adults,
      children,
      booking_date,
      total_amount,
      special_requests,
    } = body

    const query = `
      INSERT INTO bookings (
        tour_id, guest_name, guest_email, guest_phone, 
        adults, children, booking_date, total_amount, special_requests
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const params = [
      tour_id,
      guest_name,
      guest_email,
      guest_phone,
      adults || 1,
      children || 0,
      booking_date,
      total_amount,
      special_requests,
    ]

    const result = await executeQuery(query, params)

    return NextResponse.json({ success: true, id: (result as any).insertId })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
