# A Startup - Digital Agency Landing Page

A modern, fully responsive landing page for a digital agency specializing in web and software development. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, accessible design with WCAG 2.2 AA compliance
- 📱 Fully responsive across mobile, tablet, and desktop
- ⚡ Optimized performance with Next.js 16
- 🧪 Comprehensive test coverage (80%+)
- 🔒 Security-focused implementation
- 🍪 Cookie consent management
- 📊 Analytics integration with Vercel Analytics
- ♿ Accessibility-first approach

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui with Radix UI primitives
- **Icons:** Lucide React
- **Testing:** Vitest + Playwright
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, pnpm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd a-startup-landing-page
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit/integration tests
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate test coverage report
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run e2e tests with Playwright UI
- `npm run test:all` - Run all tests with coverage

## Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── privacy/             # Privacy policy page
│   ├── terms/               # Terms of service page
│   ├── imprint/             # Imprint page
│   └── cookie-policy/       # Cookie policy page
├── components/              # React components
│   ├── header.tsx           # Sticky header with navigation
│   ├── footer.tsx           # Footer with links
│   ├── cookie-consent-banner.tsx
│   ├── subpage-layout.tsx   # Layout for legal pages
│   ├── sections/            # Landing page sections
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── about-section.tsx
│   │   ├── testimonials-section.tsx
│   │   └── contact-section.tsx
│   ├── ui/                  # shadcn/ui components
│   └── __tests__/           # Component tests
├── e2e/                     # End-to-end tests
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
│   └── images/              # Images (logo, hero, about)
├── vitest.config.ts         # Vitest configuration
├── playwright.config.ts     # Playwright configuration
└── README.md
```

## Testing

### Unit & Integration Tests

Run unit and integration tests with Vitest:

```bash
npm run test
```

View test coverage:

```bash
npm run test:coverage
```

The project maintains 80%+ code coverage across:
- Unit tests for all components
- Integration tests for user interactions
- Accessibility tests

### End-to-End Tests

Run e2e tests with Playwright:

```bash
npm run test:e2e
```

E2E tests cover:
- Full user journeys
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Mobile and desktop responsiveness
- Accessibility compliance

## Accessibility

This project follows WCAG 2.2 AA guidelines:

- Semantic HTML structure
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Responsive text sizing
- Focus indicators

## Content Management

All textual content is centralized in component files for easy updates:

- **Hero Section:** `components/sections/hero-section.tsx`
- **Features:** `components/sections/features-section.tsx`
- **About:** `components/sections/about-section.tsx`
- **Testimonials:** `components/sections/testimonials-section.tsx`
- **Contact:** `components/sections/contact-section.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

Build the project:

```bash
npm run build
```

The output will be in the `.next` directory. Serve it with:

```bash
npm run start
```

## CI/CD

The project includes GitHub Actions workflows for:

- Automated testing on pull requests
- Code quality checks
- Build verification
- Automated deployment

See `.github/workflows/` for configuration details.

## Security

- No sensitive data in client-side code
- Secure headers configured
- No cookies used (localStorage for consent only)
- Regular dependency updates
- Input sanitization where applicable

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

This project is proprietary and confidential.

## Support

For questions or support, contact:
- Email: hello@astartup.com
- Phone: +1 (555) 123-4567
