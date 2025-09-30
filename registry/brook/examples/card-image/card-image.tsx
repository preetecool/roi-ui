import { Card, CardTitle, CardContent, CardImage, CardFooter } from "@/registry/brook/ui/card/card";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./card-image.module.css";

export default function CardImageDemo() {
  return (
    <Card variant="lift" className={styles.card} style={{ backgroundColor: 'color-mix(in oklch, var(--card) 33%, var(--background))' }}>
      <CardImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=560&h=315&fit=crop&crop=center"
        alt="Mountain landscape"
      />

      <CardContent style={{ backgroundColor: 'color-mix(in oklch, var(--card) 33%, var(--background))' }}>
        <CardTitle className={styles.title}>Mountain Adventure</CardTitle>
        <p className={styles.description}>
          Experience the beauty of mountain landscapes with guided tours and hiking adventures.
        </p>
      </CardContent>

      <CardFooter>
        <Button showArrow size="sm">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
