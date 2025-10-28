"use client";

import { Fieldset } from "@base-ui-components/react/fieldset";
import { cn } from "@/lib/utils";
import styles from "./fieldset.module.css";

function FieldsetRoot({
  className,
  ...props
}: Fieldset.Root.Props) {
  return <Fieldset.Root className={cn(styles.root, className)} {...props} />;
}

function FieldsetLegend({
  className,
  ...props
}: Fieldset.Legend.Props) {
  return <Fieldset.Legend className={cn(styles.legend, className)} {...props} />;
}

export { FieldsetRoot as Fieldset, FieldsetLegend };
