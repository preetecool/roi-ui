# Roi UI

Copy-paste components built on [Base UI](https://base-ui.com/), shipped in two styles: CSS Modules and Tailwind. Distributed through the [shadcn](https://ui.shadcn.com/) registry (`npx shadcn@latest add @roiui/<name>`). Docs run on Next.js and [Fumadocs](https://fumadocs.dev/).

- `registry/brook/ui`: components, CSS Modules style
- `registry/brook/tailwind`: the same components, Tailwind style
- `registry/brook/examples`, `registry/brook/blocks`: demos and blocks
- `content/`: MDX docs

## Getting started

Requires Node 22.18+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Block source and generation

Use Node 22.18 or newer and pnpm. `pnpm dev`, `pnpm build`, and `pnpm registry:build` generate shared block files before consuming them.

- Edit styling variants under `registry/brook/blocks` and `registry/brook/tailwind/blocks`. Edit shared pages and data in `registry/brook/blocks-shared-files`. Generated copies are listed in the managed section of `.gitignore`; the sync removes stale copies.
- `registry/block-catalog.ts` defines public names, titles, categories and layout. `registry.json` declares delivered files, their existing install targets and dependencies.
- The viewer and published blocks use the same target mapping. Relative imports follow the delivered layout. Additional example pages are labeled as usage and are not installed. Source highlighting runs on the server when a file is requested.
- Do not edit generated `registry/__*.tsx` or `public/r` artifacts. Run `pnpm registry:build` after source changes.

Run `pnpm test:registry` for import resolution, per-block consumer compilation, dependency declarations and sync checks. Run `pnpm build && pnpm test:browser` for production browser tests, after `pnpm exec playwright install chromium`. `node scripts/verify-block-install.mjs` performs actual CLI installs of Login and Pricing in both styles using temporary Next projects and a local registry server. The consumer fixtures assume a shadcn-initialized app supplies `cn`, React and Next.
