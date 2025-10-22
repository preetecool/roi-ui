"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className={styles.button}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
      title="Toggle theme"
      variant="ghost"
    >
      <SunMoon size={18} />
    </Button>
  );
}
