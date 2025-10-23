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
            <ul className={styles.linkList}>
              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Button</h3>
                  <p className={styles.linkListItemText}>
                    Interactive button component
                  </p>
                </NavigationMenuLink>
              </li>

              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Input</h3>
                  <p className={styles.linkListItemText}>Form input controls</p>
                </NavigationMenuLink>
              </li>

              <li className={styles.linkListItem}>
                <NavigationMenu>
                  <NavigationMenuItem className={styles.subMenuItem}>
                    <NavigationMenuTrigger nativeButton={false}>
                      <div className={styles.triggerContainer}>
                        <div className={styles.linkItemWithIcon}>
                          <div>
                            <h3 className={styles.linkListItemHeading}>More</h3>
                            <p className={styles.linkListItemText}>
                              Additional components
                            </p>
                          </div>
                          <NavigationMenuIcon>
                            <ChevronDown size={16} />
                          </NavigationMenuIcon>
                        </div>
                      </div>
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className={styles.subMenuList}>
                        <li className={styles.linkListItem}>
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className={styles.linkListItemHeading}>
                              Dialog
                            </h3>
                            <p className={styles.linkListItemText}>
                              Modal dialogs
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li className={styles.linkListItem}>
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className={styles.linkListItemHeading}>
                              Popover
                            </h3>
                            <p className={styles.linkListItemText}>
                              Floating content
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li className={styles.linkListItem}>
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className={styles.linkListItemHeading}>
                              Tooltip
                            </h3>
                            <p className={styles.linkListItemText}>
                              Helpful hints
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li className={styles.linkListItem}>
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className={styles.linkListItemHeading}>
                              Accordion
                            </h3>
                            <p className={styles.linkListItemText}>
                              Collapsible sections
                            </p>
                          </NavigationMenuLink>
                        </li>
                      </ul>
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
              </li>

              <li className={styles.linkListItem}>
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className={styles.linkListItemHeading}>Table</h3>
                  <p className={styles.linkListItemText}>
                    Data tables and grids
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
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
