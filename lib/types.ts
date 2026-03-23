export interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed?: number;
}

export interface GameState {
  isRunning: boolean;
  isGameOver: boolean;
  score: number;
  speed: number;
  highScore: number;
}

export interface RoadLine {
  y: number;
}

export type GameStatus = "idle" | "running" | "paused" | "gameover";

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}
