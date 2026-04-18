/**
 * lib/layout.ts
 * Lógica pura de armado en pliego. Sin dependencias de UI ni de BD.
 * Fácilmente testeable con Vitest.
 */

export const SHEET_SIZES = {
  A4:     { w: 210, h: 297 },
  A3:     { w: 297, h: 420 },
  Letter: { w: 216, h: 279 },
} as const;

export type SheetType = keyof typeof SHEET_SIZES | "Personalizado";

export interface SheetDimensions {
  w: number; // mm
  h: number; // mm
}

export interface LayoutResult {
  /** Stickers que entran por hoja */
  perSheet: number;
  cols: number;
  rows: number;
  /** Si conviene girar el sticker para aprovechar mejor */
  rotated: boolean;
  /** Porcentaje de área aprovechada (0-100) */
  usagePercent: number;
  /** Hojas necesarias para la cantidad pedida */
  sheetsNeeded: number;
}

/**
 * Calcula el layout óptimo de stickers en una hoja.
 * Prueba orientación normal y rotada, y elige la que mete más stickers.
 *
 * @param sheet     Dimensiones de la hoja en mm
 * @param stickerW  Ancho del sticker + sangría en mm
 * @param stickerH  Alto del sticker + sangría en mm
 * @param qty       Cantidad total de stickers pedidos
 */
export function calculateLayout(
  sheet: SheetDimensions,
  stickerW: number,
  stickerH: number,
  qty: number
): LayoutResult {
  if (stickerW <= 0 || stickerH <= 0 || sheet.w <= 0 || sheet.h <= 0) {
    return { perSheet: 0, cols: 0, rows: 0, rotated: false, usagePercent: 0, sheetsNeeded: 0 };
  }

  // Orientación normal
  const colsNormal = Math.floor(sheet.w / stickerW);
  const rowsNormal = Math.floor(sheet.h / stickerH);
  const countNormal = colsNormal * rowsNormal;

  // Orientación rotada (sticker girado 90°)
  const colsRotated = Math.floor(sheet.w / stickerH);
  const rowsRotated = Math.floor(sheet.h / stickerW);
  const countRotated = colsRotated * rowsRotated;

  const rotated = countRotated > countNormal;
  const perSheet = rotated ? countRotated : countNormal;
  const cols     = rotated ? colsRotated  : colsNormal;
  const rows     = rotated ? rowsRotated  : rowsNormal;

  const usagePercent = perSheet > 0
    ? parseFloat(((stickerW * stickerH * perSheet) / (sheet.w * sheet.h) * 100).toFixed(1))
    : 0;

  const sheetsNeeded = perSheet > 0 ? Math.ceil(qty / perSheet) : 0;

  return { perSheet, cols, rows, rotated, usagePercent, sheetsNeeded };
}

/**
 * Devuelve las dimensiones de la hoja según el tipo.
 */
export function getSheetDimensions(
  type: SheetType,
  customW?: number,
  customH?: number
): SheetDimensions {
  if (type === "Personalizado") {
    return { w: customW ?? 0, h: customH ?? 0 };
  }
  return SHEET_SIZES[type];
}

/**
 * Dimensiones efectivas del sticker incluyendo sangría.
 */
export function effectiveSize(w: number, h: number, bleed: number) {
  return { w: w + bleed * 2, h: h + bleed * 2 };
}
