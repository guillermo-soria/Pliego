import PresupuestoClient from "@/app/dashboard/presupuesto/presupuesto-client";
import PresupuestoTracker from "@/app/demo/PresupuestoTracker";
import { DEMO_MATERIALS } from "@/lib/demoData";
import { Suspense } from "react";

export default function DemoPresupuestoPage() {
  return (
    <Suspense>
      <PresupuestoTracker />
      <PresupuestoClient materials={DEMO_MATERIALS} isDemo />
    </Suspense>
  );
}
