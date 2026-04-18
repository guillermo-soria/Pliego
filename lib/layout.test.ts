import { describe, expect, it } from "vitest";
import { calculateLayout, effectiveSize, getSheetDimensions } from "./layout";
import { calculatePricing } from "./pricing";

// ─── effectiveSize ───────────────────────────────────────────────
describe("effectiveSize", () => {
  it("agrega sangría en ambos lados", () => {
    expect(effectiveSize(50, 80, 2)).toEqual({ w: 54, h: 84 });
  });

  it("sin sangría devuelve las mismas medidas", () => {
    expect(effectiveSize(50, 50, 0)).toEqual({ w: 50, h: 50 });
  });

  it("sangría de 5mm suma 10mm por dimensión", () => {
    expect(effectiveSize(100, 200, 5)).toEqual({ w: 110, h: 210 });
  });
});

// ─── getSheetDimensions ──────────────────────────────────────────
describe("getSheetDimensions", () => {
  it("devuelve dimensiones correctas para A4", () => {
    expect(getSheetDimensions("A4")).toEqual({ w: 210, h: 297 });
  });

  it("devuelve dimensiones correctas para A3", () => {
    expect(getSheetDimensions("A3")).toEqual({ w: 297, h: 420 });
  });

  it("devuelve dimensiones correctas para Letter", () => {
    expect(getSheetDimensions("Letter")).toEqual({ w: 216, h: 279 });
  });

  it("devuelve medidas custom para Personalizado", () => {
    expect(getSheetDimensions("Personalizado", 320, 450)).toEqual({ w: 320, h: 450 });
  });

  it("devuelve 0 para Personalizado sin medidas", () => {
    expect(getSheetDimensions("Personalizado")).toEqual({ w: 0, h: 0 });
  });
});

// ─── calculateLayout ─────────────────────────────────────────────
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

  it("1 hoja exacta cuando qty == perSheet", () => {
    const sheet = { w: 200, h: 200 };
    const result = calculateLayout(sheet, 100, 100, 4); // 2x2 = 4 por hoja
    expect(result.perSheet).toBe(4);
    expect(result.sheetsNeeded).toBe(1);
  });

  it("una hoja extra si qty supera por uno", () => {
    const sheet = { w: 200, h: 200 };
    const result = calculateLayout(sheet, 100, 100, 5); // 4 por hoja, 5 pedidos
    expect(result.sheetsNeeded).toBe(2);
  });

  it("devuelve 0 con dimensiones de hoja inválidas", () => {
    const result = calculateLayout({ w: 0, h: 297 }, 50, 50, 100);
    expect(result.perSheet).toBe(0);
  });

  it("calcula cols y rows correctamente sin rotación", () => {
    const sheet = { w: 300, h: 200 };
    const result = calculateLayout(sheet, 100, 100, 10); // 3x2 = 6
    expect(result.cols).toBe(3);
    expect(result.rows).toBe(2);
    expect(result.rotated).toBe(false);
  });

  it("usagePercent es mayor que 0 cuando hay stickers", () => {
    const sheet = getSheetDimensions("A4");
    const result = calculateLayout(sheet, 50, 50, 100);
    expect(result.usagePercent).toBeGreaterThan(0);
    expect(result.usagePercent).toBeLessThanOrEqual(100);
  });
});

// ─── calculatePricing ────────────────────────────────────────────
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

  it("sin materiales el costo es 0", () => {
    const result = calculatePricing({ lines: [], markup: 50, qty: 100 });
    expect(result.materialCost).toBe(0);
    expect(result.totalPrice).toBe(0);
    expect(result.pricePerUnit).toBe(0);
  });

  it("markup 200% triplica el costo", () => {
    const result = calculatePricing({ lines, markup: 200, qty: 100 });
    expect(result.totalPrice).toBe(750); // 250 * 3
  });

  it("redondea subtotales a 2 decimales", () => {
    const fractional = [{ materialId: "m1", name: "X", unit: "hoja", unitPrice: 3.33, qty: 3 }];
    const result = calculatePricing({ lines: fractional, markup: 0, qty: 1 });
    expect(result.materialCost).toBe(9.99);
  });

  it("incluye subtotal por línea en el resultado", () => {
    const result = calculatePricing({ lines, markup: 0, qty: 100 });
    expect(result.lines[0].subtotal).toBe(140); // 28 * 5
    expect(result.lines[1].subtotal).toBe(110); // 22 * 5
  });
});
