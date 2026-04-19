import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pliego — Presupuestos para imprenta",
  description:
    "Calculá presupuestos de stickers y laminados en segundos. Armado en pliego automático, historial de cotizaciones y gestión de materiales.",
  openGraph: {
    title: "Pliego — Presupuestos para imprenta",
    description:
      "Calculá presupuestos de stickers y laminados en segundos. Armado en pliego automático, historial de cotizaciones y gestión de materiales.",
    type: "website",
  },
};

const FEATURES = [
  {
    icon: "▦",
    title: "Armado en pliego",
    desc: "Calculá cuántos stickers entran por hoja automáticamente. Soporta orientación normal y rotada para aprovechar al máximo cada pliego.",
  },
  {
    icon: "$",
    title: "Presupuesto al instante",
    desc: "Seleccioná tus materiales, definí la ganancia deseada y obtené el precio por unidad en segundos. Sin hojas de cálculo.",
  },
  {
    icon: "↻",
    title: "Historial de cotizaciones",
    desc: "Guardá cada presupuesto con un snapshot de los precios. Revisá y eliminá cotizaciones anteriores cuando quieras.",
  },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f0f11", color: "#f1f0ed", fontFamily: "system-ui, sans-serif" }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Pliego",
            applicationCategory: "BusinessApplication",
            description: "App para calcular presupuestos de stickers y laminados con armado en pliego automático.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            operatingSystem: "Web",
          }),
        }}
      />

      {/* Nav */}
      <nav style={{ maxWidth: 920, margin: "0 auto", padding: "20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#f97316", letterSpacing: -1 }}>Pliego</span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/demo" style={linkStyle}>Ver demo</Link>
          <Link href="/sign-in" style={btnOutline}>Iniciar sesión</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 920, margin: "0 auto", padding: "80px 16px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 20, border: "1px solid #2e2e38", fontSize: 12, color: "#71717a", marginBottom: 28, fontFamily: "monospace" }}>
          Demo disponible — sin registro
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 20 }}>
          Presupuestos de stickers{" "}
          <span style={{ color: "#f97316" }}>en segundos</span>
        </h1>
        <p style={{ fontSize: 18, color: "#71717a", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Calculá cuántos stickers entran en una hoja, armá cotizaciones con tus materiales y guardá el historial. Sin hojas de cálculo.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/demo" style={btnPrimary}>Ver demo →</Link>
          <Link href="/sign-up" style={btnOutline}>Crear cuenta gratis</Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={featureCard}>
              <div style={{ fontSize: 28, marginBottom: 14, color: "#f97316", fontFamily: "monospace" }}>{f.icon}</div>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h2>
              <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={{ maxWidth: 920, margin: "0 auto", padding: "0 16px 100px", textAlign: "center" }}>
        <div style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 20, padding: "48px 32px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Empezá gratis hoy</h2>
          <p style={{ color: "#71717a", fontSize: 15, marginBottom: 28 }}>
            Cargá tus materiales, calculá tus pliegos y empezá a cotizar en minutos.
          </p>
          <Link href="/sign-up" style={btnPrimary}>Crear cuenta gratis</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #2e2e38", padding: "24px 16px", textAlign: "center" }}>
        <p style={{ color: "#3f3f46", fontSize: 13, margin: 0 }}>
          © {new Date().getFullYear()} Pliego · <Link href="/demo" style={{ color: "#71717a", textDecoration: "none" }}>Demo</Link>
        </p>
      </footer>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  display: "inline-block", padding: "12px 24px", borderRadius: 8,
  background: "#f97316", color: "#fff", fontWeight: 600, fontSize: 14,
  textDecoration: "none",
};
const btnOutline: React.CSSProperties = {
  display: "inline-block", padding: "12px 24px", borderRadius: 8,
  border: "1px solid #2e2e38", color: "#f1f0ed", fontWeight: 600, fontSize: 14,
  textDecoration: "none", background: "transparent",
};
const linkStyle: React.CSSProperties = {
  color: "#71717a", fontSize: 14, textDecoration: "none",
};
const featureCard: React.CSSProperties = {
  background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 14, padding: 24,
};
