import { NextResponse } from "next/server"

export async function GET() {
  const config = {
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasKeycloakClientId: !!process.env.KEYCLOAK_CLIENT_ID,
    hasKeycloakClientSecret: !!process.env.KEYCLOAK_CLIENT_SECRET,
    hasKeycloakIssuer: !!process.env.KEYCLOAK_ISSUER,
    isConfigured:
      !!process.env.KEYCLOAK_CLIENT_ID && !!process.env.KEYCLOAK_CLIENT_SECRET && !!process.env.KEYCLOAK_ISSUER,
  }

  return NextResponse.json(config)
}
