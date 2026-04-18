import { db } from "@/db/client";
import { materials } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import PresupuestoClient from "./presupuesto-client";

export default async function PresupuestoPage() {
  const { userId } = await auth();

  const mats = userId
    ? await db.select().from(materials).where(eq(materials.userId, userId))
    : [];

  return (
    <Suspense>
      <PresupuestoClient materials={mats} />
    </Suspense>
  );
}
