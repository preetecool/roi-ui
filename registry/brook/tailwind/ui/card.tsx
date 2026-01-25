import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/lib/utils";

const cardVariants = cva(
	[
		"flex flex-col gap-6 rounded-[var(--radius)] p-6 text-foreground",
		"relative justify-between bg-[oklch(from_var(--card)_l_c_h_/_0.3)]",
		"shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5),var(--shadow-border-stack)]",
	],
	{
		variants: {
			variant: {
				default: "",
				lift: [
					"gap-0 overflow-hidden pb-0",
					"[&_.card-content]:px-6 [&_.card-content]:pt-6 [&_.card-content]:pb-8",
					"[&_.card-content]:transition-all [&_.card-content]:duration-[250ms] [&_.card-content]:ease-[var(--ease-in-out-quad)]",
					"[&_.card-content]:-mx-6 [&_.card-content]:w-[calc(100%+3rem)] [&_.card-content]:bg-[var(--mix-card-33-bg)]",
					"max-md:[&_.card-image]:-mx-6 max-md:[&_.card-image]:w-[calc(100%+3rem)]",
					"[&_.card-footer]:opacity-0 [&_.card-footer]:transition-all",
					"[&_.card-footer]:!duration-[250ms] [&_.card-footer]:!ease-[var(--ease-in-out-quad)]",
					"[&_.card-footer]:absolute [&_.card-footer]:right-6 [&_.card-footer]:bottom-0 [&_.card-footer]:left-6",
					"[&_.card-image]:transition-all [&_.card-image]:duration-[250ms] [&_.card-image]:ease-[var(--ease-in-out-quad)]",
					"hover:[&_.card-content]:-translate-y-8",
					"hover:[&_.card-footer]:-translate-y-4 hover:[&_.card-footer]:opacity-100",
					"hover:[&_.card-image]:scale-[1.04]",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

/**
 * Card component for displaying content in a contained layout.
 *
 * @param variant - The visual style of the card
 *   - `"default"` - Standard card appearance
 *   - `"lift"` - Animated card with hover effects. On hover, the image scales up, content and footer animate with elevation effects
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * // Standard card
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 * </Card>
 *
 * // Lift variant with hover animations
 * <Card variant="lift">
 *   <CardImage src="/image.jpg" alt="Image" />
 *   <CardContent>
 *     <CardTitle>Title</CardTitle>
 *   </CardContent>
 *   <CardFooter>Footer content</CardFooter>
 * </Card>
 * ```
 */
function Card({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
	return (
		<div
			className={cn(cardVariants({ variant }), className)}
			data-slot="card"
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"grid max-w-full grid-cols-[1fr_auto] items-center gap-2",
				className,
			)}
			data-slot="card-header"
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"m-0 font-medium text-xl leading-none tracking-tight",
				"max-sm:text-lg",
				className,
			)}
			data-slot="card-title"
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"col-span-full m-0 whitespace-normal text-muted-foreground text-sm leading-5",
				"max-sm:text-[0.9375rem] max-sm:leading-[1.5]",
				className,
			)}
			data-slot="card-description"
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("card-content flex flex-col gap-3", className)}
			data-slot="card-content"
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("card-footer flex items-center", className)}
			data-slot="card-footer"
			{...props}
		/>
	);
}

/**
 * CardImage component for displaying images within a Card. Uses Next Image.
 *
 * @param src - The image source URL
 * @param alt - Alternative text for the image (required for accessibility)
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardImage src="/scene.jpg" alt="Mountain landscape" />
 *   <CardContent>...</CardContent>
 * </Card>
 * ```
 */
function CardImage({
	className,
	src,
	alt,
	...props
}: {
	className?: string;
	src: string;
	alt: string;
} & Omit<
	React.ComponentProps<typeof Image>,
	"src" | "alt" | "width" | "height" | "children"
>) {
	return (
		<Image
			alt={alt}
			className={cn(
				"card-image box-border aspect-video w-full max-w-none object-cover",
				"-mt-6 mx-0 mb-0 h-[250px]",
				"md:-mt-6 md:-mx-6 md:mb-0 md:h-[300px] md:w-[calc(100%+3rem)] md:max-w-[100vw]",
				"rounded-t-[var(--radius)] transition-transform duration-[250ms] ease-[var(--ease-in-out-quad)]",
				className,
			)}
			data-slot="card-image"
			height={300}
			src={src}
			width={300}
			{...props}
		/>
	);
}

/**
 * CardImageContent component for overlaying content on top of a CardImage.
 * Creates an absolutely positioned overlay with a gradient background for text readability.
 *
 * @param className - Optional CSS class names
 * @param children - Content to display in the overlay (typically text or CTAs)
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardImage src="/scene.jpg" alt="Mountain landscape" />
 *   <CardImageContent>
 *     <h2>Mountain Adventure</h2>
 *     <p>Explore the peaks</p>
 *   </CardImageContent>
 *   <CardContent>...</CardContent>
 * </Card>
 * ```
 */
function CardImageContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"absolute inset-0 flex flex-col justify-end",
				"bg-gradient-to-b from-transparent to-black/60 text-white",
				className,
			)}
			data-slot="card-image-content"
			{...props}
		/>
	);
}

function CardIcon({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"rounded-[var(--radius)] bg-muted",
				"shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.5),0_1px_2px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(255,255,255,0.02)]",
				"relative z-10 flex items-center justify-center",
				"mb-[1.125rem] h-8 w-8 p-1.5",
				"max-sm:mb-4 max-sm:h-7 max-sm:w-7",
				className,
			)}
			data-slot="card-icon"
			{...props}
		>
			{children}
		</div>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"col-start-2 row-start-1 self-start justify-self-end",
				className,
			)}
			data-slot="card-action"
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardIcon,
	CardImage,
	CardImageContent,
	CardTitle,
};
