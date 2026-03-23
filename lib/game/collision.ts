import type { Car } from "../types";

export function checkCollision(a: Car, b: Car): boolean {
  const padding = 6; // slight forgiveness
  return (
    a.x + padding < b.x + b.width - padding &&
    a.x + a.width - padding > b.x + padding &&
    a.y + padding < b.y + b.height - padding &&
    a.y + a.height - padding > b.y + padding
  );
}
