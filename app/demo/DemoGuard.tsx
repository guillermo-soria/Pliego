"use client";

import { DEMO_MAX_USES, useDemoUsage } from "@/lib/useDemoUsage";
import DemoLimitModal from "./DemoLimitModal";

export default function DemoGuard({ children }: { children: React.ReactNode }) {
  const { uses } = useDemoUsage();
  return (
    <>
      {uses > DEMO_MAX_USES && <DemoLimitModal />}
      {children}
    </>
  );
}
