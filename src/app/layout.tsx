import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./globals.css";
import Providers from "@/app/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shop App | Votre destination pour un e-commerce intuitif",
  description:
    "Découvrez notre application e-commerce intuitive, offrant une expérience d'achat fluide et des produits de qualité.",
  keywords:
    "e-commerce, shopping en ligne, application de commerce, achats faciles, produits de qualité, service client",
  robots: "index, follow",
  openGraph: {
    title: "Shop App | Votre destination pour un e-commerce intuitif",
    description:
      "Découvrez notre application e-commerce intuitive, offrant une expérience d'achat fluide et des produits de qualité.",
    url: "https://shop-app-mu-pearl.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://shop-app-mu-pearl.vercel.app/TopCropped.webp",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop App | Votre destination pour un e-commerce intuitif",
    description:
      "Découvrez notre application e-commerce intuitive, offrant une expérience d'achat fluide et des produits de qualité.",
    images: [
      {
        url: "https://shop-app-mu-pearl.vercel.app/TopCropped.webp",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased bg-white overflow-x-hidden",
          fontSans.variable
        )}
      >
        <div className="min-h-screen">
          <Providers>
            {children}
            <Toaster />
            <SonnerToaster />
          </Providers>
        </div>
      </body>
    </html>
  );
}
