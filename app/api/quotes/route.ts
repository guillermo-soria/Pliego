import { db } from "@/db/client";
import { quoteItems, quotes, type NewQuote, type NewQuoteItem } from "@/db/schema";
import { calculateLayout, effectiveSize, getSheetDimensions } from "@/lib/layout";
import { calculatePricing } from "@/lib/pricing";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const rows = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, userId))
    .orderBy(desc(quotes.createdAt));

  const ids = rows.map((q) => q.id);
  const items = ids.length > 0
    ? await db.select().from(quoteItems).where(inArray(quoteItems.quoteId, ids))
    : [];

  const result = rows.map((q) => ({
    ...q,
    items: items.filter((i) => i.quoteId === q.id),
  }));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();

  const sheetDims = body.sheetType === "Personalizado"
    ? { w: Number(body.sheetW), h: Number(body.sheetH) }
    : getSheetDimensions(body.sheetType);

  const eff = effectiveSize(Number(body.stickerW), Number(body.stickerH), Number(body.bleed ?? 2));
  const layout = calculateLayout(sheetDims, eff.w, eff.h, Number(body.qty));

  const pricing = calculatePricing({
    lines: body.lines,
    markup: Number(body.markup),
    qty: Number(body.qty),
  });

  const newQuote: NewQuote = {
    userId,
    name: body.name || `Presupuesto ${new Date().toLocaleDateString("es-UY")}`,
    qty: Number(body.qty),
    sheetType: body.sheetType,
    sheetW: sheetDims.w,
    sheetH: sheetDims.h,
    stickerW: Number(body.stickerW),
    stickerH: Number(body.stickerH),
    bleed: Number(body.bleed ?? 2),
    perSheet: layout.perSheet,
    sheetsNeeded: layout.sheetsNeeded,
    rotated: layout.rotated,
    materialCost: pricing.materialCost,
    markup: Number(body.markup),
    totalPrice: pricing.totalPrice,
    pricePerUnit: pricing.pricePerUnit,
  };

  const [quote] = await db.insert(quotes).values(newQuote).returning();

  const newItems: NewQuoteItem[] = pricing.lines.map((l) => ({
    quoteId: quote.id,
    materialId: l.materialId,
    name: l.name,
    unit: l.unit,
    unitPrice: l.unitPrice,
    qty: l.qty,
    subtotal: l.subtotal,
  }));

  const items = await db.insert(quoteItems).values(newItems).returning();
  return NextResponse.json({ ...quote, items }, { status: 201 });
}
