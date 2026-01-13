import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const API_BASE_URL = process.env.EXPERIMENT_API_URL || "http://localhost:8000"
const API_KEY = process.env.EXPERIMENT_API_KEY
const DEMO_API_KEY = process.env.EXPERIMENT_API_KEY_DEMO

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get("demo") === "true"

    console.log("[v0] Dashboard API request - isDemo:", isDemo)

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

    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      headers: {
        "X-API-Key": apiKey,
      },
      cache: "no-store",
    })

    console.log("[v0] External API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[v0] External API error: ${response.status} ${response.statusText}`)
      console.error(`[v0] External API error body:`, errorText)
      return NextResponse.json(
        { error: "Failed to fetch dashboard data", details: errorText },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("[v0] Dashboard API data received successfully")
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Dashboard API error:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
