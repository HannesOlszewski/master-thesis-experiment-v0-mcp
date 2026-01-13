import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

describe("TestimonialsSection", () => {
  it("renders the section with correct id", () => {
    const { container } = render(<TestimonialsSection />)
    const section = container.querySelector("#testimonials")
    expect(section).toBeDefined()
  })

  it("renders the heading", () => {
    render(<TestimonialsSection />)
    expect(screen.getByText("What Our Clients Say")).toBeDefined()
  })

  it("renders all testimonials", () => {
    render(<TestimonialsSection />)
    expect(screen.getByText("Sarah Johnson")).toBeDefined()
    expect(screen.getByText("Michael Chen")).toBeDefined()
    expect(screen.getByText("Emily Rodriguez")).toBeDefined()
    expect(screen.getByText("David Kim")).toBeDefined()
  })

  it("renders testimonial roles", () => {
    render(<TestimonialsSection />)
    expect(screen.getByText("CEO, TechVentures")).toBeDefined()
    expect(screen.getByText("Founder, InnovateLab")).toBeDefined()
  })

  it("renders testimonial content", () => {
    render(<TestimonialsSection />)
    expect(screen.getByText(/transformed our outdated website/)).toBeDefined()
  })

  it("displays 5-star ratings for all testimonials", () => {
    render(<TestimonialsSection />)
    const ratingLabels = screen.getAllByLabelText(/Rating: 5 out of 5 stars/)
    expect(ratingLabels.length).toBe(4)
  })
})
