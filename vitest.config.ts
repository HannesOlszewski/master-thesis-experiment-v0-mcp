import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.tsx"], // Updated to use .tsx extension
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "vitest.setup.tsx", // Updated to match new filename
        "vitest.config.ts",
        "playwright.config.ts",
        "**/*.config.{js,ts}",
        "**/types.ts",
        "**/*.d.ts",
        "tests/",
        "e2e/",
        "lib/auth.ts",
        "app/api/**/*",
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})
