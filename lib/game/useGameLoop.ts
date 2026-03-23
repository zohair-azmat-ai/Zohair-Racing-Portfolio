"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_SPEED,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  INITIAL_ENEMY_SPEED,
  ENEMY_SPAWN_INTERVAL,
  MAX_ENEMIES,
  ROAD_LINE_HEIGHT,
  ROAD_LINE_GAP,
  NUM_ROAD_LINES,
  LANE_COUNT,
  SPEED_INCREMENT,
  SCORE_PER_FRAME,
  ENEMY_COLORS,
} from "../constants";
import type { Car, RoadLine, GameStatus } from "../types";
import { checkCollision } from "./collision";
import {
  drawRoad,
  drawRoadLines,
  drawPlayerCar,
  drawEnemyCar,
  drawExplosion,
} from "./renderer";

interface UseGameLoopReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  engineAudioRef: React.RefObject<HTMLAudioElement | null>;
  keysRef: React.RefObject<Record<string, boolean>>;
  status: GameStatus;
  score: number;
  speed: number;
  highScore: number;
  startGame: () => void;
  restartGame: () => void;
}

export function useGameLoop(): UseGameLoopReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_ENEMY_SPEED);
  const [highScore, setHighScore] = useState(0);

  // Game state refs (for use inside animation loop)
  const statusRef = useRef<GameStatus>("idle");
  const scoreRef = useRef(0);
  const speedRef = useRef(INITIAL_ENEMY_SPEED);
  const highScoreRef = useRef(0);

  const playerRef = useRef<Car>({
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#E8002D",
  });

  const enemiesRef = useRef<Car[]>([]);
  const roadLinesRef = useRef<RoadLine[]>([]);
  const keysRef = useRef<Record<string, boolean>>({});
  const lastEnemySpawnRef = useRef(0);
  const rafRef = useRef<number>(0);
  const explosionRef = useRef<{ x: number; y: number; frame: number } | null>(null);

  // Audio refs — created client-side in useEffect, accessed from RAF without stale closures
  const engineAudioRef = useRef<HTMLAudioElement | null>(null);
  const crashAudioRef = useRef<HTMLAudioElement | null>(null);

  const initRoadLines = useCallback(() => {
    const lines: RoadLine[] = [];
    const step = ROAD_LINE_HEIGHT + ROAD_LINE_GAP;
    for (let i = 0; i < NUM_ROAD_LINES; i++) {
      lines.push({ y: i * step });
    }
    roadLinesRef.current = lines;
  }, []);

  const resetGame = useCallback(() => {
    playerRef.current = {
      x: PLAYER_START_X,
      y: PLAYER_START_Y,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      color: "#E8002D",
    };
    enemiesRef.current = [];
    scoreRef.current = 0;
    speedRef.current = INITIAL_ENEMY_SPEED;
    lastEnemySpawnRef.current = 0;
    explosionRef.current = null;
    initRoadLines();
    setScore(0);
    setSpeed(INITIAL_ENEMY_SPEED);
  }, [initRoadLines]);

  const spawnEnemy = useCallback((timestamp: number) => {
    if (enemiesRef.current.length >= MAX_ENEMIES) return;
    if (timestamp - lastEnemySpawnRef.current < ENEMY_SPAWN_INTERVAL) return;

    const lane = Math.floor(Math.random() * LANE_COUNT);
    const laneWidth = GAME_WIDTH / LANE_COUNT;
    const x = lane * laneWidth + (laneWidth - ENEMY_WIDTH) / 2;
    const color = ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)];

    enemiesRef.current.push({
      x,
      y: -ENEMY_HEIGHT - 10,
      width: ENEMY_WIDTH,
      height: ENEMY_HEIGHT,
      color,
      speed: speedRef.current,
    });

    lastEnemySpawnRef.current = timestamp;
  }, []);

  const gameLoop = useCallback(
    (timestamp: number) => {
      if (statusRef.current !== "running") return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Update speed & score
      speedRef.current += SPEED_INCREMENT;
      scoreRef.current += SCORE_PER_FRAME;

      // Update display every 10 frames for performance
      if (Math.round(scoreRef.current) % 10 === 0) {
        setScore(Math.floor(scoreRef.current));
        setSpeed(parseFloat(speedRef.current.toFixed(1)));
      }

      // Move player
      const player = playerRef.current;
      if (keysRef.current["ArrowLeft"] || keysRef.current["a"] || keysRef.current["A"]) {
        player.x = Math.max(8, player.x - PLAYER_SPEED);
      }
      if (keysRef.current["ArrowRight"] || keysRef.current["d"] || keysRef.current["D"]) {
        player.x = Math.min(GAME_WIDTH - PLAYER_WIDTH - 8, player.x + PLAYER_SPEED);
      }

      // Move road lines
      roadLinesRef.current.forEach((line) => {
        line.y += speedRef.current;
        if (line.y > GAME_HEIGHT) {
          line.y -= (ROAD_LINE_HEIGHT + ROAD_LINE_GAP) * NUM_ROAD_LINES;
        }
      });

      // Spawn & move enemies
      spawnEnemy(timestamp);
      enemiesRef.current = enemiesRef.current.filter((e) => e.y < GAME_HEIGHT + ENEMY_HEIGHT);
      enemiesRef.current.forEach((enemy) => {
        enemy.y += speedRef.current;
        enemy.speed = speedRef.current;
      });

      // Collision detection
      for (const enemy of enemiesRef.current) {
        if (checkCollision(player, enemy)) {
          explosionRef.current = {
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            frame: 0,
          };
          statusRef.current = "gameover";
          setStatus("gameover");

          // Stop engine, fire crash sound once
          if (engineAudioRef.current) {
            engineAudioRef.current.pause();
            engineAudioRef.current.currentTime = 0;
          }
          if (crashAudioRef.current) {
            crashAudioRef.current.currentTime = 0;
            crashAudioRef.current.play().catch((err) => console.warn("Crash audio play failed:", err));
          }

          const finalScore = Math.floor(scoreRef.current);
          if (finalScore > highScoreRef.current) {
            highScoreRef.current = finalScore;
            setHighScore(finalScore);
          }
          // Draw final frame with explosion
          drawFrame(ctx, timestamp);
          return;
        }
      }

      drawFrame(ctx, timestamp);
      rafRef.current = requestAnimationFrame(gameLoop);
    },
    [spawnEnemy]
  );

  function drawFrame(ctx: CanvasRenderingContext2D, _timestamp: number) {
    drawRoad(ctx);
    drawRoadLines(ctx, roadLinesRef.current);
    enemiesRef.current.forEach((enemy) => drawEnemyCar(ctx, enemy));
    drawPlayerCar(ctx, playerRef.current);

    if (explosionRef.current) {
      const exp = explosionRef.current;
      drawExplosion(ctx, exp.x, exp.y, exp.frame);
      exp.frame += 2;
    }
  }

  const startGame = useCallback(() => {
    resetGame();
    statusRef.current = "running";
    setStatus("running");
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [resetGame, gameLoop]);

  const restartGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    resetGame();
    statusRef.current = "running";
    setStatus("running");
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [resetGame, gameLoop]);

  useEffect(() => {
    // Initialise audio (client-side only)
    const engine = new Audio("/sounds/engine.mp3");
    engine.loop = true;
    engine.volume = 0.3;
    engine.preload = "auto";
    engine.onerror = () => console.warn("Missing audio file: /sounds/engine.mp3");
    engineAudioRef.current = engine;

    const crash = new Audio("/sounds/crash.mp3");
    crash.volume = 0.6;
    crash.preload = "auto";
    crash.onerror = () => console.warn("Missing audio file: /sounds/crash.mp3");
    crashAudioRef.current = crash;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    initRoadLines();

    return () => {
      engine.pause();
      crash.pause();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initRoadLines]);

  return {
    canvasRef,
    engineAudioRef,
    keysRef,
    status,
    score,
    speed,
    highScore,
    startGame,
    restartGame,
  };
}
