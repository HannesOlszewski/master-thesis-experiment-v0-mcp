import { NextResponse } from "next/server"

export async function GET() {
  // Diagnostic endpoint to check if environment variables are loaded
  const config = {
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasKeycloakClientId: !!process.env.KEYCLOAK_CLIENT_ID,
    hasKeycloakClientSecret: !!process.env.KEYCLOAK_CLIENT_SECRET,
    hasKeycloakIssuer: !!process.env.KEYCLOAK_ISSUER,
    isConfigured:
      !!process.env.KEYCLOAK_CLIENT_ID && !!process.env.KEYCLOAK_CLIENT_SECRET && !!process.env.KEYCLOAK_ISSUER,
  }

  console.log("[v0] Config check:", config)

  return NextResponse.json(config)
}
