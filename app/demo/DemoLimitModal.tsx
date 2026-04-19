"use client";

import Link from "next/link";

export default function DemoLimitModal() {
  return (
    <div style={overlay}>
      <div style={card}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>⚡</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: "#f1f0ed" }}>
          Alcanzaste el límite de la demo
        </h2>
        <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.7, marginBottom: 28, maxWidth: 320 }}>
          Usaste todos tus cálculos gratuitos. Registrate gratis y obtené{" "}
          <strong style={{ color: "#f97316" }}>30 créditos</strong> para seguir
          calculando y guardar tus presupuestos.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <Link href="/sign-up" style={btnPrimary}>
            Crear cuenta gratis — 30 créditos →
          </Link>
          <Link href="/sign-in" style={btnOutline}>
            Ya tengo cuenta, iniciar sesión
          </Link>
        </div>
        <p style={{ marginTop: 20, fontSize: 12, color: "#3f3f46" }}>
          ¿Necesitás más? Tenemos planes para uso intensivo.
        </p>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.85)",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
};
const card: React.CSSProperties = {
  background: "#1e1e24",
  border: "1px solid #2e2e38",
  borderRadius: 20,
  padding: "40px 36px",
  maxWidth: 420,
  width: "90%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const btnPrimary: React.CSSProperties = {
  display: "block",
  padding: "13px 20px",
  borderRadius: 10,
  background: "#f97316",
  color: "#fff",
  fontWeight: 700,
  fontSize: 14,
  textDecoration: "none",
  textAlign: "center",
};
const btnOutline: React.CSSProperties = {
  display: "block",
  padding: "12px 20px",
  borderRadius: 10,
  border: "1px solid #2e2e38",
  color: "#71717a",
  fontWeight: 500,
  fontSize: 14,
  textDecoration: "none",
  textAlign: "center",
};
