import { NextResponse } from 'next/server'
import {
  getTargetQueries,
  addTargetQuery,
  recordCitation,
  generateMonthlyReport,
  getCitationRate,
  getPlatformPerformance
} from '@/lib/ai-monitoring'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  try {
    switch (action) {
      case 'queries':
        const queries = getTargetQueries()
        return NextResponse.json({ success: true, queries })

      case 'report':
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
        const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString())
        const report = generateMonthlyReport(year, month)
        return NextResponse.json({ success: true, report })

      case 'metrics':
        const citationRate = getCitationRate()
        const platformPerformance = getPlatformPerformance()
        return NextResponse.json({ success: true, citationRate, platformPerformance })

      default:
        return NextResponse.json(
          { success: true, message: 'AI Monitoring API' },
          { status: 200 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'add-query':
        const newQuery = addTargetQuery(data)
        return NextResponse.json(
          { success: true, query: newQuery },
          { status: 201 }
        )

      case 'record-citation':
        const citation = recordCitation(data)
        return NextResponse.json(
          { success: true, citation },
          { status: 201 }
        )

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('AI Monitoring error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}