import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { ProfileContent } from "@/components/profile/profile-content"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return <ProfileContent user={session.user} />
}
