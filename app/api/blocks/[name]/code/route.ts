import { highlightCode } from "@/lib/highlight-code";
import { BlocksData } from "@/registry/__blocks__";
import { blockCatalog } from "@/registry/block-catalog";

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const query = new URL(request.url).searchParams;
  const style = query.get("style");
  if (!Object.hasOwn(blockCatalog, name) || (style !== "tailwind" && style !== "css-modules")) {
    return new Response("Not found", { status: 404 });
  }
  const files = style === "tailwind" ? BlocksData[name].tailwindFiles : BlocksData[name].cssModulesFiles;
  const file = files.find((candidate) => candidate.path === query.get("path"));
  if (!file) {
    return new Response("Not found", { status: 404 });
  }
  const extension = file.name.split(".").at(-1);
  const language = ({ json: "json", css: "css", ts: "typescript" } as Record<string, string>)[extension ?? ""] ?? "tsx";
  return Response.json({ content: file.content, highlightedContent: await highlightCode(file.content, language) });
}
