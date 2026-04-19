"use client";

import { useDemoUsage } from "@/lib/useDemoUsage";
import DemoLimitModal from "./DemoLimitModal";

export default function DemoGuard({ children }: { children: React.ReactNode }) {
  const { limitReached } = useDemoUsage();
  return (
    <>
      {limitReached && <DemoLimitModal />}
      {children}
    </>
  );
}
