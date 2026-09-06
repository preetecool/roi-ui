# Registry rebuild

After changing anything under `registry/brook/`, run:

```sh
pnpm registry:build
```

This syncs shared block files, regenerates registry indexes and block source, builds public manifests, resolves consumer imports, and copies `registry.json` to `public/r/registry.json`.

Edit shared block pages/data/hooks in `registry/brook/blocks-shared-files`, not the generated copies listed in `.gitignore`. Sync removes stale generated copies. Block install targets and dependencies are authored in `registry.json`; catalog metadata is authored in `registry/block-catalog.ts`.

Development startup and production builds generate the source they need. After block changes, validate with `pnpm test:registry`, `pnpm build`, and `pnpm test:browser`. The actual installer check is `node scripts/verify-block-install.mjs`.
