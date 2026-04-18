import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ─── Materials ────────────────────────────────────────────────────────────────
// Cada material tiene un precio por unidad (hoja, m², unidad).
// El userId de Clerk permite que cada usuario tenga sus propios materiales.

export const materials = sqliteTable("materials", {
  id:        text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId:    text("user_id").notNull(),           // Clerk user ID
  name:      text("name").notNull(),
  category:  text("category").notNull(),           // Sustrato | Laminado | Impresión | Corte | Otro
  unit:      text("unit").notNull(),               // hoja | m² | unidad
  price:     real("price").notNull(),
  color:     text("color").notNull().default("#f97316"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Quotes ───────────────────────────────────────────────────────────────────
// Cabecera del presupuesto.

export const quotes = sqliteTable("quotes", {
  id:           text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId:       text("user_id").notNull(),
  name:         text("name").notNull(),

  // Configuración del pedido
  qty:          integer("qty").notNull(),          // cantidad de stickers pedidos
  sheetType:    text("sheet_type").notNull(),       // A4 | A3 | Letter | Personalizado
  sheetW:       real("sheet_w").notNull(),          // mm
  sheetH:       real("sheet_h").notNull(),          // mm
  stickerW:     real("sticker_w").notNull(),        // mm
  stickerH:     real("sticker_h").notNull(),        // mm
  bleed:        real("bleed").notNull().default(2), // mm de sangría

  // Resultados del cálculo de pliego
  perSheet:     integer("per_sheet").notNull(),     // stickers por hoja
  sheetsNeeded: integer("sheets_needed").notNull(), // hojas totales necesarias
  rotated:      integer("rotated", { mode: "boolean" }).notNull().default(false),

  // Costos
  materialCost: real("material_cost").notNull(),
  markup:       real("markup").notNull(),           // % de ganancia
  totalPrice:   real("total_price").notNull(),
  pricePerUnit: real("price_per_unit").notNull(),

  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Quote Items ──────────────────────────────────────────────────────────────
// Detalle de materiales usados en cada presupuesto.
// Se guarda el precio al momento de cotizar (snapshot) para que no cambie
// si después modificás el precio del material.

export const quoteItems = sqliteTable("quote_items", {
  id:         text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  quoteId:    text("quote_id").notNull().references(() => quotes.id, { onDelete: "cascade" }),
  materialId: text("material_id").references(() => materials.id, { onDelete: "set null" }),
  name:       text("name").notNull(),              // snapshot del nombre
  unit:       text("unit").notNull(),              // snapshot de la unidad
  unitPrice:  real("unit_price").notNull(),        // snapshot del precio
  qty:        real("qty").notNull(),
  subtotal:   real("subtotal").notNull(),
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type Material  = typeof materials.$inferSelect;
export type NewMaterial = typeof materials.$inferInsert;
export type Quote     = typeof quotes.$inferSelect;
export type NewQuote  = typeof quotes.$inferInsert;
export type QuoteItem = typeof quoteItems.$inferSelect;
export type NewQuoteItem = typeof quoteItems.$inferInsert;

// Quote con sus items (para respuestas de API)
export type QuoteWithItems = Quote & { items: QuoteItem[] };
