import { db } from "@/db/client";
import { quoteItems, quotes, type NewQuote, type NewQuoteItem } from "@/db/schema";
import { calculateLayout, effectiveSize, getSheetDimensions } from "@/lib/layout";
import { calculatePricing } from "@/lib/pricing";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/quotes — historial del usuario
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const rows = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, userId))
    .orderBy(desc(quotes.createdAt));

  // Traer items de todos los quotes en una sola query
  const ids = rows.map((q) => q.id);
  const items =
    ids.length > 0
      ? await db.select().from(quoteItems).where(
          // quoteId IN (ids) — Drizzle no tiene inArray directo para libsql,
          // pero podemos filtrarlo en JS para listas pequeñas
          quoteItems.quoteId.in(ids)
        )
      : [];

  const result = rows.map((q) => ({
    ...q,
    items: items.filter((i) => i.quoteId === q.id),
  }));

  return NextResponse.json(result);
}

// POST /api/quotes — crea un presupuesto completo
// Body:
// {
//   name, qty, sheetType, sheetW?, sheetH?, stickerW, stickerH, bleed, markup,
//   lines: [{ materialId, name, unit, unitPrice, qty }]
// }
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();

  // 1. Calcular pliego
  const sheetDims =
    body.sheetType === "Personalizado"
      ? { w: Number(body.sheetW), h: Number(body.sheetH) }
      : getSheetDimensions(body.sheetType);

  const eff = effectiveSize(Number(body.stickerW), Number(body.stickerH), Number(body.bleed ?? 2));
  const layout = calculateLayout(sheetDims, eff.w, eff.h, Number(body.qty));

  // 2. Calcular precios
  const pricing = calculatePricing({
    lines:  body.lines,
    markup: Number(body.markup),
    qty:    Number(body.qty),
  });

  // 3. Insertar quote
  const newQuote: NewQuote = {
    userId,
    name:         body.name || `Presupuesto ${new Date().toLocaleDateString("es-UY")}`,
    qty:          Number(body.qty),
    sheetType:    body.sheetType,
    sheetW:       sheetDims.w,
    sheetH:       sheetDims.h,
    stickerW:     Number(body.stickerW),
    stickerH:     Number(body.stickerH),
    bleed:        Number(body.bleed ?? 2),
    perSheet:     layout.perSheet,
    sheetsNeeded: layout.sheetsNeeded,
    rotated:      layout.rotated,
    materialCost: pricing.materialCost,
    markup:       Number(body.markup),
    totalPrice:   pricing.totalPrice,
    pricePerUnit: pricing.pricePerUnit,
  };

  const [quote] = await db.insert(quotes).values(newQuote).returning();

  // 4. Insertar items
  const newItems: NewQuoteItem[] = pricing.lines.map((l) => ({
    quoteId:    quote.id,
    materialId: l.materialId,
    name:       l.name,
    unit:       l.unit,
    unitPrice:  l.unitPrice,
    qty:        l.qty,
    subtotal:   l.subtotal,
  }));

  const items = await db.insert(quoteItems).values(newItems).returning();

  return NextResponse.json({ ...quote, items }, { status: 201 });
}
