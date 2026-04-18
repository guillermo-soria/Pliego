import { ClerkProvider, Show, SignInButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pliego — Presupuestos",
  description: "Gestión de presupuestos para stickers y laminados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClerkProvider>
          <Show when="signed-out">
            {/* Solo visible en rutas públicas — el dashboard tiene su propio header */}
            <header style={{ display: "none" }}>
              <SignInButton />
            </header>
          </Show>
          <Show when="signed-in">
            <header style={{ display: "none" }}>
              <UserButton />
            </header>
          </Show>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
