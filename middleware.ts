import { auth } from "@/lib/auth"

export default auth((req) => {
  // req.auth contains the authenticated user information
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
