// AI Citation Monitoring for EasyOurTour
// Tracks brand mentions across AI platforms

import fs from 'fs'
import path from 'path'

const MONITORING_DIR = path.join(process.cwd(), 'data', 'ai-monitoring')
const QUERIES_FILE = path.join(MONITORING_DIR, 'target-queries.json')
const RESULTS_FILE = path.join(MONITORING_DIR, 'citation-results.json')

export interface AITargetQuery {
  id: string
  query: string
  platform: 'chatgpt' | 'perplexity' | 'google-ai' | 'bing-copilot'
  category: string
  priority: 'high' | 'medium' | 'low'
  addedAt: string
  lastChecked?: string
}

export interface AICitationResult {
  id: string
  queryId: string
  platform: string
  date: string
  cited: boolean
  brandMention?: string
  context?: string
  url?: string
  notes?: string
}

export interface AIMonitoringReport {
  period: string
  totalQueries: number
  totalCitations: number
  byPlatform: Record<string, { checked: number; cited: number }>
  byCategory: Record<string, { checked: number; cited: number }>
  topPerformingQueries: Array<{ query: string; citations: number }>
}

// Ensure monitoring directory exists
function ensureMonitoringDir() {
  if (!fs.existsSync(MONITORING_DIR)) {
    fs.mkdirSync(MONITORING_DIR, { recursive: true })
  }
}

// Initialize default data files
function initializeMonitoringData() {
  ensureMonitoringDir()

  if (!fs.existsSync(QUERIES_FILE)) {
    const initialQueries: AITargetQuery[] = [
      {
        id: 'query_1',
        query: 'best time to visit Kerala',
        platform: 'chatgpt',
        category: 'destination',
        priority: 'high',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_2',
        query: 'luxury Rajasthan tour',
        platform: 'chatgpt',
        category: 'experience',
        priority: 'high',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_3',
        query: 'budget international trips from India',
        platform: 'perplexity',
        category: 'budget',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_4',
        query: 'hidden gems in Himachal Pradesh',
        platform: 'google-ai',
        category: 'destination',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_5',
        query: 'solo female travel India',
        platform: 'chatgpt',
        category: 'safety',
        priority: 'high',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_6',
        query: 'monsoon travel destinations India',
        platform: 'perplexity',
        category: 'seasonal',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_7',
        query: 'North vs South India travel',
        platform: 'google-ai',
        category: 'comparison',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_8',
        query: 'best adventure activities in India',
        platform: 'bing-copilot',
        category: 'adventure',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_9',
        query: 'luxury travel experiences India',
        platform: 'chatgpt',
        category: 'luxury',
        priority: 'high',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_10',
        query: 'family travel destinations India',
        platform: 'perplexity',
        category: 'family',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_11',
        query: 'cultural experiences in Rajasthan',
        platform: 'google-ai',
        category: 'culture',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_12',
        query: 'best time to visit Goa',
        platform: 'bing-copilot',
        category: 'destination',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_13',
        query: 'eco-friendly travel India',
        platform: 'chatgpt',
        category: 'sustainable',
        priority: 'medium',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_14',
        query: 'honeymoon destinations India',
        platform: 'perplexity',
        category: 'honeymoon',
        priority: 'high',
        addedAt: new Date().toISOString()
      },
      {
        id: 'query_15',
        query: 'best trekking routes Himalayas',
        platform: 'google-ai',
        category: 'adventure',
        priority: 'high',
        addedAt: new Date().toISOString()
      }
    ]

    fs.writeFileSync(QUERIES_FILE, JSON.stringify(initialQueries, null, 2))
  }

  if (!fs.existsSync(RESULTS_FILE)) {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify([], null, 2))
  }
}

// Target query management
export function getTargetQueries(): AITargetQuery[] {
  initializeMonitoringData()
  const raw = fs.readFileSync(QUERIES_FILE, 'utf-8')
  return JSON.parse(raw) as AITargetQuery[]
}

