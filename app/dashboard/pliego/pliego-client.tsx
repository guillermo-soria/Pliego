"use client";

import {
  SHEET_SIZES,
  calculateLayout,
  effectiveSize,
  getSheetDimensions,
  type SheetType,
} from "@/lib/layout";
import { useState } from "react";

const SHEET_TYPES = [...Object.keys(SHEET_SIZES), "Personalizado"] as SheetType[];

export default function PliegoClient() {
  const [sheetType, setSheetType]   = useState<SheetType>("A4");
  const [customW, setCustomW]       = useState(300);
  const [customH, setCustomH]       = useState(400);
  const [stickerW, setStickerW]     = useState(50);
  const [stickerH, setStickerH]     = useState(50);
  const [bleed, setBleed]           = useState(2);
  const [qty, setQty]               = useState(100);

  const sheet = getSheetDimensions(sheetType, customW, customH);
  const eff   = effectiveSize(stickerW, stickerH, bleed);
  const result = calculateLayout(sheet, eff.w, eff.h, qty);

  return (
    <div>
      <h1 style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Armado en Pliego</h1>
      <p style={{ color: "#71717a", fontSize: 13, marginBottom: 24 }}>
        Calculá cuántos stickers entran por hoja
      </p>

      {/* Tipo de hoja */}
      <section style={card}>
        <label style={cardTitle}>Tipo de hoja</label>
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
            <Field label="Ancho hoja (mm)"><input style={input} type="number" value={customW} onChange={(e) => setCustomW(+e.target.value)} /></Field>
            <Field label="Alto hoja (mm)"><input style={input} type="number" value={customH} onChange={(e) => setCustomH(+e.target.value)} /></Field>
          </div>
        )}
      </section>

      {/* Sticker */}
      <section style={card}>
        <label style={cardTitle}>Medida del sticker</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          <Field label="Ancho (mm)"><input style={input} type="number" value={stickerW} onChange={(e) => setStickerW(+e.target.value)} min={5} /></Field>
          <Field label="Alto (mm)"><input style={input} type="number" value={stickerH} onChange={(e) => setStickerH(+e.target.value)} min={5} /></Field>
          <Field label="Sangría (mm)"><input style={input} type="number" value={bleed} onChange={(e) => setBleed(+e.target.value)} min={0} /></Field>
          <Field label="Cantidad pedido"><input style={input} type="number" value={qty} onChange={(e) => setQty(+e.target.value)} min={1} /></Field>
        </div>
      </section>

      {/* Resultado */}
      {result.perSheet > 0 ? (
        <section style={card}>
          <label style={cardTitle}>Resultado</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              ["Hoja", sheetType],
              ["Medida efectiva", `${eff.w}×${eff.h}mm`],
              ["Grid", `${result.cols}×${result.rows}`],
              ["Aprovechamiento", `${result.usagePercent}%`],
              ...(result.rotated ? [["Orientación", "Rotado ↩"]] : []),
            ].map(([k, v]) => (
              <div key={k} style={pill}>
                {k}: <strong style={{ color: "#f97316" }}>{v}</strong>
              </div>
            ))}
          </div>
          <div style={bigResult}>
            <div style={{ fontFamily: "monospace", fontSize: 48, fontWeight: 500, color: "#f97316", lineHeight: 1 }}>
              {result.perSheet}
            </div>
            <div style={{ fontSize: 13, color: "#71717a", marginTop: 6 }}>stickers por hoja</div>
          </div>
          <div style={{ ...bigResult, marginTop: 12, background: "rgba(74,222,128,.08)", borderColor: "rgba(74,222,128,.25)" }}>
            <div style={{ fontFamily: "monospace", fontSize: 32, fontWeight: 500, color: "#4ade80", lineHeight: 1 }}>
              {result.sheetsNeeded}
            </div>
            <div style={{ fontSize: 13, color: "#71717a", marginTop: 6 }}>
              hojas para {qty} stickers
            </div>
          </div>
          {/* Visual grid */}
          <SheetVisual
            cols={result.cols}
            rows={result.rows}
            sheetW={sheet.w}
            sheetH={sheet.h}
            cellW={eff.w}
            cellH={eff.h}
          />
        </section>
      ) : (
        stickerW > 0 && stickerH > 0 && (
          <section style={{ ...card, textAlign: "center", color: "#f87171", padding: 32 }}>
            ⚠ El sticker ({eff.w}×{eff.h}mm) no entra en la hoja {sheetType} ({sheet.w}×{sheet.h}mm)
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
      <div style={{ background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 10, padding: 16 }}>
        <div style={{ position: "relative", width: sw, height: sh, background: "#fff", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cw}px)`, gap: 1, position: "absolute", top: 0, left: 0 }}>
            {Array.from({ length: cols * rows }).map((_, i) => (
              <div key={i} style={{ width: cw, height: ch, background: "#f97316", opacity: 0.65, borderRadius: 1 }} />
            ))}
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#71717a", textAlign: "center", marginTop: 8, fontFamily: "monospace" }}>
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
      <label style={{ display: "block", fontSize: 12, color: "#71717a", marginBottom: 6, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 14,
  padding: 20, marginBottom: 16,
};
const cardTitle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
  textTransform: "uppercase", color: "#71717a", marginBottom: 16, fontFamily: "monospace",
};
const input: React.CSSProperties = {
  width: "100%", padding: "9px 12px", background: "#18181c",
  border: "1px solid #2e2e38", borderRadius: 8, color: "#f1f0ed", fontSize: 14, outline: "none",
};
const sheetBtn = (active: boolean): React.CSSProperties => ({
  padding: "8px 14px", borderRadius: 8, border: `1px solid ${active ? "#f97316" : "#2e2e38"}`,
  background: active ? "#f97316" : "#18181c", color: active ? "#fff" : "#71717a",
  fontSize: 13, cursor: "pointer", fontWeight: 500,
});
const pill: React.CSSProperties = {
  padding: "5px 11px", borderRadius: 20, fontSize: 12,
  background: "#18181c", border: "1px solid #2e2e38",
};
const bigResult: React.CSSProperties = {
  background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.25)",
  borderRadius: 12, padding: 20, textAlign: "center",
};
const row2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
