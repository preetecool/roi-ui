"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils-tailwind";

const buttonVariants = cva(
	[
		"group inline-flex items-center justify-center rounded-[var(--radius)] font-[450]",
		"transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-out-quad)] will-change-transform",
		"relative cursor-pointer overflow-hidden",
		"leading-[1.2] tracking-[-0.014em]",
		"focus-visible:outline-2 focus-visible:outline-[color:var(--ring)] focus-visible:outline-offset-2",
		"data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
	],
	{
		variants: {
			variant: {
				primary: [
					"isolate border border-[oklch(from_var(--primary)_calc(l*0.82)_c_h)] bg-[var(--primary)] text-[var(--primary-foreground)]",
					"shadow-[0_1px_2px_oklch(0_0_0/0.1)]",
					"dark:shadow-[0_1px_2px_oklch(0_0_0/0.25)]",
					"inset-shadow-[0_1px_oklch(1_0_0/0.09)]",
					"dark:inset-shadow-[0_1px_oklch(1_0_0/0.06)]",
					"before:pointer-events-none before:absolute before:-z-1 before:inset-px before:rounded-[calc(var(--radius)-2px)]",
					"hover:before:bg-[oklch(1_0_0/0.08)]",
					"[:active,[data-pressed]]:scale-[0.97] [:active,[data-pressed]]:shadow-none",
				],
				secondary: [
					"isolate border border-[oklch(from_var(--secondary)_calc(l*0.92)_c_h)] bg-[var(--secondary)] text-[var(--secondary-foreground)]",
					"shadow-[0_1px_2px_oklch(0_0_0/0.05)]",
					"dark:shadow-[0_1px_2px_oklch(0_0_0/0.2)]",
					"inset-shadow-[0_-1px_oklch(1_0_0/0.015)]",
					"dark:inset-shadow-[0_-1px_oklch(1_0_0/0.03)]",
					"before:pointer-events-none before:absolute before:-z-1 before:inset-px before:rounded-[calc(var(--radius)-2px)]",
					"hover:before:bg-[oklch(from_var(--secondary-foreground)_l_c_h/0.08)]",
					"[:active,[data-pressed]]:scale-[0.97] [:active,[data-pressed]]:shadow-none",
				],
				destructive: [
					"isolate border border-[oklch(from_var(--destructive)_calc(l*0.82)_c_h)] bg-[var(--destructive)] text-[var(--destructive-foreground)]",
					"shadow-[0_1px_2px_oklch(0_0_0/0.1)]",
					"dark:shadow-[0_1px_2px_oklch(0_0_0/0.25)]",
					"inset-shadow-[0_1px_oklch(1_0_0/0.09)]",
					"dark:inset-shadow-[0_1px_oklch(1_0_0/0.06)]",
					"before:pointer-events-none before:absolute before:-z-1 before:inset-px before:rounded-[calc(var(--radius)-2px)]",
					"hover:before:bg-[oklch(1_0_0/0.08)]",
					"[:active,[data-pressed]]:scale-[0.97] [:active,[data-pressed]]:shadow-none",
				],
				ghost: [
					"bg-transparent text-[var(--foreground)]",
					"hover:bg-[var(--accent)]",
					"data-[popup-open]:bg-[var(--accent)]",
				],
				outline: [
					"isolate border border-[var(--input)] bg-[var(--card)] text-[var(--muted-foreground)]",
					"not-dark:bg-clip-padding",
					"shadow-[0_1px_2px_oklch(0_0_0/0.05)]",
					"dark:shadow-[0_1px_2px_oklch(0_0_0/0.2)]",
					"inset-shadow-[0_-1px_oklch(1_0_0/0.015)]",
					"dark:inset-shadow-[0_-1px_oklch(1_0_0/0.03)]",
					"before:pointer-events-none before:absolute before:-z-1 before:inset-px before:rounded-[calc(var(--radius)-2px)]",
					"hover:before:bg-[oklch(from_var(--muted)_l_c_h/0.8)] data-[pressed]:before:bg-[oklch(from_var(--muted)_l_c_h/0.8)]",
					"data-[popup-open]:before:bg-[oklch(from_var(--muted)_l_c_h/0.8)]",
					"[:active,[data-pressed]]:scale-[0.97] [:active,[data-pressed]]:shadow-none",
				],
				link: [
					"bg-transparent p-0 text-[var(--muted-foreground)] no-underline",
					"transition-[text-decoration] duration-200 ease-out",
					"hover:text-[var(--foreground)] hover:underline",
				],
			},
			size: {
				sm: "h-8 px-2 text-[13px]",
				md: "h-10 px-4 py-2 text-[0.925rem]",
				lg: "h-12 px-6 py-2 text-base",
				icon: [
					"aspect-square h-auto w-auto p-1.5 text-sm",
					"before:absolute before:top-1/2 before:left-1/2 before:block before:content-['']",
					"before:-translate-x-1/2 before:-translate-y-1/2 before:h-full before:w-full",
					"before:-z-10 before:min-h-[44px] before:min-w-[44px]",
				],
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

function Spinner() {
	return (
		<svg
			className="mr-2 animate-[spinner_1s_linear_infinite]"
			fill="none"
			height="16"
			viewBox="0 0 24 24"
			width="16"
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeDasharray="31.416"
				strokeDashoffset="31.416"
				strokeLinecap="round"
				strokeWidth="2"
			/>
			<style>
				{`
          @keyframes spinner {
            from {
              transform: rotate(0deg);
              stroke-dashoffset: 31.416;
            }
            to {
              transform: rotate(360deg);
              stroke-dashoffset: 0;
            }
          }
        `}
			</style>
		</svg>
	);
}

function ArrowPointer({
	pointLeft = false,
	pointExternal = false,
}: {
	pointLeft?: boolean;
	pointExternal?: boolean;
}) {
	const arrowClasses = cn(
		"-mr-2 relative top-[0.5px] ml-2 h-2.5 w-3 overflow-visible",
		"transition-all duration-200 ease-[var(--ease-in-out-cubic)]",
		pointLeft && "-ml-2 mr-2",
		pointExternal && "group-hover:-rotate-45 origin-[8%]",
	);

	const pointClasses =
		"transition-transform duration-200 ease-[var(--ease-in-out-cubic)] group-hover:translate-x-0.5";
	const shaftClasses =
		"opacity-0 -translate-x-[0.5px] transition duration-200 ease-[var(--ease-in-out-cubic)] group-hover:opacity-100 group-hover:-translate-x-0.5";

	const pointLeftClasses = "group-hover:-translate-x-0.5";
	const shaftLeftClasses = "group-hover:opacity-100 group-hover:translate-x-px";

	return (
		<svg
			className={arrowClasses}
			data-slot="arrow"
			fill="none"
			viewBox="0 0 14 10"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g>
				<path
					className={cn(pointClasses, pointLeft ? pointLeftClasses : null)}
					d={pointLeft ? "M14.8 1l-4 4 4 4" : "M-0.8 1l4 4-4 4"}
					fill="none"
					stroke="currentColor"
					strokeLinecap="square"
					strokeLinejoin="miter"
					strokeWidth="2"
				/>
				<path
					className={cn(shaftClasses, pointLeft ? shaftLeftClasses : null)}
					d={pointLeft ? "M14.8 5H9.8" : "M0 5h4.8"}
					fill="none"
					stroke="currentColor"
					strokeLinecap="square"
					strokeLinejoin="miter"
					strokeWidth="2"
				/>
			</g>
		</svg>
	);
}

function Button({
	className,
	variant,
	size,
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			className={cn(buttonVariants({ variant, size, className }))}
			data-slot="button"
			{...props}
		/>
	);
}

export { Button, buttonVariants, Spinner, ArrowPointer };
