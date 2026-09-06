import { promises as fs } from "node:fs";
import path from "node:path";
import { transformRegistryImports } from "../lib/registry-imports.ts";

const TARGET_PREFIX = /^~\//;
const SCRIPT_EXTENSION = /\.(tsx?|jsx?)$/;

export type BlockFileData = {
  name: string;
  path: string;
  content: string;
  kind: "installed" | "usage";
};

type RegistryFile = { path: string; target: string };

export async function collectFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => {
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? collectFiles(file) : [file];
      })
  );
  return files.flat();
}

/** Use installer targets for delivered source, and app paths for usage-only files. */
export async function readBlockFiles(blockName: string, tailwind = false): Promise<BlockFileData[]> {
  const registry = JSON.parse(await fs.readFile("registry.json", "utf8"));
  const item = registry.items.find(
    (entry: { name: string }) => entry.name === `${blockName}${tailwind ? "-tailwind" : ""}`
  );
  if (!item) {
    throw new Error(`Missing registry item: ${blockName}`);
  }
  const root = `registry/brook/${tailwind ? "tailwind/" : ""}blocks/${blockName}`;
  const canonical = (file: string) => file.replace(`registry/brook/blocks-shared-files/${blockName}`, root);
  const installed = new Map<string, string>(
    (item.files as RegistryFile[]).map((file) => [canonical(file.path), file.target.replace(TARGET_PREFIX, "")])
  );
  const sources = [...new Set([...(await collectFiles(root)), ...installed.keys()])];
  const targets = new Map(
    sources.map((source) => [source, installed.get(source) ?? `app/${blockName}/${path.relative(root, source)}`])
  );
  const files = await Promise.all(
    sources.map(async (source) => {
      const target = targets.get(source);
      if (!target) {
        throw new Error(`Missing target: ${source}`);
      }
      const raw = await fs.readFile(source, "utf8");
      const content = transformRegistryImports(
        raw.replace(/(['"])(\.[^'"\n]+)\1/g, (match, quote, specifier) => {
          const resolved = path.normalize(path.join(path.dirname(source), specifier));
          const destination = [
            resolved,
            `${resolved}.tsx`,
            `${resolved}.ts`,
            `${resolved}/index.tsx`,
            `${resolved}/index.ts`,
          ].find((candidate) => targets.has(candidate));
          if (!destination) {
            return match;
          }
          const destinationTarget = targets.get(destination);
          if (!destinationTarget) {
            throw new Error(`Missing target: ${destination}`);
          }
          let relative = path.relative(path.dirname(target), destinationTarget);
          if (!path.extname(specifier)) {
            relative = relative.replace(SCRIPT_EXTENSION, "");
          }
          if (!relative.startsWith(".")) {
            relative = `./${relative}`;
          }
          return `${quote}${relative}${quote}`;
        }),
        registry,
        true,
        target
      );
      return {
        name: path.basename(target),
        path: target,
        content,
        kind: installed.has(source) ? ("installed" as const) : ("usage" as const),
      };
    })
  );
  return files.sort((a, b) => Number(b.kind === "usage") - Number(a.kind === "usage") || a.path.localeCompare(b.path));
}
