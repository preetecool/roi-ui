import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import styles from "./card-image.module.css";

export default function CardImageDemo() {
  return (
    <Card className={styles.card} variant="lift">
      <CardImage
        alt="Veiled woman gazing at architecture under the night sky"
        className={styles.cardImage}
        src="/scene_01.svg"
      />

      <CardContent>
        <CardTitle className={styles.title}>Threshold</CardTitle>
        <p className={styles.description}>
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
