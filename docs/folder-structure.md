# Folder Structure

```
zohair-racing-game/
├── app/                        # Next.js App Router pages and layouts
│   ├── layout.tsx              # Root layout: metadata, global CSS import, html/body
│   ├── globals.css             # Global styles: Tailwind directives, CSS vars, utilities
│   ├── page.tsx                # Landing page (/, marketing/portfolio)
│   └── game/
│       └── page.tsx            # Game page (/game, contains GameCanvas)
│
├── components/                 # Reusable React components
│   ├── Navbar.tsx              # Fixed top navigation bar with mobile hamburger
│   ├── Hero.tsx                # Full-screen hero section (landing page)
│   ├── FeatureCards.tsx        # Six-card feature grid (landing page)
│   ├── GameCanvas.tsx          # Game wrapper: canvas + HUD + overlays (game page)
│   ├── GameHUD.tsx             # Score / speed / high score display strip
│   └── GameOverModal.tsx       # End-of-game modal with scores and action buttons
│
├── lib/                        # Shared logic and utilities
│   ├── types.ts                # TypeScript interfaces: Car, GameState, RoadLine, GameStatus
│   ├── constants.ts            # All game constants: dimensions, speeds, limits, colors
│   └── game/
│       ├── collision.ts        # Pure AABB collision detection function
│       ├── renderer.ts         # All canvas drawing functions (road, cars, explosion)
│       └── useGameLoop.ts      # Core game loop React hook (RAF, state, input, logic)
│
├── specs/                      # Project specifications and planning documents
│   ├── racing-game-spec.md     # Full project spec: goals, features, tech stack, routes
│   ├── gameplay-mechanics.md   # Detailed gameplay: controls, enemies, scoring, collision
│   ├── ui-ux-plan.md           # Layout plans, color system, recruiter presentation notes
│   ├── discovery-log.md        # Design/build decision rationale log
│   └── prompt-history.md       # Log of AI prompts used during development
│
├── context/                    # High-level project context documents
│   ├── project-vision.md       # Why this project exists and who it's for
│   └── branding-notes.md       # Visual direction, color system, typography, logo
│
├── docs/                       # Technical documentation
│   ├── architecture.md         # Pages, components, state flow, canvas loop explained
│   └── folder-structure.md     # This file: purpose of every folder and file
│
├── public/                     # Static assets (Next.js default, currently empty)
├── README.md                   # Project readme: overview, setup, features, stack
├── tailwind.config.ts          # Tailwind theme extension: custom colors, fonts, animations
├── tsconfig.json               # TypeScript configuration (Next.js default)
├── next.config.ts              # Next.js configuration (Next.js default)
├── postcss.config.mjs          # PostCSS config for Tailwind v4 (auto-generated)
├── eslint.config.mjs           # ESLint configuration (Next.js default)
└── package.json                # Dependencies and scripts
```

## Key Directory Purposes

### `/app`
The Next.js App Router root. Every folder with a `page.tsx` becomes a route. The `layout.tsx` at the root wraps every page. `globals.css` is imported here once and applies globally.

### `/components`
All React components. Grouped by presentation layer:
- Landing page components: `Navbar`, `Hero`, `FeatureCards`.
- Game components: `GameCanvas`, `GameHUD`, `GameOverModal`.

Components are all marked `"use client"` because they use React state or DOM APIs. The pages themselves are server components.

### `/lib`
All non-component logic:
- `types.ts` and `constants.ts` are shared across the app.
- `/lib/game/` contains the three pure modules of the game engine: collision logic, canvas rendering, and the game loop hook.

This separation means renderer.ts has no awareness of React, collision.ts has no awareness of the canvas, and useGameLoop.ts orchestrates them both.

### `/specs`, `/context`, `/docs`
Documentation organized by purpose:
- `specs/` — Planning and feature specs (what to build and why).
- `context/` — High-level project vision and branding (the "why behind the why").
- `docs/` — Technical documentation (how it works).
