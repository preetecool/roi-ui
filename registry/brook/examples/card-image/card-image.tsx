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
      <CardImage
        src="/scene_01.png"
        alt="Veiled woman gazing at architecture under the night sky"
        style={{ borderRadius: "12px", width: "auto" }}
      />

      <CardContent>
        <CardTitle className={styles.title}>Threshold</CardTitle>
        <p className={styles.description}>
          Between what we build and what eternally exists standing in quiet contemplation.
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
