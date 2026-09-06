/** Make published source use the same consumer paths as the block viewer. */
import { promises as fs } from "node:fs";
import { transformRegistryImports } from "../lib/registry-imports.ts";
import { blockCatalog } from "../registry/block-catalog.ts";
import { readBlockFiles } from "./block-files.ts";

const registry = JSON.parse(await fs.readFile("registry.json", "utf8"));
for (const item of registry.items) {
  const file = `public/r/${item.name}.json`;
  const artifact = JSON.parse(await fs.readFile(file, "utf8"));
  const name = item.name.replace(/-tailwind$/, "");
  const blockFiles = Object.hasOwn(blockCatalog, name)
    ? await readBlockFiles(name, item.name.endsWith("-tailwind"))
    : null;
  for (const source of artifact.files ?? []) {
    if (blockFiles) {
      const displayed = blockFiles.find(
        (candidate) => `~/${candidate.path}` === source.target && candidate.kind === "installed"
      );
      if (!displayed) {
        throw new Error(`Missing delivered file: ${source.path}`);
      }
      source.content = displayed.content;
    } else {
      source.content = transformRegistryImports(source.content, registry, true, source.target.replace(/^~\//, ""));
    }
  }
  await fs.writeFile(file, `${JSON.stringify(artifact, null, 2)}\n`);
}
console.log("Updated published consumer imports.");
