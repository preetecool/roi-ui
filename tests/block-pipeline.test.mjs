import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { resolveSelectedFile } from "../components/blocks/file-selection.ts";
import { collectFiles } from "../scripts/block-files.ts";

const COLLISION_MESSAGE = /Refusing to overwrite authored files/;
const syncScript = path.resolve("scripts/sync-block-shared-files.ts");
test("selection retains the equivalent path and falls back deterministically", () => {
  const files = [{ path: "app/example/page.tsx" }, { path: "components/example.tsx" }];
  assert.equal(resolveSelectedFile(files, "components/example.tsx"), files[1]);
  assert.equal(resolveSelectedFile(files, "components/example.module.css"), files[0]);
  assert.equal(resolveSelectedFile([], null), undefined);
});

test("sync recursively collects, removes stale output, preserves authored files and is reproducible", async () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "roi-sync-"));
  const write = (file, content) => {
    fs.mkdirSync(path.dirname(path.join(fixture, file)), { recursive: true });
    fs.writeFileSync(path.join(fixture, file), content);
  };
  const run = () => execFileSync(process.execPath, [syncScript], { cwd: fixture, stdio: "pipe" });
  try {
    execFileSync("git", ["init", "-q"], { cwd: fixture });
    write(".gitignore", "");
    const shared = "registry/brook/blocks-shared-files/example";
    const variants = ["registry/brook/blocks/example", "registry/brook/tailwind/blocks/example"];
    write(`${shared}/lib/nested/helper.ts`, "export const value = 1;");
    for (const variant of variants) {
      write(`${variant}/components/authored.ts`, "authored");
    }
    run();
    const first = fs.readFileSync(path.join(fixture, ".gitignore"), "utf8");
    run();
    assert.equal(fs.readFileSync(path.join(fixture, ".gitignore"), "utf8"), first);
    assert.deepEqual(
      (await collectFiles(path.join(fixture, shared))).map((file) => path.basename(file)),
      ["helper.ts"]
    );
    fs.unlinkSync(path.join(fixture, `${shared}/lib/nested/helper.ts`));
    write(`${shared}/data.json`, "[]");
    run();
    for (const variant of variants) {
      assert.equal(fs.existsSync(path.join(fixture, `${variant}/lib/nested/helper.ts`)), false);
      assert.equal(fs.readFileSync(path.join(fixture, `${variant}/components/authored.ts`), "utf8"), "authored");
      assert.equal(fs.readFileSync(path.join(fixture, `${variant}/data.json`), "utf8"), "[]");
    }
    write(`${shared}/components/authored.ts`, "collision");
    assert.throws(run, COLLISION_MESSAGE);
    execFileSync("git", ["add", "."], { cwd: fixture });
    assert.throws(run, COLLISION_MESSAGE);
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
