import { db } from "@/db/client";
import { materials } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// PUT /api/materials/:id — actualiza un material (solo si pertenece al usuario)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const [updated] = await db
    .update(materials)
    .set({
      name:      body.name,
      category:  body.category,
      unit:      body.unit,
      price:     Number(body.price),
      color:     body.color,
      updatedAt: new Date().toISOString(),
    })
    .where(and(eq(materials.id, id), eq(materials.userId, userId)))
    .returning();

  if (!updated) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE /api/materials/:id
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  const [deleted] = await db
    .delete(materials)
    .where(and(eq(materials.id, id), eq(materials.userId, userId)))
    .returning();

  if (!deleted) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
