# Gameplay Mechanics

## Player Controls

The player car is controlled via keyboard input captured with `window.addEventListener("keydown")` and `"keyup"`. Held keys are tracked in a `keysRef` object (a plain ref, not state, to avoid re-renders).

**Supported keys:**
- `ArrowLeft` / `ArrowRight` — Move car left or right.
- `A` / `D` — Alternative WASD steering.

The player car's `x` position is updated every frame inside the game loop. Movement is clamped to keep the car within road boundaries with an 8px margin from each edge.

**Movement formula:**
```
player.x = Math.max(8, player.x - PLAYER_SPEED)     // left
player.x = Math.min(GAME_WIDTH - PLAYER_WIDTH - 8, player.x + PLAYER_SPEED)  // right
```

`PLAYER_SPEED` is set to 6 pixels per frame, which gives snappy, arcade-feel responsiveness.

## Enemy Movement

Enemy cars spawn off-screen above the top edge (`y = -ENEMY_HEIGHT - 10`) in a randomly selected lane. There are 3 lanes evenly dividing the road width. Each enemy is centered within its lane.

Enemies move downward every frame by the current speed value:
```
enemy.y += speedRef.current
```

Enemies that scroll past the bottom of the canvas (`y > GAME_HEIGHT + ENEMY_HEIGHT`) are filtered out of the enemies array to free memory.

**Spawn throttle:** A new enemy can only spawn if:
1. The current enemy count is below `MAX_ENEMIES` (6).
2. At least `ENEMY_SPAWN_INTERVAL` (1500ms) has elapsed since the last spawn.

Enemy colors are randomly selected from a palette of 5 distinct colors to make them visually distinguishable from the player's red car.

## Scoring

Score increments by `SCORE_PER_FRAME` (1) on every animation frame. Because `requestAnimationFrame` targets 60fps, the score increases by approximately 60 per second. The display is padded to 6 digits (e.g., `000420`).

React state is updated every 10 frames (when `score % 10 === 0`) rather than every frame to avoid excessive re-renders while keeping the HUD visually responsive.

## Collision Detection

Collision is detected using Axis-Aligned Bounding Box (AABB) logic in `lib/game/collision.ts`. A `padding` value of 6px is applied on all sides as "forgiveness" — this prevents frustrating pixel-perfect collisions and gives the player a small buffer.

```
checkCollision(a, b):
  a.x + padding < b.x + b.width - padding  AND
  a.x + a.width - padding > b.x + padding  AND
  a.y + padding < b.y + b.height - padding AND
  a.y + a.height - padding > b.y + padding
```

When a collision is detected, the game loop:
1. Sets `statusRef.current = "gameover"`.
2. Triggers an explosion effect centered on the player car.
3. Compares final score to high score and updates if beaten.
4. Cancels the animation frame loop.

## Speed Progression

Every frame, the speed multiplier increases by `SPEED_INCREMENT` (0.0005):
```
speedRef.current += SPEED_INCREMENT
```

This means after 60 frames (1 second), speed increases by 0.03. After 60 seconds of survival, the speed has increased by ~1.8x from its starting value of 3. The progression feels gradual at first and then increasingly punishing.

Both road line scroll speed and enemy movement speed are tied to `speedRef.current`, so everything visually accelerates together.

## Restart Flow

1. Player presses "Race Again" in the Game Over modal.
2. `restartGame()` is called: cancels any pending RAF, calls `resetGame()`, sets status to "running", and starts a new `requestAnimationFrame` loop.
3. `resetGame()` resets: player position, enemy array, score, speed, road lines, explosion ref.
4. High score is preserved in `highScoreRef` across restarts (session-persistent, not cross-session).

## Road Animation

Lane divider lines are stored as an array of `RoadLine` objects, each with a `y` position. Each frame they move downward by the current speed and wrap back to the top when they scroll below the canvas, creating a seamless infinite-scroll illusion:
```
if (line.y > GAME_HEIGHT) {
  line.y -= (ROAD_LINE_HEIGHT + ROAD_LINE_GAP) * NUM_ROAD_LINES
}
```
