"use client";

import Link from "next/link";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./components-grid.module.css";

// UI Components list
const uiComponents = [
  { name: "Accordion", slug: "accordion" },
  { name: "Alert", slug: "alert" },
  { name: "Alert Dialog", slug: "alert-dialog" },
  { name: "Autocomplete", slug: "autocomplete" },
  { name: "Avatar", slug: "avatar" },
  { name: "Background", slug: "background" },
  { name: "Badge", slug: "badge" },
  { name: "Button", slug: "button" },
  { name: "Card", slug: "card" },
  { name: "Carousel", slug: "carousel" },
  { name: "Charts", slug: "charts" },
  { name: "Checkbox", slug: "checkbox" },
  { name: "Checkbox Group", slug: "checkbox-group" },
  { name: "Collapsible", slug: "collapsible" },
  { name: "Combobox", slug: "combobox" },
  { name: "Command", slug: "command" },
  { name: "Context Menu", slug: "context-menu" },
  { name: "Dialog", slug: "dialog" },
  { name: "Dropdown Menu", slug: "dropdown-menu" },
  { name: "Field", slug: "field" },
  { name: "Fieldset", slug: "fieldset" },
  { name: "Form", slug: "form" },
  { name: "Input", slug: "input" },
  { name: "Menubar", slug: "menubar" },
  { name: "Meter", slug: "meter" },
  { name: "Navigation Menu", slug: "navigation-menu" },
  { name: "Number Field", slug: "number-field" },
  { name: "Popover", slug: "popover" },
  { name: "Preview Card", slug: "preview-card" },
  { name: "Progress", slug: "progress" },
  { name: "Radio", slug: "radio" },
  { name: "Scroll Area", slug: "scroll-area" },
  { name: "Select", slug: "select" },
  { name: "Sidebar", slug: "sidebar" },
  { name: "Slider", slug: "slider" },
  { name: "Switch", slug: "switch" },
  { name: "Tabs", slug: "tabs" },
  { name: "Toast", slug: "toast" },
  { name: "Toggle", slug: "toggle" },
  { name: "Toggle Group", slug: "toggle-group" },
  { name: "Toolbar", slug: "toolbar" },
  { name: "Tooltip", slug: "tooltip" },
];

// Blocks list
const blocks = [
  { name: "AI Chat", slug: "ai-chat" },
  { name: "Card History", slug: "card-history" },
  { name: "Card Image", slug: "card-image" },
  { name: "Card Login", slug: "card-login" },
  { name: "Card Task", slug: "card-task" },
  { name: "Card Traffic", slug: "card-traffic" },
  { name: "Copy Button", slug: "copy-button" },
  { name: "Expandable Card", slug: "card-expandable" },
  { name: "Like Button", slug: "like-button" },
];

export function ComponentsGrid() {
  return (
    <div className={styles.container}>
      <section className={styles.section} aria-labelledby="ui-components-heading">
        <h2 className={styles.sectionTitle} id="ui-components-heading">
          UI Components
        </h2>
        <p className={styles.sectionDescription}>
          Foundational components for building interfaces. Fully accessible and customizable.
        </p>
        <div className={styles.grid} role="list">
          {uiComponents.map((component) => (
            <Button
              key={component.slug}
              render={<Link href={`/docs/ui/${component.slug}`} />}
              variant="link"
            >
              {component.name}
            </Button>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="blocks-heading">
        <h2 className={styles.sectionTitle} id="blocks-heading">
          Blocks
        </h2>
        <p className={styles.sectionDescription}>
          Pre-built component compositions ready to use in your application.
        </p>
        <div className={styles.grid} role="list">
          {blocks.map((block) => (
            <Button
              key={block.slug}
              render={<Link href={`/docs/blocks/${block.slug}`} />}
              variant="link"
            >
              {block.name}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
