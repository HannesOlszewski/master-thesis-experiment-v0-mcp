import { handlers } from "@/lib/auth"

export const runtime = "nodejs"

export async function GET(
  request: Request,
  context: { params: Promise<{ nextauth: string[] }> | { nextauth: string[] } },
) {
  try {
    console.log("[v0] NextAuth GET request:", request.url)
    // Await params if it's a Promise (Next.js 15+)
    const params = context.params instanceof Promise ? await context.params : context.params
    console.log("[v0] NextAuth params:", params)

    const response = await handlers.GET(request, context)
    console.log("[v0] NextAuth GET response status:", response.status)
    return response
  } catch (error) {
    console.error("[v0] NextAuth GET error:", error)

    if (request.url.includes("/session")) {
      console.log("[v0] Returning empty session due to error")
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({
        error: "AuthenticationError",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ nextauth: string[] }> | { nextauth: string[] } },
) {
  try {
    console.log("[v0] NextAuth POST request:", request.url)
    // Await params if it's a Promise (Next.js 15+)
    const params = context.params instanceof Promise ? await context.params : context.params
    console.log("[v0] NextAuth params:", params)

    const response = await handlers.POST(request, context)
    console.log("[v0] NextAuth POST response status:", response.status)
    return response
  } catch (error) {
    console.error("[v0] NextAuth POST error:", error)
    return new Response(
      JSON.stringify({
        error: "AuthenticationError",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
