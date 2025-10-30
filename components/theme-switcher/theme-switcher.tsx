"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    if (typeof document !== "undefined" && document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  const ariaLabel =
    theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <Button
      aria-label={ariaLabel}
      className={styles.button}
      onClick={handleThemeToggle}
      size="icon"
      variant="ghost"
    >
      <SunMoon size={18} />
    </Button>
  );
}
