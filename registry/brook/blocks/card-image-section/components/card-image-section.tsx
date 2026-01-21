import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from "@/registry/brook/ui/card/card";
import styles from "./card-image-section.module.css";

type CardData = {
  id: number;
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  href?: string;
};

type CardImageSectionProps = {
  data: {
    caption: string;
    heading: string;
    description: string;
    cards: CardData[];
  };
};

export function CardImageSection({ data }: CardImageSectionProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.caption}>{data.caption}</span>
        <h2 className={styles.heading}>{data.heading}</h2>
        <p className={styles.description}>{data.description}</p>
      </header>

      <div className={styles.grid}>
        {data.cards.map((card) => (
          <Card className={styles.card} key={card.id} variant="lift">
            <CardImage alt={card.alt} className={styles.cardImage} src={card.imageSrc} />

            <CardContent>
              <CardTitle className={styles.cardTitle}>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>

            <CardFooter>
              <Button
                className={styles.linkButton}
                render={<a href={card.href ?? "#"} />}
                size="sm"
                variant="link"
              >
                Learn More
                <ArrowPointer />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
