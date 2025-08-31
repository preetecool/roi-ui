"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuLinkItem,
  NavigationMenuIcon,
  NavigationMenuViewport,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import { Button } from "@/registry/brook/ui/button/button";
import { Palette, Zap, Shield, Users, ChevronDown } from "lucide-react";

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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                <NavigationMenuLinkItem href="#" title="Analytics" description="Track your data" />
                <NavigationMenuLinkItem href="#" title="Insights" description="Get insights" />
                <NavigationMenuLinkItem href="#" title="Automation" description="Automate workflows" />
                <NavigationMenuLinkItem href="#" title="Reporting" description="Generate reports" />
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
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                <NavigationMenuLinkItem href="#">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.375rem",
                        backgroundColor: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <Palette size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>Design</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Design tools</div>
                    </div>
                  </div>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.375rem",
                        backgroundColor: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <Zap size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>Performance</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Fast speed</div>
                    </div>
                  </div>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.375rem",
                        backgroundColor: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <Shield size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>Security</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Secure platform</div>
                    </div>
                  </div>
                </NavigationMenuLinkItem>
                <NavigationMenuLinkItem href="#">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.375rem",
                        backgroundColor: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <Users size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>Collaboration</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Team work</div>
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
