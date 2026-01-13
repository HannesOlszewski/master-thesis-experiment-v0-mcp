# API Integration Guide

## Overview

The dashboard integrates with the `master-thesis-experiment-api` to display real-time data and metrics. The integration follows security best practices by keeping API credentials server-side only.

## Architecture

### Server-Side Proxy Routes

API credentials are never exposed to the browser. All external API calls are proxied through Next.js API routes:

- **GET /api/dashboard** - Fetches dashboard data
- **GET /api/dashboard/events** - SSE stream for live updates

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

## Environment Variables

Configure these variables in your deployment:

```bash
# External API Configuration
EXPERIMENT_API_URL=https://api-domain.com  # Base URL of the external API
EXPERIMENT_API_KEY=your-api-key-here       # API key for authentication
```

## API Endpoints

### Dashboard Data Endpoint

**GET /api/dashboard**

Returns comprehensive dashboard metrics including:
- User statistics (total, active, growth)
- Financial data (revenue, transactions)
- System status (CPU, memory, disk)

### Events Stream Endpoint

**GET /api/dashboard/events**

Server-Sent Events stream providing real-time updates:
- `dashboard_update` events - Metric updates
- `system_status` events - System health updates

## Data Structure

See `lib/types/dashboard.ts` for complete TypeScript definitions.

## Security Considerations

- API key stored in environment variables only
- All external API calls made server-side
- Authentication required for all dashboard routes
- No client-side exposure of credentials

## Testing

Run tests with:

```bash
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
```

## Deployment

When deploying to Vercel:

1. Add environment variables in project settings
2. Ensure `EXPERIMENT_API_URL` and `EXPERIMENT_API_KEY` are configured
3. Deploy and verify API connectivity

## Troubleshooting

**No data showing:**
- Check environment variables are set
- Verify API URL is accessible
- Check server logs for API errors

**SSE not connecting:**
- Ensure `/api/dashboard/events` is accessible
- Check browser console for connection errors
- Verify API supports SSE endpoint
