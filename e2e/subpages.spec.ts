import { test, expect } from "@playwright/test"

test.describe("Subpages", () => {
  test("Privacy page loads and displays content", async ({ page }) => {
    await page.goto("/privacy")

    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible()
    await expect(page.getByText(/Introduction/)).toBeVisible()
    await expect(page.getByText(/Information We Collect/)).toBeVisible()
  })

  test("Terms page loads and displays content", async ({ page }) => {
    await page.goto("/terms")

    await expect(page).toHaveTitle(/Terms of Service/)
    await expect(page.getByRole("heading", { name: "Terms of Service" })).toBeVisible()
    await expect(page.getByText(/Agreement to Terms/)).toBeVisible()
  })

  test("Imprint page loads and displays content", async ({ page }) => {
    await page.goto("/imprint")

    await expect(page).toHaveTitle(/Imprint/)
    await expect(page.getByRole("heading", { name: "Imprint" })).toBeVisible()
    await expect(page.getByText(/Company Information/)).toBeVisible()
  })

  test("Cookie Policy page loads and displays content", async ({ page }) => {
    await page.goto("/cookie-policy")

    await expect(page).toHaveTitle(/Cookie Policy/)
    await expect(page.getByRole("heading", { name: "Cookie Policy" })).toBeVisible()
    await expect(page.getByText(/What Are Cookies/)).toBeVisible()
  })

  test("subpages have header and footer", async ({ page }) => {
    await page.goto("/privacy")

    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()
  })

  test("navigation from footer links works", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: "Privacy" }).click()
    await expect(page).toHaveURL("/privacy")

    await page.goBack()
    await page.getByRole("link", { name: "Terms" }).click()
    await expect(page).toHaveURL("/terms")
  })
})
