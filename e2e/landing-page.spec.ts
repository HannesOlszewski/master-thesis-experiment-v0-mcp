import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("has correct title and meta description", async ({ page }) => {
    await expect(page).toHaveTitle(/A Startup/)

    const description = await page.locator('meta[name="description"]').getAttribute("content")
    expect(description).toContain("web experiences")
  })

  test("header is sticky and visible on scroll", async ({ page }) => {
    const header = page.locator("header")
    await expect(header).toBeVisible()

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 1000))
    await expect(header).toBeVisible()
  })

  test("all main sections are present", async ({ page }) => {
    await expect(page.locator("#hero")).toBeVisible()
    await expect(page.locator("#features")).toBeVisible()
    await expect(page.locator("#about")).toBeVisible()
    await expect(page.locator("#testimonials")).toBeVisible()
    await expect(page.locator("#contact")).toBeVisible()
  })

  test("navigation links scroll to correct sections", async ({ page }) => {
    // Click on Features link
    await page.getByRole("button", { name: "Features" }).click()
    await page.waitForTimeout(1000) // Wait for smooth scroll

    // Check if Features section is in view
    const featuresSection = page.locator("#features")
    await expect(featuresSection).toBeInViewport()
  })

  test("Get Started button scrolls to contact section", async ({ page }) => {
    const getStartedButton = page.getByRole("button", { name: "Get Started" }).first()
    await getStartedButton.click()
    await page.waitForTimeout(1000)

    const contactSection = page.locator("#contact")
    await expect(contactSection).toBeInViewport()
  })

  test("mobile menu works correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.getByLabel("Toggle menu")
    await menuButton.click()

    // Check if mobile menu is visible
    await expect(page.getByRole("button", { name: "Home" })).toBeVisible()
  })

  test("footer links are present and clickable", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Privacy" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Terms" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Imprint" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Cookie Policy" })).toBeVisible()
  })

  test("cookie consent banner appears and can be dismissed", async ({ page, context }) => {
    // Clear storage to ensure banner shows
    await context.clearCookies()
    await page.evaluate(() => localStorage.clear())

    await page.reload()
    await page.waitForTimeout(500)

    // Check if banner is visible
    const banner = page.getByRole("dialog", { name: "Cookie consent" })
    await expect(banner).toBeVisible()

    // Accept cookies
    await page.getByRole("button", { name: "Accept" }).click()
    await expect(banner).not.toBeVisible()
  })

  test("images load correctly", async ({ page }) => {
    const logo = page.getByAltText("A Startup Logo").first()
    await expect(logo).toBeVisible()

    const heroImage = page.getByAltText("Digital transformation illustration")
    await expect(heroImage).toBeVisible()
  })

  test("contact information is visible and formatted correctly", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded()

    await expect(page.getByText("hello@astartup.com")).toBeVisible()
    await expect(page.getByText("+1 (555) 123-4567")).toBeVisible()
    await expect(page.getByText(/123 Innovation Street/)).toBeVisible()
  })
})
