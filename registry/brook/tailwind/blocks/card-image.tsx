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
      className="max-w-full rounded-[16px] sm:max-w-[360px] sm:rounded-[24px]"
      variant="lift"
    >
      <CardImage
        alt="Veiled woman gazing at architecture under the night sky"
        className="w-auto rounded-[8px] sm:rounded-[12px]"
        src="/scene_01.svg"
      />

      <CardContent>
        <CardTitle className="m-0 max-sm:text-[1.125rem] max-sm:leading-[1.3]">
          Threshold
        </CardTitle>
        <p className="m-0 text-[var(--muted-foreground)] max-sm:text-[0.9375rem] max-sm:leading-[1.5]">
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
