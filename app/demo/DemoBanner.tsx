"use client";

import Link from "next/link";
import { useDemoUsage, DEMO_MAX_USES } from "@/lib/useDemoUsage";

export default function DemoBanner() {
  const { usesLeft, limitReached } = useDemoUsage();

  if (limitReached) {
    return (
      <div style={{ background: "#7f1d1d", color: "#fca5a5", textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 500 }}>
        Límite de la demo alcanzado ·{" "}
        <Link href="/sign-up" style={{ color: "#fca5a5", fontWeight: 700, textDecoration: "underline" }}>
          Crear cuenta gratis para continuar →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#f97316", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 500 }}>
      Modo demo ·{" "}
      <span style={{ opacity: 0.85 }}>
        {usesLeft} de {DEMO_MAX_USES} cálculos restantes
      </span>
      {" · "}
      <Link href="/sign-up" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>
        Crear cuenta gratis →
      </Link>
    </div>
  );
}
