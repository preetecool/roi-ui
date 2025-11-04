import Link from "next/link";
import { source } from "@/lib/source";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./components-grid.module.css";

export function ComponentsGrid() {
  // Find UI and Blocks sections from the tree
  const uiSection = source.pageTree.children.find(
    (group) => group.type === "folder" && group.name === "UI"
  );
  const blocksSection = source.pageTree.children.find(
    (group) => group.type === "folder" && group.name === "Blocks"
  );

  const uiComponents =
    uiSection?.type === "folder"
      ? uiSection.children.filter((item) => item.type === "page")
      : [];

  const blocks =
    blocksSection?.type === "folder"
      ? blocksSection.children.filter((item) => item.type === "page")
      : [];

  return (
    <div className={styles.container}>
      {uiComponents.length > 0 && (
        <section
          aria-labelledby="ui-components-heading"
          className={styles.section}
        >
          <h2 className={styles.sectionTitle} id="ui-components-heading">
            UI Components
          </h2>
          <p className={styles.sectionDescription}>
            Foundational components for building interfaces. Fully accessible
            and customizable.
          </p>
          <ul className={styles.grid}>
            {uiComponents.map((component) => {
              if (component.type !== "page") return null;
              return (
                <li key={component.url}>
                  <Button render={<Link href={component.url} />} variant="link">
                    {component.name}
                  </Button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {blocks.length > 0 && (
        <section aria-labelledby="blocks-heading" className={styles.section}>
          <h2 className={styles.sectionTitle} id="blocks-heading">
            Blocks
          </h2>
          <p className={styles.sectionDescription}>
            Pre-built component compositions ready to use in your application.
          </p>
          <ul className={styles.grid}>
            {blocks.map((block) => {
              if (block.type !== "page") return null;
              return (
                <li key={block.url}>
                  <Button render={<Link href={block.url} />} variant="link">
                    {block.name}
                  </Button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
