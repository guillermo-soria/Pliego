/**
 * Pliego page — Server Component wrapper.
 * La lógica de cálculo es pura (lib/layout.ts), la UI es Client Component.
 */
import PliegoClient from "./pliego-client";

export default function PliegoPage() {
  return <PliegoClient />;
}
