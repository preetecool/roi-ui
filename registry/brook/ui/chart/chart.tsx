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

import styles from "./chart.module.css";

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
        className={`${styles.chartContainer} ${className || ""}`}
        data-chart={chartId}
        data-slot="chart"
      >
        <ChartStyle config={config} id={chartId} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
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
    return styles.indicatorDot;
  }
  if (indicator === "line") {
    return styles.indicatorLine;
  }
  return styles.indicatorDashed;
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
  const nestedClass =
    nestLabel && indicator === "dashed" ? styles.indicatorNested : "";

  // Format the value using the formatter if provided
  const formattedValue =
    formatter && item?.value !== undefined && item.name
      ? formatter(item.value, item.name, item, index, item.payload)
      : item.value?.toLocaleString();

  return (
    <>
      {itemConfig?.icon ? (
        <div className={styles.tooltipIcon}>
          <itemConfig.icon />
        </div>
      ) : (
        !hideIndicator && (
          <div
            className={`${styles.tooltipIndicator} ${indicatorStyleClass} ${nestedClass}`}
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
        className={`${styles.tooltipItemContent} ${
          nestLabel ? styles.tooltipItemContentNested : ""
        }`}
      >
        <div className={styles.tooltipItemLabel}>
          {nestLabel ? tooltipLabel : null}
          <span className={styles.tooltipItemName}>
            {itemConfig?.label || item.name}
          </span>
        </div>
        {formattedValue && (
          <span className={styles.tooltipItemValue}>{formattedValue}</span>
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
        <div className={`${styles.tooltipLabel} ${labelClassName || ""}`}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return (
      <div className={`${styles.tooltipLabel} ${labelClassName || ""}`}>
        {value}
      </div>
    );
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
    <div className={`${styles.tooltipContent} ${className || ""}`}>
      {nestLabel ? null : tooltipLabel}
      <div className={styles.tooltipItems}>
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
                className={`${styles.tooltipItem} ${
                  indicator === "dot" ? styles.tooltipItemDot : ""
                }`}
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
      className={`${styles.legendContent} ${
        verticalAlign === "top" ? styles.legendTop : styles.legendBottom
      } ${className || ""}`}
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
            <div className={styles.legendItem} key={item.value}>
              {itemConfig?.icon && !hideIcon ? (
                <div className={styles.legendIcon}>
                  <itemConfig.icon />
                </div>
              ) : (
                <div
                  className={styles.legendIndicator}
                  style={{
                    backgroundColor: legendColor,
                  }}
                />
              )}
              <span className={styles.legendLabel}>{itemConfig?.label}</span>
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
