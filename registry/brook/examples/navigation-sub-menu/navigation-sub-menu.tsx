"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import styles from "./navigation-sub-menu.module.css";

export default function NavigationSubMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Open
            <NavigationMenuIcon>
              <ChevronDown size={16} />
            </NavigationMenuIcon>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={styles.mainGrid}>
              <NavigationMenuLink render={<Link href="#" />}>
                <h3>Button</h3>
                <p>Interactive button component</p>
              </NavigationMenuLink>

              <NavigationMenuLink render={<Link href="#" />}>
                <h3>Input</h3>
                <p>Form input controls</p>
              </NavigationMenuLink>

              <NavigationMenu>
                <NavigationMenuItem className={styles.subMenuItem}>
                  <NavigationMenuTrigger nativeButton={false}>
                    <div className={styles.triggerContainer}>
                      <div className={styles.linkItemWithIcon}>
                        <div>
                          <h3>More</h3>
                          <p>Additional components</p>
                        </div>
                        <NavigationMenuIcon>
                          <ChevronDown size={16} />
                        </NavigationMenuIcon>
                      </div>
                    </div>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className={styles.subMenuList}>
                      <NavigationMenuLink render={<Link href="#" />}>
                        <h3>Dialog</h3>
                        <p>Modal dialogs</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink render={<Link href="#" />}>
                        <h3>Popover</h3>
                        <p>Floating content</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink render={<Link href="#" />}>
                        <h3>Tooltip</h3>
                        <p>Helpful hints</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink render={<Link href="#" />}>
                        <h3>Accordion</h3>
                        <p>Collapsible sections</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuPortal>
                  <NavigationMenuPositioner
                    alignOffset={-50}
                    side="right"
                    sideOffset={8}
                  >
                    <NavigationMenuPopup>
                      <NavigationMenuArrow />
                      <NavigationMenuViewport />
                    </NavigationMenuPopup>
                  </NavigationMenuPositioner>
                </NavigationMenuPortal>
              </NavigationMenu>

              <NavigationMenuLink render={<Link href="#" />}>
                <h3>Table</h3>
                <p>Data tables and grids</p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner sideOffset={8}>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  );
}
