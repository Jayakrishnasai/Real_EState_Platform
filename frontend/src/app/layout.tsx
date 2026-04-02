import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SSP Estates | Curated Luxury Properties",
  description: "Experience architectural perfection with SSP Estates. Explore a global portfolio of the world's most exclusive premium residences.",
  keywords: ["real estate", "luxury property", "villa", "penthouse", "architecture", "SSP Estates"],
  openGraph: {
    title: "SSP Estates | Curated Luxury Properties",
    description: "Discover extraordinary residences in the world's most sought-after locations.",
    images: ["/preview.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSP Estates | Luxury Real Estate",
    description: "Architectural perfection at your fingertips.",
    images: ["/preview.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-premium-900 text-white selection:bg-gold-500/30">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
