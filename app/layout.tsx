import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#E8002D",
};

export const metadata: Metadata = {
  title: {
    default: "ZA Racing | Premium Web Car Racing Game",
    template: "%s | ZA Racing",
  },
  description:
    "A premium browser-based car racing game built with Next.js, TypeScript, Tailwind CSS, and HTML5 Canvas. Designed and developed by Zohair Azmat as a portfolio-grade frontend project.",
  keywords: [
    "racing game",
    "browser game",
    "Next.js",
    "TypeScript",
    "canvas game",
    "HTML5 Canvas",
    "portfolio",
    "Zohair Azmat",
  ],
  authors: [{ name: "Zohair Azmat" }],
  creator: "Zohair Azmat",
  metadataBase: new URL("https://za-racing.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://za-racing.vercel.app",
    siteName: "ZA Racing",
    title: "ZA Racing | Premium Web Car Racing Game",
    description:
      "A premium browser-based car racing game built with Next.js, TypeScript, and HTML5 Canvas. Developed by Zohair Azmat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZA Racing | Premium Web Car Racing Game",
    description:
      "A premium browser-based car racing game built with Next.js, TypeScript, and HTML5 Canvas. Developed by Zohair Azmat.",
    creator: "@ZohairAzmat",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#050505] text-white antialiased">{children}</body>
    </html>
  );
}
