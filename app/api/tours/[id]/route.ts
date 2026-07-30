import { NextResponse } from "next/server"
import { updateTour, deleteTour } from "@/lib/tours-server"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = updateTour(Number(id), body)
    if (!updated) {
      return NextResponse.json({ success: false, error: "Tour not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, tour: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const success = deleteTour(Number(id))
    if (!success) {
      return NextResponse.json({ success: false, error: "Tour not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
