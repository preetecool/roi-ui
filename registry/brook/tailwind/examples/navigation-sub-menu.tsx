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
} from "@/registry/brook/tailwind/ui/navigation-menu";

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
            <ul className="m-0 grid w-[400px] list-none grid-cols-2 gap-0 p-2">
              <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                    Button
                  </h3>
                  <p className="font-normal text-muted-foreground text-xs leading-snug">
                    Interactive button component
                  </p>
                </NavigationMenuLink>
              </li>

              <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                    Input
                  </h3>
                  <p className="font-normal text-muted-foreground text-xs leading-snug">
                    Form input controls
                  </p>
                </NavigationMenuLink>
              </li>

              <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                <NavigationMenu>
                  <NavigationMenuItem className="w-full">
                    <NavigationMenuTrigger nativeButton={false}>
                      <div className="flex w-full items-center justify-start p-0">
                        <div className="justify-between">
                          <div>
                            <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                              More
                            </h3>
                            <p className="font-normal text-muted-foreground text-xs leading-snug">
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
                      <ul className="m-0 grid w-[200px] list-none gap-0 p-2">
                        <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                              Dialog
                            </h3>
                            <p className="font-normal text-muted-foreground text-xs leading-snug">
                              Modal dialogs
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                              Popover
                            </h3>
                            <p className="font-normal text-muted-foreground text-xs leading-snug">
                              Floating content
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                              Tooltip
                            </h3>
                            <p className="font-normal text-muted-foreground text-xs leading-snug">
                              Helpful hints
                            </p>
                          </NavigationMenuLink>
                        </li>
                        <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                          <NavigationMenuLink render={<Link href="#" />}>
                            <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                              Accordion
                            </h3>
                            <p className="font-normal text-muted-foreground text-xs leading-snug">
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

              <li className="block cursor-pointer select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                <NavigationMenuLink render={<Link href="#" />}>
                  <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
                    Table
                  </h3>
                  <p className="font-normal text-muted-foreground text-xs leading-snug">
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
