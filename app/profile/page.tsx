"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ProfileContent } from "@/components/profile/profile-content"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [demoUser, setDemoUser] = useState<any>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      const demoUserData = localStorage.getItem("demo_user")
      if (demoUserData) {
        setDemoUser(JSON.parse(demoUserData))
      } else {
        router.push("/login")
      }
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#D4E5D4] flex items-center justify-center">
        <p className="text-lg text-[#6B8E7F]">Loading...</p>
      </div>
    )
  }

  const user = session?.user || demoUser

  if (!user) {
    return null
  }

  return <ProfileContent user={user} isDemo={!!demoUser} />
}
