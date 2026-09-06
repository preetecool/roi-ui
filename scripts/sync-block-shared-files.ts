import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { collectFiles } from "./block-files.ts";

const PATH_EDGES = /^\/|\/$/g;

const start = "# AUTO-GENERATED: Synced block shared files (do not edit this section)";
const end = "# END AUTO-GENERATED";
const variants = ["registry/brook/blocks", "registry/brook/tailwind/blocks"];

async function collectCopies() {
  const copies: { source: string; destination: string }[] = [];
  for (const block of await fs.readdir("registry/brook/blocks-shared-files")) {
    const shared = `registry/brook/blocks-shared-files/${block}`;
    for (const variant of variants) {
      const destination = `${variant}/${block}`;
      // A shared block must have both variants; missing directories are errors.
      await fs.access(destination);
      for (const source of await collectFiles(shared)) {
        copies.push({ source, destination: `${destination}/${path.relative(shared, source)}` });
      }
    }
  }
  return copies;
}

async function checkNewDestination(destination: string, owned: string[]) {
  if (owned.some((file) => destination === file || destination.startsWith(`${file}/`))) {
    return;
  }
  try {
    await fs.lstat(destination);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return;
    }
    throw error;
  }
  throw new Error(`Refusing to overwrite authored files: ${destination}`);
}

async function syncBlockSharedFiles() {
  const ignore = await fs.readFile(".gitignore", "utf8");
  const startIndex = ignore.indexOf(start);
  const endIndex = ignore.indexOf(end);
  if (startIndex < 0 !== endIndex < 0 || (startIndex >= 0 && endIndex < startIndex)) {
    throw new Error("Malformed generated section in .gitignore");
  }
  const previous =
    startIndex < 0
      ? []
      : ignore
          .slice(startIndex + start.length, endIndex)
          .trim()
          .split("\n");
  const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0");
  const copies = await collectCopies();
  const removals = previous.filter(Boolean).map((file) => file.replace(PATH_EDGES, ""));
  for (const destination of [...removals, ...copies.map((copy) => copy.destination)]) {
    if (!variants.some((variant) => destination.startsWith(`${variant}/`)) || destination.split("/").includes("..")) {
      throw new Error(`Invalid generated path: ${destination}`);
    }
    if (
      tracked.some(
        (file) =>
          (file === destination || file.startsWith(`${destination}/`)) &&
          !removals.some((owned) => file === owned || file.startsWith(`${owned}/`))
      )
    ) {
      throw new Error(`Refusing to overwrite authored files: ${destination}`);
    }
  }
  for (const copy of copies) {
    await checkNewDestination(copy.destination, removals);
  }
  // Remove only paths owned by the previous sync, including deleted/renamed shared files.
  for (const destination of removals) {
    await fs.rm(destination, { recursive: true, force: true });
  }
  for (const { source, destination } of copies) {
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(source, destination);
  }
  const authored = (
    startIndex < 0 ? ignore : ignore.slice(0, startIndex) + ignore.slice(endIndex + end.length)
  ).trimEnd();
  const generated = copies
    .map((copy) => `/${copy.destination}`)
    .sort()
    .join("\n");
  await fs.writeFile(".gitignore", `${authored}\n\n${start}\n${generated}\n${end}\n`);
  console.log(`Synced ${copies.length} shared files; removed stale generated paths.`);
}

syncBlockSharedFiles().catch((error) => {
  console.error(error);
  process.exit(1);
});
