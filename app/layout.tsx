import type { Metadata, Viewport } from "next";
import { Quicksand, Caveat } from "next/font/google";
import "./globals.css";

const mainFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const accentFont = Caveat({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Photo To Ghibli",
  description: "Transform your images with Studio Ghibli art style",
  applicationName: "Photo To Ghibli",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Photo To Ghibli"
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.variable} ${accentFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
