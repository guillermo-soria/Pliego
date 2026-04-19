import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div style={wrapper}>
      <Link href="/" style={logo}>Pliego</Link>
      <p style={sub}>Creá tu cuenta gratis y guardá tus presupuestos</p>
      <div style={badge}>Incluye 30 créditos de cálculo</div>
      <SignUp />
      <p style={footer}>
        ¿Ya tenés cuenta?{" "}
        <Link href="/sign-in" style={footerLink}>Iniciar sesión</Link>
      </p>
    </div>
  );
}

const wrapper: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0f0f11",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
};
const logo: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: "#f97316",
  letterSpacing: -1,
  textDecoration: "none",
  marginBottom: 8,
};
const sub: React.CSSProperties = {
  color: "#71717a",
  fontSize: 14,
  marginBottom: 12,
  textAlign: "center",
};
const badge: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: 20,
  border: "1px solid rgba(249,115,22,.4)",
  color: "#f97316",
  fontSize: 12,
  fontFamily: "monospace",
  marginBottom: 24,
};
const footer: React.CSSProperties = {
  marginTop: 20,
  fontSize: 14,
  color: "#71717a",
};
const footerLink: React.CSSProperties = {
  color: "#f97316",
  textDecoration: "none",
  fontWeight: 600,
};
