import type { Dirent } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

const FILE_EXTENSION_REGEX = /\.(tsx?|jsx?)$/;
const MAX_IMPORT_LINE_LENGTH = 44;

type BlockFileData = {
  name: string;
  path: string;
  content: string;
};

type BlockData = {
  cssModulesFiles: BlockFileData[];
  tailwindFiles: BlockFileData[];
};

/**
 * Transform code for display (converts registry paths to user-facing paths)
 */
function transformCode(code: string): string {
  return code
    .replaceAll("@/registry/brook/ui/", "@/components/ui/")
    .replaceAll("@/registry/brook/tailwind/ui/", "@/components/ui/")
    .replaceAll("@/lib/utils-tailwind", "@/lib/utils");
}

/**
 * Transform registry file path to display path
 */
function getDisplayPath(registryPath: string, blockName: string): string {
  const fileName = path.basename(registryPath);
  if (fileName === "page.tsx") {
    return `app/${blockName}/page.tsx`;
  }
  if (fileName === "data.json") {
    return `app/${blockName}/data.json`;
  }
  if (registryPath.includes("/components/")) {
    return `components/${fileName}`;
  }
  if (registryPath.includes("/hooks/")) {
    return `hooks/${fileName}`;
  }
  if (registryPath.includes("/lib/")) {
    return `lib/${fileName}`;
  }
  if (registryPath.includes("/types/")) {
    return `types/${fileName}`;
  }
  return fileName;
}

/**
 * Read and process block files for pre-computation
 */
async function readBlockFiles(filePaths: string[], blockName: string): Promise<BlockFileData[]> {
  const files: BlockFileData[] = [];
  const cwd = process.cwd();

  for (const filePath of filePaths) {
    try {
      const fullPath = path.join(cwd, filePath);
      const rawContent = await fs.readFile(fullPath, "utf-8");
      const content = transformCode(rawContent);
      const fileName = path.basename(filePath);

      files.push({
        name: fileName,
        path: getDisplayPath(filePath, blockName),
        content,
      });
    } catch {
      // File doesn't exist
    }
  }

  return files;
}

/**
 * Get all files in a directory (tsx and css)
 */
async function getComponentFiles(dir: string, name: string): Promise<string[]> {
  const files: string[] = [];
  const basePath = path.join(dir, name);
  const cwd = process.cwd();

  try {
    const stat = await fs.stat(basePath);
    if (stat.isDirectory()) {
      const dirFiles = await fs.readdir(basePath);
      for (const file of dirFiles) {
        if (file.endsWith(".tsx") || file.endsWith(".module.css")) {
          const fullPath = path.join(basePath, file);
          files.push(path.relative(cwd, fullPath));
        }
      }
    } else {
      files.push(path.relative(cwd, basePath));
    }
  } catch {
    try {
      const tsxPath = `${basePath}.tsx`;
      await fs.stat(tsxPath);
      files.push(path.relative(cwd, tsxPath));
    } catch {
      // Doesn't exist
    }
  }

  return files.sort((a, b) => {
    const aIsTsx = a.endsWith(".tsx");
    const bIsTsx = b.endsWith(".tsx");
    if (aIsTsx && !bIsTsx) return -1;
    if (!aIsTsx && bIsTsx) return 1;
    return 0;
  });
}

/**
 * Get block files from new structure (page.tsx + components/ + hooks/ + lib/)
 */
