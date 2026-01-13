import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const API_BASE_URL = process.env.EXPERIMENT_API_URL || "https://localhost:8000"
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

    console.log("[v0] Incoming request headers:")
    request.headers.forEach((value, key) => {
      console.log(`[v0]   ${key}: ${value}`)
    })

    if (!isDemo) {
      const session = await auth()
      if (!session?.user) {
        console.log("[v0] Dashboard API - No session found")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      console.log("[v0] Dashboard API - Session found for user:", session.user.email)
    }

    const apiKey = isDemo ? DEMO_API_KEY : API_KEY

    console.log("[v0] Using API key (first 10 chars):", apiKey?.substring(0, 10) || "MISSING")
    console.log("[v0] API Base URL:", API_BASE_URL)

    if (!apiKey) {
      console.error(`[v0] ${isDemo ? "EXPERIMENT_API_KEY_DEMO" : "EXPERIMENT_API_KEY"} environment variable is not set`)
      return NextResponse.json({ error: "API configuration missing" }, { status: 500 })
    }

    console.log("[v0] Fetching from external API:", `${API_BASE_URL}/api/dashboard`)

    const cleanHeaders = new Headers({
      "X-API-Key": apiKey,
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible)",
    })

    console.log("[v0] Outgoing request headers:")
    cleanHeaders.forEach((value, key) => {
      console.log(`[v0]   ${key}: ${value}`)
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
      headers: cleanHeaders,
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId))

    console.log("[v0] External API response status:", response.status)
    console.log("[v0] External API response headers:")
    response.headers.forEach((value, key) => {
      console.log(`[v0]   ${key}: ${value}`)
    })

    const responseText = await response.text()
    console.log("[v0] External API raw response body:", responseText)

    if (!response.ok) {
      console.error(`[v0] External API error: ${response.status} ${response.statusText}`)
      return NextResponse.json({ error: "External API error" }, { status: 500 })
    }

    let data
    try {
      data = JSON.parse(responseText)
      console.log("[v0] Dashboard API data parsed successfully")
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
    console.error("[v0] ========================================")

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
