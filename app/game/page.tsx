import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import GameCanvas from "@/components/GameCanvas";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Play",
  description:
    "Play ZA Racing — a browser-based car racing game. Dodge traffic, survive as long as possible, and beat your high score.",
};

export default function GamePage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />

      <div
        className="flex-1 flex flex-col items-center justify-center pt-24 pb-14 md:pb-14 pb-36 px-4"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(124,58,237,0.07) 0%, transparent 60%)",
        }}
      >
        {/* Page header */}
        <div className="text-center mb-8">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            ZA Racing
          </p>
          <h1
            className="font-black tracking-tight leading-none"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              background: "linear-gradient(135deg, #ffffff 30%, #ff0033 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Race
          </h1>
        </div>

        {/* Game canvas */}
        <GameCanvas />

        {/* Back link */}
        <Link
          href="/"
          className="mt-8 text-xs font-mono uppercase tracking-[0.14em] transition-colors duration-200 flex items-center gap-1.5 text-white/25 hover:text-white/55"
        >
          ← Main Menu
        </Link>
      </div>
    </main>
  );
}
