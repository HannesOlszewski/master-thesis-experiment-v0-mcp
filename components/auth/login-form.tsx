"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("keycloak", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  const isKeycloakConfigured = typeof window !== "undefined" && process.env.NEXT_PUBLIC_KEYCLOAK_CONFIGURED === "true"

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

        {!isKeycloakConfigured && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Setup Required:</strong> Please configure Keycloak environment variables in the Vars section to
              enable authentication.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-[#6B8E7F] hover:bg-[#5A7A6C] text-white"
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
