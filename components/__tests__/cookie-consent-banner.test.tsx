import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it("shows banner when no consent is stored", async () => {
    localStorage.getItem = vi.fn(() => null)
    render(<CookieConsentBanner />)

    await waitFor(() => {
      expect(screen.getByText(/We use localStorage/)).toBeDefined()
    })
  })

  it("does not show banner when consent is already stored", () => {
    localStorage.getItem = vi.fn(() => "accepted")
    render(<CookieConsentBanner />)

    expect(screen.queryByText(/We use localStorage/)).toBeNull()
  })

  it("stores acceptance when Accept button is clicked", async () => {
    localStorage.getItem = vi.fn(() => null)
    render(<CookieConsentBanner />)

    await waitFor(() => {
      const acceptButton = screen.getByText("Accept")
      fireEvent.click(acceptButton)
    })

    expect(localStorage.setItem).toHaveBeenCalledWith("cookie-consent", "accepted")
  })

  it("stores decline when Decline button is clicked", async () => {
    localStorage.getItem = vi.fn(() => null)
    render(<CookieConsentBanner />)

    await waitFor(() => {
      const declineButton = screen.getByText("Decline")
      fireEvent.click(declineButton)
    })

    expect(localStorage.setItem).toHaveBeenCalledWith("cookie-consent", "declined")
  })

  it("has proper ARIA attributes for accessibility", async () => {
    localStorage.getItem = vi.fn(() => null)
    const { container } = render(<CookieConsentBanner />)

    await waitFor(() => {
      const dialog = container.querySelector('[role="dialog"]')
      expect(dialog).toBeDefined()
      expect(dialog?.getAttribute("aria-live")).toBe("polite")
      expect(dialog?.getAttribute("aria-label")).toBe("Cookie consent")
    })
  })
})
