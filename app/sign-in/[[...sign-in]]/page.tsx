import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div style={wrapper}>
      <Link href="/" style={logo}>Pliego</Link>
      <p style={sub}>Iniciá sesión para acceder a tus presupuestos</p>
      <SignIn />
      <p style={footer}>
        ¿No tenés cuenta?{" "}
        <Link href="/sign-up" style={footerLink}>Crear cuenta gratis</Link>
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
  gap: 0,
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
  marginBottom: 24,
  textAlign: "center",
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
