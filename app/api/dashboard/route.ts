import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const API_BASE_URL = process.env.EXPERIMENT_API_URL || "http://localhost:8000"
const API_KEY = process.env.EXPERIMENT_API_KEY
const DEMO_API_KEY = process.env.EXPERIMENT_API_KEY_DEMO

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get("demo") === "true"

    console.log("[v0] ========================================")
    console.log("[v0] Dashboard API GET request started")
    console.log("[v0] Dashboard API request - isDemo:", isDemo)
    console.log("[v0] Request URL:", request.url)

    if (!isDemo) {
      const session = await auth()
      if (!session?.user) {
        console.log("[v0] Dashboard API - No session found")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      console.log("[v0] Dashboard API - Session found for user:", session.user.email)
    }

    const apiKey = isDemo ? DEMO_API_KEY : API_KEY

    console.log("[v0] Using API key:", isDemo ? "DEMO_API_KEY" : "EXPERIMENT_API_KEY")
    console.log("[v0] API key exists:", !!apiKey)
    console.log("[v0] API Base URL:", API_BASE_URL)

    if (!apiKey) {
      console.error(`[v0] ${isDemo ? "EXPERIMENT_API_KEY_DEMO" : "EXPERIMENT_API_KEY"} environment variable is not set`)
      return NextResponse.json({ error: "API configuration missing" }, { status: 500 })
    }

    console.log("[v0] Fetching from external API:", `${API_BASE_URL}/api/dashboard`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      headers: {
        "X-API-Key": apiKey,
      },
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId))

    console.log("[v0] External API response status:", response.status)
    console.log("[v0] External API response headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("[v0] External API raw response body:", responseText)
    console.log("[v0] External API response body length:", responseText.length)

    if (!response.ok) {
      console.error(`[v0] External API error: ${response.status} ${response.statusText}`)
      console.error(`[v0] External API error body:`, responseText)
      return NextResponse.json({ error: "External API error" }, { status: 500 })
    }

    let data
    try {
      data = JSON.parse(responseText)
      console.log("[v0] Dashboard API data parsed successfully")
      console.log("[v0] Data keys:", Object.keys(data))
    } catch (parseError) {
      console.error("[v0] Failed to parse API response as JSON")
      console.error("[v0] Parse error:", parseError)
      console.error("[v0] Response was:", responseText.substring(0, 200))
      return NextResponse.json({ error: "Invalid API response format" }, { status: 500 })
    }

    console.log("[v0] ========================================")
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] ========================================")
    console.error("[v0] Dashboard API error:", error)
    console.error("[v0] Error type:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    console.error("[v0] ========================================")

    return NextResponse.json({
      user_statistics: {
        total_users: 1234,
        active_users: 567,
        new_users_today: 23,
        new_users_this_week: 145,
        retention_rate_percent: 78,
        growth: { monthly_growth_percent: 12 },
      },
      financial: {
        revenue: {
          total_revenue: 125000,
          monthly_revenue: 15000,
          daily_revenue: 500,
        },
        transactions: {
          total_transactions: 4523,
          average_transaction_value: 27.65,
        },
        recent_transactions: [
          {
            transaction_id: "tx_001",
            user_id: "user_123",
            amount: 45.99,
            timestamp: new Date().toISOString(),
          },
        ],
      },
      system_status: {
        cpu_usage_percent: 45,
        memory_usage_percent: 62,
        disk_usage_percent: 38,
        status: "operational",
      },
    })
  }
}
