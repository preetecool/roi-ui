import path from "node:path";

const SCRIPT_EXTENSION = /\.(tsx?|jsx?)$/;
const TARGET_PREFIX = /^~\//;

type RegistryFile = { path: string; target: string };

export function transformRegistryImports(
  content: string,
  registry: { items: { files?: RegistryFile[] }[] },
  strict = true,
  targetFile?: string
): string {
  const aliases = new Map(
    registry.items.flatMap((item) =>
      (item.files ?? []).map((file) => [
        `@/${file.path.replace(SCRIPT_EXTENSION, "")}`,
        `@/${file.target.replace(TARGET_PREFIX, "").replace(SCRIPT_EXTENSION, "")}`,
      ])
    )
  );
  aliases.set("@/lib/utils-tailwind", "@/lib/utils");
  return content.replace(/(["'])(@\/[^"'\n]+)\1/g, (match, quote, specifier) => {
    let target = aliases.get(specifier);
    if (!(strict || target)) {
      target = getDocumentationTarget(specifier);
    }
    if (strict && !target && specifier.startsWith("@/registry/")) {
      throw new Error(`Unknown registry import: ${specifier}`);
    }
    if (targetFile && target?.startsWith("@/")) {
      const relative = path.posix.relative(path.posix.dirname(targetFile), target.slice(2));
      target = relative.startsWith(".") ? relative : `./${relative}`;
    }
    return target ? `${quote}${target}${quote}` : match;
  });
}

// Documentation also includes UI examples that are not registry items yet.
function getDocumentationTarget(specifier: string): string | undefined {
  if (specifier.startsWith("@/registry/brook/ui/")) {
    return specifier.replace("@/registry/brook/ui/", "@/components/ui/");
  }
  if (specifier.startsWith("@/registry/brook/tailwind/ui/")) {
    const name = specifier.slice("@/registry/brook/tailwind/ui/".length);
    return `@/components/ui/${name}/${name}`;
  }
}
