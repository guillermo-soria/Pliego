import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

function PLogoMark() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="6" height="6" rx="1" fill="white" />
      <rect x="8" y="0" width="6" height="6" rx="1" fill="white" />
      <rect x="16" y="0" width="6" height="6" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="0" y="8" width="6" height="6" rx="1" fill="white" />
      <rect x="8" y="8" width="6" height="6" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="16" y="8" width="6" height="6" rx="1" fill="white" />
      <rect x="0" y="16" width="6" height="6" rx="1" fill="white" />
      <rect x="8" y="16" width="6" height="6" rx="1" fill="white" />
      <rect x="16" y="16" width="6" height="6" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="0" y="24" width="6" height="6" rx="1" fill="white" />
      <rect x="8" y="24" width="6" height="6" rx="1" fill="#e8952a" opacity="0.7" />
      <rect x="16" y="24" width="6" height="6" rx="1" fill="#e8952a" />
    </svg>
  );
}

export default function SignUpPage() {
  return (
    <div style={wrapper}>
      <div style={bgGrid} aria-hidden="true" />

      <div style={card}>
        <Link href="/" style={logoLink}>
          <PLogoMark />
          <span style={logoText}>pliego</span>
        </Link>

        <div style={tagWrap}>
          <span style={tagDot} />
          Gratis · Sin tarjeta de crédito
        </div>

        <h1 style={heading}>Creá tu cuenta</h1>
        <p style={sub}>Guardá tus materiales y presupuestos en un solo lugar.</p>

        <SignUp />

        <p style={footer}>
          ¿Ya tenés cuenta?{" "}
          <Link href="/sign-in" style={footerLink}>Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

const wrapper: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0a3a48",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 16px",
  position: "relative",
  fontFamily: "var(--font-inter), 'Inter', Helvetica, sans-serif",
};

const bgGrid: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: [
    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  ].join(","),
  backgroundSize: "80px 80px",
  pointerEvents: "none",
};

const card: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: 480,
};

const logoLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  textDecoration: "none",
  marginBottom: 28,
};

const logoText: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 800,
  color: "white",
  letterSpacing: "-0.5px",
};

const tagWrap: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "rgba(232,149,42,0.15)",
  border: "1px solid rgba(232,149,42,0.3)",
  color: "#f5b84a",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "5px 14px",
  borderRadius: 100,
  marginBottom: 20,
};

const tagDot: React.CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "#e8952a",
  flexShrink: 0,
};

const heading: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 900,
  color: "white",
  letterSpacing: "-1px",
  marginBottom: 8,
  textAlign: "center",
};

const sub: React.CSSProperties = {
  fontSize: 15,
  color: "rgba(255,255,255,0.5)",
  marginBottom: 28,
  textAlign: "center",
  lineHeight: 1.5,
};

const footer: React.CSSProperties = {
  marginTop: 20,
  fontSize: 14,
  color: "rgba(255,255,255,0.4)",
  textAlign: "center",
};

const footerLink: React.CSSProperties = {
  color: "#e8952a",
  textDecoration: "none",
  fontWeight: 600,
};
