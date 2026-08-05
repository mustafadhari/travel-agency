"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { BarChart, PieChart, LineChart, Activity, TrendingUp, TrendingDown, Search, Plus } from "lucide-react"

export function AIMonitoringDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [metrics, setMetrics] = useState({
    citationRate: 0,
    platformPerformance: {}
  })
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch metrics
        const metricsResponse = await fetch('/api/ai-monitoring?action=metrics')
        const metricsData = await metricsResponse.json()
        setMetrics(metricsData)

        // Fetch queries
        const queriesResponse = await fetch('/api/ai-monitoring?action=queries')
        const queriesData = await queriesResponse.json()
        setQueries(queriesData.queries || [])

        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch AI monitoring data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getPlatformColor = (platform: string) => {
    const colors = {
      'chatgpt': 'bg-green-500',
      'perplexity': 'bg-purple-500',
      'google-ai': 'bg-blue-500',
      'bing-copilot': 'bg-orange-500'
    }
    return colors[platform] || 'bg-gray-500'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">AI Citation Monitoring</h1>
      <p className="text-gray-500 mb-8">Track EasyOurTour brand mentions across AI platforms</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="queries">Target Queries</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Overall Citation Rate */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Citation Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.citationRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Percentage of queries where EasyOurTour was cited
                </p>
              </CardContent>
            </Card>

            {/* Platform Performance */}
            <Card className="md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-3">
                  {Object.entries(metrics.platformPerformance).map(([platform, rate]) => (
                    <div key={platform} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform)} mr-3`} />
                      <div className="flex-1 text-sm">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </div>
                      <div className="text-sm font-medium">{rate}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Total Queries</span>
                      <span className="font-medium">{queries.length}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>High Priority</span>
                      <span className="font-medium">{queries.filter(q => q.priority === 'high').length}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Platforms Monitored</span>
                      <span className="font-medium">{Object.keys(metrics.platformPerformance).length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Breakdown */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Platform Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-48">
                  <PieChart className="h-32 w-32 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Visual representation of citation distribution across platforms
                </p>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Check
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queries.slice(0, 5).map((query: any) => (
                    <div key={query.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`w-2 h-8 rounded-full mt-1 ${getPlatformColor(query.platform)}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm">{query.query}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            query.priority === 'high' ? 'bg-red-100 text-red-700' :
                            query.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {query.priority}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {query.category} • {query.platform}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last checked: {query.lastChecked ? new Date(query.lastChecked).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="queries">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Target Queries</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Query
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left text-sm font-medium">Query</th>
                      <th className="p-3 text-left text-sm font-medium">Platform</th>
                      <th className="p-3 text-left text-sm font-medium">Category</th>
                      <th className="p-3 text-left text-sm font-medium">Priority</th>
                      <th className="p-3 text-left text-sm font-medium">Last Checked</th>
                      <th className="p-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.map((query: any) => (
                      <tr key={query.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm">{query.query}</td>
                        <td className="p-3 text-sm">
                          <span className={`inline-flex items-center gap-1`}>
                            <div className={`w-2 h-2 rounded-full ${getPlatformColor(query.platform)}`} />
                            {query.platform}
                          </span>
                        </td>
                        <td className="p-3 text-sm">{query.category}</td>
                        <td className="p-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            query.priority === 'high' ? 'bg-red-100 text-red-700' :
                            query.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {query.priority}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          {query.lastChecked ? new Date(query.lastChecked).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="p-3 text-sm">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Search className="h-3 w-3 mr-1" /> Check
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">August 2026 Report</h4>
                      <p className="text-sm text-muted-foreground">First full month of monitoring</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <LineChart className="h-48 w-full text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check Frequency</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Notification Preferences</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Email alerts for new citations</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Slack notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Google Search Console</h4>
                      <p className="text-sm text-muted-foreground">Connect for search performance data</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Slack</h4>
                      <p className="text-sm text-muted-foreground">Receive alerts in your workspace</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AIMonitoringDashboard