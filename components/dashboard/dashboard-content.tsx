"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Mail, AlertCircle } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { User as NextAuthUser } from "next-auth"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DashboardContentProps {
  user: NextAuthUser
  isDemo?: boolean
}

export function DashboardContent({ user, isDemo = false }: DashboardContentProps) {
  const router = useRouter()

  const handleLogout = async () => {
    if (isDemo) {
      localStorage.removeItem("demo_user")
      router.push("/")
    } else {
      await signOut({ callbackUrl: "/" })
    }
  }

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#D4E5D4] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#6B8E7F]">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {isDemo && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Demo Mode:</strong> You're viewing a demo of the dashboard. Deploy to Vercel to enable full OAuth
              authentication with Keycloak.
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your {isDemo ? "demo" : "authenticated"} user details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="text-xl bg-[#6B8E7F] text-white">{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">{user.name || "User"}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[#6B8E7F]" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{user.name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#6B8E7F]" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email || "Not provided"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
            <CardDescription>
              {isDemo
                ? "This is a demo showing how the dashboard works"
                : "You have successfully authenticated with Keycloak"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is a protected page that requires authentication. You can now access all protected resources and
              features of the application.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
