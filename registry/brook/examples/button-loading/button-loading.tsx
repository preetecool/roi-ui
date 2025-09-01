"use client";

import { Button } from "@/registry/brook/ui/button/button";
import styles from "./button-loading.module.css";

export default function ButtonLoading() {
  return (
    <div className={styles.container}>
      <Button loading={true}>Always Loading</Button>
    </div>
  );
}
