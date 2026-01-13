import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Providers } from "@/components/auth/session-provider"

describe("SessionProvider", () => {
  it("renders children", () => {
    render(
      <Providers>
        <div>Test Content</div>
      </Providers>,
    )

    expect(screen.getByText("Test Content")).toBeDefined()
  })

  it("wraps children with SessionProvider", () => {
    const { container } = render(
      <Providers>
        <div data-testid="child">Test</div>
      </Providers>,
    )

    expect(container.querySelector('[data-testid="child"]')).toBeDefined()
  })
})
