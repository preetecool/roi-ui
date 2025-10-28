import { Droplets } from "lucide-react";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";

export default function CardDemo() {
  return (
    <Card className="w-[350px] max-sm:w-full [&_p]:my-0">
      <CardHeader>
        <div>
          <CardIcon>
            <Droplets />
          </CardIcon>
          <CardTitle>Brook</CardTitle>
        </div>

        <CardAction>
          <Badge size="sm" variant="secondary">
            New
          </Badge>
        </CardAction>

        <CardDescription>Defining a brook</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          A small, natural stream of fresh water flowing along a course towards
          a river, lake, or sea.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Click me</Button>
      </CardFooter>
    </Card>
  );
}
