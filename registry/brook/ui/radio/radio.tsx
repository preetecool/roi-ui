"use client";

import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
import { cn } from "@/lib/utils";
import styles from "./radio.module.css";

function RadioGroupRoot({
  className,
  ...props
}: RadioGroup.Props) {
  return <RadioGroup className={cn(styles.group, className)} {...props} />;
}

function RadioRoot({
  className,
  ...props
}: Radio.Root.Props) {
  return <Radio.Root className={cn(styles.root, className)} {...props} />;
}

function RadioIndicator({
  className,
  ...props
}: Radio.Indicator.Props) {
  return (
    <Radio.Indicator data-slot="radio-indicator" className={cn(styles.indicator, className)} {...props} />
  );
}

export { RadioRoot as Radio, RadioGroupRoot as RadioGroup, RadioIndicator };
