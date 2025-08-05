import type React from "react";
import type { Metadata } from "next";
import { Inter, Fira_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PayoutPilot - Payout Management System",
  description: "Modern payout management and scheduling platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${firaMono.className}`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
