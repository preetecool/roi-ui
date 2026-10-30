"use client";

import { Tabs } from "@base-ui/react/tabs";
import { Agentation } from "agentation";
import { Fragment, type PointerEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ComponentPreviewClient } from "@/components/docs/component-preview/component-preview-client";
import { useStyle } from "@/components/providers/style-provider";
import { groupExamples } from "@/lib/canvas-groups";
import { Index } from "@/registry/__index__";
import styles from "./component-canvas.module.css";
import { PROPOSALS } from "./proposals";

const entries = Object.values(Index).filter((entry) => !entry.name.endsWith("-tailwind"));
const namesOf = (type: string) => entries.filter((entry) => entry.type === type).map((entry) => entry.name);

const COMPONENT_GROUPS = groupExamples(namesOf("ui"), namesOf("example"));
const BLOCKS = namesOf("block");

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2;
const START_VIEW = { x: 64, y: 96, zoom: 0.8 };

type View = typeof START_VIEW;

// Zoom by `factor`, keeping the canvas point under (cx, cy) fixed on screen.
const zoomAt = (v: View, factor: number, cx: number, cy: number): View => {
  const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom * factor));
  const ratio = zoom / v.zoom;
  return { zoom, x: cx - (cx - v.x) * ratio, y: cy - (cy - v.y) * ratio };
};

const titleCase = (name: string) =>
  name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

const tabLabel = (group: string, example: string) => {
  const rest = example.startsWith(`${group}-`) ? example.slice(group.length + 1) : example;
  return rest === "demo" ? "Default" : titleCase(rest);
};

type CardState = { id: string; label: string; render: () => ReactNode };

// A registry example rendered through the docs preview, so the CSS/Tailwind toggle applies.
const exampleState = (group: string, example: string, label = tabLabel(group, example)): CardState => ({
  id: example,
  label,
  render: () => (
    <ComponentPreviewClient align="center" isChartComponent={group === "chart"} name={example} replayButton={false} />
  ),
});

function CanvasCard({ name, states, wide }: { name: string; states: CardState[]; wide?: boolean }) {
  const [active, setActive] = useState(states[0].id);
  const current = states.find((state) => state.id === active) ?? states[0];

  return (
    <section aria-label={titleCase(name)} className={styles.card} data-canvas-card data-wide={wide || undefined}>
      <header className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{titleCase(name)}</h2>
        <span className={styles.cardCount}>
          {states.length} {states.length === 1 ? "state" : "states"}
        </span>
      </header>
      {states.length > 1 ? (
        <Tabs.Root onValueChange={(value) => setActive(value as string)} value={active}>
          <Tabs.List className={styles.tabs}>
            {states.map((state) => (
              <Tabs.Tab className={styles.tab} key={state.id} value={state.id}>
                {state.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.Root>
      ) : null}
      <div className={styles.stage}>
        <Fragment key={current.id}>{current.render()}</Fragment>
      </div>
    </section>
  );
}

export function ComponentCanvas() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [view, setView] = useState(START_VIEW);
  const { style, setStyle } = useStyle();

  // Built once so panning and zooming never re-render the components.
  const world = useMemo(
    () => (
      <>
        <h1 className={styles.sectionTitle}>Components · {COMPONENT_GROUPS.length}</h1>
        <div className={styles.masonry}>
          {COMPONENT_GROUPS.map((group) => (
            <CanvasCard
              key={group.name}
              name={group.name}
              states={group.examples.map((example) => exampleState(group.name, example))}
            />
          ))}
        </div>
        <h1 className={styles.sectionTitle}>Blocks · {BLOCKS.length}</h1>
        <div className={styles.blocks}>
          {BLOCKS.map((block) => (
            <CanvasCard key={block} name={block} states={[exampleState(block, block)]} wide />
          ))}
        </div>
        <h1 className={styles.sectionTitle} data-proposed>
          Proposed style · tonal dark
        </h1>
        <div className={styles.blocks}>
          {PROPOSALS.map((proposal) => (
            <CanvasCard
              key={proposal.name}
              name={proposal.name}
              states={[...proposal.states, exampleState(proposal.name, proposal.current, "Current")]}
              wide
            />
          ))}
        </div>
      </>
    ),
    []
  );

  // React's onWheel is passive, so preventDefault needs a native listener.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        const rect = viewport.getBoundingClientRect();
        // Clamp so a mouse-wheel notch (~100) and a trackpad pinch (~5) both feel smooth.
        const factor = Math.exp(-Math.max(-50, Math.min(50, event.deltaY)) * 0.005);
        setView((v) => zoomAt(v, factor, event.clientX - rect.left, event.clientY - rect.top));
      } else {
        setView((v) => ({ ...v, x: v.x - event.deltaX, y: v.y - event.deltaY }));
      }
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, []);

  // Drag empty canvas to pan. Drags on cards stay with the component, and
  // clicks on the HUD aren't captured.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const onBackground =
      target === event.currentTarget ||
      (target.closest("[data-canvas-world]") && !target.closest("[data-canvas-card]"));
    if (!onBackground) {
      return;
    }
    drag.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) {
      return;
    }
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    drag.current = { x: event.clientX, y: event.clientY };
    setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const zoomFromCenter = (factor: number) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    setView((v) => zoomAt(v, factor, (rect?.width ?? 0) / 2, (rect?.height ?? 0) / 2));
  };

  return (
    <>
      {/* Syncs to the agentation-mcp server so annotations reach the coding agent. */}
      <Agentation appName="roi-ui canvas" endpoint="http://localhost:4747" />
      <div
        className={styles.viewport}
        data-dragging={drag.current ? "" : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        ref={viewportRef}
        style={{
          backgroundPosition: `${view.x}px ${view.y}px`,
          backgroundSize: `${24 * view.zoom}px ${24 * view.zoom}px`,
        }}
      >
        <div
          className={styles.world}
          data-canvas-world
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}
        >
          {world}
        </div>

        <div className={styles.hud}>
          <span className={styles.hudTitle}>roi ui canvas</span>
          <div className={styles.hudGroup}>
            <button
              aria-label="Zoom out"
              className={styles.hudButton}
              onClick={() => zoomFromCenter(1 / 1.2)}
              type="button"
            >
              −
            </button>
            <span className={styles.hudZoom}>{Math.round(view.zoom * 100)}%</span>
            <button aria-label="Zoom in" className={styles.hudButton} onClick={() => zoomFromCenter(1.2)} type="button">
              +
            </button>
            <button className={styles.hudButton} onClick={() => setView(START_VIEW)} type="button">
              Reset
            </button>
          </div>
          <div className={styles.hudGroup}>
            {(["css-modules", "tailwind"] as const).map((value) => (
              <button
                aria-pressed={style === value}
                className={styles.hudButton}
                key={value}
                onClick={() => setStyle(value)}
                type="button"
              >
                {value === "css-modules" ? "CSS Modules" : "Tailwind"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
