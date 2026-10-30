export type CanvasGroup = { name: string; examples: string[] };

// Each example belongs to the longest component name it starts with, so
// `alert-dialog-demo` lands on `alert-dialog`, not `alert`. Examples that match
// no component (e.g. `shipping`) become their own group.
export function groupExamples(componentNames: string[], exampleNames: string[]): CanvasGroup[] {
  const byLength = [...componentNames].sort((a, b) => b.length - a.length);
  const groups = new Map<string, string[]>(componentNames.map((name) => [name, []]));

  for (const example of exampleNames) {
    const owner = byLength.find((name) => example.startsWith(`${name}-`)) ?? example;
    const examples = groups.get(owner) ?? [];
    examples.push(example);
    groups.set(owner, examples);
  }

  return [...groups].filter(([, examples]) => examples.length > 0).map(([name, examples]) => ({ name, examples }));
}
