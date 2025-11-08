"use client";

import Link from "next/link";
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
  navigationMenuTriggerStyle,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import styles from "./navigation-menu-demo.module.css";

function ListItem({
  children,
  title,
  href = "#",
}: {
  className?: string;
  children?: React.ReactNode;
  title: string;
  href?: string;
}) {
  return (
    <li>
      <NavigationMenuLink render={<Link href={href} />}>
        <h3 className={styles.linkListItemHeading}>{title}</h3>
        <p className={styles.linkListItemText}>{children}</p>
      </NavigationMenuLink>
    </li>
  );
}

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={styles.linkList} data-columns="two">
              <ListItem title="UI">Building blocks</ListItem>
              <ListItem title="Blocks">Ready made components</ListItem>
              <ListItem title="Templates">Full app starters</ListItem>
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
                        <stop
                          offset="0%"
                          stopColor="var(--info)"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--info)"
                          stopOpacity="0.6"
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
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={styles.twoColContainer}>
              <ul className={styles.linkListCol}>
                <ListItem title="The team">Meet our team</ListItem>
                <ListItem title="The vision">The where and the how</ListItem>
                <ListItem title="The philosophy">Our founding pillars</ListItem>
              </ul>
              <ul className={styles.linkListCol}>
                <ListItem title="News">Latest announcements</ListItem>
                <ListItem title="What's new">Recent Improvements</ListItem>
                <ListItem title="Blog">Insights and stories</ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="#" />}
          >
            Help
          </NavigationMenuLink>
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
