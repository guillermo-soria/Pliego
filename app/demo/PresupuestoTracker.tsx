"use client";

import { useDemoUsage } from "@/lib/useDemoUsage";
import { useEffect, useRef } from "react";

// Cuenta 1 uso cada vez que el usuario llega a /demo/presupuesto,
// sin importar si viene del botón o de la navegación directa.
export default function PresupuestoTracker() {
  const { increment } = useDemoUsage();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    increment();
  }, [increment]);

  return null;
}
