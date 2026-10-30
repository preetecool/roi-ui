"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import { type StyleVariant, useStyle } from "@/components/providers/style-provider";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/brook/ui/chart/chart";
import { PropTable, PropTableRow } from "@/registry/brook/ui/prop-table/prop-table";
import styles from "./showcase.module.css";

const WEEKS = [
  {
    label: "15 – 21 Oct",
    days: [
      { day: "Mon", css: 900, tailwind: 640 },
      { day: "Tue", css: 600, tailwind: 420 },
      { day: "Wed", css: 740, tailwind: 550 },
      { day: "Thu", css: 1130, tailwind: 850 },
      { day: "Fri", css: 1260, tailwind: 950 },
      { day: "Sat", css: 990, tailwind: 740 },
      { day: "Sun", css: 560, tailwind: 400 },
    ],
  },
  {
    label: "22 – 28 Oct",
    days: [
      { day: "Mon", css: 1040, tailwind: 780 },
      { day: "Tue", css: 500, tailwind: 380 },
      { day: "Wed", css: 820, tailwind: 590 },
      { day: "Thu", css: 1330, tailwind: 1020 },
      { day: "Fri", css: 1590, tailwind: 1170 },
      { day: "Sat", css: 1170, tailwind: 890 },
      { day: "Sun", css: 690, tailwind: 510 },
    ],
  },
];

const installsConfig = {
  css: { label: "CSS Modules", color: "var(--chart-1)" },
  tailwind: { label: "Tailwind", color: "var(--chart-3)" },
} satisfies ChartConfig;

// The three checks add up to the overall score of 98; the last 2 points stay as track.
const SCORES = [
  { key: "keyboard", label: "Keyboard nav", value: 49, max: 50, color: "var(--chart-1)" },
  { key: "focus", label: "Focus states", value: 29, max: 30, color: "var(--chart-3)" },
  {
    key: "aria",
    label: "ARIA labels",
    value: 20,
    max: 20,
    color: "color-mix(in oklab, var(--chart-3) 45%, var(--raised))",
  },
];

const SCORE_TOTAL = SCORES.reduce((sum, score) => sum + score.value, 0);
const SCORE_MAX = SCORES.reduce((sum, score) => sum + score.max, 0);

const scoreConfig: ChartConfig = Object.fromEntries(
  SCORES.map((score) => [score.key, { label: score.label, color: score.color }])
);

const scoreData = [
  ...SCORES.map((score) => ({ key: score.key, value: score.value, fill: `var(--color-${score.key})` })),
  { key: "rest", value: SCORE_MAX - SCORE_TOTAL, fill: "var(--raised)" },
];

// Mirrors the Quick Start guide (content/(root)/start.mdx).
const STEPS = ["Install @base-ui/react", "Add @roiui/utils", "Set up portals", "Add global styles"];

const BROWSE = [
  { label: "Components", href: "/docs/components", count: 48 },
  { label: "Blocks", href: "/blocks" },
  { label: "GitHub", href: "https://github.com/preetecool/roi-ui", external: true },
];

const formatter = new Intl.NumberFormat("en-US");
const compact = new Intl.NumberFormat("en-US", { notation: "compact" });

function InstallsCard() {
  const [weekIndex, setWeekIndex] = useState(WEEKS.length - 1);
  const reduceMotion = useReducedMotion();
  const week = WEEKS[weekIndex];
  const total = week.days.reduce((sum, day) => sum + day.css + day.tailwind, 0);
  const step = (delta: number) => setWeekIndex((index) => (index + delta + WEEKS.length) % WEEKS.length);

  return (
    <article className={styles.card} data-area="installs">
      <header className={styles.cardHeader}>
        <div className={styles.heading}>
          <span className={styles.label}>Installs this week</span>
          <span className={styles.value}>
            {formatter.format(total)} <span className={styles.unit}>npx</span>
          </span>
        </div>
        <div className={styles.control}>
          <button aria-label="Previous week" className={styles.stepperButton} onClick={() => step(-1)} type="button">
            <ChevronLeft aria-hidden="true" size={14} />
          </button>
          <span>{week.label}</span>
          <button aria-label="Next week" className={styles.stepperButton} onClick={() => step(1)} type="button">
            <ChevronRight aria-hidden="true" size={14} />
          </button>
        </div>
      </header>
      <ChartContainer className={styles.barChart} config={installsConfig}>
        <BarChart barCategoryGap="24%" data={week.days} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis axisLine={false} dataKey="day" tickLine={false} tickMargin={8} />
          <YAxis
            axisLine={false}
            tickFormatter={(value: number) => compact.format(value)}
            tickLine={false}
            tickMargin={4}
            width={32}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            animationDuration={500}
            dataKey="css"
            fill="var(--color-css)"
            isAnimationActive={!reduceMotion}
            radius={[0, 0, 2, 2]}
            stackId="installs"
          />
          <Bar
            animationDuration={500}
            dataKey="tailwind"
            fill="var(--color-tailwind)"
            isAnimationActive={!reduceMotion}
            radius={[2, 2, 0, 0]}
            stackId="installs"
          />
        </BarChart>
      </ChartContainer>
    </article>
  );
}

