/** Exercise the actual shadcn CLI against locally generated registry artifacts. */
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const server = http.createServer((request, response) => {
  const name = path.basename(new URL(request.url, "http://localhost").pathname);
  const file = path.join(root, "public/r", name);
  if (!(name.endsWith(".json") && fs.existsSync(file))) {
    response.writeHead(404).end();
    return;
  }
  const artifact = JSON.parse(fs.readFileSync(file, "utf8"));
  artifact.registryDependencies = artifact.registryDependencies?.map((dependency) =>
    dependency.replace("https://roiui.com", origin)
  );
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(artifact));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const run = (command, args, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`))));
  });

try {
  for (const tailwind of [false, true]) {
    const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "roi-cli-install-"));
    const write = (file, content) => {
      const target = path.join(fixture, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content);
    };
    write(
      "package.json",
      JSON.stringify({
        name: "roi-consumer-test",
        private: true,
        packageManager: "pnpm@10.18.3",
        dependencies: {
          next: "16.1.1",
          react: "19.2.0",
          "react-dom": "19.2.0",
          clsx: "^2.1.1",
          "tailwind-merge": "^3.3.1",
        },
        devDependencies: {
          typescript: "^5",
          "@types/react": "19.2.2",
          "@types/react-dom": "19.2.2",
          "@types/node": "^20",
          tailwindcss: "4.1.16",
        },
      })
    );
    write(
      "tsconfig.json",
      JSON.stringify({
        compilerOptions: {
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          jsx: "react-jsx",
          module: "esnext",
          moduleResolution: "bundler",
          esModuleInterop: true,
          resolveJsonModule: true,
          target: "ES2022",
          lib: ["dom", "dom.iterable", "esnext"],
          baseUrl: ".",
          paths: { "@/*": ["./*"] },
        },
      })
    );
    write(
      "components.json",
      JSON.stringify({
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        tailwind: { config: "", css: "app/globals.css", baseColor: "neutral", cssVariables: true },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
      })
    );
    write("app/globals.css", '@import "tailwindcss";');
    write("app/page.tsx", "export default function Page() { return <main />; }");
    write("next-env.d.ts", '/// <reference types="next" />\n');
    write(
      "lib/utils.ts",
      'import { clsx, type ClassValue } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...values: ClassValue[]) { return twMerge(clsx(values)); }'
    );
    try {
      await run("pnpm", ["install", "--prefer-offline"], fixture);
      const suffix = tailwind ? "-tailwind" : "";
      await run(
        path.join(root, "node_modules/.bin/shadcn"),
        [
          "add",
          "--yes",
          "--cwd",
          fixture,
          `${origin}/r/pricing-section${suffix}.json`,
          `${origin}/r/card-login${suffix}.json`,
        ],
        root
      );
      for (const name of ["pricing-section", "card-login"]) {
        fs.accessSync(path.join(fixture, `components/blocks/${name}/${name}.tsx`));
      }
      await run(path.join(fixture, "node_modules/.bin/tsc"), ["--noEmit"], fixture);
      console.log(`Actual CLI install and TypeScript passed: ${tailwind ? "Tailwind" : "CSS Modules"}`);
    } finally {
      fs.rmSync(fixture, { recursive: true, force: true });
    }
  }
} finally {
  server.close();
}
