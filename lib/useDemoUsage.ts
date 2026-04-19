"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEMO_MAX_USES,
  DEMO_STORAGE_KEY,
  getRemainingUses,
  hasReachedLimit,
  parseUses,
} from "./demoUsage";

export { DEMO_MAX_USES };

export function useDemoUsage() {
  const [uses, setUses] = useState(0);

  useEffect(() => {
    setUses(parseUses(localStorage.getItem(DEMO_STORAGE_KEY)));
  }, []);

  const increment = useCallback(() => {
    setUses((prev) => {
      if (hasReachedLimit(prev)) return prev;
      const next = prev + 1;
      localStorage.setItem(DEMO_STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return {
    uses,
    usesLeft: getRemainingUses(uses),
    limitReached: hasReachedLimit(uses),
    increment,
  };
}
