import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function loadCodeByName(name: string): Promise<string> {
  const possiblePaths = [
    join(process.cwd(), "registry", "brook", "examples", name, `${name}.tsx`),
    join(process.cwd(), "registry", "brook", "examples", `${name}.tsx`),
    join(process.cwd(), "registry", "brook", "blocks", name, `${name}.tsx`),
    join(process.cwd(), "registry", "brook", "blocks", `${name}.tsx`),
  ];

  for (const filePath of possiblePaths) {
    try {
      return await readFile(filePath, "utf-8");
    } catch {
      // Continue to next path
    }
  }

  return `Component source not found: ${name}.tsx`;
}

export async function loadCodeBySrc(src: string): Promise<string> {
  try {
    const filePath = join(process.cwd(), src);
    return await readFile(filePath, "utf-8");
  } catch (_error) {
    return `File not found: ${src}`;
  }
}

export function transformCode(code: string): string {
  return code.replace(
    /@\/registry\/brook\/ui\/([^"']+)/g,
    "@/components/ui/$1"
  );
}

export function getDisplayTitle(
  title: string | undefined,
  name: string | undefined,
  src: string | undefined
): string {
  if (title) {
    return title;
  }
  if (name) {
    return `${name}.tsx`;
  }
  if (src) {
    const filename = src.split("/").pop();
    return filename || "Code";
  }
  return "Code";
}
