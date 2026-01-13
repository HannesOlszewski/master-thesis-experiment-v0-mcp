"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg sm:p-6"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              We use localStorage to remember your cookie preferences. No tracking cookies are currently used on this
              site.{" "}
              <a href="/cookie-policy" className="underline underline-offset-4 hover:text-primary">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDecline} variant="outline" size="sm">
              Decline
            </Button>
            <Button onClick={handleAccept} size="sm">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
