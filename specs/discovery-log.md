# Discovery Log — Design & Build Decisions

## Why HTML5 Canvas?

Canvas was chosen over DOM-based animation (CSS transforms, SVG) for several reasons:

1. **Performance at 60fps**: Canvas renders everything in a single rasterized bitmap per frame. There are no DOM nodes to reflow, repaint, or composite beyond the canvas element itself. For a real-time game loop with 6+ moving objects, Canvas is clearly the right tool.

2. **Complete drawing control**: Canvas gives pixel-level control over rendering. Custom car shapes with rounded rectangles, glow shadows, gradient fills, and per-frame explosion animations would all be significantly more complex with DOM or SVG.

3. **Demonstrates real skill**: Any developer can render a list. Canvas rendering at 60fps with a proper game loop is a genuine signal of frontend engineering depth — exactly what a portfolio project should communicate.

4. **No library dependency**: Using raw Canvas API (no Phaser, no PixiJS) keeps the project lightweight and shows understanding of fundamentals.

## Why `useRef` for game state instead of `useState`?

React's `useState` triggers re-renders on every update. A 60fps game loop would trigger 60 re-renders per second if game values like `playerRef.x`, `enemiesRef`, and `speedRef` were stored in state. This would be catastrophic for performance.

The solution: keep all mutable game values in `useRef` objects (which update without triggering re-renders), and only sync to `useState` for display-critical values (score, speed, status) at a throttled rate (every 10 frames).

## Why `requestAnimationFrame` instead of `setInterval`?

`requestAnimationFrame` is browser-native, syncs to the display's refresh rate (typically 60fps), pauses when the tab is hidden (saving CPU), and provides a high-resolution timestamp for time-based logic. `setInterval` is unreliable for animation — it doesn't sync to the screen refresh, can drift, and doesn't respect tab visibility.

## Why Next.js for a game?

- Next.js provides routing, metadata management, and TypeScript tooling out of the box.
- The App Router enables per-route layouts and metadata with zero configuration.
- It's the dominant React framework and recruiters expect to see it on modern portfolios.
- The game itself only uses the `/game` route — Next.js overhead is minimal.
- Serves as a demonstration that the developer can build a complete product (marketing site + app) in one framework.

## Why No Backend?

The game is intentionally self-contained in the browser. Adding a backend (e.g., for leaderboards) would increase complexity with no proportional benefit for a portfolio showcase. The project's goal is to demonstrate frontend engineering depth, not full-stack CRUD skills.

## Collision Forgiveness Padding

The AABB collision check includes 6px of inward padding on all sides. Initial playtesting showed that pixel-perfect collision felt unfair — the car visuals have rounded corners and wheels that visually extend slightly, creating a perceived mismatch between what the player sees and when collision triggers. The 6px padding aligns the "felt" hitbox more closely with the visible car body.

## Canvas Size Choice (400×600)

The 400×600 canvas was chosen to:
- Fit comfortably on all screen widths without horizontal scroll.
- Maintain a portrait orientation typical of mobile arcade games.
- Keep the 3-lane road wide enough to be visually clear while the lanes are narrow enough to create genuine challenge.
- Allow the game to scale via CSS `max-width: 100%` on smaller screens without canvas distortion.

## JetBrains Mono for HUD Numbers

Monospace fonts are essential for game HUDs because proportional fonts cause number display to shift width as digits change. A score changing from `000099` to `000100` would cause a layout jump with a proportional font. JetBrains Mono also reinforces the "developer-built" aesthetic.
