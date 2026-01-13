import { auth } from "@/lib/auth"

const API_BASE_URL = process.env.EXPERIMENT_API_URL || "http://localhost:8000"
const API_KEY = process.env.EXPERIMENT_API_KEY
const DEMO_API_KEY = process.env.EXPERIMENT_API_KEY_DEMO

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get("demo") === "true"

    console.log("[v0] ========================================")
    console.log("[v0] Dashboard Events API GET request started")
    console.log("[v0] Events API request - isDemo:", isDemo)

    if (!isDemo) {
      const session = await auth()
      if (!session?.user) {
        console.log("[v0] Events API - No session found")
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }
      console.log("[v0] Events API - Session found for user:", session.user.email)
    }

    const apiKey = isDemo ? DEMO_API_KEY : API_KEY

    console.log("[v0] Using API key (first 10 chars):", apiKey?.substring(0, 10) || "MISSING")
    console.log("[v0] API key exists:", !!apiKey)
    console.log("[v0] API Base URL:", API_BASE_URL)

    if (!apiKey) {
      console.error(`[v0] ${isDemo ? "EXPERIMENT_API_KEY_DEMO" : "EXPERIMENT_API_KEY"} environment variable is not set`)
      console.log("[v0] ========================================")
      return new Response(JSON.stringify({ error: "API configuration missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] Connecting to external SSE:", `${API_BASE_URL}/api/events`)

    const response = await fetch(`${API_BASE_URL}/api/events`, {
      headers: {
        "X-API-Key": apiKey,
        Accept: "text/event-stream",
      },
    })

    console.log("[v0] External API SSE response status:", response.status)
    console.log("[v0] External API SSE response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[v0] External API SSE error: ${response.status}`)
      console.error(`[v0] External API SSE error body:`, errorText)
      console.log("[v0] ========================================")
      return new Response(JSON.stringify({ error: "Failed to connect to event stream" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] SSE connection established successfully")
    console.log("[v0] ========================================")

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("[v0] ========================================")
    console.error("[v0] Dashboard events API error:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    console.error("[v0] ========================================")
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
