# API Integration Guide

## Overview

The dashboard integrates with the `master-thesis-experiment-api` to display real-time data and metrics. The integration follows security best practices by keeping API credentials server-side only.

## Architecture

### Server-Side Proxy Routes

API credentials are never exposed to the browser. All external API calls are proxied through Next.js API routes:

- **GET /api/dashboard** - Fetches dashboard data
- **GET /api/dashboard/events** - SSE stream for live updates

Both endpoints support a `?demo=true` query parameter for demo mode with separate credentials.

### Client-Side Data Fetching

The dashboard uses **SWR** for efficient data fetching with:
- Automatic revalidation
- Cache management
- Error handling
- Loading states

### Real-Time Updates

Live events are streamed via **Server-Sent Events (SSE)**:
- Connection established to `/api/dashboard/events`
- Events are displayed in real-time feed
- Automatic reconnection on connection loss

## Authentication Modes

### OAuth Mode (Production)
- Uses `EXPERIMENT_API_KEY` for API authentication
- Requires Keycloak authentication
- Access to personalized user data

### Demo Mode (Preview/Testing)
- Uses `EXPERIMENT_API_KEY_DEMO` for API authentication
- No OAuth required - uses localStorage
- Access to sample/demo data from the API
- Perfect for v0 preview environment

## Environment Variables

Configure these variables in your deployment:

```bash
# External API Configuration
EXPERIMENT_API_URL=https://api-domain.com      # Base URL of the external API (MUST use HTTPS)
EXPERIMENT_API_KEY=your-api-key-here           # API key for authenticated users
EXPERIMENT_API_KEY_DEMO=your-demo-api-key-here # API key for demo mode users
```

**Important:** The `EXPERIMENT_API_URL` must use HTTPS. The external API will reject HTTP connections with "Invalid request, only https is supported".

## API Endpoints

### Dashboard Data Endpoint

**GET /api/dashboard**
**GET /api/dashboard?demo=true** (for demo mode)

Returns comprehensive dashboard metrics including:
- User statistics (total, active, growth)
- Financial data (revenue, transactions)
- System status (CPU, memory, disk)

### Events Stream Endpoint

**GET /api/dashboard/events**
**GET /api/dashboard/events?demo=true** (for demo mode)

Server-Sent Events stream providing real-time updates:
- `dashboard_update` events - Metric updates
- `system_status` events - System health updates

## Data Structure

See `lib/types/dashboard.ts` for complete TypeScript definitions.

## Security Considerations

- API keys stored in environment variables only
- All external API calls made server-side
- Authentication required for production routes
- Demo mode uses separate credentials with limited access
- No client-side exposure of credentials

## Testing

Run tests with:

```bash
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
```

## Deployment

When deploying to Vercel:

1. Add environment variables in project settings or Vars section:
   - `EXPERIMENT_API_URL`
   - `EXPERIMENT_API_KEY` (for authenticated users)
   - `EXPERIMENT_API_KEY_DEMO` (for demo users)
2. Deploy and verify API connectivity
3. Test both demo mode and OAuth mode

## Troubleshooting

**"Invalid request, only https is supported" error:**
- Ensure `EXPERIMENT_API_URL` uses `https://` not `http://`
- The external API requires secure connections

**No data showing in demo mode:**
- Check `EXPERIMENT_API_KEY_DEMO` is set
- Verify API URL is accessible
- Check server logs for API errors

**No data showing in OAuth mode:**
- Check `EXPERIMENT_API_KEY` is set
- Verify user is authenticated via Keycloak
- Check server logs for API errors

**SSE not connecting:**
- Ensure `/api/dashboard/events` is accessible
- Check browser console for connection errors
- Verify API supports SSE endpoint with your API key
