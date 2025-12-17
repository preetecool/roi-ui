"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  onMouseEnter,
  isSelected,
}: {
  className?: string;
  children?: React.ReactNode;
  title: string;
  href?: string;
  onMouseEnter?: () => void;
  isSelected?: boolean;
}) {
  return (
    <li>
      <NavigationMenuLink
        data-selected={isSelected ? "" : undefined}
        onMouseEnter={onMouseEnter}
        render={<Link href={href} />}
      >
        <h3 className={styles.linkListItemHeading}>{title}</h3>
        <p className={styles.linkListItemText}>{children}</p>
      </NavigationMenuLink>
    </li>
  );
}

export default function NavigationMenuDemo() {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);
  const [selectedAboutIndex, setSelectedAboutIndex] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    // Auto-select first item when menu opens
    if (openMenu === "products") {
      setSelectedProductIndex(0);
    } else if (openMenu === "about") {
      setSelectedAboutIndex(0);
    }
  }, [openMenu]);

  const getGradientColor = () => {
    if (selectedProductIndex === 0) {
      return "var(--info)";
    }
    if (selectedProductIndex === 1) {
      return "var(--success)";
    }
    return "var(--warning)";
  };

  return (
    <NavigationMenu
      onValueChange={(value) => {
        setOpenMenu(value);
        // Reset selections when menu closes
        if (!value) {
          setSelectedProductIndex(null);
          setSelectedAboutIndex(null);
        }
      }}
    >
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={styles.linkList} data-columns="two">
              <ListItem
                isSelected={selectedProductIndex === 0}
                onMouseEnter={() => setSelectedProductIndex(0)}
                title="UI"
              >
                Building blocks
              </ListItem>
              <ListItem
                isSelected={selectedProductIndex === 1}
                onMouseEnter={() => setSelectedProductIndex(1)}
                title="Blocks"
              >
                Ready made components
              </ListItem>
              <ListItem
                isSelected={selectedProductIndex === 2}
                onMouseEnter={() => setSelectedProductIndex(2)}
                title="Templates"
              >
                Full app starters
              </ListItem>
              <li className={styles.previewCard}>
                <div className={styles.previewContent}>
                  <svg aria-label="Preview Shape" className={styles.previewSvg} role="img" viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="ellipse-gradient-products" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor={getGradientColor()} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={getGradientColor()} stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    <ellipse
                      className={styles.rotatingEllipse}
                      cx="100"
                      cy="100"
                      fill="url(#ellipse-gradient-products)"
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

        <NavigationMenuItem value="about">
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={styles.twoColContainer}>
              <ul className={styles.linkListCol}>
                <ListItem
                  isSelected={selectedAboutIndex === 0}
                  onMouseEnter={() => setSelectedAboutIndex(0)}
                  title="The team"
                >
                  Meet our team
                </ListItem>
                <ListItem
                  isSelected={selectedAboutIndex === 1}
                  onMouseEnter={() => setSelectedAboutIndex(1)}
                  title="The vision"
                >
                  The where and the how
                </ListItem>
                <ListItem
                  isSelected={selectedAboutIndex === 2}
                  onMouseEnter={() => setSelectedAboutIndex(2)}
                  title="The philosophy"
                >
                  Our founding pillars
                </ListItem>
              </ul>
              <ul className={styles.linkListCol}>
                <ListItem
                  isSelected={selectedAboutIndex === 3}
                  onMouseEnter={() => setSelectedAboutIndex(3)}
                  title="News"
                >
                  Latest announcements
                </ListItem>
                <ListItem
                  isSelected={selectedAboutIndex === 4}
                  onMouseEnter={() => setSelectedAboutIndex(4)}
                  title="What's new"
                >
                  Recent Improvements
                </ListItem>
                <ListItem
                  isSelected={selectedAboutIndex === 5}
                  onMouseEnter={() => setSelectedAboutIndex(5)}
                  title="Blog"
                >
                  Insights and stories
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="#" />}>
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
