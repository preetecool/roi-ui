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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                  }}
                >
                  <NavigationMenuLinkItem href="#" title="Button" description="Interactive button component" />
                  <NavigationMenuLinkItem href="#" title="Input" description="Form input controls" />

                  <NavigationMenu>
                    <NavigationMenuItem style={{ width: "100%" }}>
                      <NavigationMenuTrigger
                        render={
                          <div
                            style={{
                              padding: "0",
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <NavigationMenuLinkItem
                              title="Input"
                              description="Form input controls"
                              style={{
                                justifyContent: "space-between",
                              }}
                            >
                              <NavigationMenuIcon>
                                <ChevronDown size={16} />
                              </NavigationMenuIcon>
                            </NavigationMenuLinkItem>
                          </div>
                        }
                      />

                      <NavigationMenuContent>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
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
