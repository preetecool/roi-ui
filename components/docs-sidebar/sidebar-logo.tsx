import Link from "next/link";
import { Logo } from "@/components/logo";
import styles from "./sidebar-logo.module.css";

export function SidebarLogo() {
  return (
    <Link className={styles.logoLink} href="/">
      <Logo
        fillColor="var(--foreground)"
        height={26}
        strokeColor="var(--card)"
        strokeWidth={20}
        width={26}
      />
    </Link>
  );
}
