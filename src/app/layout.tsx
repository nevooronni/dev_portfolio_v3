import type { Metadata } from "next";
import { Archivo, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neville Oronni | Engineering Team Leader & Staff Engineer",
  description:
    "Senior Technical Leader specializing in mission-critical backends, scaling fintech platforms, and architecting high-performance systems.",
  openGraph: {
    title: "Neville Oronni | Staff Engineer",
    description:
      "Architecting high-impact engineering solutions for mission-critical systems.",
    url: "https://nevooronni.tech",
    siteName: "Neville Oronni Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neville Oronni | Staff Engineer",
    description:
      "Architecting high-impact engineering solutions for mission-critical systems.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://nevooronni.tech",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} ${geistMono.variable} bg-background text-foreground min-h-screen font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
