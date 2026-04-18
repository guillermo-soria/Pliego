import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/dashboard/pliego",      label: "Pliego" },
  { href: "/dashboard/presupuesto", label: "Presupuesto" },
  { href: "/dashboard/materiales",  label: "Materiales" },
  { href: "/dashboard/historial",   label: "Historial" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "20px 16px 80px" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, paddingBottom: 18, borderBottom: "1px solid #2e2e38" }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -1, color: "#f97316" }}>
          mati<span style={{ color: "#f1f0ed" }}>ssa</span>
        </div>
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
          <UserButton />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
