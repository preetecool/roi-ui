import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const TARGET_PREFIX = /^~\//;
const registry = JSON.parse(fs.readFileSync("registry.json", "utf8"));
for (const item of registry.items.filter((entry) => entry.files?.some((file) => file.path.includes("/blocks/")))) {
  test(`${item.name}: published relative imports resolve at install targets`, () => {
    const artifact = JSON.parse(fs.readFileSync(`public/r/${item.name}.json`, "utf8"));
    const targets = new Set(["lib/utils.ts"]);
    const visited = new Set();
    const collect = (entry) => {
      if (visited.has(entry.name)) {
        return;
      }
      visited.add(entry.name);
      for (const file of entry.files) {
        targets.add(file.target.replace(TARGET_PREFIX, ""));
      }
      for (const dependency of entry.registryDependencies ?? []) {
        collect(JSON.parse(fs.readFileSync(`public/r/${path.basename(dependency)}`, "utf8")));
      }
    };
    collect(artifact);
    const missing = [];
    for (const file of artifact.files) {
      for (const match of file.content.matchAll(/(?:from\s*|import\s*|import\s*\()(['"])(\.[^'"]+)\1/g)) {
        const base = path.posix.normalize(
          path.posix.join(path.posix.dirname(file.target.replace(TARGET_PREFIX, "")), match[2])
        );
        if (
          ![base, ...[".tsx", ".ts", ".json", "/index.ts", "/index.tsx"].map((ext) => base + ext)].some((target) =>
            targets.has(target)
          )
        ) {
          missing.push(`${file.target} -> ${match[2]}`);
        }
      }
    }
    assert.deepEqual(missing, []);
  });
}
