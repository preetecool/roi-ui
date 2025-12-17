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
} from "@/registry/brook/tailwind/ui/navigation-menu";

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
        className="block cursor-pointer select-none rounded-md p-2 pl-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/60 data-[selected]:bg-secondary/60"
        data-selected={isSelected ? "" : undefined}
        onMouseEnter={onMouseEnter}
        render={<Link href={href} />}
      >
        <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">{title}</h3>
        <p className="font-normal text-muted-foreground text-xs leading-snug">{children}</p>
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
    <>
      <style>{`
        @keyframes sway {
          0% {
            transform: translate(50%, -50%) rotate(180deg);
          }
          50% {
            transform: translate(calc(50% - 10px), -50%) rotate(180deg);
          }
          100% {
            transform: translate(50%, -50%) rotate(180deg);
          }
        }
      `}</style>
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
              <ul
                className="grid w-[350px] list-none grid-cols-2 grid-rows-[repeat(3,1fr)] gap-x-2.5 gap-y-0 p-2 max-[768px]:max-w-[300px] max-[768px]:grid-cols-1 max-[768px]:grid-rows-auto"
                data-columns="two"
              >
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
                <li className="relative col-[2] row-[1_/_span_3] overflow-hidden rounded-md max-[768px]:hidden">
                  <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-accent/5 to-accent/10 p-6">
                    <svg
                      aria-label="Preview Shape"
                      className="pointer-events-none absolute top-1/2 right-0 h-full w-[150%] animate-[sway_5s_ease-in-out_infinite] [&_ellipse]:transition-[fill] [&_ellipse]:duration-400 [&_ellipse]:ease-in-out [&_stop]:transition-[stop-color] [&_stop]:duration-400 [&_stop]:ease-in-out"
                      role="img"
                      viewBox="0 0 200 200"
                    >
                      <defs>
                        <linearGradient id="ellipse-gradient-products-tw" x1="0%" x2="100%" y1="0%" y2="0%">
                          <stop offset="0%" stopColor={getGradientColor()} stopOpacity="0.2" />
                          <stop offset="100%" stopColor={getGradientColor()} stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      <ellipse
                        cx="100"
                        cy="100"
                        fill="url(#ellipse-gradient-products-tw)"
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
              <div className="before:-translate-x-2 relative grid w-[400px] grid-cols-2 gap-x-4 px-0 py-2 before:absolute before:top-0 before:bottom-0 before:left-[calc(50%+0.5rem)] before:w-[0.5px] before:bg-border/60 before:content-[''] max-[768px]:max-w-[260px] max-[768px]:grid-cols-1 max-[768px]:before:hidden">
                <ul className="m-0 flex list-none flex-col px-2">
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
                <ul className="m-0 flex list-none flex-col px-2">
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
    </>
  );
}
