import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimationProvider from "@/components/animations/AnimationProvider";
import "./globals.css";
const sans = localFont({
  src: "./fonts/dm-sans.ttf",
  weight: "100 1000",
  variable: "--font-body",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "./fonts/cormorant.ttf", weight: "400 600", style: "normal" },
    {
      path: "./fonts/cormorant-italic.ttf",
      weight: "400 600",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Elsewhere — Go beyond the ordinary",
    template: "%s | Elsewhere Travel",
  },
  description:
    "Thoughtful journeys, extraordinary places. Explore flights, beautiful stays, visa guidance, and the freedom of the open road. An illustrative travel experience.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Elsewhere — Go beyond the ordinary",
    description:
      "For the places you’ve always dreamed of. And the ones you haven’t found yet.",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 800,
        alt: "Colorful Italian coastal village",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#153d3b",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <AnimationProvider>
          <main id="main-content">{children}</main>
        </AnimationProvider>
        <Footer />
      </body>
    </html>
  );
}
