import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "DIVINE | The Higher State of Audio",
    template: "%s | DIVINE",
  },
  description:
    "DIVINE — London's premier DAB digital broadcast network. The higher state of audio. Soulful house, garage, jungle, D&B, Afrobeats, and ambient — 24/7.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "DIVINE",
    title: "DIVINE | The Higher State of Audio",
    description:
      "London's premier DAB digital broadcast network. Soulful house, garage, jungle, D&B, and more — 24/7.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIVINE | The Higher State of Audio",
    description:
      "London's premier DAB digital broadcast. 24/7 soulful house, garage, jungle, D&B, Afrobeats.",
    creator: "@divineradioldn",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white antialiased font-sans flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
