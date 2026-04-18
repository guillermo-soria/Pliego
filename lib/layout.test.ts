import { describe, expect, it } from "vitest";
import { calculateLayout, effectiveSize, getSheetDimensions } from "./layout";
import { calculatePricing } from "./pricing";

// ─── Layout tests ────────────────────────────────────────────────
describe("calculateLayout", () => {
  it("calcula stickers de 50x50 en A4", () => {
    const sheet = getSheetDimensions("A4");
    const { w, h } = effectiveSize(50, 50, 2);            // 54x54mm
    const result = calculateLayout(sheet, w, h, 100);
    // A4: 210x297 → floor(210/54)=3, floor(297/54)=5 → 15 por hoja
    expect(result.perSheet).toBe(15);
    expect(result.sheetsNeeded).toBe(Math.ceil(100 / 15));
  });

  it("elige rotación cuando conviene", () => {
    const sheet = { w: 200, h: 100 };
    // Sticker 90x40: normal → floor(200/90)*floor(100/40) = 2*2 = 4
    //                rotado → floor(200/40)*floor(100/90) = 5*1 = 5 ✓
    const result = calculateLayout(sheet, 90, 40, 10);
    expect(result.rotated).toBe(true);
    expect(result.perSheet).toBe(5);
  });

  it("devuelve 0 si el sticker no entra", () => {
    const sheet = { w: 100, h: 100 };
    const result = calculateLayout(sheet, 200, 200, 50);
    expect(result.perSheet).toBe(0);
    expect(result.sheetsNeeded).toBe(0);
  });

  it("calcula hojas necesarias correctamente", () => {
    const sheet = getSheetDimensions("A4");
    const { w, h } = effectiveSize(50, 50, 0);
    const result = calculateLayout(sheet, w, h, 100);
    expect(result.sheetsNeeded).toBe(Math.ceil(100 / result.perSheet));
  });
});

// ─── Pricing tests ───────────────────────────────────────────────
describe("calculatePricing", () => {
  const lines = [
    { materialId: "m1", name: "Vinilo", unit: "hoja", unitPrice: 28, qty: 5 },
    { materialId: "m2", name: "Laminado", unit: "hoja", unitPrice: 22, qty: 5 },
  ];

  it("calcula costo total correctamente", () => {
    const result = calculatePricing({ lines, markup: 0, qty: 100 });
    expect(result.materialCost).toBe(250); // 5*28 + 5*22
    expect(result.totalPrice).toBe(250);
  });

  it("aplica markup correctamente", () => {
    const result = calculatePricing({ lines, markup: 50, qty: 100 });
    expect(result.materialCost).toBe(250);
    expect(result.markupAmount).toBe(125);
    expect(result.totalPrice).toBe(375);
  });

  it("calcula precio por unidad", () => {
    const result = calculatePricing({ lines, markup: 50, qty: 100 });
    expect(result.pricePerUnit).toBe(3.75);
  });

  it("devuelve 0 por unidad si qty es 0", () => {
    const result = calculatePricing({ lines, markup: 50, qty: 0 });
    expect(result.pricePerUnit).toBe(0);
  });
});
