import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from "@/registry/brook/ui/card/card";
import styles from "./card-image-demo.module.css";

export function CardImageDemo() {
  return (
    <Card className={styles.card} variant="lift">
      <CardImage
        alt="Veiled woman gazing at architecture under the night sky"
        className={styles.cardImage}
        src="/scene_01.svg"
      />

      <CardContent>
        <CardTitle className={styles.title}>Threshold</CardTitle>

        <CardDescription>
          Between what we build and what eternally exists standing in quiet contemplation.
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
