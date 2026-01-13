"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const [isLoading, setIsLoading] = useState(false)
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)
  const [configDetails, setConfigDetails] = useState<any>(null)

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const response = await fetch("/api/auth/config-check")
        const config = await response.json()
        console.log("[v0] Config check result:", config)
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
      await signIn("keycloak", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("[v0] Login error:", error)
      setIsLoading(false)
    }
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
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error === "OAuthAccountNotLinked"
                ? "This email is already associated with another account."
                : error === "Configuration"
                  ? "Authentication is not properly configured. Please set up your environment variables."
                  : "An error occurred during sign in. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {isConfigured === false && configDetails && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <strong>Setup Required:</strong> Please configure the following environment variables in the Vars section:
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
              <strong>Ready:</strong> Authentication is configured. You can now sign in.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleLogin}
          disabled={isLoading || isConfigured === false}
          className="w-full bg-[#6B8E7F] hover:bg-[#5A7A6C] text-white disabled:opacity-50"
          size="lg"
        >
          {isLoading ? "Signing in..." : "Sign in with Keycloak"}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  )
}
