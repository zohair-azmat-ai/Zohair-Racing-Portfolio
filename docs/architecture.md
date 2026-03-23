# Architecture Overview

## Application Structure

Zohair Racing is a Next.js 15 App Router application. It has two routes:

- `/` — Landing page (marketing/portfolio).
- `/game` — The actual game.

Both routes share a root layout (`app/layout.tsx`) that sets global metadata and imports global CSS.

## Pages

### Landing Page (`app/page.tsx`)

A server component that composes:
1. `<Navbar />` — Fixed navigation.
2. `<Hero />` — Full-screen hero section.
3. `<FeatureCards />` — Game feature highlights.
4. Inline About section with tech stack pills.
5. Inline Footer.

This is a pure presentation page with no client-side interactivity beyond Navbar's mobile toggle.

### Game Page (`app/game/page.tsx`)

A server component that renders:
1. `<Navbar />` — Consistent navigation.
2. Page header (badge, title, tagline).
3. `<GameCanvas />` — The main game component.
4. Back-to-home link.

All actual interactivity is within `GameCanvas` and its children.

## Component Tree

```
app/page.tsx (server)
  Navbar (client)
  Hero (client)
  FeatureCards (client)

app/game/page.tsx (server)
  Navbar (client)
  GameCanvas (client)
    GameHUD (client)
    canvas element (via ref)
    idle overlay
    GameOverModal (client, conditional)
```

## State Flow

All game state lives in `useGameLoop.ts`. The hook manages:

### Refs (no re-render on change)
- `playerRef` — Player car position and dimensions.
- `enemiesRef` — Array of active enemy cars.
- `roadLinesRef` — Array of road lane marker positions.
- `keysRef` — Current keyboard state (which keys are held).
- `statusRef` — Current game status (synced to state, used inside RAF callback).
- `scoreRef` — Accumulated score (synced to state at 10-frame intervals).
- `speedRef` — Current game speed multiplier.
- `highScoreRef` — Session high score.
- `rafRef` — Animation frame ID for cancellation.
- `explosionRef` — Explosion animation state.
- `lastEnemySpawnRef` — Timestamp of last enemy spawn.

### State (triggers re-render)
- `status: GameStatus` — Controls which overlay is shown.
- `score: number` — Displayed in HUD.
- `speed: number` — Displayed in HUD.
- `highScore: number` — Displayed in HUD and game over modal.

The separation between refs and state is a core architectural decision: the game loop runs at 60fps and must never cause React re-renders. Only display values are synced to state, and only at throttled intervals.

## Canvas Game Loop

The game loop uses `requestAnimationFrame` recursively:

```
startGame() -> requestAnimationFrame(gameLoop)
gameLoop(timestamp):
  1. Check status (exit if not "running")
  2. Increment speed and score
  3. Update player position from key state
  4. Scroll road lines, wrap at bottom
  5. Spawn enemies (rate-limited)
  6. Move enemies downward, remove off-screen ones
  7. Check collision for each enemy
     - On hit: set gameover, record explosion, stop loop
  8. Draw frame (road, road lines, enemies, player, explosion)
  9. requestAnimationFrame(gameLoop) -- recurse
```

Drawing is handled by pure functions in `lib/game/renderer.ts`. These functions take a `CanvasRenderingContext2D` and data, and draw — no side effects, no state access.

Collision detection is in `lib/game/collision.ts` as a pure function.

## No Backend

There is no server-side logic, API routes, database, or external services. The app can be deployed as a fully static export or on Vercel's edge runtime with zero configuration.
