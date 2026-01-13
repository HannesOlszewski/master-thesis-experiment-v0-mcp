import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Footer } from "@/components/footer"

describe("Footer", () => {
  it("renders the logo", () => {
    render(<Footer />)
    const logo = screen.getByAltText("A Startup Logo")
    expect(logo).toBeDefined()
  })

  it("renders the company slogan", () => {
    render(<Footer />)
    expect(screen.getByText("Transforming ideas into digital excellence")).toBeDefined()
  })

  it("renders all legal links", () => {
    render(<Footer />)
    expect(screen.getByText("Privacy")).toBeDefined()
    expect(screen.getByText("Terms")).toBeDefined()
    expect(screen.getByText("Imprint")).toBeDefined()
    expect(screen.getByText("Cookie Policy")).toBeDefined()
  })

  it("renders social media links with proper accessibility", () => {
    render(<Footer />)
    expect(screen.getByLabelText("Facebook")).toBeDefined()
    expect(screen.getByLabelText("Twitter")).toBeDefined()
    expect(screen.getByLabelText("LinkedIn")).toBeDefined()
    expect(screen.getByLabelText("Instagram")).toBeDefined()
    expect(screen.getByLabelText("GitHub")).toBeDefined()
  })

  it("renders copyright notice with current year", () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear} A Startup`))).toBeDefined()
  })

  it("has proper target and rel attributes on external links", () => {
    const { container } = render(<Footer />)
    const externalLinks = container.querySelectorAll('a[target="_blank"]')

    externalLinks.forEach((link) => {
      expect(link.getAttribute("rel")).toContain("noopener")
      expect(link.getAttribute("rel")).toContain("noreferrer")
    })
  })
})
