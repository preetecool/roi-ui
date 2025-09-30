import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardFooter,
  CardIcon,
} from "@/registry/brook/ui/card/card";
import { Droplets } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./card-demo.module.css";

export default function CardDemo() {
  return (
    <Card className={styles.card} style={{ backgroundColor: 'color-mix(in oklch, var(--card) 33%, var(--background))' }}>
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
        <p>A small, natural stream of fresh water flowing along a course towards a river, lake, or sea.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Click me</Button>
      </CardFooter>
    </Card>
  );
}
