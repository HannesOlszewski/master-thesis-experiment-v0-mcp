"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { User as NextAuthUser } from "next-auth"

interface ProfileContentProps {
  user: NextAuthUser
}

export function ProfileContent({ user }: ProfileContentProps) {
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#D4E5D4] p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-[#6B8E7F]">Profile</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="text-4xl bg-[#6B8E7F] text-white">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{user.name || "User"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Account Information
              </h3>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">User ID</span>
                  <span className="text-muted-foreground">{user.id || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Email</span>
                  <span className="text-muted-foreground">{user.email || "N/A"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Name</span>
                  <span className="text-muted-foreground">{user.name || "N/A"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
