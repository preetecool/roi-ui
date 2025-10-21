"use client";

import { ChevronDown, Palette, Shield, Users, Zap } from "lucide-react";
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
import styles from "./navigation-menu-demo.module.css";

export default function NavigationMenuDemo() {
  return (
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
            <div className={styles.productsLayout}>
              <div className={styles.productsGrid}>
                <NavigationMenuLinkItem href="#" title="Analytics" />
                <NavigationMenuLinkItem href="#" title="Insights" />
                <NavigationMenuLinkItem href="#" title="Automation" />
                <NavigationMenuLinkItem href="#" title="Reporting" />
              </div>
              <NavigationMenuLinkItem href="#">
                <div className={styles.footerContent}>
                  <Logo
                    className={styles.footerImage}
                    fillColor="var(--mix-transparent-85-fg)"
                    height={70}
                    strokeColor="var(--mix-transparent-88-fg)"
                    width={70}
                  />
                  <div className={styles.footerTitle}>Sign up</div>
                  <div className={styles.footerDescription}>
                    Create an account to access all products.
                  </div>
                </div>
              </NavigationMenuLinkItem>
            </div>
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
              <NavigationMenuLinkItem
                description="Learn our products"
                href="#"
                title="Documentation"
              />
              <NavigationMenuLinkItem
                description="News and updates"
                href="#"
                title="Blog"
              />
              <NavigationMenuLinkItem
                description="Get help"
                href="#"
                title="Support"
              />
              <NavigationMenuLinkItem
                description="Step-by-step guides"
                href="#"
                title="Tutorials"
              />
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
                    <div className={styles.iconDescription}>
                      Secure platform
                    </div>
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
  );
}
