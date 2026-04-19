import HistorialClient from "@/app/dashboard/historial/historial-client";
import { DEMO_QUOTES } from "@/lib/demoData";

export default function DemoHistorialPage() {
  return <HistorialClient initialQuotes={DEMO_QUOTES} isDemo />;
}
