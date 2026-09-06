import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { blockCatalog } from "../registry/block-catalog.ts";
import { readBlockFiles } from "../scripts/block-files.ts";

const TARGET_PREFIX = /^~\//;
for (const tailwind of [false, true]) {
  for (const blockName of Object.keys(blockCatalog)) {
    test(`${blockName}: clean consumer fixture compiles installed source and copied usage (${tailwind ? "Tailwind" : "CSS Modules"})`, async () => {
      const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "roi-consumer-"));
      try {
        fs.symlinkSync(path.resolve("node_modules"), path.join(fixture, "node_modules"), "dir");
        const seen = new Set();
        const write = (target, content) => {
          const destination = path.join(fixture, target.replace(TARGET_PREFIX, ""));
          fs.mkdirSync(path.dirname(destination), { recursive: true });
          fs.writeFileSync(destination, content);
        };
        const install = (name) => {
          if (seen.has(name)) {
            return;
          }
          seen.add(name);
          const artifact = JSON.parse(fs.readFileSync(`public/r/${name}.json`, "utf8"));
          for (const dependency of artifact.registryDependencies ?? []) {
            install(path.basename(dependency, ".json"));
          }
          for (const file of artifact.files) {
            write(file.target, file.content);
          }
        };
        // A shadcn-initialized Next app supplies cn and framework types.
        write(
          "lib/utils.ts",
          `import { clsx, type ClassValue } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...values: ClassValue[]) { return twMerge(clsx(values)); }`
        );
        write("next-env.d.ts", '/// <reference types="next" />\n');
        for (const name of [blockName]) {
          const itemName = `${name}${tailwind ? "-tailwind" : ""}`;
          install(itemName);
          const artifact = JSON.parse(fs.readFileSync(`public/r/${itemName}.json`, "utf8"));
          for (const file of await readBlockFiles(name, tailwind)) {
            if (file.kind === "usage") {
              write(file.path, file.content);
            } else {
              const delivered = artifact.files.find(
                (candidate) => candidate.target.replace(TARGET_PREFIX, "") === file.path
              );
              assert.ok(delivered, `${itemName}: viewer source is delivered`);
              assert.equal(file.content, delivered.content, `${itemName}: displayed source matches published source`);
            }
          }
        }
        write(
          "css.d.ts",
          'declare module "*.module.css" { const styles: Record<string, string>; export default styles; }'
        );
        write(
          "tsconfig.json",
          JSON.stringify({
            compilerOptions: {
              target: "ES2022",
              lib: ["dom", "dom.iterable", "esnext"],
              strict: true,
              noEmit: true,
              skipLibCheck: true,
              jsx: "react-jsx",
              esModuleInterop: true,
              module: "esnext",
              moduleResolution: "bundler",
              resolveJsonModule: true,
              baseUrl: ".",
              paths: { "@/*": ["./*"] },
            },
            include: ["**/*.ts", "**/*.tsx"],
          })
        );
        try {
          execFileSync(path.resolve("node_modules/.bin/tsc"), ["-p", path.join(fixture, "tsconfig.json")], {
            encoding: "utf8",
            stdio: "pipe",
          });
        } catch (error) {
          assert.fail(error.stdout || error.message);
        }
      } finally {
        fs.rmSync(fixture, { recursive: true, force: true });
      }
    });
  }
}
