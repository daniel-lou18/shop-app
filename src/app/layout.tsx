import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./globals.css";
import Providers from "@/app/providers";
import { METADATA } from "@/lib/constants";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = METADATA;

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
