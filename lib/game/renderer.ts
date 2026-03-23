import {
  GAME_WIDTH,
  GAME_HEIGHT,
  ROAD_LINE_WIDTH,
  ROAD_LINE_HEIGHT,
  ROAD_LINE_GAP,
  LANE_COUNT,
} from "../constants";
import type { Car, RoadLine } from "../types";

export function drawRoad(ctx: CanvasRenderingContext2D): void {
  // Road background
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Curb/shoulder left
  const gradient = ctx.createLinearGradient(0, 0, GAME_WIDTH, 0);
  gradient.addColorStop(0, "#111827");
  gradient.addColorStop(0.08, "#1a1a1a");
  gradient.addColorStop(0.92, "#1a1a1a");
  gradient.addColorStop(1, "#111827");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Road edge lines
  ctx.fillStyle = "#E8002D";
  ctx.fillRect(2, 0, 4, GAME_HEIGHT);
  ctx.fillRect(GAME_WIDTH - 6, 0, 4, GAME_HEIGHT);
}

export function drawRoadLines(
  ctx: CanvasRenderingContext2D,
  lines: RoadLine[]
): void {
  const laneWidth = GAME_WIDTH / LANE_COUNT;

  lines.forEach((line) => {
    for (let lane = 1; lane < LANE_COUNT; lane++) {
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillRect(
        lane * laneWidth - ROAD_LINE_WIDTH / 2,
        line.y,
        ROAD_LINE_WIDTH,
        ROAD_LINE_HEIGHT
      );
    }
  });
}

export function drawPlayerCar(
  ctx: CanvasRenderingContext2D,
  car: Car
): void {
  const { x, y, width, height } = car;

  // Car glow
  ctx.shadowColor = "#E8002D";
  ctx.shadowBlur = 15;

  // Car body
  ctx.fillStyle = "#E8002D";
  ctx.beginPath();
  ctx.roundRect(x, y + height * 0.15, width, height * 0.7, 4);
  ctx.fill();

  // Car hood / front
  ctx.fillStyle = "#FF6B00";
  ctx.beginPath();
  ctx.roundRect(x + width * 0.15, y + height * 0.05, width * 0.7, height * 0.18, 3);
  ctx.fill();

  // Car trunk / back
  ctx.fillStyle = "#C00020";
  ctx.beginPath();
  ctx.roundRect(x + width * 0.15, y + height * 0.78, width * 0.7, height * 0.18, 3);
  ctx.fill();

  // Windshield
  ctx.fillStyle = "rgba(0, 245, 255, 0.6)";
  ctx.beginPath();
  ctx.roundRect(x + width * 0.2, y + height * 0.22, width * 0.6, height * 0.22, 2);
  ctx.fill();

  // Wheels
  ctx.fillStyle = "#111";
  ctx.shadowBlur = 0;
  const wheelW = width * 0.2;
  const wheelH = height * 0.18;
  ctx.fillRect(x - wheelW * 0.3, y + height * 0.1, wheelW, wheelH);
  ctx.fillRect(x + width - wheelW * 0.7, y + height * 0.1, wheelW, wheelH);
  ctx.fillRect(x - wheelW * 0.3, y + height * 0.72, wheelW, wheelH);
  ctx.fillRect(x + width - wheelW * 0.7, y + height * 0.72, wheelW, wheelH);

  // Headlights
  ctx.fillStyle = "rgba(255, 240, 100, 0.9)";
  ctx.shadowColor = "rgba(255, 240, 100, 0.8)";
  ctx.shadowBlur = 10;
  ctx.fillRect(x + width * 0.15, y + height * 0.04, width * 0.2, height * 0.06);
  ctx.fillRect(x + width * 0.65, y + height * 0.04, width * 0.2, height * 0.06);

  // Reset shadow
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
}

export function drawEnemyCar(
  ctx: CanvasRenderingContext2D,
  car: Car
): void {
  const { x, y, width, height, color } = car;

  ctx.shadowColor = color;
  ctx.shadowBlur = 10;

  // Body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y + height * 0.15, width, height * 0.7, 4);
  ctx.fill();

  // Hood
  ctx.fillStyle = darkenColor(color);
  ctx.beginPath();
  ctx.roundRect(x + width * 0.15, y + height * 0.05, width * 0.7, height * 0.18, 3);
  ctx.fill();

  // Trunk
  ctx.fillStyle = darkenColor(color);
  ctx.beginPath();
  ctx.roundRect(x + width * 0.15, y + height * 0.78, width * 0.7, height * 0.18, 3);
  ctx.fill();

  // Windshield
  ctx.fillStyle = "rgba(150, 200, 255, 0.5)";
  ctx.beginPath();
  ctx.roundRect(x + width * 0.2, y + height * 0.22, width * 0.6, height * 0.22, 2);
  ctx.fill();

  // Wheels
  ctx.fillStyle = "#111";
  ctx.shadowBlur = 0;
  const wheelW = width * 0.2;
  const wheelH = height * 0.18;
  ctx.fillRect(x - wheelW * 0.3, y + height * 0.1, wheelW, wheelH);
  ctx.fillRect(x + width - wheelW * 0.7, y + height * 0.1, wheelW, wheelH);
  ctx.fillRect(x - wheelW * 0.3, y + height * 0.72, wheelW, wheelH);
  ctx.fillRect(x + width - wheelW * 0.7, y + height * 0.72, wheelW, wheelH);

  // Taillights
  ctx.fillStyle = "rgba(255, 50, 50, 0.9)";
  ctx.shadowColor = "rgba(255, 50, 50, 0.8)";
  ctx.shadowBlur = 8;
  ctx.fillRect(x + width * 0.15, y + height * 0.9, width * 0.2, height * 0.06);
  ctx.fillRect(x + width * 0.65, y + height * 0.9, width * 0.2, height * 0.06);

  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
}

function darkenColor(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - 40);
  const g = Math.max(0, ((num >> 8) & 0xff) - 40);
  const b = Math.max(0, (num & 0xff) - 40);
  return `rgb(${r},${g},${b})`;
}

export function drawExplosion(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number
): void {
  const maxRadius = 50;
  const alpha = Math.max(0, 1 - frame / 30);
  const radius = (frame / 30) * maxRadius;

  ctx.save();
  ctx.globalAlpha = alpha;

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, "#FF6B00");
  gradient.addColorStop(0.5, "#E8002D");
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
