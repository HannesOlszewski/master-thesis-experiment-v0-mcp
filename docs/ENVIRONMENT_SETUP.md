# Environment Variables Setup

This application requires several environment variables to be configured for authentication to work properly.

## Required Environment Variables

### 1. NEXTAUTH_SECRET

This is a required secret key used to encrypt JWT tokens and secure your authentication system.

**How to generate:**

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

**In v0:**
1. Click on the **Vars** section in the in-chat sidebar
2. Add a new variable:
   - Name: `NEXTAUTH_SECRET`
   - Value: Your generated secret (e.g., `your-secret-key-here`)

### 2. NEXTAUTH_URL

The base URL of your application.

**In v0:**
- For development/preview: This is automatically set by v0
- For production: Set to your production domain (e.g., `https://yourdomain.com`)

**In v0:**
1. Click on the **Vars** section in the in-chat sidebar
2. Add a new variable:
   - Name: `NEXTAUTH_URL`
   - Value: Your app URL (automatically provided by v0 in preview)

### 3. Keycloak Configuration (Required for OAuth)

These variables connect your app to your Keycloak instance:

#### KEYCLOAK_CLIENT_ID
Your Keycloak client identifier

**In v0:**
1. Click on the **Vars** section in the in-chat sidebar
2. Add a new variable:
   - Name: `KEYCLOAK_CLIENT_ID`
   - Value: Your Keycloak client ID (from Keycloak admin console)

#### KEYCLOAK_CLIENT_SECRET
Your Keycloak client secret

**In v0:**
1. Click on the **Vars** section in the in-chat sidebar
2. Add a new variable:
   - Name: `KEYCLOAK_CLIENT_SECRET`
   - Value: Your Keycloak client secret (from Keycloak admin console)

#### KEYCLOAK_ISSUER
Your Keycloak issuer URL

Format: `https://your-keycloak-domain/realms/your-realm-name`

**In v0:**
1. Click on the **Vars** section in the in-chat sidebar
2. Add a new variable:
   - Name: `KEYCLOAK_ISSUER`
   - Value: Your complete Keycloak issuer URL

## Quick Setup in v0

1. **Open the in-chat sidebar** on the left side of your screen
2. **Click on "Vars"** section
3. **Add each environment variable** one by one:

| Variable Name | Example Value | Required |
|---------------|---------------|----------|
| `NEXTAUTH_SECRET` | `abc123...` (32+ char random string) | ✅ Yes |
| `NEXTAUTH_URL` | Auto-set by v0 | ✅ Yes |
| `KEYCLOAK_CLIENT_ID` | `my-app-client` | ✅ Yes |
| `KEYCLOAK_CLIENT_SECRET` | `secret123...` | ✅ Yes |
| `KEYCLOAK_ISSUER` | `https://keycloak.example.com/realms/myrealm` | ✅ Yes |

## Testing Without Keycloak

If you don't have a Keycloak instance set up yet, you can:

1. Set up a free Keycloak instance using:
   - [Keycloak on Docker](https://www.keycloak.org/getting-started/getting-started-docker)
   - [Cloud providers with Keycloak](https://www.keycloak.org/guides)

2. Or temporarily disable authentication by removing the middleware protection (not recommended for production)

## Verification

After setting all environment variables:

1. Restart your development server (if running locally)
2. Navigate to `/login`
3. Click "Sign in with Keycloak"
4. You should be redirected to your Keycloak login page

If you see errors, double-check:
- All variables are set correctly
- No extra spaces in variable values
- KEYCLOAK_ISSUER ends with `/realms/your-realm-name`
- Your Keycloak client has the correct redirect URIs configured

## Need Help?

Refer to `docs/AUTH_SETUP.md` for detailed Keycloak configuration instructions.
