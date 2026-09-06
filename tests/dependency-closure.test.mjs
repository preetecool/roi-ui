import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";
import { blockCatalog } from "../registry/block-catalog.ts";

const DEPENDENCY_VERSION = /(?<!^)@[^/]*$/;
const normalize = (dependency) => dependency.replace(DEPENDENCY_VERSION, "");
for (const name of Object.keys(blockCatalog).flatMap((key) => [key, `${key}-tailwind`])) {
  test(`${name}: runtime imports are declared by its registry dependency closure`, () => {
    const artifacts = [];
    const visited = new Set();
    const collect = (key) => {
      if (visited.has(key)) {
        return;
      }
      visited.add(key);
      const item = JSON.parse(fs.readFileSync(`public/r/${key}.json`, "utf8"));
      artifacts.push(item);
      for (const dependency of item.registryDependencies ?? []) {
        collect(dependency.split("/").at(-1).replace(".json", ""));
      }
    };
    collect(name);
    const declared = new Set([
      "react",
      "react-dom",
      "next",
      "clsx",
      "tailwind-merge",
      ...artifacts.flatMap((item) => (item.dependencies ?? []).map(normalize)),
    ]);
    const missing = [];
    for (const item of artifacts) {
      for (const file of item.files) {
        for (const dependency of runtimeImports(file)) {
          if (!declared.has(dependency)) {
            missing.push(`${file.path}: ${dependency}`);
          }
        }
      }
    }
    assert.deepEqual(missing, []);
  });
}

function runtimeImports(file) {
  const source = ts.createSourceFile(file.path, file.content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const imports = [];
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || statement.importClause?.isTypeOnly) {
      continue;
    }
    const specifier = statement.moduleSpecifier.text;
    if (specifier.startsWith(".") || specifier.startsWith("@/")) {
      continue;
    }
    imports.push(specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0]);
  }
  return imports;
}
