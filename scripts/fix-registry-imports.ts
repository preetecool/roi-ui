/**
 * Post-processing script for registry build
 * Replaces @/lib/utils-tailwind imports with @/lib/utils in all registry JSON files
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { basename, join, resolve } from "path";

const publicRegistryPath = resolve(process.cwd(), "public/r");

const files = readdirSync(publicRegistryPath)
  .filter((file) => file.endsWith(".json"))
  .map((file) => join(publicRegistryPath, file));

let totalFiles = 0;
let modifiedFiles = 0;

console.log(`Scanning ${files.length} files...`);

for (const file of files) {
  try {
    const content = readFileSync(file, "utf-8");
    const updatedContent = content
      .split("@/lib/utils-tailwind")
      .join("@/lib/utils");

    if (content !== updatedContent) {
      writeFileSync(file, updatedContent, "utf-8");
      modifiedFiles++;
      console.log(`Fixed: ${basename(file)}`);
    }

    totalFiles++;
  } catch (error) {
    console.error(`Error processing ${basename(file)}:`, error);
  }
}

console.log(`\nComplete. Modified ${modifiedFiles} of ${totalFiles} files.`);
