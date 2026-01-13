# OAuth2 Authentication Setup Guide

This application uses NextAuth.js v5 with Keycloak as the OAuth2 provider for authentication.

## Prerequisites

- A running Keycloak instance
- Admin access to Keycloak

## Keycloak Configuration

### 1. Create a Realm (if not exists)

1. Log in to your Keycloak admin console
2. Create a new realm or use an existing one
3. Note the realm name for the issuer URL

### 2. Create a Client

1. Navigate to **Clients** in your realm
2. Click **Create client**
3. Set the following:
   - **Client type**: OpenID Connect
   - **Client ID**: Choose a unique ID (e.g., `a-startup-app`)
   - Click **Next**

### 3. Configure Client Settings

1. **Client authentication**: Turn ON (this makes it a confidential client)
2. **Authorization**: OFF (not needed for standard authentication)
3. **Authentication flow**: Check the following:
   - Standard flow
   - Direct access grants
4. Click **Next**

### 4. Set Valid Redirect URIs

Add the following URIs (adjust for your domains):

**Development:**
\`\`\`
http://localhost:3000/api/auth/callback/keycloak
http://localhost:3000/*
\`\`\`

**Production:**
\`\`\`
https://your-domain.com/api/auth/callback/keycloak
https://your-domain.com/*
\`\`\`

5. **Web origins**: Add `+` or your specific domains
6. Click **Save**

### 5. Get Client Credentials

1. Go to the **Credentials** tab
2. Copy the **Client secret**
3. You'll need both the Client ID and Client secret for your `.env` file

### 6. Configure User Attributes (Optional)

If you want additional user information:

1. Navigate to **Client scopes**
2. Click on your client's dedicated scope
3. Add mappers for email, profile, etc.

## Environment Configuration

Create a `.env.local` file in your project root:

\`\`\`env
# Keycloak Configuration
KEYCLOAK_CLIENT_ID=your-client-id
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=https://your-keycloak-domain/realms/your-realm-name

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
\`\`\`

### Generate NEXTAUTH_SECRET

Run this command in your terminal:

\`\`\`bash
openssl rand -base64 32
\`\`\`

## Application Structure

### Authentication Files

- `auth.config.ts` - NextAuth configuration
- `auth.ts` - NextAuth instance with Keycloak provider
- `middleware.ts` - Route protection middleware
- `app/api/auth/[...nextauth]/route.ts` - API route handler

### Protected Routes

The following routes require authentication:
- `/dashboard` - User dashboard
- `/profile` - User profile page

### Public Routes

- `/` - Landing page
- `/login` - Login page
- `/auth/error` - Authentication error page
- `/privacy`, `/terms`, `/imprint`, `/cookie-policy` - Legal pages

## Testing Authentication

1. Start your development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Navigate to `http://localhost:3000`

3. Click **Sign In** in the header

4. You'll be redirected to Keycloak login

5. After successful authentication, you'll be redirected to the dashboard

## Features

### JWT Strategy

- Sessions are stored as JWT tokens
- Access tokens are included in the session
- Automatic token refresh on expiration

### User Information

The session includes:
- User ID
- Email
- Name
- Profile image (if available)
- Access token (for API calls)
- ID token (for identity verification)

### Protected Pages

Use the middleware to automatically protect routes. Pages under `/dashboard` and `/profile` require authentication.

### User Interface Components

- **UserButton** - Dropdown menu with profile and logout
- **LoginForm** - Keycloak OAuth login button
- **DashboardContent** - Protected dashboard UI
- **ProfileContent** - User profile display

## API Usage

### Getting the Session (Server Component)

\`\`\`tsx
import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  
  if (!session?.user) {
    // Handle unauthenticated state
  }
  
  return <div>Hello {session.user.name}</div>
}
\`\`\`

### Getting the Session (Client Component)

\`\`\`tsx
"use client"
import { useSession } from "next-auth/react"

export function Component() {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <div>Loading...</div>
  }
  
  if (!session) {
    return <div>Not authenticated</div>
  }
  
  return <div>Hello {session.user.name}</div>
}
\`\`\`

### Sign Out

\`\`\`tsx
import { signOut } from "next-auth/react"

await signOut({ callbackUrl: "/" })
\`\`\`

## Troubleshooting

### Redirect URI Mismatch

- Ensure your redirect URIs in Keycloak exactly match your application URLs
- Check for trailing slashes
- Verify the realm name in the issuer URL

### Invalid Client Credentials

- Double-check the client ID and secret
- Ensure the client authentication is enabled in Keycloak
- Verify the issuer URL format

### Session Not Persisting

- Check that NEXTAUTH_SECRET is set
- Verify cookies are enabled in the browser
- Check NEXTAUTH_URL matches your current domain

### CORS Issues

- Add your application domain to Web origins in Keycloak
- Use `+` to allow all origins for the redirect URIs

## Security Best Practices

1. **Never commit secrets**: Use `.env.local` for sensitive data
2. **Use HTTPS in production**: Set secure cookie flags
3. **Rotate secrets regularly**: Update NEXTAUTH_SECRET periodically
4. **Implement PKCE**: Already enabled by default in NextAuth.js
5. **Validate tokens**: Tokens are automatically validated by NextAuth.js

## Production Deployment

1. Update environment variables with production values
2. Set NEXTAUTH_URL to your production domain
3. Update Keycloak redirect URIs with production URLs
4. Enable HTTPS (required for secure cookies)
5. Set up proper CORS policies in Keycloak

## Additional Resources

- [NextAuth.js Documentation](https://authjs.dev)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [OAuth 2.0 Specification](https://oauth.net/2/)
