import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { UserButton } from "@/components/auth/user-button"
import { useSession, signOut } from "next-auth/react"

vi.mock("next-auth/react")

describe("UserButton", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it("renders user button with OAuth user", () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: {
          name: "Test User",
          email: "test@example.com",
          image: null,
        },
        expires: "",
      },
      status: "authenticated",
      update: vi.fn(),
    })

    render(<UserButton />)
    expect(screen.getByText("TU")).toBeDefined() // Initials
  })

  it("renders user button with demo user", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    })

    localStorage.setItem("demo-user", JSON.stringify({ name: "Demo User" }))

    render(<UserButton />)
    expect(screen.getByText("DU")).toBeDefined() // Demo initials
  })

  it("opens dropdown menu when clicked", () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { name: "Test User", email: "test@example.com" },
        expires: "",
      },
      status: "authenticated",
      update: vi.fn(),
    })

    render(<UserButton />)
    const button = screen.getByRole("button")

    fireEvent.click(button)

    expect(screen.getByText("Dashboard")).toBeDefined()
    expect(screen.getByText("Logout")).toBeDefined()
  })

  it("calls signOut when logout is clicked", async () => {
    const mockSignOut = vi.fn()
    vi.mocked(signOut).mockImplementation(mockSignOut)
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { name: "Test User", email: "test@example.com" },
        expires: "",
      },
      status: "authenticated",
      update: vi.fn(),
    })

    render(<UserButton />)
    const button = screen.getByRole("button")
    fireEvent.click(button)

    const logoutButton = screen.getByText("Logout")
    fireEvent.click(logoutButton)

    expect(mockSignOut).toHaveBeenCalled()
  })

  it("returns null when no user is authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    })

    const { container } = render(<UserButton />)
    expect(container.firstChild).toBeNull()
  })
})
