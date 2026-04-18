/**
 * lib/pricing.ts
 * Lógica pura de cálculo de precios. Sin dependencias de UI ni de BD.
 */

export interface MaterialLine {
  materialId: string | null;
  name: string;
  unit: string;
  unitPrice: number;
  qty: number;
}

export interface PricingInput {
  lines: MaterialLine[];
  markup: number;   // porcentaje, ej: 50 = 50%
  qty: number;      // cantidad de unidades del pedido
}

export interface PricingResult {
  lines: Array<MaterialLine & { subtotal: number }>;
  materialCost: number;
  markupAmount: number;
  totalPrice: number;
  pricePerUnit: number;
}

/**
 * Calcula el precio final de un presupuesto.
 *
 * Fórmula:
 *   costo materiales = Σ (qty_material × precio_material)
 *   precio total     = costo materiales × (1 + markup / 100)
 *   precio por unidad = precio total / qty_pedido
 */
export function calculatePricing(input: PricingInput): PricingResult {
  const lines = input.lines.map((line) => ({
    ...line,
    subtotal: round2(line.qty * line.unitPrice),
  }));

  const materialCost = round2(lines.reduce((sum, l) => sum + l.subtotal, 0));
  const markupAmount = round2(materialCost * (input.markup / 100));
  const totalPrice   = round2(materialCost + markupAmount);
  const pricePerUnit = input.qty > 0 ? round2(totalPrice / input.qty) : 0;

  return { lines, materialCost, markupAmount, totalPrice, pricePerUnit };
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
