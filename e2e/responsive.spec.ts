import { test, expect } from "@playwright/test"

test.describe("Responsive Design", () => {
  const viewports = [
    { name: "Mobile", width: 375, height: 667 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Desktop", width: 1920, height: 1080 },
  ]

  for (const viewport of viewports) {
    test(`landing page renders correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto("/")

      await expect(page.locator("header")).toBeVisible()
      await expect(page.locator("#hero")).toBeVisible()
      await expect(page.locator("footer")).toBeVisible()
    })

    test(`navigation works on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto("/")

      if (viewport.width < 768) {
        // Mobile: use hamburger menu
        await page.getByLabel("Toggle menu").click()
        await expect(page.getByRole("button", { name: "Features" })).toBeVisible()
      } else {
        // Desktop/Tablet: navigation visible
        await expect(page.getByRole("button", { name: "Features" })).toBeVisible()
      }
    })
  }

  test("images are responsive", async ({ page }) => {
    await page.goto("/")

    // Check mobile
    await page.setViewportSize({ width: 375, height: 667 })
    const mobileImg = page.getByAltText("Digital transformation illustration")
    await expect(mobileImg).toBeVisible()

    // Check desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(mobileImg).toBeVisible()
  })
})
