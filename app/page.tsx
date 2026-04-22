import type { Metadata } from "next";
import Link from "next/link";
import s from "./landing.module.css";

export const metadata: Metadata = {
  title: "Pliego — Presupuestos para emprendedores",
  description:
    "Cargá tus materiales, el tiempo de trabajo y tu margen. Pliego calcula el precio justo al instante — para cualquier rubro.",
  openGraph: {
    title: "Pliego — Presupuestos para emprendedores",
    description:
      "Cargá tus materiales, el tiempo de trabajo y tu margen. Pliego calcula el precio justo al instante — para cualquier rubro.",
    type: "website",
  },
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
      <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PLogoMark({ size = "nav" }: { size?: "nav" | "hero" | "footer" }) {
  if (size === "hero") {
    return (
      <svg width="420" height="460" viewBox="0 0 420 460" xmlns="http://www.w3.org/2000/svg">
        {/* R0 */}
        <rect x="30" y="13" width="64" height="64" rx="10" fill="white" />
        <rect x="104" y="13" width="64" height="64" rx="10" fill="white" />
        <rect x="178" y="13" width="64" height="64" rx="10" fill="white" />
        <rect x="252" y="13" width="64" height="64" rx="10" fill="white" />
        <rect x="326" y="13" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        {/* R1 */}
        <rect x="30" y="87" width="64" height="64" rx="10" fill="white" />
        <rect x="104" y="87" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="178" y="87" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="252" y="87" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="326" y="87" width="64" height="64" rx="10" fill="white" />
        {/* R2 */}
        <rect x="30" y="161" width="64" height="64" rx="10" fill="white" />
        <rect x="104" y="161" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="178" y="161" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="252" y="161" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="326" y="161" width="64" height="64" rx="10" fill="white" />
        {/* R3 */}
        <rect x="30" y="235" width="64" height="64" rx="10" fill="white" />
        <rect x="104" y="235" width="64" height="64" rx="10" fill="white" />
        <rect x="178" y="235" width="64" height="64" rx="10" fill="white" />
        <rect x="252" y="235" width="64" height="64" rx="10" fill="white" />
        <rect x="326" y="235" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        {/* R4 */}
        <rect x="30" y="309" width="64" height="64" rx="10" fill="white" />
        <rect x="104" y="309" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="178" y="309" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="252" y="309" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="326" y="309" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        {/* R5 accent */}
        <rect x="30" y="383" width="64" height="64" rx="10" fill="white" />
        <rect x="104" y="383" width="64" height="64" rx="10" fill="rgba(255,255,255,0.1)" />
        <rect x="178" y="383" width="64" height="64" rx="10" fill="#e8952a" opacity="0.5" />
        <rect x="252" y="383" width="64" height="64" rx="10" fill="#e8952a" opacity="0.8" />
        <rect x="326" y="383" width="64" height="64" rx="10" fill="#e8952a" />
      </svg>
    );
  }

  if (size === "footer") {
    return (
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
    );
  }

  // nav (default)
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

function PricingCheck({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
        background: color === "amber" ? "rgba(232,149,42,0.2)" : "rgba(26,107,124,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1,
      }}
    >
      <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
        <polyline
          points="2,6 5,9 10,3"
          stroke={color === "amber" ? "#e8952a" : "#1a6b7c"}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className={s.page}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Pliego",
            applicationCategory: "BusinessApplication",
            description: "App para calcular presupuestos para emprendedores que producen y venden productos físicos.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            operatingSystem: "Web",
          }),
        }}
      />

      {/* ═══════ NAV ═══════ */}
      <nav className={s.nav}>
        <Link href="/" className={s.navLogo}>
          <PLogoMark size="nav" />
          <span className={s.navLogoText}>Pliego</span>
        </Link>
        <div className={s.navLinks}>
          <Link href="#features" className={s.navLink}>Funciones</Link>
          <Link href="#how" className={s.navLink}>Cómo funciona</Link>
          <Link href="#pricing" className={s.navLink}>Precios</Link>
          <Link href="/demo" className={s.navLink}>Demo</Link>
          <Link href="/sign-in" className={`${s.navLink} ${s.navSignIn}`}>Iniciar sesión</Link>
          <Link href="/sign-up" className={`${s.navLink} ${s.navCta}`}>Crear cuenta gratis</Link>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className={s.hero} id="hero">
        <div className={s.heroContent}>
          <div className={s.heroTag}>
            <span className={s.heroTagDot} />
            Demo disponible — sin registro
          </div>
          <h1 className={s.heroH1}>
            Dejá de adivinar<br /><em>cuánto cobrar</em>
          </h1>
          <p className={s.heroSub}>
            Cargá tus materiales, el tiempo de trabajo y tu margen. Pliego calcula
            el precio justo al instante — para cualquier rubro.
          </p>
          <div className={s.heroActions}>
            <Link href="/sign-up" className={s.btnPrimary}>Crear cuenta gratis →</Link>
            <Link href="/demo" className={s.btnGhost}>Ver demo</Link>
          </div>
          <p className={s.heroNote}>Sin tarjeta de crédito · 100% gratis para empezar</p>
        </div>
        <div className={s.heroVisual}>
          <PLogoMark size="hero" />
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className={s.features} id="features">
        <p className={s.sectionTag}>Funciones</p>
        <h2 className={s.sectionH2}>
          Todo lo que necesitás para <em>cobrar lo que vale</em>
        </h2>
        <div className={s.featuresGrid}>
          <div className={s.featureCard}>
            <div className={s.featureIcon}>▦</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a2428", marginBottom: 12, letterSpacing: "-0.3px" }}>
              Cargá tus materiales
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#6a7880" }}>
              Registrá cada insumo con su costo: vinilo, tela, pintura, hierro, packaging.
              Una sola vez y disponible en todos tus presupuestos.
            </p>
          </div>
          <div className={s.featureCard}>
            <div className={`${s.featureIcon} ${s.featureIconTeal}`}>$</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a2428", marginBottom: 12, letterSpacing: "-0.3px" }}>
              Precio al instante
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#6a7880" }}>
              Sumá materiales, tiempo de trabajo y ganancia deseada. Pliego calcula el precio
              por unidad automáticamente — sin hojas de cálculo.
            </p>
          </div>
          <div className={s.featureCard}>
            <div className={s.featureIcon}>↻</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a2428", marginBottom: 12, letterSpacing: "-0.3px" }}>
              Historial de cotizaciones
            </h3>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "#6a7880" }}>
              Guardá cada presupuesto con un snapshot de los precios. Revisá, comparé y
              reutilizá cotizaciones anteriores cuando quieras.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ RUBROS ═══════ */}
      <section className={s.rubros}>
        <p className={s.sectionTag}>Rubros</p>
        <h2 className={s.sectionH2}>Funciona para <em>tu rubro</em></h2>
        <div className={s.rubrosGrid}>

          {/* Stickers */}
          <div className={s.rubroCard}>
            <div style={{ background: "#1a6b7c", padding: "32px 28px 28px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
                Stickers &amp; papelería
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 5, maxWidth: 180 }}>
                {[1,1,1,1,1,0, 1,1,1,1,1,0, 1,1,1,"a",0,0].map((v, i) => (
                  <div key={i} style={{
                    aspectRatio: "1", borderRadius: 3,
                    background: v === "a" ? "#e8952a" : v === 1 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)",
                  }} />
                ))}
              </div>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#6a7880", marginBottom: 16 }}>
                Calculá cuántas unidades entran por pliego, el costo de vinilo o papel, y obtenés el precio por sticker al instante.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "10px 14px", background: "#f5f0e6", borderRadius: 8 }}>
                  <span style={{ color: "#6a7880", fontWeight: 500 }}>Vinilo brillante A4</span>
                  <span style={{ color: "#1a2428", fontWeight: 700 }}>$0,42/u</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "10px 14px", background: "#f5f0e6", borderRadius: 8 }}>
                  <span style={{ color: "#6a7880", fontWeight: 500 }}>Vinilo mate carta</span>
                  <span style={{ color: "#1a2428", fontWeight: 700 }}>$0,38/u</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remeras */}
          <div className={s.rubroCard}>
            <div style={{ background: "#e8952a", padding: "32px 28px 28px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                Remeras &amp; textil
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 200 }}>
                {[
                  { label: "Remera base", price: "$850" },
                  { label: "Estampa DTF", price: "$320" },
                  { label: "Packaging", price: "$95" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "rgba(255,255,255,0.25)", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: "white", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "white" }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "white", marginLeft: "auto" }}>{item.price}</span>
                  </div>
                ))}
                <div style={{ background: "rgba(255,255,255,0.92)", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#c47010" }}>Precio sugerido</span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#c47010", marginLeft: "auto" }}>$2.100</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#6a7880", marginBottom: 16 }}>
                Sumá el costo de la prenda, la estampa y el packaging. Definí tu margen y Pliego calcula el precio de venta automáticamente.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Serigrafía", "DTF", "Bordado"].map((t) => (
                  <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", background: "#fff4e6", color: "#c47010", borderRadius: 100 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Herrería */}
          <div className={s.rubroCard}>
            <div style={{ background: "#1a2428", padding: "32px 28px 28px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
                Herrería &amp; manufactura
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 220 }}>
                {[
                  { bar: "#e8952a", label: "Caño 1\" × 2m", price: "$1.200" },
                  { bar: "rgba(232,149,42,0.5)", label: "Plancha 3mm", price: "$680" },
                  { bar: "rgba(255,255,255,0.2)", label: "Soldadura", price: "$380" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 4, borderRadius: 2, background: item.bar, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "white", marginLeft: "auto" }}>{item.price}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#e8952a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>⏱</div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>3 hs trabajo</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#e8952a", marginLeft: "auto" }}>$4.500</span>
                </div>
              </div>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#6a7880", marginBottom: 16 }}>
                Cargá materiales por metro o kilo, sumá las horas de mano de obra y obtenés el presupuesto final sin calculadora.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Rejas", "Portones", "Estructuras"].map((t) => (
                  <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", background: "#f0ebe0", color: "#4a5a60", borderRadius: 100 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* More industries chips */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#a09080", letterSpacing: "0.1em", textTransform: "uppercase" }}>También:</span>
          {["🕯️ Velas", "🌿 Cosmética natural", "🪵 Carpintería", "🚗 Detailing de autos", "🍰 Repostería", "🔩 Herrería", "+ muchos más"].map((chip) => (
            <span key={chip} style={{ fontSize: 13, fontWeight: 500, padding: "6px 16px", background: "white", border: "1px solid #e0d8c8", borderRadius: 100, color: "#4a5a60" }}>{chip}</span>
          ))}
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className={s.how} id="how">
        <p className={`${s.sectionTag} ${s.howSectionTag}`}>Cómo funciona</p>
        <h2 className={`${s.sectionH2} ${s.howSectionH2}`}>
          De los costos al precio, <em>en tres pasos</em>
        </h2>
        <div className={s.steps}>
          {[
            { n: "1", title: "Cargá tus insumos", desc: "Registrá los materiales y costos de tu rubro una sola vez. Pliego los recuerda para todos tus presupuestos futuros." },
            { n: "2", title: "Armá el presupuesto", desc: "Seleccioná qué materiales usás, cuánto tiempo lleva y la cantidad a producir. Todo en una sola pantalla." },
            { n: "3", title: "Obtené el precio justo", desc: "Definí tu margen de ganancia y Pliego calcula el precio por unidad al instante. Guardalo y envialo." },
          ].map((step) => (
            <div key={step.n} className={s.step}>
              <div className={s.stepNum}>{step.n}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 12, letterSpacing: "-0.3px" }}>{step.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ APP PREVIEW ═══════ */}
      <section className={s.preview} id="preview">
        <div>
          <p className={s.sectionTag}>La app</p>
          <h2 className={s.sectionH2} style={{ marginBottom: 32 }}>
            Para <em>cualquier emprendimiento</em> que produce
          </h2>
          <ul className={s.previewList}>
            {[
              "Stickers y gráfica — calculá cuántas unidades entran por pliego",
              "Remeras — sumá costo de prenda, estampa y packaging",
              "Herrería — materiales por metro, tiempo de trabajo y soldadura",
              "Funciona en celular, tablet y PC — sin instalar nada",
            ].map((item) => (
              <li key={item} className={s.previewListItem}>
                <div className={s.check}><CheckIcon /></div>
                {item}
              </li>
            ))}
          </ul>
          <Link href="/demo" className={s.btnPrimary}>Ver demo →</Link>
        </div>

        {/* App mockup */}
        <div className={s.appMockup}>
          <div style={{ background: "#1a6b7c", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "white", letterSpacing: "-0.3px" }}>pliego</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Nueva cotización</span>
          </div>
          <div style={{ padding: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a0a8b0", marginBottom: 12 }}>
              Armado en pliego — Vinilo Brillante A4
            </p>
            {/* Sticker grid 8×5 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 5, marginBottom: 24 }}>
              {/* Row 1: 6 filled, 2 empty */}
              {[1,1,1,1,1,1,0,0, 1,1,1,1,1,1,0,0, 1,1,1,1,1,1,0,0, 1,1,1,1,"a",0,0,0, 0,0,0,0,0,0,0,0].map((v, i) => (
                <div
                  key={i}
                  className={`${s.stickerCell} ${v === 1 ? s.stickerFilled : v === "a" ? s.stickerAccent : s.stickerEmpty}`}
                />
              ))}
            </div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {[{ val: "25", label: "Stickers/hoja" }, { val: "4", label: "Hojas" }, { val: "100", label: "Unidades" }].map((stat) => (
                <div key={stat.label} style={{ background: "#f5f0e6", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#1a2428", letterSpacing: "-0.5px" }}>{stat.val}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#a0a8b0", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            {/* Price row */}
            <div style={{ background: "#e8952a", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "white", opacity: 0.8 }}>Precio por unidad</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-1px" }}>$12,50</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section className={s.pricing} id="pricing">
        <p className={s.sectionTag}>Precios</p>
        <h2 className={s.sectionH2} style={{ textAlign: "center", margin: "0 auto 64px" }}>
          Simple y <em>sin sorpresas</em>
        </h2>
        <div className={s.pricingGrid}>

          {/* Gratis */}
          <div className={s.pricingCard}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a6b7c", marginBottom: 16 }}>Gratis</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#1a2428", marginTop: 4 }}>$</span>
              <span style={{ fontSize: 52, fontWeight: 900, color: "#1a2428", letterSpacing: -2 }}>0</span>
              <span style={{ fontSize: 14, color: "#a0a8b0", fontWeight: 500 }}>/ siempre</span>
            </div>
            <p style={{ fontSize: 14, color: "#6a7880", marginBottom: 28, lineHeight: 1.5 }}>Para conocer Pliego y empezar a cotizar.</p>
            <div style={{ height: 1, background: "#e8e0d0", marginBottom: 24 }} />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["Hasta 10 cotizaciones", "2 materiales", "Cálculo de pliego automático"].map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#2e4048", lineHeight: 1.4 }}>
                  <PricingCheck color="teal" />{f}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className={s.btnPricing}>Empezar gratis</Link>
          </div>

          {/* Pro (featured) */}
          <div className={`${s.pricingCard} ${s.pricingFeatured}`}>
            <div className={s.pricingBadge}>Más popular</div>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f5b84a", marginBottom: 16 }}>Pro</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: "white", marginTop: 4 }}>$</span>
              <span style={{ fontSize: 52, fontWeight: 900, color: "white", letterSpacing: -2 }}>9</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>/ mes</span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.5 }}>Para imprentas que cotizan todos los días.</p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 24 }} />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["Cotizaciones ilimitadas", "Materiales ilimitados", "Historial completo", "Soporte prioritario"].map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                  <PricingCheck color="amber" />{f}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className={`${s.btnPricing} ${s.btnPricingFeatured}`}>Empezar Pro</Link>
          </div>

          {/* Equipo */}
          <div className={s.pricingCard}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a6b7c", marginBottom: 16 }}>Equipo</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#1a2428", marginTop: 4 }}>$</span>
              <span style={{ fontSize: 52, fontWeight: 900, color: "#1a2428", letterSpacing: -2 }}>24</span>
              <span style={{ fontSize: 14, color: "#a0a8b0", fontWeight: 500 }}>/ mes</span>
            </div>
            <p style={{ fontSize: 14, color: "#6a7880", marginBottom: 28, lineHeight: 1.5 }}>Para talleres con múltiples usuarios.</p>
            <div style={{ height: 1, background: "#e8e0d0", marginBottom: 24 }} />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["Todo lo de Pro", "Hasta 5 usuarios", "Materiales compartidos"].map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#2e4048", lineHeight: 1.4 }}>
                  <PricingCheck color="teal" />{f}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className={s.btnPricing}>Contactar</Link>
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className={s.cta}>
        <div className={s.ctaContent}>
          <h2 style={{ fontSize: "clamp(36px, 3.5vw, 56px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, color: "white", marginBottom: 16 }}>
            Empezá a cobrar<br />lo que vale.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
            Cargá tus materiales, definí tu ganancia y empezá<br />a cotizar en minutos — gratis, sin tarjeta.
          </p>
        </div>
        <div className={s.ctaActions}>
          <Link href="/sign-up" className={s.btnCta}>Crear cuenta gratis →</Link>
          <Link href="/demo" className={s.btnCtaDemo}>Ver demo primero</Link>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className={s.footer}>
        <div className={s.footerLogo}>
          <PLogoMark size="footer" />
          <span style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.3px" }}>pliego</span>
        </div>
        <div className={s.footerLinks}>
          <Link href="/demo" className={s.footerLink}>Demo</Link>
          <Link href="#features" className={s.footerLink}>Funciones</Link>
          <Link href="#pricing" className={s.footerLink}>Precios</Link>
          <Link href="/sign-in" className={s.footerLink}>Iniciar sesión</Link>
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>© 2026 Pliego</span>
      </footer>
    </div>
  );
}
