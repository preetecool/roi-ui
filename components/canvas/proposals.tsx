"use client";

// Dev-only prototypes of the "tonal dark" component style, shown at the bottom
// of /canvas. Same Base UI parts as registry/brook/ui; only the styling differs.
// If approved, these styles replace the existing CSS modules.

import { Button } from "@base-ui/react/button";
import { Select } from "@base-ui/react/select";
import { ChevronDown, Copy, LoaderCircle, Plus, Search, Settings2, Trash2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./proposals.module.css";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

function TonalButton({
  variant = "secondary",
  size = "md",
  icon = false,
  loading = false,
  className,
  children,
  ...props
}: ComponentProps<typeof Button> & { variant?: Variant; size?: Size; icon?: boolean; loading?: boolean }) {
  return (
    <Button
      aria-busy={loading || undefined}
      className={cn(styles.scope, styles.button, className)}
      data-icon={icon || undefined}
      data-size={size}
      data-variant={variant}
      disabled={loading || props.disabled}
      focusableWhenDisabled={loading}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden className={styles.spinner} size={16} /> : null}
      {children}
    </Button>
  );
}

type Item = { label: string; value: string };

function TonalSelect({
  items,
  defaultValue,
  prefix,
  disabled,
}: {
  items: Item[];
  defaultValue: string;
  prefix?: string;
  disabled?: boolean;
}) {
  return (
    <Select.Root defaultValue={defaultValue} disabled={disabled} items={items}>
      <Select.Trigger className={cn(styles.scope, styles.trigger)}>
        {prefix ? <span className={styles.triggerPrefix}>{prefix}</span> : null}
        <Select.Value />
        <Select.Icon className={styles.triggerIcon}>
          <ChevronDown size={14} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        {/* Portaled outside .scope, so the positioner carries the tokens. */}
        <Select.Positioner alignItemWithTrigger={false} className={styles.scope} sideOffset={6}>
          <Select.Popup className={styles.popup}>
            <Select.List>
              {items.map((item) => (
                <Select.Item className={styles.item} key={item.value} value={item.value}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <span className={styles.radio}>
                    {/* Explicit child: with none, Base UI renders a default "✔️". */}
                    <Select.ItemIndicator className={styles.radioIndicator}>
                      <span className={styles.radioDot} />
                    </Select.ItemIndicator>
                  </span>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

const Stage = ({ children, column }: { children: ReactNode; column?: boolean }) => (
  <div className={cn(styles.scope, styles.stage)} data-column={column || undefined}>
    {children}
  </div>
);

const REGIONS = [
  { label: "All regions", value: "all" },
  { label: "North America", value: "na" },
  { label: "Europe", value: "eu" },
  { label: "Asia Pacific", value: "apac" },
];
const STATUSES = [
  { label: "All status", value: "all" },
  { label: "Stable", value: "stable" },
  { label: "Beta", value: "beta" },
  { label: "New", value: "new" },
];
const STYLES = [
  { label: "CSS Modules", value: "css" },
  { label: "Tailwind v4", value: "tw" },
];

export type ProposalState = { id: string; label: string; render: () => ReactNode };

export const PROPOSALS: { name: string; current: string; states: ProposalState[] }[] = [
  {
    name: "button-proposed",
    current: "button-demo",
    states: [
      {
        id: "variants",
        label: "Variants",
        render: () => (
          <Stage>
            <TonalButton variant="primary">Apply</TonalButton>
            <TonalButton>Cancel</TonalButton>
            <TonalButton variant="ghost">Skip</TonalButton>
            <TonalButton variant="danger">Delete</TonalButton>
          </Stage>
        ),
      },
      {
        id: "sizes",
        label: "Sizes",
        render: () => (
          <Stage column>
            {(["sm", "md", "lg"] as const).map((size) => (
              <div className={styles.row} key={size}>
                <TonalButton size={size} variant="primary">
                  Apply
                </TonalButton>
                <TonalButton size={size}>Cancel</TonalButton>
                <span className={styles.caption}>{size}</span>
              </div>
            ))}
          </Stage>
        ),
      },
      {
        id: "icons",
        label: "With icons",
        render: () => (
          <Stage column>
            <div className={styles.row}>
              <TonalButton variant="primary">
                <Plus aria-hidden size={16} />
                New component
              </TonalButton>
              <TonalButton>
                <Search aria-hidden size={16} />
                Quick search
                <kbd className={styles.kbd}>⌘K</kbd>
              </TonalButton>
            </div>
            <div className={styles.row}>
              <TonalButton aria-label="Copy" icon>
                <Copy size={16} />
              </TonalButton>
              <TonalButton aria-label="Settings" icon>
                <Settings2 size={16} />
              </TonalButton>
              <TonalButton aria-label="Delete" icon variant="danger">
                <Trash2 size={16} />
              </TonalButton>
            </div>
          </Stage>
        ),
      },
      {
        id: "states",
        label: "Disabled & loading",
        render: () => (
          <Stage>
            <TonalButton disabled variant="primary">
              Apply
            </TonalButton>
            <TonalButton disabled>Cancel</TonalButton>
            <TonalButton loading variant="primary">
              Saving
            </TonalButton>
          </Stage>
        ),
      },
      {
        id: "context",
        label: "In context",
        render: () => (
          <Stage>
            <div className={styles.surface}>
              <div className={styles.surfaceHeader}>
                <span className={styles.label}>Reduce motion</span>
                <span className={styles.hint}>Swap springs for crossfades</span>
              </div>
              <div className={styles.footer}>
                <TonalButton>Cancel</TonalButton>
                <TonalButton variant="primary">Save changes</TonalButton>
              </div>
            </div>
          </Stage>
        ),
      },
    ],
  },
  {
    name: "select-proposed",
    current: "select-demo",
    states: [
      {
        id: "default",
        label: "Default",
        render: () => (
          <Stage>
            <TonalSelect defaultValue="all" items={REGIONS} />
          </Stage>
        ),
      },
      {
        id: "filters",
        label: "Filter bar",
        render: () => (
          <Stage>
            <div className={styles.surface} data-toolbar>
              <div className={styles.surfaceHeader}>
                <span className={styles.hint}>Registry</span>
                <span className={styles.label}>62 components</span>
              </div>
              <TonalSelect defaultValue="all" items={STATUSES} />
              <TonalSelect defaultValue="all" items={REGIONS} />
            </div>
          </Stage>
        ),
      },
      {
        id: "prefix",
        label: "With prefix",
        render: () => (
          <Stage>
            <TonalSelect defaultValue="tw" items={STYLES} prefix="Styling" />
          </Stage>
        ),
      },
      {
        id: "disabled",
        label: "Disabled",
        render: () => (
          <Stage>
            <TonalSelect defaultValue="all" disabled items={REGIONS} />
          </Stage>
        ),
      },
    ],
  },
];