export function addTargetQuery(queryData: Omit<AITargetQuery, 'id' | 'addedAt'>): AITargetQuery {
  const queries = getTargetQueries()

  const query: AITargetQuery = {
    id: `query_${Date.now()}`,
    addedAt: new Date().toISOString(),
    ...queryData
  }

  queries.push(query)
  fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2))

  return query
}

export function updateQueryCheck(queryId: string): AITargetQuery | null {
  const queries = getTargetQueries()
  const index = queries.findIndex(q => q.id === queryId)

  if (index !== -1) {
    queries[index].lastChecked = new Date().toISOString()
    fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2))
    return queries[index]
  }

  return null
}

// Citation result management
export function getCitationResults(): AICitationResult[] {
  initializeMonitoringData()
  const raw = fs.readFileSync(RESULTS_FILE, 'utf-8')
  return JSON.parse(raw) as AICitationResult[]
}

export function recordCitation(resultData: Omit<AICitationResult, 'id'>): AICitationResult {
  const results = getCitationResults()

  const result: AICitationResult = {
    id: `result_${Date.now()}`,
    ...resultData
  }

  results.push(result)
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2))

  return result
}

export function getCitationsByQuery(queryId: string): AICitationResult[] {
  return getCitationResults().filter(r => r.queryId === queryId)
}

export function getCitationsByPlatform(platform: string): AICitationResult[] {
  return getCitationResults().filter(r => r.platform === platform)
}

// Monitoring and reporting
export function generateMonthlyReport(year: number, month: number): AIMonitoringReport {
  const results = getCitationResults()
  const queries = getTargetQueries()

  // Filter results for the specified month
  const monthlyResults = results.filter(result => {
    const date = new Date(result.date)
    return date.getFullYear() === year && date.getMonth() === month - 1
  })

  // Calculate statistics
  const byPlatform: Record<string, { checked: number; cited: number }> = {}
  const byCategory: Record<string, { checked: number; cited: number }> = {}

  // Initialize platform stats
  ['chatgpt', 'perplexity', 'google-ai', 'bing-copilot'].forEach(platform => {
    byPlatform[platform] = { checked: 0, cited: 0 }
  })

  // Count queries by category
  queries.forEach(query => {
    if (!byCategory[query.category]) {
      byCategory[query.category] = { checked: 0, cited: 0 }
    }
    byCategory[query.category].checked++
  })

  // Process results
  monthlyResults.forEach(result => {
    byPlatform[result.platform].checked++
    if (result.cited) {
      byPlatform[result.platform].cited++
    }

    const query = queries.find(q => q.id === result.queryId)
    if (query && query.category) {
      byCategory[query.category].checked++
      if (result.cited) {
        byCategory[query.category].cited++
      }
    }
  })

  // Top performing queries
  const queryPerformance: Record<string, number> = {}
  queries.forEach(query => {
    const citations = monthlyResults.filter(r => r.queryId === query.id && r.cited).length
    if (citations > 0) {
      queryPerformance[query.query] = citations
    }
  })

  const topQueries = Object.entries(queryPerformance)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([query, citations]) => ({ query, citations }))

  return {
    period: `${new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}`,
    totalQueries: queries.length,
    totalCitations: monthlyResults.filter(r => r.cited).length,
    byPlatform,
    byCategory,
    topPerformingQueries: topQueries
  }
}

export function getCitationRate(): number {
  const results = getCitationResults()
  const totalChecks = results.length
  const totalCitations = results.filter(r => r.cited).length

  return totalChecks > 0 ? (totalCitations / totalChecks) * 100 : 0
}

export function getPlatformPerformance(): Record<string, number> {
  const results = getCitationResults()
  const platforms = ['chatgpt', 'perplexity', 'google-ai', 'bing-copilot']

  const performance: Record<string, number> = {}
  platforms.forEach(platform => {
    const platformResults = results.filter(r => r.platform === platform)
    const citationRate = platformResults.length > 0
      ? (platformResults.filter(r => r.cited).length / platformResults.length) * 100
      : 0
    performance[platform] = parseFloat(citationRate.toFixed(1))
  })

  return performance
}

// Initialize monitoring system
initializeMonitoringData()