"use client";

import { Fieldset } from "@base-ui-components/react/fieldset";
import { cn } from "@/lib/utils";
import styles from "./fieldset.module.css";

function FieldsetRoot({
  className,
  ...props
}: React.ComponentProps<typeof Fieldset.Root>) {
  return <Fieldset.Root className={cn(styles.root, className)} {...props} />;
}

function FieldsetLegend({
  className,
  ...props
}: React.ComponentProps<typeof Fieldset.Legend>) {
  return <Fieldset.Legend className={cn(styles.legend, className)} {...props} />;
}

export { FieldsetRoot as Fieldset, FieldsetLegend };
