# Block cleanup and viewer validation

Implemented from clean commit `3c1dd25` in `/Users/preet/.codex/worktrees/133a/roi-ui`. The saved checkout at `/Users/preet/code/roi-ui` has not been changed. Nothing was published, pushed or merged. V2 remains separate planning work.

## Changes

- Removed both Kanban variants, shared files, published artifacts, loaders, gallery/skeleton entries, the three exclusive DnD dependencies and the unused `--col-background` token.
- Kept every remaining registry name and install target. `registry.json` defines delivered files; `registry/block-catalog.ts` defines public catalog metadata. `scripts/block-files.ts` uses the same target mapping for published source and displayed source. Relative imports follow those targets, including shared JSON, nested source and usage pages. Missing source files fail generation.
- Usage pages that are not installed have an explicit label. File selection survives styling changes where the same path exists; unavailable files use the first file deterministically. Nested navigation uses native buttons and lists instead of an incomplete ARIA tree. Desktop keyboard navigation, mobile selection and copying are tested.
- The initial viewer carries file metadata. `/api/blocks/[name]/code` accepts only known block/style/file combinations and highlights the selected file on the server. The client caches visited files, cancels stale requests and retries failures.
- Login no longer logs credentials. It exposes optional sign-in and account-action callbacks, with pending/error handling. AI Composer retains the `ai-chat` registry name, supports submission/attachment callbacks, disables empty submission and retains failed messages. Following preview review, the added demo/backend notices and local-action status messages were removed from Login, Composer and Task in both styling variants. Callback failures still display error feedback.
- Following preview review, Task Card retains its original sample data and placeholder menu callbacks. The added modal editor, local mutation/restore workflow and status notices were removed. Its client boundary is explicit. Traffic totals derive from data; rates are optional props; shared fixtures use explicit ISO dates. Numeric dates remain accepted and display as `Day N` instead of relying on a hidden fixed origin.
- Dev startup, production builds and registry builds generate shared source first. Sync removes stale managed files, rejects new collisions with authored files and validates its managed paths. Docs now shares the global style provider and uses common import resolution. Fumadocs imports its generated server module directly, fixing the verified production alias failure.

## Preview rendering

A dev-browser check found SSR/client `useId` mismatches in Traffic, AI Composer, Login, Task, Expandable Carousel and Expandable Spread previews. With Traffic already isolated, both styling preferences reproduced warnings in the other five. The catalog marks only these six previews as client-only, with a visible `Loading preview…` status. Image Section, Progress and Pricing retain server rendering. A subsequent fresh-page sweep of all nine routes found zero hydration warnings. Consumer components are not modified to work around the docs shell.

## Validation

- `pnpm test:registry`: 56 checks cover published relative imports, registry dependency declarations, recursive sync/stale-file cleanup/collision protection, selection fallback, and 18 separate consumer fixtures. Every block and styling variant compiles with its registry dependencies and copied usage files. Displayed installed source must equal published source exactly.
- `node scripts/verify-block-install.mjs`: actual shadcn CLI installs of Login and Pricing in both styles passed TypeScript. These use independent temporary Next projects, actual package installation and a local registry server. The pinned CLI is `2.9.3-canary.0`. Its alias rewriting exposed a failure that the copy fixture missed; relative delivered imports resolved it.
- The consumer compilation fixtures reuse the repository's installed packages, so a separate dependency-closure test checks undeclared runtime imports. Actual CLI projects install only their declared packages. Both assume a shadcn-initialized Next app supplies `cn`, React and Next.
- `pnpm build` and `pnpm exec tsc --noEmit` pass. All seven browser tests pass against the production build and cover both demo variants, deferred code requests, retry, stale responses, filenames across styles, keyboard navigation, mobile selection, clipboard contents, Traffic totals, endpoint rejection, loading fallback and retained SSR.
- After deleting both generated carousel data files, `pnpm dev --port 3110` recreated them and the carousel returned HTTP 200. Browser page errors were empty. Desktop viewer/composer and mobile login screenshots were visually inspected.

The final generation reproducibility check compared 655 source/generated files across consecutive registry builds and found zero differences. `git diff --check` passes. A scan of application, registry, public artifacts, scripts, styles, helpers and dependency files found no remaining Kanban/DnD/token references.

Full lint remains failing: the clean starting commit had 550 errors and 14 warnings; the final tree has 413 errors and 14 warnings. A per-file/rule comparison has no added error counts. No lint rules were disabled to obtain that result.

A small warm-Shiki microcheck before deferral produced about 195 KB, 145 KB and 308 KB of raw/highlighted JSON for Traffic, Pricing and Spread respectively. Their current initial source metadata is 647, 686 and 1,187 bytes. These are serialized source payload measurements, not end-to-end latency measurements.

## Remaining architecture findings

- Full-repository lint already fails on the starting commit. Existing issues include semantic-role warnings in Task Card, complexity and nested conditionals in the general registry generator, and numerous untouched example/style files. These should be addressed separately, without treating this cleanup as a general formatting rewrite.
- UI/example generation still mixes scanning, metadata, loader creation and code serialization in one script and uses `@ts-nocheck` in generated indexes. A future manifest migration should also replace the arbitrary first-export loader fallback with explicit exports.
- Documentation can reference UI components absent from the install manifest, such as Preview Card. Docs import normalization preserves its previous fallback for these examples; strict block publishing rejects unknown registry imports. Expanding the manifest should be an explicit follow-up.
- The broader documentation `processVariants` path still highlights all component variants eagerly. Only the block viewer has moved to selected-file loading. Measure the broader docs path before changing it.
- Several CSS Modules/Tailwind components still duplicate behavior. This cleanup preserves their public contracts and tests the delivered outputs; consolidating behavior and changing typography, themes or distribution belongs in the separate V2 plan.
- Compilation and interaction checks do not establish a real authentication or AI backend. Those remain host-supplied callbacks. Consumer visuals still depend on the library's documented theme/token setup.
