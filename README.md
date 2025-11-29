# Lloyds Bank Motor Insurance PDP

A mobile-first Product Detail Page (PDP) for Motor Insurance policies, built to match Lloyds Bank's mobile app design system.

## Features

- **Mobile-first design** optimized for 390px viewport
- **Lloyds Bank brand styling** with authentic colors and typography
- **Fully accessible** with ARIA labels, keyboard navigation, and focus management
- **Interactive components** including modals, accordions, tabs, and toast notifications
- **Policy information** clearly displayed with summary cards and detailed coverage sections
- **Quick actions** for making claims, viewing documents, and getting help
- **Emergency contact strip** for 24/7 claims support

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules with CSS Variables for design tokens

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Accordion.tsx
│   ├── ActionGrid.tsx
│   ├── BottomNav.tsx
│   ├── EmergencyStrip.tsx
│   ├── Modal.tsx
│   ├── PolicySummaryCard.tsx
│   ├── SupportStrip.tsx
│   ├── TabbedContent.tsx
│   ├── Toast.tsx
│   └── TopNav.tsx
├── data/               # Mocked data
│   └── policy.ts
├── pages/              # Page components
│   └── MotorPolicyPage.tsx
├── styles/             # Global styles and design tokens
│   ├── tokens.css
│   └── global.css
├── App.tsx
└── main.tsx
```

## Typography

The app uses **GT Ultra** as the primary font family, matching Lloyds Bank's brand typography.

### Font Setup

1. **If you have GT Ultra font files:**
   - Place the font files in `/public/fonts/` directory
   - Required files: `GT-Ultra-Regular.woff2`, `GT-Ultra-Medium.woff2`, `GT-Ultra-Bold.woff2`, `GT-Ultra-Black.woff2`
   - The `@font-face` declarations in `src/styles/fonts.css` will automatically load them

2. **If using Adobe Fonts or similar service:**
   - Update the `@import` statement in `src/styles/fonts.css` with your font service URL

3. **Fallback:**
   - Currently using **Inter** as a fallback font, which has similar geometric characteristics to GT Ultra
   - The app will gracefully fall back to Inter if GT Ultra files are not available

## Design Tokens

All design tokens are defined in `src/styles/tokens.css` using CSS variables, including:
- Brand colors (Lloyds green, status colors)
- Typography scale (GT Ultra font family)
- Spacing system
- Border radius
- Shadows
- Transitions

## Accessibility

- Semantic HTML throughout
- ARIA labels on all interactive elements
- Keyboard navigation for tabs and accordions
- Focus management in modals
- Minimum 44x44px touch targets
- WCAG AA color contrast compliance

## Browser Support

Modern browsers with ES2020 support. Optimized for mobile Safari and Chrome.

