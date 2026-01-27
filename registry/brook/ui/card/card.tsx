import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/lib/utils";
import styles from "./card.module.css";

const cardVariants = cva(styles.card, {
  variants: {
    variant: {
      default: "",
      lift: styles.cardLift,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Card({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ variant }), className)} data-slot="card" {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.header, className)} data-slot="card-header" {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.title, className)} data-slot="card-title" {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.description, className)} data-slot="card-description" {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.content, className)} data-slot="card-content" {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.footer, className)} data-slot="card-footer" {...props} />;
}

function CardImage({
  className,
  src,
  alt,
  ...props
}: {
  className?: string;
  src: string;
  alt: string;
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height" | "children">) {
  return (
    <Image
      alt={alt}
      className={cn(styles.image, className)}
      data-slot="card-image"
      height={300}
      src={src}
      width={300}
      {...props}
    />
  );
}

function CardImageContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.imageContent, className)} data-slot="card-image-content" {...props} />;
}

function CardIcon({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn(styles.icon, className)} data-slot="card-icon" {...props}>
      {children}
    </div>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(styles.action, className)} data-slot="card-action" {...props} />;
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
