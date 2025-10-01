"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface FirstVisitContextValue {
  shouldAnimate: boolean;
}

const FirstVisitContext = createContext<FirstVisitContextValue>({ shouldAnimate: true });

export function useFirstVisit() {
  return useContext(FirstVisitContext);
}

export function FirstVisitProvider({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(() => {
    // Initialize from sessionStorage synchronously on client to prevent flash
    if (typeof window === 'undefined') return true; // SSR fallback; client will correct
    try {
      const stored = sessionStorage.getItem("pv_has_animated_once");
      return stored !== "true"; // true if not yet animated this session
    } catch {
      return true;
    }
  });

  useEffect(() => {
    // Mark as animated for the rest of this session (after first paint)
    try {
      sessionStorage.setItem("pv_has_animated_once", "true");
    } catch {}
  }, []);

  const value = useMemo(() => ({ shouldAnimate }), [shouldAnimate]);

  return (
    <FirstVisitContext.Provider value={value}>{children}</FirstVisitContext.Provider>
  );
}
