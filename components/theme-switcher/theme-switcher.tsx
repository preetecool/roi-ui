"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      typeof document.startViewTransition === "function"
    ) {
      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <Button
      className={styles.button}
      onClick={handleThemeToggle}
      size="icon"
      title="Toggle theme"
      variant="ghost"
    >
      <SunMoon size={18} />
    </Button>
  );
}
