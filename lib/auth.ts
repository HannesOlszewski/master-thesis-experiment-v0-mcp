import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"
import type { NextAuthConfig } from "next-auth"

const isKeycloakConfigured = !!(
  process.env.KEYCLOAK_CLIENT_ID &&
  process.env.KEYCLOAK_CLIENT_SECRET &&
  process.env.KEYCLOAK_ISSUER
)

const providers = []

if (isKeycloakConfigured) {
  providers.push(
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  )
}

const authConfig: NextAuthConfig = {
  basePath: "/api/auth",
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnProfile = nextUrl.pathname.startsWith("/profile")

      if (isOnDashboard || isOnProfile) {
        if (isLoggedIn) return true
        return false
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.accessToken = token.accessToken as string
        session.idToken = token.idToken as string
        session.error = token.error as string | undefined
      }

      return session
    },
  },
  providers,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-please-change-in-production-min-32-chars-long",
  useSecureCookies: process.env.NODE_ENV === "production",
  trustHost: true,
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)

export const isAuthConfigured = isKeycloakConfigured
