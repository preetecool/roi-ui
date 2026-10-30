import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from "@/registry/brook/ui/card/card";
import styles from "./card-image-demo.module.css";

export function CardImageDemo() {
  return (
    <Card className={styles.card} variant="lift">
      <CardImage
        alt="A hooded figure sits by the water below a lit stone arcade and a full moon"
        className={styles.cardImage}
        src="/figure-02.webp"
      />

      <CardContent>
        <CardTitle className={styles.title}>Your first component</CardTitle>

        <CardDescription>Add a component with one command. Then edit the code to fit your product.</CardDescription>
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
