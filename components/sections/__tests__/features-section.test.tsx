import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FeaturesSection } from "@/components/sections/features-section"

describe("FeaturesSection", () => {
  it("renders the section heading", () => {
    render(<FeaturesSection />)
    expect(screen.getByText("Our Features")).toBeDefined()
  })

  it("renders the section subtitle", () => {
    render(<FeaturesSection />)
    expect(screen.getByText(/Discover what makes us the perfect partner/)).toBeDefined()
  })

  it("renders all feature cards", () => {
    render(<FeaturesSection />)
    expect(screen.getByText("Custom Development")).toBeDefined()
    expect(screen.getByText("Modern Design")).toBeDefined()
    expect(screen.getByText("Fast Performance")).toBeDefined()
    expect(screen.getByText("Security First")).toBeDefined()
    expect(screen.getByText("Dedicated Support")).toBeDefined()
    expect(screen.getByText("Scalable Solutions")).toBeDefined()
  })

  it("has proper section id for navigation", () => {
    const { container } = render(<FeaturesSection />)
    const section = container.querySelector("#features")
    expect(section).toBeDefined()
  })

  it("renders feature descriptions", () => {
    render(<FeaturesSection />)
    expect(screen.getByText(/Tailored web and software solutions/)).toBeDefined()
    expect(screen.getByText(/Beautiful, intuitive interfaces/)).toBeDefined()
  })
})
