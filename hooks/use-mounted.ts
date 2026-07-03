"use client";
import { useEffect, useState } from "react";

/** Returns false during SSR/hydration, true after mount. Use to defer client-only UI. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
