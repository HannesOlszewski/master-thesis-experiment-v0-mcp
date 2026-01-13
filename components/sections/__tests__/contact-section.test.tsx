import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContactSection } from "@/components/sections/contact-section"

describe("ContactSection", () => {
  it("renders the section heading", () => {
    render(<ContactSection />)
    expect(screen.getByText("Get In Touch")).toBeDefined()
  })

  it("renders all contact methods", () => {
    render(<ContactSection />)
    expect(screen.getByText("Email")).toBeDefined()
    expect(screen.getByText("Phone")).toBeDefined()
    expect(screen.getByText("Address")).toBeDefined()
  })

  it("renders contact information with proper links", () => {
    render(<ContactSection />)
    expect(screen.getByText("hello@astartup.com")).toBeDefined()
    expect(screen.getByText("+1 (555) 123-4567")).toBeDefined()
    expect(screen.getByText("123 Innovation Street, Tech City, TC 12345")).toBeDefined()
  })

  it("has proper href attributes for contact links", () => {
    const { container } = render(<ContactSection />)
    const emailLink = container.querySelector('a[href="mailto:hello@astartup.com"]')
    const phoneLink = container.querySelector('a[href="tel:+15551234567"]')

    expect(emailLink).toBeDefined()
    expect(phoneLink).toBeDefined()
  })

  it("has proper section id for navigation", () => {
    const { container } = render(<ContactSection />)
    const section = container.querySelector("#contact")
    expect(section).toBeDefined()
  })
})
