"use client";

import { useEffect, useCallback } from "react";
import { GAME_WIDTH, GAME_HEIGHT } from "@/lib/constants";
import { useGameLoop } from "@/lib/game/useGameLoop";
import GameHUD from "./GameHUD";
import GameOverModal from "./GameOverModal";
import { useRouter } from "next/navigation";

export default function GameCanvas() {
  const router = useRouter();
  const { canvasRef, engineAudioRef, status, score, speed, highScore, startGame, restartGame } =
    useGameLoop();

  // Play engine audio directly from the user-gesture call stack, then start the game loop
  const handleStartGame = useCallback(() => {
    const audio = engineAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(() => console.warn("Engine audio failed to start"));
    }
    startGame();
  }, [engineAudioRef, startGame]);

  const handleRestartGame = useCallback(() => {
    const audio = engineAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(() => console.warn("Engine audio failed to start"));
    }
    restartGame();
  }, [engineAudioRef, restartGame]);

  // Draw idle road preview on canvas mount
  useEffect(() => {
    if (status !== "idle") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dark road background
    ctx.fillStyle = "#111118";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Road edge lines
    ctx.fillStyle = "#ff0033";
    ctx.fillRect(2, 0, 4, GAME_HEIGHT);
    ctx.fillRect(GAME_WIDTH - 6, 0, 4, GAME_HEIGHT);

    // Lane dashes
    for (let y = 0; y < GAME_HEIGHT; y += 80) {
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(GAME_WIDTH / 2 - 3, y, 6, 40);
      ctx.fillRect(GAME_WIDTH / 3 - 3, y, 6, 40);
      ctx.fillRect((GAME_WIDTH / 3) * 2 - 3, y, 6, 40);
    }
  }, [status, canvasRef]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* ── Game container ─────────────────────────────────────────────── */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          width: GAME_WIDTH,
          maxWidth: "100%",
          border: "1px solid rgba(255, 0, 51, 0.28)",
          boxShadow: [
            "0 0 0 1px rgba(255, 0, 51, 0.08)",
            "0 0 35px rgba(255, 0, 51, 0.2)",
            "0 0 80px rgba(255, 0, 51, 0.08)",
            "0 0 140px rgba(124, 58, 237, 0.07)",
            "inset 0 0 60px rgba(0, 0, 0, 0.25)",
          ].join(", "),
        }}
      >
        {/* HUD */}
        <GameHUD score={score} speed={speed} highScore={highScore} status={status} />

        {/* Canvas — CSS width:100% scales it down on mobile without distorting the drawing buffer */}
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          style={{ display: "block", width: "100%", height: "auto" }}
        />

        {/* Canvas edge vignette — depth effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.18) 100%)",
            zIndex: 1,
          }}
        />

        {/* ── Idle overlay ──────────────────────────────────────────────── */}
        {status === "idle" && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(5,0,18,0.88))",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            <div
              className="text-center px-6"
              style={{ animation: "fade-up 0.4s ease both" }}
            >
              {/* Car icon with glow */}
              <div
                className="text-5xl mb-5 inline-block select-none"
                style={{ filter: "drop-shadow(0 0 14px rgba(255,0,51,0.65))" }}
              >
                🏎️
              </div>

              {/* Ready headline */}
              <h2
                className="font-black tracking-tight mb-2 leading-none"
                style={{
                  fontSize: "1.65rem",
                  background: "linear-gradient(135deg, #ffffff, #ff0033)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ready to Race?
              </h2>

              <p
                className="text-xs mb-6"
                style={{
                  color: "rgba(255,255,255,0.38)",
                  letterSpacing: "0.06em",
                }}
              >
                Dodge traffic · Survive · Dominate
              </p>

              <button
                onClick={handleStartGame}
                className="btn-primary font-semibold px-10 py-3"
                style={{ fontSize: "0.9rem" }}
              >
                Start Engine
              </button>

              <p
                className="mt-5 font-mono uppercase"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.18)",
                }}
              >
                ← → Arrow Keys &nbsp;·&nbsp; A / D
              </p>
            </div>
          </div>
        )}

        {/* ── Game over overlay ──────────────────────────────────────────── */}
        {status === "gameover" && (
          <GameOverModal
            score={score}
            highScore={highScore}
            onRestart={handleRestartGame}
            onHome={() => router.push("/")}
          />
        )}
      </div>

      {/* Controls hint while playing */}
      {status === "running" && (
        <div
          className="mt-4 flex gap-5 font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          <span>← → ARROWS</span>
          <span style={{ color: "rgba(255,255,255,0.1)" }}>or</span>
          <span>A / D</span>
        </div>
      )}
    </div>
  );
}
