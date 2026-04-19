import MaterialesClient from "@/app/dashboard/materiales/materiales-client";
import { DEMO_MATERIALS } from "@/lib/demoData";

export default function DemoMaterialesPage() {
  return <MaterialesClient initialMaterials={DEMO_MATERIALS} isDemo />;
}