function ScoreCard() {
  const reduceMotion = useReducedMotion();

  return (
    <article className={styles.card} data-area="score">
      <header className={styles.cardHeader}>
        <div className={styles.heading}>
          <span className={styles.label}>Accessibility score</span>
          <span className={styles.value}>Excellent</span>
        </div>
        <span className={styles.label}>v2.1</span>
      </header>
      <div className={styles.dial}>
        <ChartContainer aria-hidden="true" className={styles.donut} config={scoreConfig}>
          <PieChart>
            <Pie
              animationDuration={800}
              cornerRadius={2}
              data={scoreData}
              dataKey="value"
              endAngle={-270}
              innerRadius="80%"
              isAnimationActive={!reduceMotion}
              nameKey="key"
              outerRadius="100%"
              paddingAngle={2}
              startAngle={90}
              stroke="none"
            >
              {scoreData.map((entry) => (
                <Cell fill={entry.fill} key={entry.key} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <span className={styles.dialValue}>
          {SCORE_TOTAL}
          <span className={styles.dialMax}>/{SCORE_MAX}</span>
        </span>
      </div>
      <ul className={styles.inset}>
        {SCORES.map((score) => (
          <li className={styles.insetRow} key={score.key}>
            <span className={styles.swatch} style={{ background: score.color }} />
            <span className={styles.insetLabel}>{score.label}</span>
            <span>
              {score.value}/{score.max}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function StylingCard() {
  const { style, setStyle } = useStyle();

  return (
    <article className={`${styles.card} ${styles.listCard}`} data-area="styling">
      <span className={`${styles.label} ${styles.listTitle}`} id="showcase-styling">
        Styling
      </span>
      <RadioGroup
        aria-labelledby="showcase-styling"
        className={styles.list}
        onValueChange={(value) => setStyle(value as StyleVariant)}
        value={style}
      >
        <label className={styles.option}>
          CSS Modules
          <Radio.Root className={styles.radio} value="css-modules">
            <Radio.Indicator className={styles.radioDot} />
          </Radio.Root>
        </label>
        <label className={styles.option}>
          Tailwind v4
          <Radio.Root className={styles.radio} value="tailwind">
            <Radio.Indicator className={styles.radioDot} />
          </Radio.Root>
        </label>
      </RadioGroup>
    </article>
  );
}

function StepsCard() {
  const [done, setDone] = useState(() => STEPS.map((_, index) => index === 0));
  const left = done.filter((value) => !value).length;
  const current = done.indexOf(false);

  return (
    <article className={`${styles.card} ${styles.listCard}`} data-area="steps">
      <span className={`${styles.label} ${styles.listTitle}`}>
        <svg aria-hidden="true" className={styles.progress} height="16" viewBox="0 0 16 16" width="16">
          <circle cx="8" cy="8" r="6.5" />
          <circle
            cx="8"
            cy="8"
            pathLength="1"
            r="6.5"
            strokeDasharray={`${(STEPS.length - left) / STEPS.length} 1`}
            transform="rotate(-90 8 8)"
          />
        </svg>
        {left === 0 ? "All done" : `${left} ${left === 1 ? "step" : "steps"} left`}
      </span>
      <div className={styles.list}>
        {STEPS.map((step, index) => (
          <label className={styles.option} data-current={index === current || undefined} data-step="" key={step}>
            <Checkbox.Root
              checked={done[index]}
              className={styles.check}
              onCheckedChange={(checked) => setDone((prev) => prev.map((value, i) => (i === index ? checked : value)))}
            >
              <Checkbox.Indicator className={styles.checkIndicator}>
                <svg aria-hidden="true" fill="none" height="10" viewBox="0 0 10 10" width="10">
                  <path d="M2 5.2 4.1 7.3 8 2.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className={styles.stepText}>{step}</span>
          </label>
        ))}
      </div>
    </article>
  );
}

function PropsCard() {
  return (
    <article className={`${styles.card} ${styles.tableCard}`} data-area="props">
      <header className={styles.tableHeader}>
        <span className={styles.label}>PropTableRow props</span>
        <Link className={styles.control} href="/docs/ui/prop-table">
          View docs
        </Link>
      </header>
      <PropTable aria-label="PropTableRow props" className={styles.propTable}>
        <PropTableRow name="name" type="string">
          Name of the prop being documented.
        </PropTableRow>
        <PropTableRow name="type" type="string">
          Type signature of the prop. Union members, generics, and known React types are syntax highlighted.
        </PropTableRow>
        <PropTableRow name="defaultValue" type="string">
          Default value of the prop, shown in the summary row and expanded panel.
        </PropTableRow>
        <PropTableRow name="children" type="ReactNode">
          Description of the prop, shown in the expanded panel.
        </PropTableRow>
        <PropTableRow name="className" type="string">
          Additional CSS classes applied to the row.
        </PropTableRow>
      </PropTable>
    </article>
  );
}

function BrowseCard() {
  return (
    <nav aria-label="Browse" className={`${styles.card} ${styles.listCard}`} data-area="browse">
      <span className={`${styles.label} ${styles.listTitle}`}>Browse</span>
      <div className={styles.list}>
        {BROWSE.map((item) => (
          <Link
            className={styles.option}
            href={item.href}
            key={item.label}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {item.label}
            {item.count ? <span className={styles.tag}>{item.count}</span> : null}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Showcase({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`${styles.grid} ${className ?? ""}`} style={style}>
      <InstallsCard />
      <ScoreCard />
      <div className={styles.stack} data-area="stack">
        <StylingCard />
        <StepsCard />
      </div>
      <PropsCard />
      <BrowseCard />
    </div>
  );
}
