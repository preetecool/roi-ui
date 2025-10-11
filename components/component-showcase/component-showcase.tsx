"use client";

import { ShowcaseCardTask } from "@/registry/brook/examples/showcase-card-task/showcase-card-task";
import { ShowcaseLineChart } from "@/registry/brook/examples/showcase-line-chart/showcase-line-chart";
import { ShowcaseRadialChart } from "./showcase-radial-chart/showcase-radial-chart";
import { ShowcaseAreaChart } from "./showcase-area-chart/showcase-area-chart";
import { ShowcaseCardHistory } from "@/registry/brook/examples/showcase-card-history/showcase-card-history";
import { ShowcasePricing } from "@/registry/brook/examples/showcase-card-pricing-card/showcase-card-pricing-card";
import { PlaceholderCardBottom } from "@/registry/brook/examples/showcase-card-settings/showcase-card-settings";
import { ShowcaseChat } from "@/registry/brook/examples/showcase-chat/showcase-chat";
import { ShowcaseShipping } from "@/registry/brook/examples/showcase-shipping/showcase-shipping";
import styles from "./component-showcase.module.css";

export function ComponentShowcase() {
  return (
    <div className={styles.containerWrap}>
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.showcase}>
            <div className={styles.traffic}>
              <ShowcaseLineChart />
            </div>
            <div className={styles.transactions}>
              <ShowcaseCardHistory />
            </div>
            <div className={styles.chat}>
              <ShowcaseChat />
            </div>
            <div className={styles.radial}>
              <ShowcaseRadialChart />
            </div>
            <div className={styles.settings}>
              <PlaceholderCardBottom />
            </div>
            <div className={styles.pricing}>
              <ShowcasePricing />
            </div>
            <div className={styles.areachart}>
              <ShowcaseAreaChart />
            </div>
            <div className={styles.task}>
              <ShowcaseCardTask />
            </div>

            <div className={styles.motion}>
              <ShowcaseShipping />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
