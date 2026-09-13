import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import dynamic from "next/dynamic";

/* ── Heavy client components loaded dynamically to keep initial bundle lean ── */
const Shoutbox = dynamic(() => import("@/components/Shoutbox").then(m => ({ default: m.Shoutbox })));
const AICopilot = dynamic(() => import("@/components/AICopilot").then(m => ({ default: m.AICopilot })));
const WhatsAppFAB = dynamic(() => import("@/components/WhatsAppFAB").then(m => ({ default: m.WhatsAppFAB })));
const PWAInstallPrompt = dynamic(() => import("@/components/PWAInstallPrompt").then(m => ({ default: m.PWAInstallPrompt })));

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
  manifest: "/manifest.webmanifest",
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
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DIVINE",
  },
  other: {
    "mobile-web-app-capable": "yes",
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
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Shoutbox />
          <AICopilot />
          <WhatsAppFAB />
          <PWAInstallPrompt />
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log("%cDIVINE RADIO LONDON — IP PROTECTED BY HECTIC", "font-weight: bold; font-size: 15px; color: #C9A84C; background: #09090b; padding: 8px 14px; border: 1px solid rgba(201,168,76,0.5); border-radius: 4px;");
console.log("%cAll broadcast telemetry, audio pipeline, styling, and code are proprietary intellectual property. Unauthorized scraping, replication, or distribution is prohibited.", "color: #71717a; font-size: 11px;");`,
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
