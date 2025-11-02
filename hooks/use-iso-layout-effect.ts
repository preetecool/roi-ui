"use client";
import { useLayoutEffect } from "react";

const noop = () => {};

/**
 * Isomorphic useLayoutEffect hook
 *
 * Uses `useLayoutEffect` on the client and a no-op on the server to prevent SSR warnings.
 *
 * **Why this is needed:**
 * - `useLayoutEffect` runs synchronously after DOM mutations but before the browser paints,
 *   making it ideal for reading from localStorage and updating state without visual flashing
 * - However, `useLayoutEffect` throws warnings during server-side rendering (SSR) because
 *   there is no DOM on the server
 * - This hook conditionally uses `useLayoutEffect` only in browser environments (where `document` exists)
 *   and falls back to a no-op function during SSR
 *
 * **Use cases:**
 * - Initializing state from localStorage before first paint (prevents flash of default styles)
 * - Synchronously reading/writing DOM properties that affect layout
 * - Any client-only side effects that must run before browser paint
 */
export const useIsoLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : noop;
