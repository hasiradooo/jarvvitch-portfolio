import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE, HEADER_IMAGE } from "@/content/Site";
import { Footer } from "@/components/site/Footer";
import { HeaderBanner } from "@/components/site/HeaderBanner";
import { Shell } from "@/components/site/Shell";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const witchcraft = localFont({
  src: "../public/fonts/WITCHCRAFT.otf",
  variable: "--font-witchcraft",
});

export const metadata: Metadata = {
  title: SITE.seo.title,
  description: SITE.seo.description,
  keywords: SITE.seo.keywords,
  metadataBase: new URL("https://jarvvitch.art"),
  openGraph: {
    title: SITE.seo.title,
    description: SITE.seo.description,
    type: "website",
    images: [{ url: HEADER_IMAGE.src, width: 1200, height: 630, alt: SITE.seo.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.seo.title,
    description: SITE.seo.description,
    images: [HEADER_IMAGE.src],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${witchcraft.variable} min-h-screen antialiased`}
      >
        <Shell>
          <HeaderBanner />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </Shell>
      </body>
    </html>
  );
}
