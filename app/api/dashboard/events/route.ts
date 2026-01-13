import { auth } from "@/lib/auth"

const API_BASE_URL = process.env.EXPERIMENT_API_URL || "http://localhost:8000"
const API_KEY = process.env.EXPERIMENT_API_KEY

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!API_KEY) {
      console.error("[v0] EXPERIMENT_API_KEY environment variable is not set")
      return new Response(JSON.stringify({ error: "API configuration missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const response = await fetch(`${API_BASE_URL}/api/events`, {
      headers: {
        "X-API-Key": API_KEY,
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
