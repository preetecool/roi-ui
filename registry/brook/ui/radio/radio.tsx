"use client";

import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
import { cn } from "@/lib/utils";
import styles from "./radio.module.css";

const RadioGroupRoot = ({ className, ...props }: React.ComponentProps<typeof RadioGroup>) => (
  <RadioGroup className={cn(styles.group, className)} {...props} />
);

const RadioRoot = ({ className, ...props }: React.ComponentProps<typeof Radio.Root>) => (
  <Radio.Root className={cn(styles.root, className)} {...props} />
);

const RadioIndicator = ({ className, ...props }: React.ComponentProps<typeof Radio.Indicator>) => (
  <Radio.Indicator className={cn(styles.indicator, className)} {...props} />
);

export { RadioGroupRoot as RadioGroup, RadioRoot as Radio, RadioIndicator };