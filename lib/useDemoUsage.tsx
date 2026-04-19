"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEMO_MAX_USES,
  DEMO_STORAGE_KEY,
  getRemainingUses,
  hasReachedLimit,
  parseUses,
} from "./demoUsage";

export { DEMO_MAX_USES };

type DemoUsageCtx = {
  usesLeft: number;
  limitReached: boolean;
  increment: () => void;
};

export const DemoUsageContext = createContext<DemoUsageCtx>({
  usesLeft: DEMO_MAX_USES,
  limitReached: false,
  increment: () => {},
});

export function DemoUsageProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <DemoUsageContext.Provider
      value={{
        usesLeft: getRemainingUses(uses),
        limitReached: hasReachedLimit(uses),
        increment,
      }}
    >
      {children}
    </DemoUsageContext.Provider>
  );
}

export function useDemoUsage() {
  return useContext(DemoUsageContext);
}
