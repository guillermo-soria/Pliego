"use client";

import DemoLimitModal from "@/app/demo/DemoLimitModal";
import {
  SHEET_SIZES,
  calculateLayout,
  effectiveSize,
  getSheetDimensions,
  type SheetType,
} from "@/lib/layout";
import { useDemoUsage } from "@/lib/useDemoUsage";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SHEET_TYPES = [...Object.keys(SHEET_SIZES), "Personalizado"] as SheetType[];
const DEMO_SHEET: SheetType = "A5";
const DEMO_QTY_MAX = 500;

export default function PliegoClient({ isDemo }: { isDemo?: boolean }) {
  const router = useRouter();
  const [sheetType, setSheetType]   = useState<SheetType>(isDemo ? DEMO_SHEET : "A4");
  const [customW, setCustomW]       = useState(300);
  const [customH, setCustomH]       = useState(400);
  const [stickerW, setStickerW]     = useState(50);
  const [stickerH, setStickerH]     = useState(50);
  const [bleed, setBleed]           = useState(0);
  const [qty, setQty]               = useState(100);

  const { uses, limitReached } = useDemoUsage();
  const [showLimitModal, setShowLimitModal] = useState(false);

  const sheet = getSheetDimensions(isDemo ? DEMO_SHEET : sheetType, customW, customH);
  const eff   = effectiveSize(stickerW, stickerH, bleed);
  const result = calculateLayout(sheet, eff.w, eff.h, qty);

  const presupuestoPath = isDemo ? "/demo/presupuesto" : "/dashboard/presupuesto";

  function handlePresupuesto() {
    if (isDemo && limitReached) { setShowLimitModal(true); return; }
    const params = new URLSearchParams({
      sheetType: isDemo ? DEMO_SHEET : sheetType,
      customW: String(customW),
      customH: String(customH),
      stickerW: String(stickerW),
      stickerH: String(stickerH),
      bleed: String(bleed),
      qty: String(qty),
    });
    router.push(`${presupuestoPath}?${params}`);
  }

  return (
    <div>
      {showLimitModal && <DemoLimitModal />}
      <h1 style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Armado en Pliego</h1>
      <p style={{ color: "#6a7880", fontSize: 13, marginBottom: 24 }}>
        Calculá cuántos stickers entran por hoja
        {isDemo && uses > 0 && !limitReached && (
          <span style={{ marginLeft: 10, color: "#e8952a", fontVariantNumeric: "tabular-nums", fontSize: 12 }}>
            · {uses}/3 presupuestos generados
          </span>
        )}
      </p>

      {/* Tipo de hoja */}
      <section style={card}>
        <label style={cardTitle}>Tipo de hoja</label>
        {isDemo ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={sheetBtn(true)}>A5 (148×210)</div>
            <span style={{ fontSize: 12, color: "#52525b" }}>
              Registrate para usar cualquier formato
            </span>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {SHEET_TYPES.map((k) => (
                <button key={k} onClick={() => setSheetType(k)} style={sheetBtn(sheetType === k)}>
                  {k}{SHEET_SIZES[k as keyof typeof SHEET_SIZES]
                    ? ` (${SHEET_SIZES[k as keyof typeof SHEET_SIZES].w}×${SHEET_SIZES[k as keyof typeof SHEET_SIZES].h})`
                    : ""}
                </button>
              ))}
            </div>
            {sheetType === "Personalizado" && (
              <div style={row2}>
                <Field label="Ancho hoja (mm)"><input style={input} type="number" value={customW || ""} onChange={(e) => setCustomW(+e.target.value)} /></Field>
                <Field label="Alto hoja (mm)"><input style={input} type="number" value={customH || ""} onChange={(e) => setCustomH(+e.target.value)} /></Field>
              </div>
            )}
          </>
        )}
      </section>

      {/* Sticker */}
      <section style={card}>
        <label style={cardTitle}>Medida del sticker</label>
        {isDemo ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field label="Ancho (mm)"><input style={input} type="number" value={stickerW || ""} onChange={(e) => setStickerW(+e.target.value)} min={5} /></Field>
            <Field label="Alto (mm)"><input style={input} type="number" value={stickerH || ""} onChange={(e) => setStickerH(+e.target.value)} min={5} /></Field>
            <Field label="Cantidad pedido">
              <input
                style={input}
                type="number"
                value={qty || ""}
                onChange={(e) => setQty(Math.min(+e.target.value, DEMO_QTY_MAX))}
                min={1}
                max={DEMO_QTY_MAX}
              />
            </Field>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <Field label="Ancho (mm)"><input style={input} type="number" value={stickerW || ""} onChange={(e) => setStickerW(+e.target.value)} min={5} /></Field>
            <Field label="Alto (mm)"><input style={input} type="number" value={stickerH || ""} onChange={(e) => setStickerH(+e.target.value)} min={5} /></Field>
            <Field label="Sangría (mm)"><input style={input} type="number" value={bleed} onChange={(e) => setBleed(+e.target.value)} min={0} /></Field>
            <Field label="Cantidad pedido"><input style={input} type="number" value={qty || ""} onChange={(e) => setQty(+e.target.value)} min={1} /></Field>
          </div>
        )}
      </section>

      {/* Resultado */}
      {result.perSheet > 0 ? (
        <section style={card}>
          <label style={cardTitle}>Resultado</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              ["Hoja", isDemo ? DEMO_SHEET : sheetType],
              ["Medida efectiva", `${eff.w}×${eff.h}mm`],
              ["Grid", `${result.cols}×${result.rows}`],
              ["Aprovechamiento", `${result.usagePercent}%`],
              ...(result.rotated ? [["Orientación", "Rotado ↩"]] : []),
            ].map(([k, v]) => (
              <div key={k} style={pill}>
                {k}: <strong style={{ color: "#e8952a" }}>{v}</strong>
              </div>
            ))}
          </div>
          <div style={bigResult}>
            <div style={{ fontVariantNumeric: "tabular-nums", fontSize: 48, fontWeight: 500, color: "#e8952a", lineHeight: 1 }}>
              {result.perSheet}
            </div>
            <div style={{ fontSize: 13, color: "#6a7880", marginTop: 6 }}>stickers por hoja</div>
          </div>
          <div style={{ ...bigResult, marginTop: 12, background: "rgba(26,107,124,0.08)", borderColor: "rgba(26,107,124,0.25)" }}>
            <div style={{ fontVariantNumeric: "tabular-nums", fontSize: 32, fontWeight: 500, color: "#1a6b7c", lineHeight: 1 }}>
              {result.sheetsNeeded}
            </div>
            <div style={{ fontSize: 13, color: "#6a7880", marginTop: 6 }}>
              hojas para {qty} stickers
            </div>
          </div>
          <SheetVisual
            cols={result.cols}
            rows={result.rows}
            sheetW={sheet.w}
            sheetH={sheet.h}
            cellW={eff.w}
            cellH={eff.h}
          />
          <button onClick={handlePresupuesto} style={btnPresupuesto}>
            Pasar a Presupuesto →
          </button>
        </section>
      ) : (
        stickerW > 0 && stickerH > 0 && (
          <section style={{ ...card, textAlign: "center", color: "#f87171", padding: 32 }}>
            ⚠ El sticker ({eff.w}×{eff.h}mm) no entra en la hoja {isDemo ? DEMO_SHEET : sheetType} ({sheet.w}×{sheet.h}mm)
          </section>
        )
      )}
    </div>
  );
}

