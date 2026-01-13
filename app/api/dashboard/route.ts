import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const API_BASE_URL = process.env.EXPERIMENT_API_URL || "http://localhost:8000"
const API_KEY = process.env.EXPERIMENT_API_KEY

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!API_KEY) {
      console.error("[v0] EXPERIMENT_API_KEY environment variable is not set")
      return NextResponse.json({ error: "API configuration missing" }, { status: 500 })
    }

    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      headers: {
        "X-API-Key": API_KEY,
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
