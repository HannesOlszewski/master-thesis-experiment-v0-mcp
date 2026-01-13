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
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }
    }

    const apiKey = isDemo ? DEMO_API_KEY : API_KEY

    if (!apiKey) {
      console.error(`[v0] ${isDemo ? "EXPERIMENT_API_KEY_DEMO" : "EXPERIMENT_API_KEY"} environment variable is not set`)
      return new Response(JSON.stringify({ error: "API configuration missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const response = await fetch(`${API_BASE_URL}/api/events`, {
      headers: {
        "X-API-Key": apiKey,
        Accept: "text/event-stream",
      },
    })

    if (!response.ok) {
      console.error(`[v0] External API SSE error: ${response.status}`)
      return new Response(JSON.stringify({ error: "Failed to connect to event stream" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("[v0] Dashboard events API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
