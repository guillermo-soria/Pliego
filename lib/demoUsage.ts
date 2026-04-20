export const DEMO_MAX_USES = 3;
export const DEMO_STORAGE_KEY = "pliego_demo_uses";

export function parseUses(raw: string | null): number {
  const n = parseInt(raw ?? "0", 10);
  return isNaN(n) || n < 0 ? 0 : n;
}

export function hasReachedLimit(uses: number, max = DEMO_MAX_USES): boolean {
  return uses >= max;
}

export function getRemainingUses(uses: number, max = DEMO_MAX_USES): number {
  return Math.max(0, max - uses);
}
