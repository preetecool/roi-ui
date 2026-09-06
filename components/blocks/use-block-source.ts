import { useEffect, useRef, useState } from "react";

type Source = { content: string; highlightedContent: string };

export function useBlockSource(name: string, style: string, path: string | undefined, enabled: boolean) {
  const [loaded, setLoaded] = useState<{ key: string; source: Source } | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const cache = useRef(new Map<string, Source>());
  const key = `${name}:${style}:${path ?? ""}`;

  useEffect(() => {
    if (!(enabled && path)) {
      return;
    }
    setError(false);
    const cached = cache.current.get(key);
    if (cached) {
      setLoaded({ key, source: cached });
      return;
    }
    const controller = new AbortController();
    // The attempt parameter gives Retry a fresh request even after a cached HTTP failure.
    const query = new URLSearchParams({ style, path, attempt: String(attempt) });
    async function load() {
      try {
        const response = await fetch(`/api/blocks/${name}/code?${query}`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Unable to load source");
        }
        const source: Source = await response.json();
        if (controller.signal.aborted) {
          return;
        }
        cache.current.set(key, source);
        setLoaded({ key, source });
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
        }
      }
    }
    load();
    return () => controller.abort();
  }, [enabled, path, name, style, key, attempt]);

  return { source: loaded?.key === key ? loaded.source : null, error, retry: () => setAttempt((value) => value + 1) };
}
