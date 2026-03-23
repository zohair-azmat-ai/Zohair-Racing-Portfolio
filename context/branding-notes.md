# Branding Notes

## Visual Direction

The visual identity of ZA Racing is built around four keywords: **premium, racing, dark, modern**.

### Dark First

Every surface starts from near-black (`#0A0A0F`). This is not generic "dark mode" — it's a deliberate racing aesthetic that:
- Makes neon colors pop with maximum contrast.
- Feels immersive, like a race at night.
- Communicates seriousness and craftsmanship (amateur projects tend toward light backgrounds).
- Reduces eye strain during extended play.

Elevated surfaces (cards, modals) use `#1A1A2E` — a very slightly blue-tinted dark that creates depth without being visually distracting.

### Racing Red as the Hero Color

`#E8002D` (Formula 1 red) is the primary accent throughout. It is used for:
- The player's car.
- Road edge lines on the canvas.
- CTA button backgrounds.
- Navbar logo accent.
- Section labels and badges.
- Glow effects and shadow colors.
- Scrollbar thumb color.

This single dominant accent creates a cohesive, recognizable brand identity. Everything on the page feels connected.

### Orange as the Gradient Partner

`#FF6B00` pairs with the red in gradient applications:
- Primary buttons use `linear-gradient(135deg, #E8002D, #FF6B00)`.
- The "ADRENALINE" hero headline gradient goes red → orange → gold.
- Speed indicator in the HUD is orange.
- Car hood accent is orange.

The red-to-orange gradient is the single most recognizable motif of this project's brand.

### Typography

Two typefaces:
1. **Inter** — Primary UI font. Clean, modern, highly legible at all sizes. Used for body text, labels, navigation, cards.
2. **JetBrains Mono** — Monospace font for all game-related numbers: score display, speed readout, high score. The monospace choice is both functional (prevents layout jitter with changing digits) and aesthetic (reinforces the "developer-built" identity).

Headline weights go up to `font-black` (900 weight) for maximum visual impact on hero text.

### Neon Effects

Canvas elements use `shadowBlur` and `shadowColor` to create neon glow effects:
- Player car glows red.
- Enemy cars glow in their respective colors.
- Headlights glow yellow-white.
- Taillights glow red.

CSS elements achieve neon via `box-shadow` with multiple layers (tight glow + spread glow).

### Recruiter-Friendly Choices

- The color scheme is striking but not garish. It would look appropriate on a gaming company's actual website.
- The typography is clean and legible — not overly stylized or hard to read.
- White space is generous. The page doesn't feel cramped or amateurish.
- The color scheme is striking but not garish. It would look appropriate on a gaming company's actual website.
- The display name "ZA Racing" is short, punchy, and memorable — initials of the project owner (Zohair Azmat), which serves as personal branding without being verbose.

## Logo

The logo consists of:
- A racing car emoji (🏎️) for instant recognizability.
- "ZA" in `#E8002D` red — the brand name prefix.
- "RACING" in white bold text.

Short, clean, memorable. The initials-first format is intentional — it echoes real automotive brand naming conventions (think: GR, RS, GT, AMG).
