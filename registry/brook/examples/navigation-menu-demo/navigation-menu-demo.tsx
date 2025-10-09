"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/registry/brook/ui/button/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import { ChevronDown, Palette, Shield, Users, Zap } from "lucide-react";
import styles from "./navigation-menu-demo.module.css";

export default function NavigationMenuDemo() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              render={
                <Button variant="ghost">
                  Products
                  <NavigationMenuIcon>
                    <ChevronDown size={16} />
                  </NavigationMenuIcon>
                </Button>
              }
            />
            <NavigationMenuContent>
              <div className={styles.productsGrid}>
                <NavigationMenuLinkItem href="#" title="Analytics" description="Track your data" />
                <NavigationMenuLinkItem href="#" title="Insights" description="Get insights" />
                <NavigationMenuLinkItem href="#" title="Automation" description="Automate workflows" />
                <NavigationMenuLinkItem href="#" title="Reporting" description="Generate report" />
              </div>
              <NavigationMenuLinkItem href="#" className={styles.footerLink}>
                <div className={styles.footerContent}>
                  <div className={styles.footerLeft}>
                    <div className={styles.footerTitle}>Sign up</div>
                    <div className={styles.footerDescription}>Create an account to access all products.</div>
                  </div>
                  <Logo
                    fillColor="color-mix(in oklch, transparent 85%, var(--foreground))"
                    strokeColor="color-mix(in oklch, transparent 88%, var(--foreground))"
                    width={70}
                    height={70}
                    className={styles.footerImage}
                  />
                </div>
              </NavigationMenuLinkItem>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              render={
                <Button variant="ghost">
                  Resources
                  <NavigationMenuIcon>
                    <ChevronDown size={16} />
                  </NavigationMenuIcon>
                </Button>
              }
            />
            <NavigationMenuContent>
              <div className={styles.resourcesList}>
                <NavigationMenuLinkItem href="#" title="Documentation" description="Learn our products" />
                <NavigationMenuLinkItem href="#" title="Blog" description="News and updates" />
                <NavigationMenuLinkItem href="#" title="Support" description="Get help" />
                <NavigationMenuLinkItem href="#" title="Tutorials" description="Step-by-step guides" />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger
              render={
                <Button variant="ghost">
                  Icons
                  <NavigationMenuIcon>
                    <ChevronDown size={16} />
                  </NavigationMenuIcon>
                </Button>
              }
            />
            <NavigationMenuContent>
              <div className={styles.iconsGrid}>
                <NavigationMenuLinkItem href="#">
                  <div className={styles.iconLinkItem}>
                    <div className={styles.iconContainer}>
                      <Palette size={16} />
                    </div>
                    <div>
                      <div className={styles.iconTitle}>Design</div>
                      <div className={styles.iconDescription}>Design tools</div>
                    </div>
                  </div>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#">
                  <div className={styles.iconLinkItem}>
                    <div className={styles.iconContainer}>
                      <Zap size={16} />
                    </div>
                    <div>
                      <div className={styles.iconTitle}>Performance</div>
                      <div className={styles.iconDescription}>Fast speed</div>
                    </div>
                  </div>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#">
                  <div className={styles.iconLinkItem}>
                    <div className={styles.iconContainer}>
                      <Shield size={16} />
                    </div>
                    <div>
                      <div className={styles.iconTitle}>Security</div>
                      <div className={styles.iconDescription}>Secure platform</div>
                    </div>
                  </div>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#">
                  <div className={styles.iconLinkItem}>
                    <div className={styles.iconContainer}>
                      <Users size={16} />
                    </div>
                    <div>
                      <div className={styles.iconTitle}>Collaboration</div>
                      <div className={styles.iconDescription}>Team work</div>
                    </div>
                  </div>
                </NavigationMenuLinkItem>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport sideOffset={8} />
      </NavigationMenu>
    </>
  );
}