async function getBlockFiles(dir: string, name: string): Promise<string[]> {
  const files: string[] = [];
  const basePath = path.join(dir, name);
  const cwd = process.cwd();

  try {
    // Check for page.tsx
    const pagePath = path.join(basePath, "page.tsx");
    try {
      await fs.stat(pagePath);
      files.push(path.relative(cwd, pagePath));
    } catch {
      // No page.tsx
    }

    // Check for data.json at root level
    const dataJsonPath = path.join(basePath, "data.json");
    try {
      await fs.stat(dataJsonPath);
      files.push(path.relative(cwd, dataJsonPath));
    } catch {
      // No data.json
    }

    // Check for components/ folder
    const componentsPath = path.join(basePath, "components");
    try {
      const componentFiles = await fs.readdir(componentsPath);
      for (const file of componentFiles) {
        if (file.endsWith(".tsx") || file.endsWith(".module.css") || file.endsWith(".ts")) {
          const fullPath = path.join(componentsPath, file);
          files.push(path.relative(cwd, fullPath));
        }
      }
    } catch {
      // No components folder, fall back to old structure
      try {
        const dirFiles = await fs.readdir(basePath);
        for (const file of dirFiles) {
          // Skip page.tsx and data.json since they're already added above
          if (file === "page.tsx" || file === "data.json") continue;
          if (file.endsWith(".tsx") || file.endsWith(".module.css")) {
            const fullPath = path.join(basePath, file);
            files.push(path.relative(cwd, fullPath));
          }
        }
      } catch {
        // Directory doesn't exist
      }
    }

    // Check for hooks/ folder
    const hooksPath = path.join(basePath, "hooks");
    try {
      const hookFiles = await fs.readdir(hooksPath);
      for (const file of hookFiles) {
        if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          const fullPath = path.join(hooksPath, file);
          files.push(path.relative(cwd, fullPath));
        }
      }
    } catch {
      // No hooks folder
    }

    // Check for lib/ folder
    const libPath = path.join(basePath, "lib");
    try {
      const libFiles = await fs.readdir(libPath);
      for (const file of libFiles) {
        if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          const fullPath = path.join(libPath, file);
          files.push(path.relative(cwd, fullPath));
        }
      }
    } catch {
      // No lib folder
    }

    // Check for types/ folder
    const typesPath = path.join(basePath, "types");
    try {
      const typesFiles = await fs.readdir(typesPath);
      for (const file of typesFiles) {
        if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          const fullPath = path.join(typesPath, file);
          files.push(path.relative(cwd, fullPath));
        }
      }
    } catch {
      // No types folder
    }
  } catch {
    // Directory doesn't exist
  }

  return files.sort((a, b) => {
    // Sort page.tsx first, then tsx, then css
    const aIsPage = a.endsWith("page.tsx");
    const bIsPage = b.endsWith("page.tsx");
    if (aIsPage && !bIsPage) return -1;
    if (!aIsPage && bIsPage) return 1;
    const aIsTsx = a.endsWith(".tsx");
    const bIsTsx = b.endsWith(".tsx");
    if (aIsTsx && !bIsTsx) return -1;
    if (!aIsTsx && bIsTsx) return 1;
    return 0;
  });
}

/**
 * Check if block has new structure (page.tsx)
 */
async function hasNewBlockStructure(dir: string, name: string): Promise<boolean> {
  const pagePath = path.join(dir, name, "page.tsx");
  try {
    await fs.stat(pagePath);
    return true;
  } catch {
    return false;
  }
}

