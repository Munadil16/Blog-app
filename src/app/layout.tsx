import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App: Create and Explore Blogs",
  authors: [{ name: "Munadil" }],
  keywords: ["Blog App", "Blogs"],
  metadataBase: new URL("https://blogapp-v0.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://blogapp-v0.vercel.app",
    title: "Blog App",
    description: "Blog App: Create and Explore Blogs",
    siteName: "Blog App",
    images: "/blogapp.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog App",
    description: "Blog App: Create and Explore Blogs",
    images: ["https://blogapp-v0.vercel.app/blogapp.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "black",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
