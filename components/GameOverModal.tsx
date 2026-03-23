"use client";

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  onHome: () => void;
}

export default function GameOverModal({
  score,
  highScore,
  onRestart,
  onHome,
}: GameOverModalProps) {
  const isNewRecord = score >= highScore && score > 0;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-20"
      style={{
        background: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "fade-in 0.3s ease both",
      }}
    >
      <div
        className="relative w-80 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d0d18 0%, #050508 100%)",
          border: "1px solid rgba(255, 0, 51, 0.35)",
          boxShadow: [
            "0 0 0 1px rgba(255, 0, 51, 0.08)",
            "0 0 50px rgba(255, 0, 51, 0.25)",
            "0 0 100px rgba(124, 58, 237, 0.12)",
            "0 30px 60px rgba(0,0,0,0.5)",
          ].join(", "),
          animation: "fade-up 0.35s ease both",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, #ff0033 40%, #7c3aed 60%, transparent)",
          }}
        />

        <div className="px-8 pt-8 pb-8 text-center">
          {/* Icon */}
          <div
            className="text-4xl mb-4 select-none"
            style={{ filter: "drop-shadow(0 0 10px rgba(255,0,51,0.5))" }}
          >
            💥
          </div>

          {/* Title */}
          <h2
            className="font-black tracking-tight leading-none mb-1"
            style={{
              fontSize: "2.25rem",
              background: "linear-gradient(135deg, #ffffff, #ff0033)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            GAME OVER
          </h2>

          {/* New record badge */}
          {isNewRecord && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mt-2 mb-1 text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{
                background: "rgba(124, 58, 237, 0.15)",
                border: "1px solid rgba(124, 58, 237, 0.35)",
                color: "#a78bfa",
              }}
            >
              <span>🏆</span> New Record
            </div>
          )}

          {/* Scores */}
          <div className="mt-6 mb-7 space-y-2.5">
            {/* Your score — hero display */}
            <div
              className="rounded-xl px-4 py-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="uppercase font-semibold mb-1"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Your Score
              </div>
              <div
                className="font-black tabular-nums leading-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "2.75rem",
                  color: "#ffffff",
                }}
              >
                {score.toString().padStart(6, "0")}
              </div>
            </div>

            {/* Best score */}
            <div
              className="rounded-xl px-4 py-3"
              style={{
                background: "rgba(255, 0, 51, 0.06)",
                border: "1px solid rgba(255, 0, 51, 0.15)",
              }}
            >
              <div
                className="uppercase font-semibold mb-0.5"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Best Score
              </div>
              <div
                className="font-black tabular-nums leading-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "1.75rem",
                  color: "#ff0033",
                }}
              >
                {highScore.toString().padStart(6, "0")}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onRestart}
              className="btn-primary w-full py-3 font-bold"
              style={{ fontSize: "0.9rem" }}
            >
              Race Again
            </button>
            <button
              onClick={onHome}
              className="btn-secondary w-full py-3 font-semibold"
              style={{ fontSize: "0.9rem" }}
            >
              Main Menu
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-[1px] w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(124,58,237,0.3), transparent)",
          }}
        />
      </div>
    </div>
  );
}
