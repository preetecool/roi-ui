import { loader } from "fumadocs-core/source";

/**
 * Lazy-loaded source that defers loading until actually used
 * This prevents bundling all MDX files in environments where it's not needed
 */
let _sourceCache: ReturnType<typeof loader> | null = null;

function createSource() {
  if (_sourceCache) return _sourceCache;

  // Import .source only when createSource is called
  const { docs } = require("@/.source/");

  _sourceCache = loader({
    baseUrl: "/docs",
    source: docs.toFumadocsSource(),
  });

  return _sourceCache;
}

/**
 * Export source as a Proxy to enable lazy loading
 * The source is only created when properties are accessed
 */
export const source = new Proxy({} as ReturnType<typeof loader>, {
  get(_target, prop) {
    const src = createSource();
    return src[prop as keyof typeof src];
  },
});