// ─── Sheet visual ────────────────────────────────────────────────
function SheetVisual({ cols, rows, sheetW, sheetH, cellW, cellH }: {
  cols: number; rows: number; sheetW: number; sheetH: number; cellW: number; cellH: number;
}) {
  const MAX = 200;
  const scale = Math.min(MAX / sheetW, MAX / sheetH);
  const sw = sheetW * scale;
  const sh = sheetH * scale;
  const cw = cellW * scale;
  const ch = cellH * scale;
  return (
    <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "#f5f0e6", border: "1px solid #e8e0d0", borderRadius: 10, padding: 16 }}>
        <div style={{ position: "relative", width: sw, height: sh, background: "#fff", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cw}px)`, gap: 1, position: "absolute", top: 0, left: 0 }}>
            {Array.from({ length: cols * rows }).map((_, i) => (
              <div key={i} style={{ width: cw, height: ch, background: "#e8952a", opacity: 0.65, borderRadius: 1 }} />
            ))}
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#6a7880", textAlign: "center", marginTop: 8, fontVariantNumeric: "tabular-nums" }}>
          {sheetW}×{sheetH}mm — {cols}×{rows} = {cols * rows} por hoja
        </div>
      </div>
    </div>
  );
}

// ─── Shared atoms ────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 0 }}>
      <label style={{ display: "block", fontSize: 12, color: "#6a7880", marginBottom: 6, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

const card: React.CSSProperties = {
  background: "white", border: "1px solid #e8e0d0", borderRadius: 14,
  padding: 20, marginBottom: 16,
};
const cardTitle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
  textTransform: "uppercase", color: "#6a7880", marginBottom: 16,
};
const input: React.CSSProperties = {
  width: "100%", padding: "9px 12px", background: "#f5f0e6",
  border: "1px solid #d0c8b0", borderRadius: 8, color: "#1a2428", fontSize: 14, outline: "none",
};
const sheetBtn = (active: boolean): React.CSSProperties => ({
  padding: "8px 14px", borderRadius: 8, border: `1px solid ${active ? "#1a6b7c" : "#d0c8b0"}`,
  background: active ? "#1a6b7c" : "white", color: active ? "#fff" : "#6a7880",
  fontSize: 13, cursor: "pointer", fontWeight: 500,
});
const pill: React.CSSProperties = {
  padding: "5px 11px", borderRadius: 20, fontSize: 12,
  background: "#f5f0e6", border: "1px solid #e8e0d0", color: "#1a2428",
};
const bigResult: React.CSSProperties = {
  background: "rgba(232,149,42,0.08)", border: "1px solid rgba(232,149,42,0.25)",
  borderRadius: 12, padding: 20, textAlign: "center",
};
const row2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const btnPresupuesto: React.CSSProperties = {
  marginTop: 16, width: "100%", padding: "12px 0", borderRadius: 8, border: "none",
  background: "#e8952a", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
};
