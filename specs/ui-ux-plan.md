# UI / UX Plan

## Design Philosophy

The overarching design goal is "premium dark gaming aesthetic" — the kind of visual quality you'd expect from a AAA game's marketing site, not a hobby project. Every UI element should communicate craft, intentionality, and engineering depth to anyone who views it.

This is specifically designed to impress recruiters who may not play games themselves. The landing page must convey technical sophistication before they even click "Play."

## Color Theme

| Name | Hex | Usage |
|---|---|---|
| Racing Red | `#E8002D` | Primary accent, CTA buttons, player car, logo accent |
| Racing Orange | `#FF6B00` | Gradient partner to red, speed indicator |
| Track Dark | `#0A0A0F` | Page background, darkest surfaces |
| Track Gray | `#1A1A2E` | Card backgrounds, elevated surfaces |
| Neon Cyan | `#00F5FF` | Player windshield highlight, secondary accent |
| White | `#FFFFFF` | Primary text |
| White/50 | `rgba(255,255,255,0.5)` | Secondary text, descriptions |
| White/5–20 | Low opacity white | Borders, dividers, subtle surfaces |

The red-to-orange gradient is used throughout as a recognizable motif — in buttons, headlines, accents, and the canvas itself.

## Landing Page Layout

### Navbar (fixed, z-50)
- Left: logo with racing car emoji + "ZOHAIR RACING" branding.
- Right: "Features" and "About" anchor links + "Play Now" CTA button.
- Mobile: hamburger menu that reveals stacked links.
- Background: semi-transparent with backdrop blur for depth.

### Hero Section (full-screen)
- Animated grid background (very subtle, 3% opacity red grid lines).
- Large radial glow blob in the center (red tint, heavily blurred).
- Decorative speed lines left and right edges (suggest motion).
- Badge chip: "Browser-Based Racing Experience" with pulsing dot.
- Massive headline: "FEEL THE ADRENALINE" with gradient text treatment.
- Subheadline explaining the tech stack naturally.
- Two CTAs: "Start Racing" (primary gradient) and "View Features" (secondary ghost).
- Stats row: 60fps / Infinite Levels / 100% Browser-Based.
- Scroll indicator at bottom.

### Feature Cards Section
- 2-column on tablet, 3-column on desktop grid of feature cards.
- Each card: emoji icon, bold title, muted description.
- Cards use the `card-dark` glass-morphism style.
- Hover state: slight upward translate + red border accent.

### About / Tech Stack Section
- Tech stack displayed as pill chips (not a boring list).
- Centered layout, consistent with hero tone.
- Final CTA: "Play the Game →"

### Footer
- Single line: "Built by Zohair Azmat · Zohair Racing · Next.js + TypeScript + Canvas"
- Subtle top border.

## Game Page Layout

The game page is focused and distraction-free — everything serves the gameplay.

### Layout
- Navbar persists at top for consistent branding.
- Page header: small "Live Gameplay" badge, game title, subtitle.
- Game container: centered canvas with red glow border.
- Controls hint below canvas when game is running.
- "Back to Home" link at bottom.

### HUD Strip (above canvas)
- Three-column layout: Score left, Speed center, Best right.
- Monospace font for numbers (tabular layout, no jitter).
- Speed indicator dot: green glow when running, red when game over.
- Zero-padded to 6 digits for consistent width.

### Idle Overlay
- Semi-transparent blur over the static road canvas.
- Car emoji, headline, tagline, "Start Engine" button, controls hint.

### Game Over Modal
- Centered card with red border glow and gradient background.
- Top and bottom accent bars.
- Score display boxes with subtle backgrounds.
- "New Record!" badge appears conditionally.
- Two buttons: "Race Again" (primary) and "Main Menu" (secondary).

## Recruiter-First Presentation Notes

- The landing page should take under 3 seconds to communicate: "This developer knows Next.js, TypeScript, and Canvas."
- The tech stack pills in the About section are visible without scrolling far.
- The project name "Zohair Racing" brands the creator directly.
- The game is immediately playable — no signup, no install, no friction.
- The code structure (visible on GitHub) shows architectural maturity: separation into `/lib`, `/components`, clean types.
- Mobile responsiveness demonstrates awareness of real-world constraints even for a portfolio piece.
