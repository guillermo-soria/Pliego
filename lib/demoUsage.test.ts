import { describe, expect, it } from "vitest";
import {
  DEMO_MAX_USES,
  getRemainingUses,
  hasReachedLimit,
  parseUses,
} from "./demoUsage";

describe("parseUses", () => {
  it("parsea null como 0", () => {
    expect(parseUses(null)).toBe(0);
  });

  it("parsea string numérico válido", () => {
    expect(parseUses("7")).toBe(7);
  });

  it("parsea string inválido como 0", () => {
    expect(parseUses("abc")).toBe(0);
  });

  it("parsea negativo como 0", () => {
    expect(parseUses("-3")).toBe(0);
  });

  it("parsea '0' como 0", () => {
    expect(parseUses("0")).toBe(0);
  });
});

describe("hasReachedLimit", () => {
  it("devuelve false cuando uses < max", () => {
    expect(hasReachedLimit(5, 10)).toBe(false);
  });

  it("devuelve true cuando uses === max", () => {
    expect(hasReachedLimit(10, 10)).toBe(true);
  });

  it("devuelve true cuando uses > max", () => {
    expect(hasReachedLimit(15, 10)).toBe(true);
  });

  it("usa DEMO_MAX_USES por defecto", () => {
    expect(hasReachedLimit(DEMO_MAX_USES)).toBe(true);
    expect(hasReachedLimit(DEMO_MAX_USES - 1)).toBe(false);
  });
});

describe("getRemainingUses", () => {
  it("devuelve diferencia cuando uses < max", () => {
    expect(getRemainingUses(3, 10)).toBe(7);
  });

  it("devuelve 0 cuando uses === max", () => {
    expect(getRemainingUses(10, 10)).toBe(0);
  });

  it("devuelve 0 cuando uses > max (no negativo)", () => {
    expect(getRemainingUses(15, 10)).toBe(0);
  });

  it("usa DEMO_MAX_USES por defecto", () => {
    expect(getRemainingUses(0)).toBe(DEMO_MAX_USES);
  });
});
