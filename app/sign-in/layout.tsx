import type { ReactNode } from "react";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`body { background: #0a3a48 !important; }`}</style>
      {children}
    </>
  );
}
