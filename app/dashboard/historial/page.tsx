import { db } from "@/db/client";
import { quoteItems, quotes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, inArray } from "drizzle-orm";
import HistorialClient from "./historial-client";

export default async function HistorialPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const rows = await db
    .select()
    .from(quotes)
    .where(eq(quotes.userId, userId))
    .orderBy(desc(quotes.createdAt));

  const allItems = rows.length > 0
    ? await db.select().from(quoteItems).where(inArray(quoteItems.quoteId, rows.map((r) => r.id)))
    : [];

  const data = rows.map((q) => ({
    ...q,
    items: allItems.filter((i) => i.quoteId === q.id),
  }));

  return <HistorialClient initialQuotes={data} />;
}
