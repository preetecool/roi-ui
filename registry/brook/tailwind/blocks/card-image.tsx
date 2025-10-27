import { cn } from "@/lib/tw-utils";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";

export default function CardImageDemo() {
  return (
    <Card
      className={cn(
        "max-w-[360px] rounded-3xl",
        "sm:max-w-full sm:rounded-2xl"
      )}
      variant="lift"
    >
      <CardImage
        alt="Veiled woman gazing at architecture under the night sky"
        className={cn("w-auto rounded-xl", "sm:rounded-lg")}
        src="/scene_01.png"
      />

      <CardContent>
        <CardTitle className={cn("m-0", "sm:text-lg sm:leading-[1.3]")}>
          Threshold
        </CardTitle>
        <p
          className={cn(
            "m-0 text-[var(--muted-foreground)]",
            "sm:text-[0.9375rem] sm:leading-[1.5]"
          )}
        >
          Between what we build and what eternally exists standing in quiet
          contemplation.
        </p>
      </CardContent>

      <CardFooter>
        <Button showArrow size="sm" variant="outline">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
