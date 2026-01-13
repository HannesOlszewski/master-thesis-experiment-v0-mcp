# A Startup - Digital Agency Landing Page

A modern, fully responsive landing page for a digital agency specializing in web and software development. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS with OAuth2 authentication via Keycloak.

## Features

- 🎨 Modern, accessible design with WCAG 2.2 AA compliance
- 📱 Fully responsive across mobile, tablet, and desktop
- ⚡ Optimized performance with Next.js 16
- 🔐 OAuth2 authentication with Keycloak (NextAuth.js v5)
- 📊 Real-time dashboard with live data from external API
- 🎭 Demo mode for testing without OAuth setup
- 🧪 Comprehensive test coverage (80%+)
- 🔒 Security-focused implementation
- 🍪 Cookie consent management
- ♿ Accessibility-first approach

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui with Radix UI primitives
- **Authentication:** NextAuth.js v5 with Keycloak provider
- **Data Fetching:** SWR for efficient caching
- **Real-time:** Server-Sent Events (SSE)
- **Icons:** Lucide React
- **Testing:** Vitest + Playwright
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, pnpm, yarn, or bun
- (Optional) Keycloak instance for OAuth2 authentication
- (Optional) Access to master-thesis-experiment-api

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

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# OAuth Configuration (Optional - for production auth)
NEXTAUTH_SECRET=your-secret-here
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=https://your-keycloak-domain/realms/your-realm
NEXTAUTH_URL=http://localhost:3000

# External API Configuration (Optional - for dashboard data)
EXPERIMENT_API_URL=https://your-api-domain.com
EXPERIMENT_API_KEY=your-api-key-here
EXPERIMENT_API_KEY_DEMO=your-demo-api-key-here
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Dashboard Features

The dashboard displays real-time data from the master-thesis-experiment-api:

- **User Statistics:** Total users, active users, growth metrics
- **Financial Metrics:** Revenue, transactions, daily/monthly breakdowns
- **System Status:** CPU, memory, disk usage with progress bars
- **Live Events:** Real-time SSE stream showing system updates
- **Recent Transactions:** Latest financial activities

### Demo Mode vs OAuth Mode

**Demo Mode:**
- Click "Continue in Demo Mode" on the login page
- Connects to API using `EXPERIMENT_API_KEY_DEMO`
- Shows real data from the API (demo dataset)
- No OAuth configuration required
- Perfect for v0 preview and testing

**OAuth Mode:**
- Sign in with Keycloak credentials
- Connects to API using `EXPERIMENT_API_KEY`
- Shows personalized user data
- Full authentication and session management
- Requires stable domain for OAuth redirects

## Authentication

### Demo Mode (v0 Preview)

The application includes a **Demo Mode** that works in the v0 preview environment without requiring OAuth setup:

- Click "Continue in Demo Mode" on the login page
- Access dashboard and profile pages with a simulated user
- Dashboard connects to real API with demo credentials
- Perfect for testing the UI and user flows

### OAuth2 with Keycloak (Production)

For production deployment with real authentication:

1. Set up a Keycloak instance
2. Configure a client in Keycloak with valid redirect URIs
3. Add environment variables to your deployment (Vercel, etc.)
4. See `docs/AUTH_SETUP.md` for detailed configuration instructions

**Note:** External OAuth2 authentication requires stable redirect URLs and won't work fully in the v0 preview environment due to dynamic preview URLs. Deploy to Vercel or another hosting platform for full OAuth functionality.

### Protected Routes

- `/dashboard` - User dashboard (requires authentication or demo mode)
- `/profile` - User profile page (requires authentication or demo mode)
- `/login` - Login page with OAuth and demo mode options

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
│   ├── layout.tsx           # Root layout with SessionProvider
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── dashboard/           # Protected dashboard page
│   ├── profile/             # Protected profile page
│   ├── auth/                # Auth error pages
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth API routes
│   │   ├── config-check/    # Config validation endpoint
│   │   └── dashboard/       # Dashboard API proxy routes
│   ├── privacy/             # Privacy policy page
│   ├── terms/               # Terms of service page
│   ├── imprint/             # Imprint page
│   └── cookie-policy/       # Cookie policy page
├── components/              # React components
│   ├── header.tsx           # Sticky header with auth state
│   ├── footer.tsx           # Footer with links
│   ├── cookie-consent-banner.tsx
│   ├── subpage-layout.tsx   # Layout for legal pages
│   ├── auth/                # Authentication components
│   │   ├── login-form.tsx   # Login form with OAuth & demo mode
│   │   ├── session-provider.tsx # NextAuth session provider
│   │   └── user-button.tsx  # User menu dropdown
│   ├── dashboard/           # Dashboard components
│   │   └── dashboard-content.tsx
│   ├── profile/             # Profile components
│   │   └── profile-content.tsx
│   ├── sections/            # Landing page sections
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── about-section.tsx
│   │   ├── testimonials-section.tsx
│   │   └── contact-section.tsx
│   ├── ui/                  # shadcn/ui components
│   └── __tests__/           # Component tests
├── lib/                     # Utility functions
│   ├── auth.ts              # NextAuth configuration
│   └── types/               # TypeScript type definitions
│       └── dashboard.ts     # Dashboard data types
├── docs/                    # Documentation
│   ├── AUTH_SETUP.md        # Keycloak setup guide
│   ├── API_INTEGRATION.md   # API integration guide
│   ├── ARCHITECTURE.md      # Technical architecture
│   ├── CONTENT_GUIDE.md     # Content management
│   └── ENVIRONMENT_SETUP.md # Environment configuration
├── e2e/                     # End-to-end tests
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
│   └── images/              # Images (logo, hero, about)
├── proxy.ts                 # Next.js 16 middleware (replaces middleware.ts)
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
3. Add environment variables in project settings
4. Vercel will automatically detect Next.js and configure the build
5. Deploy!

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

- OAuth2 authentication with Keycloak
- JWT-based session management
- Secure HTTP-only cookies
- API keys stored server-side only
- Separate credentials for demo and production modes
- No sensitive data in client-side code
- Secure headers configured
- CSRF protection enabled
- Regular dependency updates
- Input sanitization where applicable

## Environment Variables

The following environment variables are supported:

### Required for OAuth Authentication
- `NEXTAUTH_SECRET` - Secret for encrypting JWT tokens
- `KEYCLOAK_CLIENT_ID` - Keycloak client ID
- `KEYCLOAK_CLIENT_SECRET` - Keycloak client secret
- `KEYCLOAK_ISSUER` - Keycloak realm URL

### Required for Dashboard Data
- `EXPERIMENT_API_URL` - Base URL of the external API
- `EXPERIMENT_API_KEY` - API key for authenticated users
- `EXPERIMENT_API_KEY_DEMO` - API key for demo mode users

### Optional
- `NEXTAUTH_URL` - Base URL for NextAuth (auto-detected in most cases)

Set these in the **Vars** section of the v0 in-chat sidebar or in your deployment platform's environment variable settings.

## Documentation

- [AUTH_SETUP.md](docs/AUTH_SETUP.md) - Keycloak configuration guide
- [API_INTEGRATION.md](docs/API_INTEGRATION.md) - External API integration
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical architecture overview
- [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) - Content management guide
- [ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md) - Environment variables

## License

This project is proprietary and confidential.

## Support

For questions or support, contact:
- Email: hello@astartup.com
- Phone: +1 (555) 123-4567
