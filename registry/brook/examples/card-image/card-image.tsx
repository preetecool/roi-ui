import { Button } from "@/registry/brook/ui/button/button";
import { Card, CardContent, CardFooter, CardImage, CardTitle } from "@/registry/brook/ui/card/card";
import styles from "./card-image.module.css";

export default function CardImageDemo() {
  return (
    <Card
      variant="lift"
      className={styles.card}
      style={{
        borderRadius: "24px",
      }}
    >
      <CardImage src="/scene_01.png" alt="Mountain scene" style={{ borderRadius: "12px", width: "auto" }} />

      <CardContent>
        <CardTitle className={styles.title}>Mountain Adventure</CardTitle>
        <p className={styles.description}>
          Experience the beauty of mountain landscapes with guided tours and hiking adventures.
        </p>
      </CardContent>

      <CardFooter>
        <Button showArrow variant="outline" size="sm">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
