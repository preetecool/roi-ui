import { cn } from "@/lib/utils";
import styles from "./card.module.css";
import Image from "next/image";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  variant?: "default" | "lift";
}

export const Card = ({ className, ref, variant = "default", ...props }: CardProps) => (
  <div ref={ref} className={cn(styles.card, variant === "lift" && styles.cardLift, className)} {...props} />
);
Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardHeader = ({ className, ref, ...props }: CardHeaderProps) => (
  <div ref={ref} className={cn(styles.header, className)} {...props} />
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: React.Ref<HTMLHeadingElement>;
}

export const CardTitle = ({ className, ref, ...props }: CardTitleProps) => (
  <h3 ref={ref} className={cn(styles.title, className)} {...props} />
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: React.Ref<HTMLParagraphElement>;
}

export const CardDescription = ({ className, ref, ...props }: CardDescriptionProps) => (
  <p ref={ref} className={cn(styles.description, className)} {...props} />
);
CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardContent = ({ className, ref, ...props }: CardContentProps) => (
  <div ref={ref} className={cn(styles.content, className)} {...props} />
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardFooter = ({ className, ref, ...props }: CardFooterProps) => (
  <div ref={ref} className={cn(styles.footer, className)} {...props} />
);
CardFooter.displayName = "CardFooter";

export interface CardImageProps extends Omit<React.ComponentProps<typeof Image>, "children"> {
  alt: string;
  children?: React.ReactNode;
}

export const CardImage = ({ className, children, alt, ...props }: CardImageProps) => {
  return (
    <>
      <Image className={cn(styles.image, className)} {...props} width={300} alt={alt} height={300} />
      {children && <div className={styles.imageContent}>{children}</div>}
    </>
  );
};
CardImage.displayName = "CardImage";

export interface CardLiftDivProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardLiftDiv = ({ className, ref, ...props }: CardLiftDivProps) => (
  <div ref={ref} className={cn(styles.liftDiv, className)} {...props} />
);
CardLiftDiv.displayName = "CardLiftDiv";

export interface CardIconProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardIcon = ({ className, ref, children, ...props }: CardIconProps) => (
  <div ref={ref} className={cn(styles.icon, className)} {...props}>
    {children}
  </div>
);
CardIcon.displayName = "CardIcon";

export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardAction = ({ className, ref, ...props }: CardActionProps) => (
  <div ref={ref} className={cn(styles.action, className)} {...props} />
);
CardAction.displayName = "CardAction";
