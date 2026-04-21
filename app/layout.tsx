import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pliego — Presupuestos",
  description: "Gestión de presupuestos para imprenta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <ClerkProvider>
          {children}
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
