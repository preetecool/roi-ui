"use client";

import { useTheme } from "next-themes";
import { SunMoon } from "lucide-react";
import styles from "./theme-switcher.module.css";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={styles.button}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <SunMoon size={18} />
    </button>
  );
}
