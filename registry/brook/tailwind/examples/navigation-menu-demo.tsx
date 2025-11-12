"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
        render={<Link href={href} />}
        onMouseEnter={onMouseEnter}
        data-selected={isSelected ? "" : undefined}
      >
        <h3 className="mb-1.5 font-normal text-foreground text-sm leading-tight">
          {title}
        </h3>
        <p className="font-normal text-muted-foreground text-xs leading-snug">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}

export default function NavigationMenuDemo() {
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [selectedAboutIndex, setSelectedAboutIndex] = useState<number | null>(
    null
  );
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
                title="UI"
                onMouseEnter={() => setSelectedProductIndex(0)}
                isSelected={selectedProductIndex === 0}
              >
                Building blocks
              </ListItem>
              <ListItem
                title="Blocks"
                onMouseEnter={() => setSelectedProductIndex(1)}
                isSelected={selectedProductIndex === 1}
              >
                Ready made components
              </ListItem>
              <ListItem
                title="Templates"
                onMouseEnter={() => setSelectedProductIndex(2)}
                isSelected={selectedProductIndex === 2}
              >
                Full app starters
              </ListItem>
              <li className="relative col-[2] row-[1_/_span_3] overflow-hidden rounded-md max-[768px]:hidden">
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-accent/5 to-accent/10 p-6">
                  <svg
                    aria-label="Preview Shape"
                    className="pointer-events-none absolute top-1/2 right-0 h-full w-[150%] -translate-y-1/2 translate-x-1/2 rotate-180 animate-[sway_5s_ease-in-out_infinite] [&_ellipse]:transition-[fill] [&_ellipse]:duration-400 [&_ellipse]:ease-in-out [&_stop]:transition-[stop-color] [&_stop]:duration-400 [&_stop]:ease-in-out"
                    role="img"
                    viewBox="0 0 200 200"
                  >
                    <defs>
                      <linearGradient
                        id="ellipse-gradient-products-tw"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor={getGradientColor()}
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor={getGradientColor()}
                          stopOpacity="0.6"
                        />
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
            <div className="relative grid w-[400px] grid-cols-2 gap-x-4 py-2 px-0 before:absolute before:top-0 before:bottom-0 before:left-[calc(50%+0.5rem)] before:w-[0.5px] before:bg-border/60 before:content-[''] before:-translate-x-2 max-[768px]:max-w-[260px] max-[768px]:grid-cols-1 max-[768px]:before:hidden">
              <ul className="m-0 flex list-none flex-col px-2">
                <ListItem
                  title="The team"
                  onMouseEnter={() => setSelectedAboutIndex(0)}
                  isSelected={selectedAboutIndex === 0}
                >
                  Meet our team
                </ListItem>
                <ListItem
                  title="The vision"
                  onMouseEnter={() => setSelectedAboutIndex(1)}
                  isSelected={selectedAboutIndex === 1}
                >
                  The where and the how
                </ListItem>
                <ListItem
                  title="The philosophy"
                  onMouseEnter={() => setSelectedAboutIndex(2)}
                  isSelected={selectedAboutIndex === 2}
                >
                  Our founding pillars
                </ListItem>
              </ul>
              <ul className="m-0 flex list-none flex-col px-2">
                <ListItem
                  title="News"
                  onMouseEnter={() => setSelectedAboutIndex(3)}
                  isSelected={selectedAboutIndex === 3}
                >
                  Latest announcements
                </ListItem>
                <ListItem
                  title="What's new"
                  onMouseEnter={() => setSelectedAboutIndex(4)}
                  isSelected={selectedAboutIndex === 4}
                >
                  Recent Improvements
                </ListItem>
                <ListItem
                  title="Blog"
                  onMouseEnter={() => setSelectedAboutIndex(5)}
                  isSelected={selectedAboutIndex === 5}
                >
                  Insights and stories
                </ListItem>
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
    </>
  );
}
