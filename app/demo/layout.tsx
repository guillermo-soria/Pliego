import { DemoUsageProvider } from "@/lib/useDemoUsage";
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
    <div style={{ background: "#f5f0e6", minHeight: "100vh", color: "#1a2428" }}>
      <DemoUsageProvider>
        <DemoBanner />

        {/* App header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "#0a3a48", borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 32px", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <svg width="22" height="26" viewBox="0 0 22 26" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="5" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="7" y="0" width="5" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="14" y="0" width="5" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
              <rect x="0" y="7" width="5" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="7" y="7" width="5" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
              <rect x="14" y="7" width="5" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="0" y="14" width="5" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="7" y="14" width="5" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="14" y="14" width="5" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
              <rect x="0" y="21" width="5" height="5" rx="1" fill="white" opacity="0.8" />
              <rect x="7" y="21" width="5" height="5" rx="1" fill="#e8952a" opacity="0.7" />
              <rect x="14" y="21" width="5" height="5" rx="1" fill="#e8952a" />
            </svg>
            <span style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.3px" }}>pliego</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <nav style={{ display: "flex", gap: 2 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ padding: "6px 12px", borderRadius: 6, fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/sign-up" style={{ padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, background: "#e8952a", color: "white", textDecoration: "none" }}>
              Crear cuenta
            </Link>
          </div>
        </header>

        <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 16px 80px" }}>
          <DemoGuard>
            <main>{children}</main>
          </DemoGuard>
        </div>
      </DemoUsageProvider>
    </div>
  );
}
