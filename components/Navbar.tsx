"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-xl" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center">
              <svg
                width="38"
                height="38"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_14px_rgba(255,0,80,0.7)]"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="carGrad" x1="8" y1="12" x2="56" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff0033" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 38L20 26C21.2 22.7 24.3 20.5 27.8 20.5H40.5C44.2 20.5 47.5 22.9 48.6 26.4L50.5 32H54C56.8 32 59 34.2 59 37V41C59 43.2 57.2 45 55 45H52.5C51.9 49.3 48.2 52.5 43.8 52.5C39.4 52.5 35.7 49.3 35.1 45H28.9C28.3 49.3 24.6 52.5 20.2 52.5C15.8 52.5 12.1 49.3 11.5 45H9C6.8 45 5 43.2 5 41V38.5C5 35.5 7.5 33 10.5 33H14L16 38Z"
                  fill="url(#carGrad)"
                />
                <path
                  d="M24 27.5H40C42.1 27.5 43.8 29.2 43.8 31.3V33H19.8L21 29.8C21.6 28.4 22.7 27.5 24 27.5Z"
                  fill="white"
                  fillOpacity="0.18"
                />
                <circle cx="20.5" cy="45" r="5.5" fill="#111111" />
                <circle cx="43.5" cy="45" r="5.5" fill="#111111" />
                <circle cx="20.5" cy="45" r="2.3" fill="#d1d5db" />
                <circle cx="43.5" cy="45" r="2.3" fill="#d1d5db" />
                <circle cx="15" cy="36" r="1.7" fill="#fde68a" />
                <circle cx="50" cy="36" r="1.7" fill="#fca5a5" />
              </svg>
            </span>
            <span className="text-xl font-bold tracking-wide">
              <span style={{ color: "#ff0033" }}>ZA</span>
              <span className="text-white"> RACING</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/#about"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            Stack
          </Link>
          <Link href="/game" className="btn-primary text-sm px-6 py-2">
            Play Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{
            background: "rgba(5,5,5,0.95)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Link href="/#features" className="text-sm text-white/50 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link href="/#about" className="text-sm text-white/50 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
            Stack
          </Link>
          <Link href="/game" className="btn-primary text-sm text-center" onClick={() => setIsOpen(false)}>
            Play Now
          </Link>
        </div>
      )}
    </nav>
  );
}
