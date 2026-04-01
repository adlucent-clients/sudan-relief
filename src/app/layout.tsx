import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudan Relief — MIST 2026 Humanitarian Services",
  description:
    "The people of Sudan are facing one of the world's most devastating humanitarian crises. Join us in providing urgent relief. Donate today through Zelle or Cash App.",
  openGraph: {
    title: "Sudan Relief — MIST 2026 Humanitarian Services",
    description:
      "24 million people need help. The people of Sudan are facing one of the world's most devastating humanitarian crises. Join us.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
