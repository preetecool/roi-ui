# CLAUDE.md

## Registry rebuild

Whenever you change anything under `registry/brook/` — components in `ui/`, examples in `examples/`, or their tailwind counterparts under `registry/brook/tailwind/` — rebuild the registry so the public JSON manifests in `public/r/` stay in sync:

```sh
pnpm registry:build
```

This runs `shadcn build`, patches imports via `scripts/fix-registry-imports.ts`, and copies `registry.json` to `public/r/registry.json`.

### Blocks

If the change touches a block (anything under `registry/brook/blocks/`, its tailwind copy under `registry/brook/tailwind/blocks/`, or shared block files in `registry/brook/blocks-shared-files/`), first sync the shared files, then build:

```sh
pnpm registry:sync-and-index
pnpm registry:build
```

`registry:sync` copies shared block files into each block via `scripts/sync-block-shared-files.ts` and `registry:index` regenerates the index. Skipping the sync step leaves blocks with stale shared files in the published JSON.

Run these after the edits are final, not after every intermediate save.
