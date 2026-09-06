export function resolveSelectedFile<T extends { path: string }>(
  files: T[],
  selectedPath: string | null
): T | undefined {
  return files.find((file) => file.path === selectedPath) ?? files[0];
}
