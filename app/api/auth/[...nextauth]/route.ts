import { handlers } from "@/lib/auth"
import { NextResponse } from "next/server"

const wrappedHandlers = {
  GET: async (req: Request) => {
    try {
      return await handlers.GET(req)
    } catch (error) {
      console.error("[v0] Auth GET error:", error)
      return NextResponse.json({ error: "Authentication not configured" }, { status: 200 })
    }
  },
  POST: async (req: Request) => {
    try {
      return await handlers.POST(req)
    } catch (error) {
      console.error("[v0] Auth POST error:", error)
      return NextResponse.json({ error: "Authentication not configured" }, { status: 200 })
    }
  },
}

export const { GET, POST } = wrappedHandlers