async function buildOptimizedRegistry() {
  const examplesDir = path.join(process.cwd(), "registry/brook/examples");
  const blocksDir = path.join(process.cwd(), "registry/brook/blocks");
  const uiDir = path.join(process.cwd(), "registry/brook/ui");
  const tailwindExamplesDir = path.join(process.cwd(), "registry/brook/tailwind/examples");
  const tailwindBlocksDir = path.join(process.cwd(), "registry/brook/tailwind/blocks");
  const tailwindUiDir = path.join(process.cwd(), "registry/brook/tailwind/ui");

  const examplesEntries = await fs.readdir(examplesDir, {
    withFileTypes: true,
  });

  let blocksEntries: Dirent[] = [];
  try {
    blocksEntries = await fs.readdir(blocksDir, { withFileTypes: true });
  } catch {
    // blocks directory might not exist
  }

  let uiEntries: Dirent[] = [];
  try {
    uiEntries = await fs.readdir(uiDir, { withFileTypes: true });
  } catch {
    // ui directory might not exist
  }

  let tailwindExamplesEntries: Dirent[] = [];
  try {
    tailwindExamplesEntries = await fs.readdir(tailwindExamplesDir, {
      withFileTypes: true,
    });
  } catch {
    // tailwind examples directory might not exist
  }

  let tailwindBlocksEntries: Dirent[] = [];
  try {
    tailwindBlocksEntries = await fs.readdir(tailwindBlocksDir, {
      withFileTypes: true,
    });
  } catch {
    // tailwind blocks directory might not exist
  }

  let tailwindUiEntries: Dirent[] = [];
  try {
    tailwindUiEntries = await fs.readdir(tailwindUiDir, {
      withFileTypes: true,
    });
  } catch {
    // tailwind ui directory might not exist
  }

  // Metadata-only index (lightweight, no component imports)
  let metadataIndex = `// @generated
// This file is autogenerated by scripts/build-registry-index.ts
// Do not edit this file directly.
// @ts-nocheck

type RegistryEntry = {
  name: string;
  type: "example" | "block" | "ui";
  files?: string[];
  path?: string;
};

export const Index: Record<string, RegistryEntry> = {`;

  // Component loaders (only loaded when needed)
  let loadersIndex = `// @generated
// This file is autogenerated by scripts/build-registry-index.ts
// Do not edit this file directly.
// @ts-nocheck
import type { ComponentType } from "react";
import dynamic from "next/dynamic";

export const ComponentLoaders: Record<string, ComponentType> = {`;

  // Process examples
  for (const entry of examplesEntries) {
    const name = entry.name.replace(FILE_EXTENSION_REGEX, "");
    const isFile = entry.isFile();
    const componentPath = isFile ? `@/registry/brook/examples/${name}` : `@/registry/brook/examples/${name}/${name}`;

    const files = await getComponentFiles(examplesDir, entry.name);
    const filesArray = files.length > 0 ? `["${files.join('", "')}"]` : "[]";
    const key = name.includes("-") ? `"${name}"` : name;

    // Metadata
    metadataIndex += `
  ${key}: {
    name: "${name}",
    type: "example",
    files: ${filesArray},
    path: "${componentPath}",
  },`;

    // Loader - use .then() to ensure we get the component, not the module
    loadersIndex += `
  ${key}: dynamic(() => import("${componentPath}").then(mod => ({ default: mod.default || Object.values(mod)[0] }))),`;
  }

  // Process blocks
  const EXCLUDED_BLOCK_NAMES = ["tailwind", "card-history"];
  for (const entry of blocksEntries) {
    const name = entry.name.replace(FILE_EXTENSION_REGEX, "");

    // Skip excluded folders (like "tailwind" which is a subfolder, not a block)
    if (EXCLUDED_BLOCK_NAMES.includes(name)) continue;

    const isFile = entry.isFile();

    // Check if block uses new structure (page.tsx + components/)
    const hasNewStructure = await hasNewBlockStructure(blocksDir, name);
    const componentPath = isFile
      ? `@/registry/brook/blocks/${name}`
      : hasNewStructure
        ? `@/registry/brook/blocks/${name}/page`
        : `@/registry/brook/blocks/${name}/${name}`;

    const files = hasNewStructure
      ? await getBlockFiles(blocksDir, entry.name)
      : await getComponentFiles(blocksDir, entry.name);
    const filesArray = files.length > 0 ? `["${files.join('", "')}"]` : "[]";
    const key = name.includes("-") ? `"${name}"` : name;

    // Metadata
    metadataIndex += `
  ${key}: {
    name: "${name}",
    type: "block",
    files: ${filesArray},
    path: "${componentPath}",
  },`;

    // Loader - use .then() to ensure we get the component, not the module
    loadersIndex += `
  ${key}: dynamic(() => import("${componentPath}").then(mod => ({ default: mod.default || Object.values(mod)[0] }))),`;
  }

  // Process UI components (no component loading, just metadata)
  for (const entry of uiEntries) {
    const name = entry.name;
    const files = await getComponentFiles(uiDir, name);

    if (files.length === 0) continue;

    const filesArray = `["${files.join('", "')}"]`;
    const key = name.includes("-") ? `"${name}"` : name;

    metadataIndex += `
  ${key}: {
    name: "${name}",
    type: "ui",
    files: ${filesArray},
  },`;
  }

  // Process tailwind examples
  for (const entry of tailwindExamplesEntries) {
    const name = entry.name.replace(FILE_EXTENSION_REGEX, "");
    const isFile = entry.isFile();
    const componentPath = isFile
      ? `@/registry/brook/tailwind/examples/${name}`
      : `@/registry/brook/tailwind/examples/${name}/${name}`;

    const files = await getComponentFiles(tailwindExamplesDir, entry.name);
    const filesArray = files.length > 0 ? `["${files.join('", "')}"]` : "[]";
    const key = name.includes("-") ? `"${name}-tailwind"` : `${name}Tailwind`;

    // Metadata
    metadataIndex += `
  ${key}: {
    name: "${name}-tailwind",
    type: "example",
    files: ${filesArray},
    path: "${componentPath}",
  },`;

    // Loader - use .then() to ensure we get the component, not the module
    loadersIndex += `
  ${key}: dynamic(() => import("${componentPath}").then(mod => ({ default: mod.default || Object.values(mod)[0] }))),`;
  }

  // Process tailwind blocks
  for (const entry of tailwindBlocksEntries) {
    const name = entry.name.replace(FILE_EXTENSION_REGEX, "");
    const isFile = entry.isFile();

    // Check if block uses new structure (page.tsx + components/)
    const hasNewStructure = await hasNewBlockStructure(tailwindBlocksDir, name);
    const componentPath = isFile
      ? `@/registry/brook/tailwind/blocks/${name}`
      : hasNewStructure
        ? `@/registry/brook/tailwind/blocks/${name}/page`
        : `@/registry/brook/tailwind/blocks/${name}/${name}`;

    const files = hasNewStructure
      ? await getBlockFiles(tailwindBlocksDir, entry.name)
      : await getComponentFiles(tailwindBlocksDir, entry.name);
    const filesArray = files.length > 0 ? `["${files.join('", "')}"]` : "[]";
    const key = name.includes("-") ? `"${name}-tailwind"` : `${name}Tailwind`;

    // Metadata
    metadataIndex += `
  ${key}: {
    name: "${name}-tailwind",
    type: "block",
    files: ${filesArray},
    path: "${componentPath}",
  },`;

    // Loader - use .then() to ensure we get the component, not the module
    loadersIndex += `
  ${key}: dynamic(() => import("${componentPath}").then(mod => ({ default: mod.default || Object.values(mod)[0] }))),`;
  }

  // Process tailwind UI components
  for (const entry of tailwindUiEntries) {
    const name = entry.name.replace(FILE_EXTENSION_REGEX, "");
    const files = await getComponentFiles(tailwindUiDir, entry.name);

    if (files.length === 0) continue;

    const filesArray = `["${files.join('", "')}"]`;
    const key = name.includes("-") ? `"${name}-tailwind"` : `${name}Tailwind`;

    metadataIndex += `
  ${key}: {
    name: "${name}-tailwind",
    type: "ui",
    files: ${filesArray},
  },`;
  }

  metadataIndex += `
};
`;

  loadersIndex += `
};
`;

  console.log(`✅ ${examplesEntries.length} examples found`);
  console.log(`✅ ${blocksEntries.length} blocks found`);
  console.log(`✅ ${uiEntries.length} ui components found`);
  console.log(`✅ ${tailwindExamplesEntries.length} tailwind examples found`);
  console.log(`✅ ${tailwindBlocksEntries.length} tailwind blocks found`);
  console.log(`✅ ${tailwindUiEntries.length} tailwind ui components found`);

  // Write metadata index (lightweight)
  const metadataOutputPath = path.join(process.cwd(), "registry/__index__.tsx");
  await fs.mkdir(path.dirname(metadataOutputPath), { recursive: true });
  await fs.writeFile(metadataOutputPath, metadataIndex);
  console.log("✅ Built registry/__index__.tsx (metadata only)");

  // Write component loaders (separate file, loaded on-demand)
  const loadersOutputPath = path.join(process.cwd(), "registry/__loaders__.tsx");
  await fs.writeFile(loadersOutputPath, loadersIndex);
  console.log("✅ Built registry/__loaders__.tsx (components)");

  // Build pre-computed block files data
  const blocksData: Record<string, BlockData> = {};

  // Process CSS modules blocks
  for (const entry of blocksEntries) {
    const name = entry.name.replace(FILE_EXTENSION_REGEX, "");
    if (EXCLUDED_BLOCK_NAMES.includes(name)) continue;

    const hasNewStructure = await hasNewBlockStructure(blocksDir, name);
    const files = hasNewStructure
      ? await getBlockFiles(blocksDir, entry.name)
      : await getComponentFiles(blocksDir, entry.name);

    const cssModulesFiles = await readBlockFiles(files, name);

    // Find tailwind version
    const tailwindEntry = tailwindBlocksEntries.find((e) => e.name.replace(FILE_EXTENSION_REGEX, "") === name);
    let tailwindFiles: BlockFileData[] = [];

    if (tailwindEntry) {
      const twHasNewStructure = await hasNewBlockStructure(tailwindBlocksDir, name);
      const twFilePaths = twHasNewStructure
        ? await getBlockFiles(tailwindBlocksDir, tailwindEntry.name)
        : await getComponentFiles(tailwindBlocksDir, tailwindEntry.name);
      tailwindFiles = await readBlockFiles(twFilePaths, name);
    }

    blocksData[name] = {
      cssModulesFiles,
      tailwindFiles: tailwindFiles.length > 0 ? tailwindFiles : cssModulesFiles,
    };
  }

  // Write blocks data file (same format as __index__.tsx)
  let blocksDataContent = `// @generated
// This file is autogenerated by scripts/build-registry-index.ts
// Do not edit this file directly.
// @ts-nocheck
// biome-ignore-all lint/suspicious/noTemplateCurlyInString: Generated file contains code as strings

export type BlockFileData = {
  name: string;
  path: string;
  content: string;
};

export type BlockData = {
  cssModulesFiles: BlockFileData[];
  tailwindFiles: BlockFileData[];
};

export const BlocksData: Record<string, BlockData> = {`;

  // Helper to escape string content for regular string literal
  const escapeContent = (str: string): string => {
    return str
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
  };

  for (const [blockName, data] of Object.entries(blocksData)) {
    const key = blockName.includes("-") ? `"${blockName}"` : blockName;
    blocksDataContent += `
  ${key}: {
    cssModulesFiles: [`;

    for (const file of data.cssModulesFiles) {
      blocksDataContent += `
      {
        name: "${file.name}",
        path: "${file.path}",
        content: "${escapeContent(file.content)}",
      },`;
    }

    blocksDataContent += `
    ],
    tailwindFiles: [`;

    for (const file of data.tailwindFiles) {
      blocksDataContent += `
      {
        name: "${file.name}",
        path: "${file.path}",
        content: "${escapeContent(file.content)}",
      },`;
    }

    blocksDataContent += `
    ],
  },`;
  }

  blocksDataContent += `
};
`;

  const blocksDataOutputPath = path.join(process.cwd(), "registry/__blocks__.tsx");
  await fs.writeFile(blocksDataOutputPath, blocksDataContent);
  console.log("✅ Built registry/__blocks__.tsx (pre-computed block files)");

  // Format the generated files
  const { execSync } = await import("node:child_process");
  try {
    execSync("pnpm lint:fix registry/__index__.tsx registry/__loaders__.tsx registry/__blocks__.tsx", {
      stdio: "inherit",
    });
    console.log("✅ Formatted registry files");
  } catch (_error) {
    console.warn("⚠️  Could not format files, but continuing...");
  }
}

buildOptimizedRegistry().catch((error) => {
  console.error(error);
  process.exit(1);
});
