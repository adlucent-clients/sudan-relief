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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
