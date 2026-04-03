"use client";

import { createContext, useContext } from "react";

export type HintsMode = "clean" | "hover" | "all";

interface ComposeContextValue {
  hints: HintsMode;
}

const ComposeContext = createContext<ComposeContextValue>({ hints: "hover" });

export function ComposeProvider({
  hints,
  children,
}: {
  hints: HintsMode;
  children: React.ReactNode;
}) {
  return (
    <ComposeContext.Provider value={{ hints }}>
      {children}
    </ComposeContext.Provider>
  );
}

export function useCompose() {
  return useContext(ComposeContext);
}
