"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={styles.button}
      title="Toggle theme"
      variant="ghost"
      size="icon"
    >
      <SunMoon size={20} />
    </Button>
  );
}
