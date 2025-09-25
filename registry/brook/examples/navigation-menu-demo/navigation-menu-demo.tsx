"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuLinkItem,
  NavigationMenuFooter,
  NavigationMenuIcon,
  NavigationMenuViewport,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import { Button } from "@/registry/brook/ui/button/button";
import { Palette, Zap, Shield, Users, ChevronDown } from "lucide-react";
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
                <NavigationMenuLinkItem href="#" title="Reporting" description="Generate reports" />
              </div>
              <NavigationMenuFooter
                horizontal
                title="Explore our full product suite"
                buttonText="View All Products"
                buttonHref="#"
              />
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

        <NavigationMenuViewport />
      </NavigationMenu>
    </>
  );
}
