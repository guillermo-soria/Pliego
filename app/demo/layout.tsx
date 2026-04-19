import Link from "next/link";
import DemoBanner from "./DemoBanner";
import DemoGuard from "./DemoGuard";

const NAV_LINKS = [
  { href: "/demo/pliego",      label: "Pliego" },
  { href: "/demo/presupuesto", label: "Presupuesto" },
  { href: "/demo/materiales",  label: "Materiales" },
  { href: "/demo/historial",   label: "Historial" },
];

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#0f0f11", minHeight: "100vh", color: "#f1f0ed" }}>
      <DemoBanner />

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "20px 16px 80px" }}>
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 18, borderBottom: "1px solid #2e2e38" }}>
          <Link href="/" style={{ fontSize: 24, fontWeight: 700, letterSpacing: -1, color: "#f97316", textDecoration: "none" }}>
            Pliego
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <nav style={{ display: "flex", gap: 4 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ padding: "7px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#71717a", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/sign-up" style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#f97316", color: "#fff", textDecoration: "none" }}>
              Crear cuenta
            </Link>
          </div>
        </header>

        <DemoGuard>
          <main>{children}</main>
        </DemoGuard>
      </div>
    </div>
  );
}
