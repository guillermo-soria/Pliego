"use client";

import Link from "next/link";

export default function DemoLimitModal() {
  return (
    <div style={overlay}>
      <div style={card}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🚀</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: "#1a2428", letterSpacing: "-0.5px" }}>
          Agotaste los presupuestos de prueba
        </h2>
        <p style={{ fontSize: 14, color: "#6a7880", lineHeight: 1.7, marginBottom: 28, maxWidth: 340 }}>
          Usaste tus 3 presupuestos gratuitos. Creá tu cuenta gratis y obtené{" "}
          <strong style={{ color: "#e8952a" }}>presupuestos ilimitados</strong>,
          guardá el historial y gestioná tus materiales.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <Link href="/sign-up" style={btnPrimary}>
            Crear cuenta gratis — es rápido →
          </Link>
          <Link href="/sign-in" style={btnOutline}>
            Ya tengo cuenta, iniciar sesión
          </Link>
        </div>
        <p style={{ marginTop: 20, fontSize: 12, color: "#a09080" }}>
          ¿Necesitás facturación o uso intensivo? Tenemos planes para eso.
        </p>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(26,36,40,0.85)",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(6px)",
};
const card: React.CSSProperties = {
  background: "white",
  border: "1px solid #e8e0d0",
  borderRadius: 20,
  padding: "40px 36px",
  maxWidth: 440,
  width: "90%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 24px 80px rgba(26,36,40,0.2)",
};
const btnPrimary: React.CSSProperties = {
  display: "block",
  padding: "13px 20px",
  borderRadius: 10,
  background: "#e8952a",
  color: "white",
  fontWeight: 700,
  fontSize: 14,
  textDecoration: "none",
  textAlign: "center",
};
const btnOutline: React.CSSProperties = {
  display: "block",
  padding: "12px 20px",
  borderRadius: 10,
  border: "1px solid #e8e0d0",
  color: "#6a7880",
  fontWeight: 500,
  fontSize: 14,
  textDecoration: "none",
  textAlign: "center",
};
