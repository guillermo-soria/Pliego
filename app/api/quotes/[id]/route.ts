import { db } from "@/db/client";
import { quotes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// DELETE /api/quotes/:id
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  // Los quoteItems se eliminan en cascada (onDelete: "cascade" en el schema)
  const [deleted] = await db
    .delete(quotes)
    .where(and(eq(quotes.id, id), eq(quotes.userId, userId)))
    .returning();

  if (!deleted) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
