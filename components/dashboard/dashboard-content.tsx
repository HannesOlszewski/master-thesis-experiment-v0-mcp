"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { User as NextAuthUser } from "next-auth"
import { LogOut, AlertCircle, TrendingUp, Users, DollarSign, Activity, Cpu, HardDrive, MemoryStick } from "lucide-react"
import useSWR from "swr"
import type { DashboardData, DashboardEvent } from "@/lib/types/dashboard"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface DashboardContentProps {
  user: NextAuthUser
  isDemo?: boolean
}

const fetcher = async (url: string) => {
  console.log("[v0] Fetching dashboard data from:", url)
  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    console.error("[v0] Dashboard API error:", json)
    throw new Error(json.error || "Failed to fetch dashboard data")
  }

  console.log("[v0] Dashboard data loaded successfully")
  return json
}

export function DashboardContent({ user, isDemo = false }: DashboardContentProps) {
  const router = useRouter()
  const [liveEvents, setLiveEvents] = useState<DashboardEvent[]>([])

  console.log("[v0] DashboardContent mounted - isDemo:", isDemo, "user:", user.email)

  const { data, error, isLoading } = useSWR<DashboardData>(
    isDemo ? "/api/dashboard?demo=true" : "/api/dashboard",
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      onError: (err) => {
        console.error("[v0] SWR error:", err)
      },
      shouldRetryOnError: false, // Don't auto-retry on error to avoid spam
    },
  )

  console.log("[v0] Dashboard state - isLoading:", isLoading, "hasData:", !!data, "hasError:", !!error)

  useEffect(() => {
    const eventsUrl = isDemo ? "/api/dashboard/events?demo=true" : "/api/dashboard/events"
    console.log("[v0] Connecting to EventSource:", eventsUrl)

    const eventSource = new EventSource(eventsUrl)

    eventSource.onopen = () => {
      console.log("[v0] EventSource connection opened")
    }

    eventSource.onmessage = (event) => {
      try {
        console.log("[v0] EventSource message received:", event.data)
        const eventData = JSON.parse(event.data)
        setLiveEvents((prev) => [{ event: event.type || "message", data: eventData }, ...prev.slice(0, 19)])
      } catch (err) {
        console.error("[v0] Failed to parse event data:", err)
      }
    }

    eventSource.onerror = (error) => {
      console.error("[v0] EventSource error:", error)
      eventSource.close()
    }

    return () => {
      console.log("[v0] Closing EventSource connection")
      eventSource.close()
    }
  }, [isDemo])

  const parsePercent = (value: string | number | undefined): number => {
    if (value === undefined || value === null) return 0
    if (typeof value === "number") return value
    return Number.parseFloat(value.replace("%", ""))
  }

  const handleLogout = async () => {
    if (isDemo) {
      localStorage.removeItem("demo_user")
      router.push("/")
    } else {
      await signOut({ callbackUrl: "/" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#D4E5D4] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#6B8E7F]">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Welcome back, {user.name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {isDemo && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Demo Mode:</strong> Viewing real data with demo credentials. Sign in with Keycloak for your
              personal data.
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">Loading dashboard data...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Error:</strong>{" "}
              {error.message ||
                "Failed to load dashboard data. Please check your API configuration and ensure environment variables are set correctly."}
            </AlertDescription>
          </Alert>
        )}

        {data && !error && (
          <>
            {/* User Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#6B8E7F]" />
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.user_statistics.total_users.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +{data.user_statistics.growth.monthly_growth_percent}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-600" />
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.user_statistics.active_users.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {data.user_statistics.retention_rate_percent}% retention rate
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${data.financial.revenue.total_revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${data.financial.revenue.revenue_this_month.toLocaleString()} this month
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    New Users Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.user_statistics.new_users_today}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {data.user_statistics.new_users_this_week.toLocaleString()} this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* System Status Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Real-time system resource monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-[#6B8E7F]" />
                      CPU Usage
                    </span>
                    <span className="font-medium">{data.system_health.cpu_usage}</span>
                  </div>
                  <Progress value={parsePercent(data.system_health.cpu_usage)} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <MemoryStick className="h-4 w-4 text-[#6B8E7F]" />
                      Memory Usage
                    </span>
                    <span className="font-medium">{data.system_health.memory_usage}</span>
                  </div>
                  <Progress value={parsePercent(data.system_health.memory_usage)} className="h-2" />
                </div>

                {data.system_health.disk_usage && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-[#6B8E7F]" />
                        Disk Usage
                      </span>
                      <span className="font-medium">{data.system_health.disk_usage}</span>
                    </div>
                    <Progress value={parsePercent(data.system_health.disk_usage)} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial Metrics and Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>Revenue and transaction metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Revenue</span>
                      <span className="font-semibold">${data.financial.revenue.total_revenue.toLocaleString()}</span>
                    </div>
                    <Separator />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Today's Revenue</span>
                      <span className="font-semibold">${data.financial.revenue.revenue_today.toLocaleString()}</span>
                    </div>
                    <Separator />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Transactions</span>
                      <span className="font-semibold">
                        {data.financial.revenue.total_transactions.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Transaction Value</span>
                      <span className="font-semibold">
                        ${data.financial.revenue.average_transaction_value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.financial.recent_transactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="text-sm font-medium">{tx.id}</p>
                          <p className="text-xs text-muted-foreground">{tx.user_id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">${tx.amount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Events Feed */}
            {liveEvents.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#6B8E7F]" />
                    Live Events
                  </CardTitle>
                  <CardDescription>Real-time updates from the event stream</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {liveEvents.map((event, idx) => (
                      <div key={idx} className="text-sm py-2 px-3 bg-muted rounded-md">
                        <span className="font-medium">{event.event}:</span>{" "}
                        {event.data.metric && `${event.data.metric} = ${event.data.value}`}
                        {event.data.status && `Status: ${event.data.status}`}
                        {event.data.transaction_id && `Transaction: ${event.data.transaction_id}`}
                        {event.data.amount && ` $${event.data.amount}`}
                        <span className="text-xs text-muted-foreground ml-2">
                          {event.data.timestamp && new Date(event.data.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
