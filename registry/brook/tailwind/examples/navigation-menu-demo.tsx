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
} from "@/registry/brook/tailwind/ui/navigation-menu";

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
      <NavigationMenuLink
        className="block cursor-pointer select-none rounded-md p-2 pl-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/60"
        render={<Link href={href} />}
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
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="focus-visible:-outline-offset-1 flex cursor-pointer select-none items-center justify-between gap-0.5 rounded-[var(--radius)] px-3 py-2 font-normal text-sm leading-none outline-none transition-colors hover:bg-[--mix-card-33-bg] focus-visible:relative focus-visible:outline-2 focus-visible:outline-[--ring] data-[popup-open]:bg-[--mix-card-33-bg]">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[350px] list-none grid-cols-2 grid-rows-[repeat(3,1fr)] gap-x-2.5 gap-y-0 p-2 max-[768px]:max-w-[300px] max-[768px]:grid-cols-1 max-[768px]:grid-rows-auto">
              <ListItem title="UI">Building blocks</ListItem>
              <ListItem title="Blocks">Ready made components</ListItem>
              <ListItem title="Templates">Full app starters</ListItem>
              <li className="relative col-[2] row-[1_/_span_3] overflow-hidden rounded-md max-[768px]:hidden">
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-accent/5 to-accent/10 p-6">
                  <svg
                    aria-label="Preview Shape"
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-0 h-full w-[150%] translate-x-1/2 rotate-180 animate-[sway_5s_ease-in-out_infinite]"
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
          <NavigationMenuTrigger className="focus-visible:-outline-offset-1 flex cursor-pointer select-none items-center justify-between gap-0.5 rounded-[var(--radius)] px-3 py-2 font-normal text-sm leading-none outline-none transition-colors hover:bg-[--mix-card-33-bg] focus-visible:relative focus-visible:outline-2 focus-visible:outline-[--ring] data-[popup-open]:bg-[--mix-card-33-bg]">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="before:-translate-x-2 relative grid w-[400px] grid-cols-2 gap-x-4 p-2 before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-[0.5px] before:bg-border/60 before:content-[''] max-[768px]:max-w-[260px] max-[768px]:grid-cols-1 max-[768px]:before:hidden">
              <ul className="m-0 flex list-none flex-col px-2">
                <ListItem title="The team">Meet our team</ListItem>
                <ListItem title="The vision">The where and the how</ListItem>
                <ListItem title="The philosophy">Our founding pillars</ListItem>
              </ul>
              <ul className="m-0 flex list-none flex-col px-2">
                <ListItem title="News">Latest announcements</ListItem>
                <ListItem title="What's new">Recent Improvements</ListItem>
                <ListItem title="Blog">Insights and stories</ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className="focus-visible:-outline-offset-1 flex cursor-pointer select-none items-center justify-between gap-0.5 rounded-[var(--radius)] px-3 py-2 font-normal text-sm leading-none outline-none transition-colors hover:bg-[--mix-card-33-bg] focus-visible:relative focus-visible:outline-2 focus-visible:outline-[--ring] data-[popup-open]:bg-[--mix-card-33-bg]"
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
