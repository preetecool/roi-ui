"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils-tailwind";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";
import data from "../data.json";

const { plans } = data as {
  plans: {
    name: string;
    description: string;
    monthlyPrice: number;
    features: string[];
    cta: string;
    highlighted: boolean;
    badge?: string;
  }[];
};

export function PricingSection() {
  return (
    <section className="mx-auto w-full max-w-[900px] px-6 py-16">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <h2 className="m-0 text-4xl font-semibold leading-tight tracking-tight text-[var(--foreground)] max-sm:text-[1.75rem]">
          Simple, transparent pricing
        </h2>
        <p className="m-0 max-w-[400px] text-base leading-normal text-[var(--muted-foreground)] max-sm:text-[0.9375rem]">
          Choose the plan that works best for you. All plans include a 14-day
          free trial.
        </p>
      </div>

      <div className="grid grid-cols-3 items-stretch py-12 max-lg:mx-auto max-lg:max-w-[400px] max-lg:grid-cols-1 max-lg:gap-6 max-lg:py-0">
        {plans.map((plan, index) => (
          <Card
            className={cn(
              "relative z-[1] flex flex-col border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.3)]",
              index === 0 && "rounded-r-none border-r-0 max-lg:rounded-[var(--radius)] max-lg:border-r-[0.5px]",
              index === 2 && "rounded-l-none border-l-0 max-lg:rounded-[var(--radius)] max-lg:border-l-[0.5px]",
              plan.highlighted &&
                "z-10 -my-6 bg-[oklch(from_var(--card)_l_c_h_/_0.6)] border-[oklch(from_var(--border)_l_c_h_/_0.4)] py-12 shadow-[0_1px_2px_oklch(0_0_0_/_0.03),0_4px_8px_oklch(0_0_0_/_0.02),0_12px_24px_oklch(0_0_0_/_0.03)] max-lg:order-[-1] max-lg:my-0 max-lg:py-6"
            )}
            key={plan.name}
          >
            {plan.badge && (
              <Badge
                className="absolute top-[-10px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs"
                variant="default"
              >
                {plan.badge}
              </Badge>
            )}
            <CardHeader className="pb-0">
              <CardTitle className="text-xl font-semibold">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-sm leading-normal">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="mb-8 flex items-baseline">
                <span className="mt-2 self-start text-2xl font-medium text-[var(--foreground)]">
                  $
                </span>
                <span className="text-6xl font-semibold leading-none tracking-tighter text-[var(--foreground)] max-sm:text-5xl">
                  {plan.monthlyPrice}
                </span>
                <span className="ml-1 text-base text-[var(--muted-foreground)]">
                  /month
                </span>
              </div>

              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {plan.features.map((feature) => (
                  <li
                    className="flex items-center gap-2 text-sm text-[var(--secondary-foreground)]"
                    key={feature}
                  >
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[oklch(from_var(--primary)_l_c_h_/_0.15)] text-[var(--primary)]">
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-4">
              <Button
                className="w-full transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.19,1,0.22,1)]"
                variant={plan.highlighted ? "primary" : "secondary"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
