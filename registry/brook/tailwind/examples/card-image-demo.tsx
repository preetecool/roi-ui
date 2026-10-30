import { ArrowPointer, Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";

export function CardImageDemo() {
  return (
    <Card className="mx-auto w-full max-w-full rounded-[16px] sm:max-w-[360px] sm:rounded-[24px]" variant="lift">
      <CardImage
        alt="A hooded figure sits by the water below a lit stone arcade and a full moon"
        className="w-auto rounded-[8px] sm:rounded-[12px]"
        src="/figure-02.webp"
      />

      <CardContent className="gap-3">
        <CardTitle className="m-0 max-sm:text-[1.125rem] max-sm:leading-[1.3]">Your first component</CardTitle>
        <CardDescription className="mt-0">
          Add a component with one command. Then edit the code to fit your product.
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button size="sm" variant="outline">
          Learn More
          <ArrowPointer />
        </Button>
      </CardFooter>
    </Card>
  );
}
