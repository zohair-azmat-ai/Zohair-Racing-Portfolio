import Link from "next/link";
import Navbar from "@/components/Navbar";

const stats = [
  { value: "60 FPS", label: "Smooth real-time gameplay" },
  { value: "Canvas", label: "Native browser rendering" },
  { value: "Fast UI", label: "Built with Next.js + TypeScript" },
];

const features = [
  {
    icon: "🎮",
    title: "Smooth Controls",
    description:
      "Responsive lane movement with keyboard steering designed for arcade-style gameplay.",
  },
  {
    icon: "⚡",
    title: "Dynamic Difficulty",
    description:
      "The pace increases as you survive longer, turning every run into a sharper challenge.",
  },
  {
    icon: "🏁",
    title: "Live Score Tracking",
    description:
      "Your score updates continuously during the run, with a best-score chase built in.",
  },
  {
    icon: "💥",
    title: "Collision System",
    description:
      "Clean hit detection keeps the gameplay fair, readable, and satisfying to master.",
  },
  {
    icon: "🖥️",
    title: "Canvas Rendering",
    description:
      "The track and vehicles render in-browser with a focused, performance-friendly approach.",
  },
  {
    icon: "🧠",
    title: "Modern Frontend Build",
    description:
      "Structured with reusable components, TypeScript, and a clean App Router setup.",
  },
];

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "HTML5 Canvas",
  "React Hooks",
  "App Router",
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <BackgroundGlow />

      <section className="relative px-6 pb-20 pt-32 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/65 backdrop-blur-md">
              Portfolio Project · Browser Racing Experience
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-tight drop-shadow-[0_0_25px_rgba(255,0,80,0.25)] sm:text-6xl lg:text-7xl">
              <span className="block">ZA</span>
              <span className="brand-gradient block">Racing</span>
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-loose text-white/80 sm:text-lg">
              A premium browser-based racing game built with Next.js and HTML5
              Canvas, designed to showcase polished UI, responsive gameplay, and
              modern frontend architecture.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/game" className="btn-primary min-w-[180px]">
                Play Game
              </Link>
              <a href="#features" className="btn-secondary min-w-[180px]">
                Explore Features
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="surface-card text-left">
                  <div className="text-lg font-bold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-white/55">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="hero-preview transition-all duration-500 hover:scale-[1.05]">
              <div className="hero-preview__hud">
                <span>SCORE 024850</span>
                <span>SPD 4.8x</span>
                <span>BEST 091320</span>
              </div>

              <div className="hero-preview__road">
                <span className="lane lane-1" />
                <span className="lane lane-2" />
                <span className="lane lane-3" />

                <div className="car enemy enemy-1" />
                <div className="car enemy enemy-2" />
                <div className="car player" />
              </div>

              <div className="hero-preview__footer">
                Built for portfolio impact
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Game Features"
            title="Built to look sharp and play fast."
            description="A focused set of features built to highlight smooth gameplay, clean interaction design, and strong frontend execution."
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-panel">
              <p className="section-eyebrow">Why this project matters</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                More than a landing page.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                ZA Racing is a frontend showcase piece built to demonstrate
                structure, interaction design, game-state thinking, and browser
                rendering in a way that stands out from standard CRUD projects.
              </p>
            </div>

            <div className="surface-panel">
              <p className="section-eyebrow">Tech Stack</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Modern tools, clean execution.
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {stack.map((tech) => (
                  <span key={tech} className="stack-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-24 pt-6">
        <div className="mx-auto max-w-4xl">
          <div className="cta-shell bg-gradient-to-r from-[#ff0033]/10 via-transparent to-[#a855f7]/10 text-center">
            <p className="section-eyebrow">Ready to drive?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] sm:text-4xl">
              Launch the game and test your reflexes.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-white/80 sm:text-base">
              No downloads. No setup. Open the game, hit play, and see how long
              you can stay ahead of traffic.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/game" className="btn-primary min-w-[190px] shadow-[0_0_30px_rgba(255,0,80,0.5)]">
                Start Racing
              </Link>
              <a
                href="https://github.com/ZohairAzmat/zohair-racing-game"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary min-w-[190px]"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/8 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-medium text-white/75">ZA Racing</p>
            <p className="mt-1 text-sm text-white/42">
              Built by Zohair Azmat
            </p>
          </div>

          <a
            href="https://github.com/ZohairAzmat/zohair-racing-game"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/55 transition hover:text-white"
          >
            GitHub Repository
          </a>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-white/62 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_26%),radial-gradient(circle_at_20%_30%,rgba(255,0,51,0.14),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(124,58,237,0.12),transparent_18%)]" />
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-[0.22]" />
    </>
  );
}