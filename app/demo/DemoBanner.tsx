"use client";

import Link from "next/link";
import { DEMO_MAX_USES, useDemoUsage } from "@/lib/useDemoUsage";

export default function DemoBanner() {
  const { uses, limitReached } = useDemoUsage();

  if (limitReached) {
    return (
      <div style={{ background: "#1a2428", color: "rgba(255,255,255,0.8)", textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 500 }}>
        Límite de la demo alcanzado ·{" "}
        <Link href="/sign-up" style={{ color: "#f5b84a", fontWeight: 700, textDecoration: "underline" }}>
          Crear cuenta gratis para continuar →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#e8952a", color: "white", textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 500 }}>
      Modo demo ·{" "}
      {uses === 0 ? (
        <span style={{ opacity: 0.85 }}>{DEMO_MAX_USES} presupuestos gratuitos disponibles</span>
      ) : (
        <span style={{ opacity: 0.85 }}>{uses}/{DEMO_MAX_USES} presupuestos utilizados</span>
      )}
      {" · "}
      <Link href="/sign-up" style={{ color: "white", fontWeight: 700, textDecoration: "underline" }}>
        Crear cuenta gratis →
      </Link>
    </div>
  );
}
