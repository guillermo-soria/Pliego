"use client";

import type { QuoteItem, QuoteWithItems } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HistorialClient({ initialQuotes, isDemo }: { initialQuotes: QuoteWithItems[]; isDemo?: boolean }) {
  const router = useRouter();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este presupuesto?")) return;
    await fetch(`/api/quotes/${id}`, { method: "DELETE" });
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    if (expanded === id) setExpanded(null);
    router.refresh();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: 22 }}>Historial</h1>
          <p style={{ color: "#6a7880", fontSize: 13, marginTop: 2 }}>{quotes.length} presupuestos guardados</p>
        </div>
      </div>

      {quotes.length === 0 && (
        <div style={{ textAlign: "center", padding: 80, color: "#6a7880" }}>
          Aún no hay presupuestos guardados
        </div>
      )}

      {quotes.map((q) => (
        <div key={q.id} style={{ marginBottom: 8 }}>
          {/* Header row */}
          <div
            onClick={() => setExpanded(expanded === q.id ? null : q.id)}
            style={quoteRow}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{q.name}</span>
                <span style={{ fontFamily: "monospace", fontSize: 18, color: "#e8952a" }}>${q.totalPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#6a7880" }}>
                  {q.qty} stickers · {q.stickerW}×{q.stickerH}mm · {q.sheetType} · {q.sheetsNeeded} hojas · {q.markup}% ganancia
                </span>
                <span style={{ fontSize: 11, color: "#6a7880", fontFamily: "monospace" }}>
                  {new Date(q.createdAt).toLocaleDateString("es-UY")}
                </span>
              </div>
            </div>
          </div>

          {/* Detail panel */}
          {expanded === q.id && (
            <div style={{ ...card, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: "none", marginTop: 0 }}>
              <div style={cardTitle}>Materiales utilizados</div>
              {q.items.map((item: QuoteItem) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #e8e0d0", fontSize: 13 }}>
                  <span style={{ color: "#6a7880" }}>{item.name} × {item.qty} {item.unit}</span>
                  <span style={{ fontFamily: "monospace", color: "#e8952a" }}>${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", borderTop: "1px solid #e8e0d0", marginTop: 6 }}>
                <span style={{ fontSize: 13, color: "#6a7880" }}>Costo materiales</span>
                <span style={{ fontFamily: "monospace", fontSize: 13 }}>${q.materialCost.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0 10px", borderBottom: "1px solid #e8e0d0" }}>
                <span style={{ fontSize: 13, color: "#6a7880" }}>Ganancia ({q.markup}%)</span>
                <span style={{ fontFamily: "monospace", fontSize: 13 }}>${(q.totalPrice - q.materialCost).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px" }}>
                <span style={{ fontWeight: 600 }}>Precio por unidad</span>
                <span style={{ fontFamily: "monospace", fontSize: 16, color: "#1a6b7c" }}>${q.pricePerUnit.toFixed(2)}</span>
              </div>
              {!isDemo && (
                <button
                  onClick={() => handleDelete(q.id)}
                  style={{ marginTop: 12, width: "100%", padding: "9px 0", borderRadius: 8, border: "1px solid transparent", background: "transparent", color: "#dc2626", fontSize: 13, cursor: "pointer", fontWeight: 500 }}
                  onMouseOver={(e) => { (e.target as HTMLElement).style.borderColor = "#dc2626"; }}
                  onMouseOut={(e)  => { (e.target as HTMLElement).style.borderColor = "transparent"; }}
                >
                  🗑 Eliminar presupuesto
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const card: React.CSSProperties      = { background: "white", border: "1px solid #e8e0d0", borderRadius: 14, padding: 20 };
const cardTitle: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6a7880", marginBottom: 14, fontFamily: "monospace" };
const quoteRow: React.CSSProperties  = {
  display: "flex", alignItems: "center", gap: 12,
  padding: "14px 16px", background: "white",
  border: "1px solid #e8e0d0", borderRadius: 10, cursor: "pointer",
  transition: "border-color .2s",
};
