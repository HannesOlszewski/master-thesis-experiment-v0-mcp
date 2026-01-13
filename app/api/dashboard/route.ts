import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const API_BASE_URL = process.env.EXPERIMENT_API_URL || "http://localhost:8000"
const API_KEY = process.env.EXPERIMENT_API_KEY
const DEMO_API_KEY = process.env.EXPERIMENT_API_KEY_DEMO

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get("demo") === "true"

    if (!isDemo) {
      const session = await auth()
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const apiKey = isDemo ? DEMO_API_KEY : API_KEY

    if (!apiKey) {
      console.error(`[v0] ${isDemo ? "EXPERIMENT_API_KEY_DEMO" : "EXPERIMENT_API_KEY"} environment variable is not set`)
      return NextResponse.json({ error: "API configuration missing" }, { status: 500 })
    }

    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      headers: {
        "X-API-Key": apiKey,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`[v0] External API error: ${response.status} ${response.statusText}`)
      return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Dashboard API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
