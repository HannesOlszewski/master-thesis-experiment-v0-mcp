import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { LoginForm } from "@/components/auth/login-form"

vi.mock("next-auth/react")

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear localStorage
    localStorage.clear()
  })

  it("renders the login form", () => {
    render(<LoginForm />)
    expect(screen.getByText("Sign in to your account")).toBeDefined()
  })

  it("shows demo mode button", () => {
    render(<LoginForm />)
    expect(screen.getByText("Continue with Demo Mode")).toBeDefined()
  })

  it("enables demo mode when clicking demo button", async () => {
    render(<LoginForm />)
    const demoButton = screen.getByText("Continue with Demo Mode")

    fireEvent.click(demoButton)

    await waitFor(() => {
      const demoUser = localStorage.getItem("demo-user")
      expect(demoUser).toBeTruthy()
    })
  })

  it("shows loading state during authentication", async () => {
    render(<LoginForm />)
    const keycloakButton = screen.getByText("Sign in with Keycloak")

    fireEvent.click(keycloakButton)

    expect(keycloakButton).toHaveAttribute("disabled")
  })

  it("has proper accessibility attributes", () => {
    render(<LoginForm />)
    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading).toBeDefined()
  })
})
