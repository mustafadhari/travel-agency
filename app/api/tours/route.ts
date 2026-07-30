import { NextResponse } from "next/server"
import { getTours, createTour } from "@/lib/tours-server"

export async function GET() {
  try {
    const tours = getTours()
    return NextResponse.json({ success: true, tours }, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      }
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const tour = createTour(body)
    return NextResponse.json({ success: true, tour })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
