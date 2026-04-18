import { db } from "@/db/client";
import { quoteItems, quotes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import HistorialClient from "./historial-client";

export default async function HistorialPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const rows = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, userId))
    .orderBy(desc(quotes.createdAt));

  // Traer items para todos los quotes
  const allItems =
    rows.length > 0
      ? await db.select().from(quoteItems).where(
          quoteItems.quoteId.in(rows.map((r) => r.id))
        )
      : [];

  const data = rows.map((q) => ({
    ...q,
    items: allItems.filter((i) => i.quoteId === q.id),
  }));

  return <HistorialClient initialQuotes={data} />;
}
