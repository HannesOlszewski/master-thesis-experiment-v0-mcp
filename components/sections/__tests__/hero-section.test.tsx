import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroSection } from "@/components/sections/hero-section"

describe("HeroSection", () => {
  it("renders the main heading", () => {
    render(<HeroSection />)
    expect(screen.getByText("Transform Your Digital Presence")).toBeDefined()
  })

  it("renders the subtitle", () => {
    render(<HeroSection />)
    expect(screen.getByText(/We help businesses create stunning web experiences/)).toBeDefined()
  })

  it("renders both CTA buttons", () => {
    render(<HeroSection />)
    expect(screen.getByText("Get Started")).toBeDefined()
    expect(screen.getByText("Learn More")).toBeDefined()
  })

  it("renders the hero image with proper alt text", () => {
    render(<HeroSection />)
    const image = screen.getByAltText("Digital transformation illustration")
    expect(image).toBeDefined()
  })

  it("has proper section id for navigation", () => {
    const { container } = render(<HeroSection />)
    const section = container.querySelector("#hero")
    expect(section).toBeDefined()
  })
})
