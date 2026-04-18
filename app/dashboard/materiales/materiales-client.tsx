"use client";

import type { Material } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORIES = ["Sustrato", "Laminado", "Impresión", "Corte", "Otro"];
const UNITS      = ["hoja", "m²", "unidad"];

type Form = { name: string; category: string; unit: string; price: string; color: string };
const EMPTY_FORM: Form = { name: "", category: "Sustrato", unit: "hoja", price: "", color: "#f97316" };

export default function MaterialesClient({ initialMaterials }: { initialMaterials: Material[] }) {
  const router   = useRouter();
  const [items, setItems]   = useState(initialMaterials);
  const [modal, setModal]   = useState<"new" | Material | null>(null);
  const [form, setForm]     = useState<Form>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const openNew  = () => { setForm(EMPTY_FORM); setModal("new"); };
  const openEdit = (m: Material) => {
    setForm({ name: m.name, category: m.category, unit: m.unit, price: String(m.price), color: m.color });
    setModal(m);
  };
  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setLoading(true);
    const isEdit = modal !== "new" && modal !== null;
    const url  = isEdit ? `/api/materials/${(modal as Material).id}` : "/api/materials";
    const method = isEdit ? "PUT" : "POST";
    const res  = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, price: parseFloat(form.price) }) });
    const data = await res.json();
    if (isEdit) setItems((prev) => prev.map((m) => m.id === data.id ? data : m));
    else        setItems((prev) => [...prev, data]);
    setModal(null);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar material?")) return;
    await fetch(`/api/materials/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((m) => m.id !== id));
    router.refresh();
  };

  const cats = [...new Set(items.map((m) => m.category))];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: 22 }}>Materiales</h1>
          <p style={{ color: "#71717a", fontSize: 13, marginTop: 2 }}>{items.length} materiales cargados</p>
        </div>
        <button onClick={openNew} style={btnPrimary}>+ Agregar</button>
      </div>

      {cats.map((cat) => (
        <div key={cat} style={card}>
          <div style={cardTitle}>{cat}</div>
          {items.filter((m) => m.category === cat).map((m) => (
            <div key={m.id} style={matRow}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: "#71717a", fontFamily: "monospace" }}>por {m.unit}</div>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 15, color: "#f97316", marginRight: 8 }}>${m.price.toFixed(2)}</div>
              <button onClick={() => openEdit(m)} style={iconBtn}>✏️</button>
              <button onClick={() => handleDelete(m.id)} style={iconBtn}>🗑</button>
            </div>
          ))}
        </div>
      ))}

      {items.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: "#71717a" }}>
          No hay materiales. ¡Agregá el primero!
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={overlay}>
          <div style={modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <strong style={{ fontSize: 16 }}>{modal === "new" ? "Nuevo material" : "Editar material"}</strong>
              <button onClick={() => setModal(null)} style={iconBtn}>✕</button>
            </div>
            <Field label="Nombre">
              <input style={inp} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ej: Vinilo transparente" />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Categoría">
                <select style={inp} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Unidad">
                <select style={inp} value={form.unit} onChange={(e) => set("unit", e.target.value)}>
                  {UNITS.map((u) => <option key={u}>{u}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label={`Precio por ${form.unit} ($)`}>
                <input style={inp} type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0.00" />
              </Field>
              <Field label="Color tag">
                <input style={{ ...inp, padding: "4px 8px", cursor: "pointer", height: 42 }} type="color" value={form.color} onChange={(e) => set("color", e.target.value)} />
              </Field>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => setModal(null)} style={{ ...btnPrimary, background: "transparent", border: "1px solid #2e2e38", color: "#71717a", flex: 1 }}>Cancelar</button>
              <button onClick={handleSave} disabled={loading} style={{ ...btnPrimary, flex: 2, justifyContent: "center" }}>
                {loading ? "Guardando…" : "✓ Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
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

const card: React.CSSProperties       = { background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 14, padding: 20, marginBottom: 16 };
const cardTitle: React.CSSProperties  = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#71717a", marginBottom: 14, fontFamily: "monospace" };
const matRow: React.CSSProperties     = { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #2e2e38" };
const iconBtn: React.CSSProperties    = { background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6, color: "#71717a", fontSize: 14 };
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 8, border: "none", background: "#f97316", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" };
const inp: React.CSSProperties        = { width: "100%", padding: "9px 12px", background: "#18181c", border: "1px solid #2e2e38", borderRadius: 8, color: "#f1f0ed", fontSize: 14, outline: "none" };
const overlay: React.CSSProperties    = { position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 };
const modalBox: React.CSSProperties   = { background: "#1e1e24", border: "1px solid #2e2e38", borderRadius: 16, padding: 24, width: "100%", maxWidth: 420 };
