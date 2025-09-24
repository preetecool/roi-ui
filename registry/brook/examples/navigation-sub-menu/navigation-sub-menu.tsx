import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLinkItem,
  NavigationMenuIcon,
  NavigationMenuViewport,
  NavigationMenuPositioner,
  NavigationMenuPortal,
  NavigationMenuArrow,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./navigation-sub-menu.module.css";

export default function NavigationSubMenu() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              render={
                <Button variant="ghost">
                  Open
                  <NavigationMenuIcon>
                    <ChevronDown size={16} />
                  </NavigationMenuIcon>
                </Button>
              }
            ></NavigationMenuTrigger>
            <NavigationMenuViewport>
              <NavigationMenuArrow />
              <NavigationMenuContent>
                <div className={styles.mainGrid}>
                  <NavigationMenuLinkItem href="#" title="Button" description="Interactive button component" />
                  <NavigationMenuLinkItem href="#" title="Input" description="Form input controls" />

                  <NavigationMenu>
                    <NavigationMenuItem className={styles.subMenuItem}>
                      <NavigationMenuTrigger
                        nativeButton={false}
                        render={
                          <div className={styles.triggerContainer}>
                            <NavigationMenuLinkItem
                              title="Input"
                              description="Form input controls"
                              className={styles.linkItemWithIcon}
                            >
                              <NavigationMenuIcon>
                                <ChevronDown size={16} />
                              </NavigationMenuIcon>
                            </NavigationMenuLinkItem>
                          </div>
                        }
                      />

                      <NavigationMenuContent>
                        <div className={styles.subMenuList}>
                          <NavigationMenuLinkItem href="#" title="Dialog" description="Modal dialogs" />
                          <NavigationMenuLinkItem href="#" title="Popover" description="Floating content" />
                          <NavigationMenuLinkItem href="#" title="Tooltip" description="Helpful hints" />
                          <NavigationMenuLinkItem href="#" title="Accordion" description="Collapsible sections" />
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuPortal>
                      <NavigationMenuPositioner side="right" sideOffset={8} alignOffset={-50}>
                        <NavigationMenuViewport>
                          <NavigationMenuArrow />
                        </NavigationMenuViewport>
                      </NavigationMenuPositioner>
                    </NavigationMenuPortal>
                  </NavigationMenu>

                  <NavigationMenuLinkItem href="#" title="Table" description="Data tables and grids" />
                </div>
              </NavigationMenuContent>
            </NavigationMenuViewport>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
