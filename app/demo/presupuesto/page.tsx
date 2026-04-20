import PresupuestoClient from "@/app/dashboard/presupuesto/presupuesto-client";
import PresupuestoTracker from "@/app/demo/PresupuestoTracker";
import { DEMO_MATERIALS } from "@/lib/demoData";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DemoPresupuestoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;
  if (!sp.sheetType || !sp.stickerW) {
    redirect("/demo/pliego");
  }

  return (
    <Suspense>
      <PresupuestoTracker />
      <PresupuestoClient materials={DEMO_MATERIALS} isDemo />
    </Suspense>
  );
}
