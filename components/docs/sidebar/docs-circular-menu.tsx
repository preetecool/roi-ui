"use client";

import { Gauge, Puzzle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Logo } from "@/components/shared/logo";
import type { PageTree } from "@/lib/source-types";
import styles from "./docs-circular-menu.module.css";

type TreeNode = PageTree.Node;

type FlatEntry =
  | { kind: "label"; key: string; name: string; icon: React.ReactNode | null }
  | { kind: "item"; key: string; name: string; url: string; icon: React.ReactNode | null };

function getIconForItem(itemName: string) {
  const name = itemName.toLowerCase();
  if (name === "quick start") {
    return <Gauge size={14} />;
  }
  if (name === "about roi ui" || name === "intro") {
    return <Logo fillColor="transparent" height={14} strokeColor="currentColor" strokeWidth={20} width={14} />;
  }
  if (name === "components") {
    return <Puzzle size={14} />;
  }
  return null;
}

type WalkableNode = TreeNode & {
  $id?: string;
  name?: React.ReactNode;
  url?: string;
  type?: string;
  children?: TreeNode[];
};

type WalkContext = {
  depth: number;
  parentKey: string;
  out: FlatEntry[];
};

function walkTree(node: TreeNode, ctx: WalkContext) {
  const anyNode = node as WalkableNode;
  const fallbackKey = anyNode.$id || `${ctx.parentKey}-${ctx.out.length}`;
  const label = typeof anyNode.name === "string" ? anyNode.name : String(anyNode.name ?? "");

  if (anyNode.type === "page" && anyNode.url) {
    ctx.out.push({
      kind: "item",
      key: fallbackKey,
      name: label,
      url: anyNode.url,
      icon: ctx.depth === 0 ? getIconForItem(label) : null,
    });
    return;
  }

  if (!anyNode.children?.length) {
    return;
  }

  if (ctx.depth > 0 || (label && !anyNode.url)) {
    ctx.out.push({ kind: "label", key: `${fallbackKey}-label`, name: label, icon: getIconForItem(label) });
  }
  for (const child of anyNode.children) {
    walkTree(child, { depth: ctx.depth + 1, parentKey: fallbackKey, out: ctx.out });
  }
}

function flattenTree(tree: PageTree.Root): FlatEntry[] {
  const out: FlatEntry[] = [];
  for (const child of tree.children) {
    walkTree(child, { depth: 0, parentKey: "root", out });
  }
  return out;
}

type DocsCircularMenuProps = {
  tree: PageTree.Root;
};

export function DocsCircularMenu({ tree }: DocsCircularMenuProps) {
  const pathname = usePathname();
  const entries = useMemo(() => flattenTree(tree), [tree]);
  const wheelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    rafRef.current = null;
    const wheel = wheelRef.current;
    const track = trackRef.current;
    if (!(wheel && track)) {
      return;
    }

    const wheelRect = wheel.getBoundingClientRect();
    const centerY = wheelRect.top + wheelRect.height / 2;
    const halfHeight = wheelRect.height / 2;

    const nodes = track.querySelectorAll<HTMLElement>("[data-wheel-node]");
    for (const el of nodes) {
      const r = el.getBoundingClientRect();
      const itemCenter = r.top + r.height / 2;
      const raw = (itemCenter - centerY) / halfHeight;
      const distance = Math.max(-1.2, Math.min(1.2, raw));
      const abs = Math.abs(distance);

      const angle = distance * 62;
      const translateX = -abs * abs * 70;
      const translateZ = -abs * 120;
      const scale = 1 - abs * 0.18;
      const opacity = Math.max(0, 1 - abs * 1.05);
      const blur = abs > 0.55 ? (abs - 0.55) * 6 : 0;

      el.style.transform = `translate3d(${translateX}px, 0, ${translateZ}px) rotateX(${angle}deg) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.filter = blur > 0 ? `blur(${blur}px)` : "";
      el.style.pointerEvents = abs > 0.92 ? "none" : "";
    }
  }, []);

  const schedule = useCallback(() => {
    if (rafRef.current !== null) {
      return;
    }
    rafRef.current = requestAnimationFrame(update);
  }, [update]);

  useLayoutEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) {
      return;
    }

    wheel.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      wheel.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [schedule]);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) {
      return;
    }

    const active = wheel.querySelector<HTMLElement>(`[data-url="${CSS.escape(pathname)}"]`);
    if (!active) {
      return;
    }

    const wheelRect = wheel.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const targetTop =
      wheel.scrollTop + (activeRect.top - wheelRect.top) - (wheelRect.height / 2 - activeRect.height / 2);

    wheel.scrollTo({ top: targetTop, behavior: "smooth" });
    requestAnimationFrame(update);
  }, [pathname, update]);

  return (
    <nav aria-label="Documentation navigation" className={styles.root}>
      <div className={styles.wheel} ref={wheelRef}>
        <div className={styles.track} ref={trackRef}>
          <div aria-hidden className={styles.spacer} />
          {entries.map((entry) => {
            if (entry.kind === "label") {
              return (
                <div className={styles.groupLabel} data-wheel-node key={entry.key}>
                  {entry.icon}
                  <span>{entry.name}</span>
                </div>
              );
            }
            const isActive = pathname === entry.url;
            return (
              <Link
                aria-current={isActive ? "page" : false}
                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                data-url={entry.url}
                data-wheel-node
                href={entry.url}
                key={entry.key}
              >
                {entry.icon ? <span className={styles.itemIcon}>{entry.icon}</span> : null}
                <span className={styles.itemLabel}>{entry.name}</span>
              </Link>
            );
          })}
          <div aria-hidden className={styles.spacer} />
        </div>
      </div>
      <div aria-hidden className={styles.focusIndicator} />
    </nav>
  );
}
