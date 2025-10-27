"use client";

import {
  type ComponentProps,
  type ComponentType,
  type CSSProperties,
  createContext,
  type ReactNode,
  useContext,
  useId,
  useMemo,
} from "react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/tw-utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: ComponentProps<"div"> & {
  config: ChartConfig;
  children: ComponentProps<typeof ResponsiveContainer>["children"];
}) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        {...props}
        className={cn("flex h-full w-full justify-center text-xs", className)}
        data-chart={chartId}
        data-slot="chart"
      >
        <ChartStyle config={config} id={chartId} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
        <style global jsx>{`
          [data-chart="${chartId}"] .recharts-cartesian-axis-tick text {
            fill: var(--muted-foreground);
          }
          [data-chart="${chartId}"] .recharts-cartesian-grid line {
            stroke: oklch(from var(--border) l c h / 0.3);
          }
          [data-chart="${chartId}"] .recharts-curve.recharts-tooltip-cursor {
            stroke: var(--border);
          }
          [data-chart="${chartId}"] .recharts-polar-grid line {
            stroke: var(--border);
          }
          [data-chart="${chartId}"] .recharts-radial-bar-background-sector {
            fill: var(--muted);
          }
          [data-chart="${chartId}"] .recharts-rectangle.recharts-tooltip-cursor {
            fill: var(--muted);
            opacity: 0.3;
          }
          [data-chart="${chartId}"] .recharts-reference-line line {
            stroke: var(--border);
          }
          [data-chart="${chartId}"] .recharts-dot[stroke="#fff"] {
            stroke: transparent;
          }
          [data-chart="${chartId}"] .recharts-layer {
            outline: none;
          }
          [data-chart="${chartId}"] .recharts-sector {
            outline: none;
          }
          [data-chart="${chartId}"] .recharts-sector[stroke="#fff"] {
            stroke: transparent;
          }
          [data-chart="${chartId}"] .recharts-surface {
            outline: none;
          }
        `}</style>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - content is generated from config object, not user input
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = Tooltip;

// Helper to get indicator style class
function getIndicatorStyleClass(indicator: "line" | "dot" | "dashed"): string {
  if (indicator === "dot") {
    return "h-2.5 w-2.5";
  }
  if (indicator === "line") {
    return "w-1";
  }
  return "w-0 border-[1.5px] border-dashed bg-transparent";
}

function TooltipItem({
  item,
  index,
  formatter,
  itemConfig,
  indicator,
  indicatorColor,
  hideIndicator,
  nestLabel,
  tooltipLabel,
}: {
  item: {
    value?: number | string;
    name?: string;
    dataKey?: string;
    color?: string;
    fill?: string;
    payload: Record<string, unknown>;
    type?: string;
  };
  index: number;
  formatter?: (
    value: number | string,
    name: string,
    item: unknown,
    index: number,
    payload: unknown
  ) => ReactNode;
  itemConfig?: { icon?: ComponentType; label?: ReactNode };
  indicator: "line" | "dot" | "dashed";
  indicatorColor?: string;
  hideIndicator: boolean;
  nestLabel: boolean;
  tooltipLabel: ReactNode;
}) {
  const indicatorStyleClass = getIndicatorStyleClass(indicator);
  const nestedClass = nestLabel && indicator === "dashed" ? "my-0.5" : "";

  // Format the value using the formatter if provided
  const formattedValue =
    formatter && item?.value !== undefined && item.name
      ? formatter(item.value, item.name, item, index, item.payload)
      : item.value?.toLocaleString();

  return (
    <>
      {itemConfig?.icon ? (
        <div className="h-2.5 w-2.5 text-muted-foreground">
          <itemConfig.icon />
        </div>
      ) : (
        !hideIndicator && (
          <div
            className={cn(
              "shrink-0 rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)]",
              indicatorStyleClass,
              nestedClass
            )}
            style={
              {
                "--color-bg": indicatorColor || "currentColor",
                "--color-border": indicatorColor || "currentColor",
              } as CSSProperties
            }
          />
        )
      )}
      <div
        className={cn(
          "flex min-w-0 flex-1 items-center justify-between gap-2 leading-none",
          nestLabel && "items-end"
        )}
      >
        <div className="grid min-w-0 flex-1 gap-1.5">
          {nestLabel ? tooltipLabel : null}
          <span className="max-w-[150px] break-words text-muted-foreground">
            {itemConfig?.label || item.name}
          </span>
        </div>
        {formattedValue && (
          <span className="shrink-0 whitespace-nowrap font-medium font-mono text-foreground tabular-nums">
            {formattedValue}
          </span>
        )}
      </div>
    </>
  );
}

// Helper to get the label value
function getTooltipLabelValue(
  labelKey: string | undefined,
  label: string | number | undefined,
  config: ChartConfig,
  item: { payload?: Record<string, unknown> } | undefined
): ReactNode {
  if (labelKey && item?.payload) {
    return item.payload[labelKey] as ReactNode;
  }
  if (!labelKey && typeof label === "string") {
    return config[label as keyof typeof config]?.label || label;
  }
  return label;
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: {
  active?: boolean;
  payload?: Array<{
    value?: number | string;
    name?: string;
    dataKey?: string;
    color?: string;
    fill?: string;
    payload: Record<string, unknown>;
    type?: string;
  }>;
  label?: string | number;
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelFormatter?: (value: unknown, payload: unknown[]) => ReactNode;
  labelClassName?: string;
  formatter?: (
    value: number | string,
    name: string,
    item: unknown,
    index: number,
    payload: unknown
  ) => ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
}) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const value = getTooltipLabelValue(labelKey, label, config, item);

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!(active && payload?.length)) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-[var(--radius)] border border-border bg-background px-2.5 py-1.5 text-xs shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),_0_4px_6px_-4px_rgb(0_0_0_/_0.1)]",
        className
      )}
    >
      {nestLabel ? null : tooltipLabel}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);

            // Get color from config (handling both color and theme)
            const configColor = itemConfig?.theme
              ? undefined
              : itemConfig?.color;

            const indicatorColor: string | undefined =
              color ||
              item.color ||
              (typeof item.fill === "string" ? item.fill : undefined) ||
              (typeof item.payload?.fill === "string"
                ? (item.payload.fill as string)
                : undefined) ||
              configColor ||
              (item.dataKey ? `var(--color-${item.dataKey})` : undefined);

            return (
              <div
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2",
                  indicator === "dot" && "items-center"
                )}
                key={item.dataKey}
              >
                <TooltipItem
                  formatter={formatter}
                  hideIndicator={hideIndicator}
                  index={index}
                  indicator={indicator}
                  indicatorColor={indicatorColor}
                  item={item}
                  itemConfig={itemConfig}
                  nestLabel={nestLabel}
                  tooltipLabel={tooltipLabel}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: {
  className?: string;
  hideIcon?: boolean;
  payload?: Array<{
    value?: string;
    id?: string;
    type?: string;
    color?: string;
    dataKey?: string;
  }>;
  verticalAlign?: "top" | "bottom";
  nameKey?: string;
}) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const legendColor =
            item.color ||
            (item.dataKey ? `var(--color-${item.dataKey})` : undefined);

          return (
            <div className="flex items-center gap-1.5" key={item.value}>
              {itemConfig?.icon && !hideIcon ? (
                <div className="h-3 w-3 text-muted-foreground">
                  <itemConfig.icon />
                </div>
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{
                    backgroundColor: legendColor,
                  }}
                />
              )}
              <span className="text-xs">{itemConfig?.label}</span>
            </div>
          );
        })}
    </div>
  );
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
};
