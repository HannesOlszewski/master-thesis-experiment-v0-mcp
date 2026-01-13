import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AboutSection } from "@/components/sections/about-section"

describe("AboutSection", () => {
  it("renders the section with correct id", () => {
    const { container } = render(<AboutSection />)
    const section = container.querySelector("#about")
    expect(section).toBeDefined()
  })

  it("renders the heading", () => {
    render(<AboutSection />)
    expect(screen.getByText("About A Startup")).toBeDefined()
  })

  it("renders the description text", () => {
    render(<AboutSection />)
    expect(screen.getByText(/passionate team of developers/)).toBeDefined()
  })

  it("renders all highlight items", () => {
    render(<AboutSection />)
    expect(screen.getByText("10+ years of combined experience")).toBeDefined()
    expect(screen.getByText("100+ successful projects delivered")).toBeDefined()
    expect(screen.getByText("Expertise in modern web technologies")).toBeDefined()
    expect(screen.getByText("Agile development methodology")).toBeDefined()
    expect(screen.getByText("Client-focused approach")).toBeDefined()
  })

  it("renders the about image with correct alt text", () => {
    render(<AboutSection />)
    const image = screen.getByAltText("Our team at work")
    expect(image).toBeDefined()
  })
})
