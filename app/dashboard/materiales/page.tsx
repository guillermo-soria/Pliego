import { db } from "@/db/client";
import { materials } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import MaterialesClient from "./materiales-client";

// Server Component: trae los datos y se los pasa al Client Component
export default async function MaterialesPage() {
  const { userId } = await auth();

  const rows = userId
    ? await db.select().from(materials).where(eq(materials.userId, userId))
    : [];

  return <MaterialesClient initialMaterials={rows} />;
}
