import { describe, expect, it } from "vitest";
import { DEMO_MATERIALS, DEMO_QUOTES } from "./demoData";

describe("DEMO_MATERIALS", () => {
  it("tiene 3 materiales", () => {
    expect(DEMO_MATERIALS).toHaveLength(3);
  });

  it("todos tienen los campos requeridos", () => {
    for (const m of DEMO_MATERIALS) {
      expect(m.id).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.category).toBeTruthy();
      expect(m.unit).toBeTruthy();
      expect(m.price).toBeGreaterThan(0);
      expect(m.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("precios coinciden con los materiales cargados en DB", () => {
    const [vinilo, foto, laminado] = DEMO_MATERIALS;
    expect(vinilo.price).toBe(20);
    expect(foto.price).toBe(7);
    expect(laminado.price).toBe(11);
  });
});

describe("DEMO_QUOTES", () => {
  it("tiene 2 presupuestos de ejemplo", () => {
    expect(DEMO_QUOTES).toHaveLength(2);
  });

  it("cada presupuesto tiene items", () => {
    for (const q of DEMO_QUOTES) {
      expect(q.items.length).toBeGreaterThan(0);
    }
  });

  it("materialCost coincide con la suma de subtotales de items", () => {
    for (const q of DEMO_QUOTES) {
      const sumItems = q.items.reduce((acc, i) => acc + i.subtotal, 0);
      expect(Math.round(sumItems * 100)).toBe(Math.round(q.materialCost * 100));
    }
  });

  it("totalPrice = materialCost * (1 + markup/100)", () => {
    for (const q of DEMO_QUOTES) {
      const expected = Math.round(q.materialCost * (1 + q.markup / 100) * 100) / 100;
      expect(Math.round(q.totalPrice * 100)).toBe(Math.round(expected * 100));
    }
  });

  it("pricePerUnit = totalPrice / qty", () => {
    for (const q of DEMO_QUOTES) {
      const expected = Math.round((q.totalPrice / q.qty) * 100) / 100;
      expect(Math.round(q.pricePerUnit * 100)).toBe(Math.round(expected * 100));
    }
  });

  it("sheetsNeeded = ceil(qty / perSheet)", () => {
    for (const q of DEMO_QUOTES) {
      const expected = Math.ceil(q.qty / q.perSheet);
      expect(q.sheetsNeeded).toBe(expected);
    }
  });
});
