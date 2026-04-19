import PresupuestoClient from "@/app/dashboard/presupuesto/presupuesto-client";
import { DEMO_MATERIALS } from "@/lib/demoData";
import { Suspense } from "react";

export default function DemoPresupuestoPage() {
  return (
    <Suspense>
      <PresupuestoClient materials={DEMO_MATERIALS} isDemo />
    </Suspense>
  );
}
