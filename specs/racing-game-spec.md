# Zohair Racing Game — Project Specification

## Project Overview

Zohair Racing is a browser-based, top-down car racing game built as a premium portfolio project by Zohair Azmat. The game runs entirely in the browser using HTML5 Canvas and is served through a Next.js 15 application with the App Router. There is no backend, no database, and no authentication — the focus is entirely on frontend engineering craft and game design.

## Goals

- Demonstrate mastery of Next.js, TypeScript, React Hooks, and HTML5 Canvas APIs.
- Build a visually impressive, recruiter-friendly portfolio project that stands out from typical CRUD apps.
- Create a fun, replayable arcade-style game with satisfying progression.
- Ship production-quality code with clean architecture, proper type safety, and separation of concerns.

## Target Users

- Recruiters and hiring managers viewing Zohair Azmat's portfolio.
- Developers evaluating code quality and architectural decisions.
- Anyone who wants to play a fun browser racing game.

## Features

### Core Gameplay
- Player-controlled car that moves left and right using arrow keys or A/D keys.
- Enemy cars spawn from the top of the road in random lanes at timed intervals.
- Player must dodge all enemy cars to stay alive.
- Collision detection triggers a game-over state.

### Progression
- Game speed increases continuously over time via a speed multiplier.
- Score increments every frame — the longer you survive, the higher your score.
- Session-persistent high score tracked via React state refs (no localStorage required).

### Visual Design
- Premium dark racing aesthetic with neon red accents (#E8002D) and orange highlights (#FF6B00).
- Canvas-rendered cars with rounded shapes, neon glow effects, windshields, wheels, headlights, and taillights.
- Animated explosion effect on collision.
- Scrolling road lane markers for speed illusion.
- Dark background with subtle grid overlay and radial glow effects on the landing page.

### UI / HUD
- Fixed navbar with logo and navigation links.
- Game HUD showing score, speed multiplier, and best score.
- Idle overlay with "Start Engine" button before game begins.
- Game Over modal with score display, high-score comparison, "Race Again" and "Main Menu" buttons.
- Animated "New Record!" badge when high score is beaten.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Game Rendering | HTML5 Canvas API |
| Animation Loop | requestAnimationFrame |
| State Management | React useState + useRef |
| Fonts | Google Fonts (Inter, JetBrains Mono) |
| Deployment Target | Vercel (static-compatible) |

## Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, about, footer |
| `/game` | Full game page with canvas and HUD |

## Components Overview

| Component | Purpose |
|---|---|
| `Navbar` | Fixed top navigation bar with logo and links |
| `Hero` | Full-screen landing hero section with CTAs |
| `FeatureCards` | Grid of six feature highlight cards |
| `GameCanvas` | Main game wrapper: canvas + HUD + overlays |
| `GameHUD` | Score, speed, and high score display strip |
| `GameOverModal` | End-of-game modal with scores and action buttons |

## Lib Modules

| Module | Purpose |
|---|---|
| `lib/types.ts` | Shared TypeScript interfaces and type aliases |
| `lib/constants.ts` | All game tuning values in one place |
| `lib/game/collision.ts` | AABB collision detection function |
| `lib/game/renderer.ts` | All canvas drawing functions (road, cars, explosion) |
| `lib/game/useGameLoop.ts` | Core game loop hook managing all game state and logic |

## Future Enhancements

- Touch/swipe controls for mobile play.
- Sound effects and background music toggle.
- Multiple car skins or color selections.
- Power-ups (shield, slow-mo, score multiplier).
- LocalStorage high score persistence across sessions.
- Online leaderboard via serverless function.
- Night/day track themes.
- Particle trail effects behind the player car.
