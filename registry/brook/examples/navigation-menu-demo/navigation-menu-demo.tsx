"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import { Button } from "../../ui/button/button";
import styles from "./navigation-menu-demo.module.css";

export default function NavigationMenuDemo() {
  const [hoveredLink, setHoveredLink] = useState<string | null>("link1");

  const linkColors = {
    link1: "var(--info)",
    link2: "var(--success)",
    link3: "var(--warning)",
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerEnter={() => setHoveredLink("link1")}
            render={<Button variant="ghost" />}
          >
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={`${styles.linkList} ${styles.one}`}>
              <li className={styles.linkListItem}>
                <NavigationMenuLink
                  onPointerEnter={() => setHoveredLink("link1")}
                  onPointerLeave={() => setHoveredLink(null)}
                  render={<Link href="#" />}
                >
                  <h3 className={styles.linkListItemHeading}>Link 1</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.linkListItem}>
                <NavigationMenuLink
                  onPointerEnter={() => setHoveredLink("link2")}
                  onPointerLeave={() => setHoveredLink(null)}
                  render={<Link href="#" />}
                >
                  <h3 className={styles.linkListItemHeading}>Link 2</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.linkListItem}>
                <NavigationMenuLink
                  onPointerEnter={() => setHoveredLink("link3")}
                  onPointerLeave={() => setHoveredLink(null)}
                  render={<Link href="#" />}
                >
                  <h3 className={styles.linkListItemHeading}>Link 3</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.previewCard}>
                <div className={styles.previewContent}>
                  <svg
                    aria-label="Preview Shape"
                    className={styles.previewSvg}
                    role="img"
                    viewBox="0 0 200 200"
                  >
                    <defs>
                      <linearGradient
                        id="ellipse-gradient"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="var(--mix-card-33-bg)" />
                        <stop
                          offset="100%"
                          stopColor={
                            hoveredLink === "link1"
                              ? "var(--success)"
                              : hoveredLink === "link2"
                                ? "var(--info)"
                                : "var(--warning)"
                          }
                        />
                      </linearGradient>
                    </defs>
                    <ellipse
                      className={styles.rotatingEllipse}
                      cx="100"
                      cy="100"
                      fill="url(#ellipse-gradient)"
                      rx="100"
                      ry="100"
                      stroke="none"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger render={<Button variant="ghost" />}>
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={`${styles.linkList} ${styles.two}`}>
              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Link</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Link 2</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Link 3</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.separator} />
              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Link 4</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Link 5</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Link 6</h3>
                  <p className={styles.linkListItemText}>description</p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPortal>
        <NavigationMenuPositioner sideOffset={8}>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  );
}
