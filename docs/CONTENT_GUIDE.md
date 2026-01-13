# Content Management Guide

This guide explains how to update content on the A Startup landing page.

## Quick Reference

| Content | File Location | Line/Section |
|---------|--------------|--------------|
| Hero title | `components/sections/hero-section.tsx` | Line ~25 |
| Hero subtitle | `components/sections/hero-section.tsx` | Line ~29 |
| Features | `components/sections/features-section.tsx` | Lines 4-37 |
| About text | `components/sections/about-section.tsx` | Lines 4-10, ~45-50 |
| Testimonials | `components/sections/testimonials-section.tsx` | Lines 4-36 |
| Contact info | `components/sections/contact-section.tsx` | Lines 4-22 |
| Footer slogan | `components/footer.tsx` | Line 29 |

## Updating Content

### Hero Section

**File:** `components/sections/hero-section.tsx`

```tsx
// Update the main headline
<h1>Transform Your Digital Presence</h1>

// Update the subtitle
<p>We help businesses create stunning web experiences...</p>
```

### Features Section

**File:** `components/sections/features-section.tsx`

Add or modify features in the `features` array:

```tsx
const features = [
  {
    icon: Code,  // Choose from lucide-react icons
    title: "Custom Development",
    description: "Tailored web and software solutions...",
  },
  // Add more features here
]
```

### About Section

**File:** `components/sections/about-section.tsx`

Update company highlights:

```tsx
const highlights = [
  "10+ years of combined experience",
  "100+ successful projects delivered",
  // Add more highlights
]
```

### Testimonials

**File:** `components/sections/testimonials-section.tsx`

Add or modify testimonials:

```tsx
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechVentures",
    content: "A Startup transformed our outdated website...",
    rating: 5,
  },
  // Add more testimonials
]
```

### Contact Information

**File:** `components/sections/contact-section.tsx`

Update contact methods:

```tsx
const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@astartup.com",
    href: "mailto:hello@astartup.com",
  },
  // Update phone, address, etc.
]
```

## Adding Images

### Logo
Replace `public/images/logo.png` with your logo (recommended size: 240x80px)

### Hero Image
Replace `public/images/hero.jpg` (recommended size: 1200x900px)

### About Image
Replace `public/images/about.jpg` (recommended size: 1200x900px)

## Legal Pages

Update legal content in:
- `app/privacy/page.tsx` - Privacy Policy
- `app/terms/page.tsx` - Terms of Service
- `app/imprint/page.tsx` - Imprint/Legal Info
- `app/cookie-policy/page.tsx` - Cookie Policy

## SEO Metadata

**File:** `app/layout.tsx`

Update the metadata object:

```tsx
export const metadata: Metadata = {
  title: "A Startup - Transform Your Digital Presence",
  description: "We help businesses create stunning web experiences...",
}
```

For individual pages, update the metadata export in each page file.

## Color Scheme

**File:** `app/globals.css`

Modify CSS variables in the `:root` section to change colors:

```css
:root {
  --primary: oklch(0.6768 0.0719 170.61);  /* Main brand color */
  --secondary: oklch(0.4596 0.0406 345.27);  /* Accent color */
  /* ... */
}
```

## Social Media Links

**File:** `components/footer.tsx`

Update social media URLs:

```tsx
const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  // Update URLs here
]
```

## Adding New Sections

1. Create a new component in `components/sections/`
2. Import and add it to `app/page.tsx`
3. Add navigation link in `components/header.tsx`
4. Update tests

Example:

```tsx
// components/sections/my-section.tsx
export function MySection() {
  return (
    <section id="my-section">
      {/* Your content */}
    </section>
  )
}

// app/page.tsx
import { MySection } from "@/components/sections/my-section"

export default function HomePage() {
  return (
    <>
      {/* ... existing sections ... */}
      <MySection />
    </>
  )
}
```

## Content Best Practices

1. **Keep it concise:** Clear, scannable content
2. **Use action verbs:** "Transform," "Create," "Drive"
3. **Focus on benefits:** What the user gains
4. **Maintain voice:** Professional yet approachable
5. **Update regularly:** Keep testimonials and stats current

## Testing After Changes

After updating content, run:

```bash
npm run test        # Run unit tests
npm run build       # Verify build
npm run dev         # Test locally
```

## Need Help?

- Check `README.md` for general information
- See `ARCHITECTURE.md` for technical details
- Contact: hello@astartup.com
