import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"
import { authConfig } from "./auth.config"

const providers = []

if (process.env.KEYCLOAK_CLIENT_ID && process.env.KEYCLOAK_CLIENT_SECRET && process.env.KEYCLOAK_ISSUER) {
  providers.push(
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  )
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET || "development-secret-change-in-production",
  providers,
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
})

export const isAuthConfigured = providers.length > 0
