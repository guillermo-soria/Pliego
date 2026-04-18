"use client";

import type { Material } from "@/db/schema";
import {
  calculateLayout,
  effectiveSize,
  getSheetDimensions,
  SHEET_SIZES,
  type SheetType,
} from "@/lib/layout";
import { calculatePricing } from "@/lib/pricing";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SHEET_TYPES = [...Object.keys(SHEET_SIZES), "Personalizado"] as SheetType[];

type LineSel = { selected: boolean; qty: number };

export default function PresupuestoClient({ materials }: { materials: Material[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [name, setName]         = useState("");
  const [qty, setQty]           = useState(() => Number(params.get("qty")) || 100);
  const [sheetType, setSheetType] = useState<SheetType>(() => (params.get("sheetType") as SheetType) || "A4");
  const [customW, setCustomW]   = useState(() => Number(params.get("customW")) || 300);
  const [customH, setCustomH]   = useState(() => Number(params.get("customH")) || 400);
  const [stickerW, setStickerW] = useState(() => Number(params.get("stickerW")) || 50);
  const [stickerH, setStickerH] = useState(() => Number(params.get("stickerH")) || 50);
  const [bleed, setBleed]       = useState(() => Number(params.get("bleed")) || 2);
  const [markup, setMarkup]     = useState(50);
  const [sel, setSel]           = useState<Record<string, LineSel>>({});
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  // Calcular pliego
  const sheet  = getSheetDimensions(sheetType, customW, customH);
  const eff    = effectiveSize(stickerW, stickerH, bleed);
  const layout = calculateLayout(sheet, eff.w, eff.h, qty);

  // Sync qty de materiales cuando cambian las hojas necesarias
  useEffect(() => {
    setSel((prev) => {
      const next: Record<string, LineSel> = {};
      materials.forEach((m) => {
        next[m.id] = {
          selected: prev[m.id]?.selected ?? false,
          qty: prev[m.id]?.selected ? layout.sheetsNeeded : (prev[m.id]?.qty ?? layout.sheetsNeeded),
        };
      });
      return next;
    });
  }, [materials, layout.sheetsNeeded]);

  const toggle = (id: string) =>
    setSel((p) => ({ ...p, [id]: { ...p[id], selected: !p[id]?.selected, qty: p[id]?.qty ?? layout.sheetsNeeded } }));
  const setMatQty = (id: string, q: number) =>
    setSel((p) => ({ ...p, [id]: { ...p[id], qty: q } }));

  // Calcular precios
  const lines = materials
    .filter((m) => sel[m.id]?.selected)
    .map((m) => ({
      materialId: m.id,
      name: m.name,
      unit: m.unit,
      unitPrice: m.price,
      qty: sel[m.id]?.qty ?? 0,
    }));

  const pricing = calculatePricing({ lines, markup, qty });

  const handleSave = async () => {
    if (layout.perSheet === 0) return;
    setSaving(true);
    await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || undefined,
        qty, sheetType,
        sheetW: sheet.w, sheetH: sheet.h,
        stickerW, stickerH, bleed, markup,
        lines,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); router.push("/dashboard/historial"); }, 1500);
  };

  return (
    <div>
      <h1 style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>Nuevo Presupuesto</h1>
      <p style={{ color: "#71717a", fontSize: 13, marginBottom: 24 }}>Calculá costo y precio de venta</p>

      {/* Datos del pedido */}
      <section style={card}>
        <span style={cardTitle}>Datos del pedido</span>
        <Field label="Nombre (opcional)">
          <input style={inp} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Stickers logo cliente X" />
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Cantidad de stickers">
            <input style={inp} type="number" value={qty || ""} onChange={(e) => setQty(+e.target.value)} min={1} />
          </Field>
          <Field label="Tipo de hoja">
            <select style={inp} value={sheetType} onChange={(e) => setSheetType(e.target.value as SheetType)}>
              {SHEET_TYPES.map((k) => <option key={k}>{k}</option>)}
            </select>
          </Field>
        </div>
        {sheetType === "Personalizado" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Ancho hoja (mm)"><input style={inp} type="number" value={customW || ""} onChange={(e) => setCustomW(+e.target.value)} /></Field>
            <Field label="Alto hoja (mm)"><input style={inp} type="number" value={customH || ""} onChange={(e) => setCustomH(+e.target.value)} /></Field>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <Field label="Ancho sticker (mm)"><input style={inp} type="number" value={stickerW || ""} onChange={(e) => setStickerW(+e.target.value)} min={5} /></Field>
          <Field label="Alto sticker (mm)"><input style={inp} type="number" value={stickerH || ""} onChange={(e) => setStickerH(+e.target.value)} min={5} /></Field>
          <Field label="Sangría (mm)"><input style={inp} type="number" value={bleed} onChange={(e) => setBleed(+e.target.value)} min={0} /></Field>
        </div>
      </section>

      {/* Resumen pliego */}
      {layout.perSheet > 0 ? (
        <section style={{ ...card, display: "flex", gap: 0, padding: 0, overflow: "hidden" }}>
          {[
            { label: "Por hoja", value: layout.perSheet, color: "#f97316" },
            { label: "Hojas necesarias", value: layout.sheetsNeeded, color: "#f1f0ed" },
            { label: "Para", value: `${qty} uds`, color: "#71717a" },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, padding: "16px 20px", borderRight: i < 2 ? "1px solid #2e2e38" : "none", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontFamily: "monospace", fontWeight: 500, color: item.color }}>{item.value}</div>
              <div style={{ fontSize: 12, color: "#71717a", marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </section>
      ) : stickerW > 0 && (
        <div style={{ ...card, color: "#f87171", textAlign: "center" }}>⚠ Sticker no entra en la hoja seleccionada</div>
      )}

      {/* Materiales */}
      <section style={card}>
        <span style={cardTitle}>Materiales</span>
        {materials.length === 0 && (
          <div style={{ color: "#71717a", textAlign: "center", padding: 20 }}>
            Primero cargá materiales en la sección Materiales
          </div>
        )}
        {materials.map((m) => {
          const s = sel[m.id];
          const sub = (s?.qty ?? 0) * m.price;
          return (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#18181c", border: "1px solid #2e2e38", borderRadius: 8, marginBottom: 6 }}>
              <input type="checkbox" checked={s?.selected ?? false} onChange={() => toggle(m.id)} style={{ accentColor: "#f97316", width: 16, height: 16, cursor: "pointer", flexShrink: 0 }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 13 }}>
                {m.name} <span style={{ color: "#71717a", fontSize: 11 }}>(${m.price}/{m.unit})</span>
              </div>
              <input
                type="number"
                value={s?.qty || ""}
                onChange={(e) => setMatQty(m.id, +e.target.value)}
                disabled={!s?.selected}
                style={{ ...inp, width: 70, textAlign: "center", padding: "6px 8px", fontSize: 13, opacity: s?.selected ? 1 : 0.4 }}
              />
              <div style={{ fontFamily: "monospace", fontSize: 13, color: s?.selected ? "#f97316" : "#71717a", width: 80, textAlign: "right" }}>
                {s?.selected ? `$${sub.toFixed(2)}` : "—"}
              </div>
            </div>
          );
        })}
      </section>

      {/* Ganancia y resumen */}
      <section style={card}>
        <span style={cardTitle}>Ganancia deseada</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <input type="range" min={0} max={200} value={markup} onChange={(e) => setMarkup(+e.target.value)} style={{ flex: 1, accentColor: "#f97316" }} />
          <div style={{ fontFamily: "monospace", fontSize: 22, color: "#f97316", minWidth: 55, textAlign: "right" }}>{markup}%</div>
        </div>
        <div style={{ borderTop: "1px solid #2e2e38", paddingTop: 16 }}>
          {[
            { label: "Costo materiales", value: `$${pricing.materialCost.toFixed(2)}` },
            { label: `Ganancia (${markup}%)`, value: `$${pricing.markupAmount.toFixed(2)}` },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 14 }}>
              <span style={{ color: "#71717a" }}>{row.label}</span>
              <span style={{ fontFamily: "monospace" }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px", borderTop: "1px solid #2e2e38", marginTop: 6, fontWeight: 700, fontSize: 16 }}>
            <span>Precio total al cliente</span>
            <span style={{ fontFamily: "monospace", color: "#f97316" }}>${pricing.totalPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14 }}>
            <span style={{ color: "#71717a" }}>Precio por unidad</span>
            <span style={{ fontFamily: "monospace", color: "#4ade80" }}>${pricing.pricePerUnit.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || saved || layout.perSheet === 0}
          style={{ ...btnPrimary, width: "100%", justifyContent: "center", padding: 14, marginTop: 16, fontSize: 14, background: saved ? "#4ade80" : "#f97316", color: saved ? "#0f0f11" : "#fff", opacity: layout.perSheet === 0 ? 0.5 : 1 }}
        >
          {saved ? "✓ ¡Guardado! Redirigiendo…" : saving ? "Guardando…" : "✓ Guardar presupuesto"}
        </button>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, color: "#71717a", marginBottom: 6, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

const card: React.CSSProperties      = { background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 14, padding: 20, marginBottom: 16 };
const cardTitle: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#71717a", marginBottom: 16, fontFamily: "monospace" };
const inp: React.CSSProperties       = { width: "100%", padding: "9px 12px", background: "#18181c", border: "1px solid #2e2e38", borderRadius: 8, color: "#f1f0ed", fontSize: 14, outline: "none" };
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 8, border: "none", background: "#f97316", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" };
