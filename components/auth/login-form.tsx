"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")
  const [isLoading, setIsLoading] = useState(false)
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)
  const [configDetails, setConfigDetails] = useState<any>(null)

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const response = await fetch("/api/config-check")
        const config = await response.json()
        setConfigDetails(config)
        setIsConfigured(config.isConfigured)
      } catch (err) {
        console.error("[v0] Config check failed:", err)
        setIsConfigured(false)
      }
    }
    checkConfig()
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("keycloak", {
        callbackUrl: "/dashboard",
        redirect: true,
      })

      if (result?.error) {
        console.error("[v0] Login error:", result.error)
      }
    } catch (error) {
      console.error("[v0] Login exception:", error)
    } finally {
      // Don't set loading to false if redirecting
      // setIsLoading(false)
    }
  }

  const handleDemoMode = () => {
    setIsLoading(true)
    // Simulate successful authentication in demo mode
    localStorage.setItem(
      "demo_user",
      JSON.stringify({
        name: "Demo User",
        email: "demo@astartup.com",
        image: null,
      }),
    )
    router.push("/dashboard")
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <Image src="/images/logo.png" alt="A Startup Logo" width={120} height={40} className="h-10 w-auto" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-800">
            <strong>v0 Preview Limitation:</strong> External OAuth2 authentication requires stable redirect URLs and
            won't work in the v0 preview environment. Use Demo Mode below to test the UI, or deploy to Vercel for full
            OAuth functionality.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error === "OAuthAccountNotLinked"
                ? "This email is already associated with another account."
                : error === "Configuration"
                  ? "Authentication is not properly configured. Please set up your environment variables."
                  : `An error occurred during sign in: ${error}`}
            </AlertDescription>
          </Alert>
        )}

        {isConfigured === false && configDetails && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <strong>Setup Required:</strong> Configure these environment variables in the Vars section to enable
              OAuth:
              <ul className="list-disc list-inside text-xs mt-2 space-y-1">
                {!configDetails.hasNextAuthSecret && <li>NEXTAUTH_SECRET</li>}
                {!configDetails.hasKeycloakClientId && <li>KEYCLOAK_CLIENT_ID</li>}
                {!configDetails.hasKeycloakClientSecret && <li>KEYCLOAK_CLIENT_SECRET</li>}
                {!configDetails.hasKeycloakIssuer && <li>KEYCLOAK_ISSUER</li>}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {isConfigured === true && (
          <Alert className="bg-green-50 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Ready:</strong> Environment variables configured. OAuth will work after deployment to Vercel.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Button onClick={handleDemoMode} className="w-full bg-[#6B8E7F] hover:bg-[#5A7A6C] text-white" size="lg">
            {isLoading ? "Loading..." : "Continue in Demo Mode"}
          </Button>

          <Button
            onClick={handleLogin}
            disabled={isLoading || isConfigured === false}
            variant="outline"
            className="w-full disabled:opacity-50 bg-transparent"
            size="lg"
          >
            Sign in with Keycloak (Deploy Required)
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  )
}
