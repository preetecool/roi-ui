import Link from "next/link";
import { source } from "@/lib/source";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./components-grid.module.css";

const NEW_COMPONENTS = new Set(["Drawer"]);

export function ComponentsGrid() {
  const uiSection = source.pageTree.children.find((group) => group.type === "folder" && group.name === "UI");
  const uiComponents = uiSection?.type === "folder" ? uiSection.children.filter((item) => item.type === "page") : [];

  return (
    <div className={styles.container}>
      {uiComponents.length > 0 && (
        <section className={styles.section}>
          <ul className={styles.grid}>
            {uiComponents.map((component) => {
              if (component.type !== "page") {
                return null;
              }
              return (
                <li key={component.url}>
                  <Button
                    nativeButton={false}
                    render={<Link href={component.url}><span className={styles.linkText}>{component.name}</span>{NEW_COMPONENTS.has(component.name as string) ? <span className={styles.newBadge}>New</span> : null}</Link>}
                    variant="link"
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
