import { promises as fs } from "node:fs";
import path from "node:path";

const SHARED_DIR = "registry/brook/blocks-shared-files";
const CSS_MODULES_DIR = "registry/brook/blocks";
const TAILWIND_DIR = "registry/brook/tailwind/blocks";
const GITIGNORE_START = "# AUTO-GENERATED: Synced block shared files (do not edit this section)";
const GITIGNORE_END = "# END AUTO-GENERATED";

/**
 * Recursively copy directory contents and collect paths
 */
async function copyDir(src: string, dest: string, collectedPaths: string[], baseDest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true });
  // Add directory path (with trailing slash for gitignore)
  collectedPaths.push(`/${path.relative(process.cwd(), dest)}/`);

  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath, collectedPaths, baseDest);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * Update .gitignore with synced paths
 */
async function updateGitignore(syncedPaths: string[]): Promise<void> {
  const gitignorePath = path.join(process.cwd(), ".gitignore");

  let content = "";
  try {
    content = await fs.readFile(gitignorePath, "utf-8");
  } catch {
    // .gitignore doesn't exist
  }

  // Remove existing auto-generated section
  const startIdx = content.indexOf(GITIGNORE_START);
  const endIdx = content.indexOf(GITIGNORE_END);

  if (startIdx !== -1 && endIdx !== -1) {
    content = content.slice(0, startIdx) + content.slice(endIdx + GITIGNORE_END.length);
  }

  // Clean up trailing newlines
  content = content.trimEnd();

  // Generate new section
  const sortedPaths = [...new Set(syncedPaths)].sort();
  const newSection = `\n\n${GITIGNORE_START}\n${sortedPaths.join("\n")}\n${GITIGNORE_END}\n`;

  await fs.writeFile(gitignorePath, content + newSection);
  console.log("✅ Updated .gitignore with synced paths");
}

/**
 * Sync shared files from blocks-shared-files to both CSS Modules and Tailwind directories
 */
async function syncBlockSharedFiles() {
  const cwd = process.cwd();
  const sharedDir = path.join(cwd, SHARED_DIR);
  const syncedPaths: string[] = [];

  try {
    const blocks = await fs.readdir(sharedDir, { withFileTypes: true });
    let syncedCount = 0;

    for (const block of blocks) {
      if (!block.isDirectory()) continue;

      const blockName = block.name;
      const sharedBlockDir = path.join(sharedDir, blockName);
      const cssModulesBlockDir = path.join(cwd, CSS_MODULES_DIR, blockName);
      const tailwindBlockDir = path.join(cwd, TAILWIND_DIR, blockName);

      // Check if variant directories exist
      const cssModulesExists = await fs
        .stat(cssModulesBlockDir)
        .then(() => true)
        .catch(() => false);
      const tailwindExists = await fs
        .stat(tailwindBlockDir)
        .then(() => true)
        .catch(() => false);

      if (!cssModulesExists && !tailwindExists) {
        console.warn(`⚠️  No variant directories found for block: ${blockName}`);
        continue;
      }

      // Get all files and directories in shared block
      const entries = await fs.readdir(sharedBlockDir, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(sharedBlockDir, entry.name);

        // Copy to CSS Modules
        if (cssModulesExists) {
          const cssModulesDest = path.join(cssModulesBlockDir, entry.name);
          if (entry.isDirectory()) {
            await copyDir(srcPath, cssModulesDest, syncedPaths, cssModulesBlockDir);
          } else {
            await fs.copyFile(srcPath, cssModulesDest);
            syncedPaths.push(`/${path.relative(cwd, cssModulesDest)}`);
          }
        }

        // Copy to Tailwind
        if (tailwindExists) {
          const tailwindDest = path.join(tailwindBlockDir, entry.name);
          if (entry.isDirectory()) {
            await copyDir(srcPath, tailwindDest, syncedPaths, tailwindBlockDir);
          } else {
            await fs.copyFile(srcPath, tailwindDest);
            syncedPaths.push(`/${path.relative(cwd, tailwindDest)}`);
          }
        }
      }

      console.log(`✅ Synced shared files for: ${blockName}`);
      syncedCount++;
    }

    if (syncedCount === 0) {
      console.log("No shared files to sync");
    } else {
      console.log(`\n✅ Synced ${syncedCount} block(s)`);
      await updateGitignore(syncedPaths);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No blocks-shared-files directory found. Nothing to sync.");
    } else {
      throw error;
    }
  }
}

syncBlockSharedFiles().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
