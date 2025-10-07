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
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load from sessionStorage only after hydration
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem("pv_has_animated_once");
        if (stored === "true") {
          setShouldAnimate(false);
        }
        sessionStorage.setItem("pv_has_animated_once", "true");
      } catch {
        // Ignore sessionStorage errors (e.g., in private browsing)
      }
    }
  }, []);

  const value = useMemo(() => ({ shouldAnimate }), [shouldAnimate]);

  return (
    <FirstVisitContext.Provider value={value}>{children}</FirstVisitContext.Provider>
  );
}
