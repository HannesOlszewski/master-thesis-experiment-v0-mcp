import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"

interface SubpageLayoutProps {
  title: string
  children: ReactNode
}

export function SubpageLayout({ title, children }: SubpageLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-balance text-4xl font-bold tracking-tight">{title}</h1>
          <div className="prose prose-gray max-w-none dark:prose-invert">{children}</div>
        </div>
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  )
}
