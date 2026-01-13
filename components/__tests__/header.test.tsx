import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Header } from "@/components/header"

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the logo", () => {
    render(<Header />)
    const logo = screen.getByAltText("A Startup Logo")
    expect(logo).toBeDefined()
  })

  it("renders all navigation links", () => {
    render(<Header />)
    expect(screen.getByText("Home")).toBeDefined()
    expect(screen.getByText("Features")).toBeDefined()
    expect(screen.getByText("About")).toBeDefined()
    expect(screen.getByText("Testimonials")).toBeDefined()
    expect(screen.getByText("Contact")).toBeDefined()
  })

  it("renders Get Started button", () => {
    render(<Header />)
    const buttons = screen.getAllByText("Get Started")
    expect(buttons.length).toBeGreaterThan(0)
  })

  it("toggles mobile menu when menu button is clicked", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Toggle menu")

    fireEvent.click(menuButton)

    // Mobile menu should now be visible with navigation items
    const mobileNavLinks = screen.getAllByText("Home")
    expect(mobileNavLinks.length).toBeGreaterThan(1) // Desktop + mobile
  })

  it("has proper ARIA attributes", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Toggle menu")
    expect(menuButton.getAttribute("aria-expanded")).toBe("false")
  })
})
