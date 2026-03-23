"use client";

interface GameHUDProps {
  score: number;
  speed: number;
  highScore: number;
  status: string;
}

export default function GameHUD({ score, speed, highScore, status }: GameHUDProps) {
  const statusColor =
    status === "running" ? "#22c55e" :
    status === "gameover" ? "#ff0033" :
    "rgba(255,255,255,0.2)";

  const statusGlow = status === "running" ? "0 0 8px #22c55e" : "none";

  return (
    <div
      className="w-full flex items-stretch"
      style={{
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {/* Score */}
      <div
        className="flex-1 flex flex-col items-start justify-center px-4 py-3"
        style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span
          className="uppercase font-semibold mb-0.5"
          style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Score
        </span>
        <span
          className="font-black tabular-nums leading-none"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1.5rem",
            color: "#ffffff",
          }}
        >
          {score.toString().padStart(6, "0")}
        </span>
      </div>

      {/* Speed — center */}
      <div className="flex flex-col items-center justify-center px-4 py-3"
        style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span
          className="uppercase font-semibold mb-1"
          style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Speed
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: statusColor, boxShadow: statusGlow }}
          />
          <span
            className="font-bold tabular-nums leading-none"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1.1rem",
              color: "#a78bfa",
            }}
          >
            {speed.toFixed(1)}×
          </span>
        </div>
      </div>

      {/* Best */}
      <div className="flex-1 flex flex-col items-end justify-center px-4 py-3">
        <span
          className="uppercase font-semibold mb-0.5"
          style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Best
        </span>
        <span
          className="font-black tabular-nums leading-none"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1.5rem",
            color: "#ff0033",
          }}
        >
          {highScore.toString().padStart(6, "0")}
        </span>
      </div>
    </div>
  );
}
