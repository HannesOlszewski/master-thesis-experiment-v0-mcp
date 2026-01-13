import { test, expect } from "@playwright/test"

test.describe("Accessibility", () => {
  test("landing page has proper heading hierarchy", async ({ page }) => {
    await page.goto("/")

    const h1 = await page.locator("h1").count()
    expect(h1).toBeGreaterThan(0)

    const h2s = await page.locator("h2").all()
    expect(h2s.length).toBeGreaterThan(0)
  })

  test("all images have alt text", async ({ page }) => {
    await page.goto("/")

    const images = await page.locator("img").all()
    for (const img of images) {
      const alt = await img.getAttribute("alt")
      expect(alt).toBeTruthy()
    }
  })

  test("links have accessible names", async ({ page }) => {
    await page.goto("/")

    const links = await page.locator("a").all()
    for (const link of links) {
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute("aria-label")

      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test("buttons have accessible names", async ({ page }) => {
    await page.goto("/")

    const buttons = await page.locator("button").all()
    for (const button of buttons) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute("aria-label")

      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test("keyboard navigation works", async ({ page }) => {
    await page.goto("/")

    // Tab through elements
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")

    const focusedElement = await page.locator(":focus")
    await expect(focusedElement).toBeVisible()
  })

  test("mobile menu is keyboard accessible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")

    const menuButton = page.getByLabel("Toggle menu")
    await menuButton.focus()
    await page.keyboard.press("Enter")

    await expect(page.getByRole("button", { name: "Home" })).toBeVisible()
  })
})
