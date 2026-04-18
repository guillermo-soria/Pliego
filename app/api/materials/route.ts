import { db } from "@/db/client";
import { materials, type NewMaterial } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/materials — lista todos los materiales del usuario autenticado
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const rows = await db
    .select()
    .from(materials)
    .where(eq(materials.userId, userId))
    .orderBy(materials.category, materials.name);

  return NextResponse.json(rows);
}

// POST /api/materials — crea un nuevo material
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();

  const newMaterial: NewMaterial = {
    userId,
    name:     body.name,
    category: body.category,
    unit:     body.unit,
    price:    Number(body.price),
    color:    body.color ?? "#f97316",
  };

  const [created] = await db.insert(materials).values(newMaterial).returning();
  return NextResponse.json(created, { status: 201 });
}
