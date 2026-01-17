import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";

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
    <section className="mx-auto w-full max-w-[900px] px-6 py-12 max-sm:px-4 max-sm:py-8">
      <header className="mb-12 text-left max-sm:mb-8">
        <span className="mb-3 block text-sm font-medium uppercase tracking-[0.05em] text-[var(--accent)]">
          {data.caption}
        </span>
        <h2 className="m-0 mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--foreground)]">
          {data.heading}
        </h2>
        <p className="m-0 max-w-[600px] text-base leading-[1.6] text-[var(--muted-foreground)]">
          {data.description}
        </p>
      </header>

      <div className="columns-1 gap-6 sm:columns-2">
        {data.cards.map((card, index) => (
          <Card className={`mb-6 max-w-full break-inside-avoid rounded-[16px] [transform:translateZ(0)] sm:rounded-[20px] ${index === 0 ? "sm:mt-[120px]" : ""}`} key={card.id} variant="lift">
            <CardImage alt={card.alt} className="w-auto rounded-[8px] sm:rounded-[12px]" src={card.imageSrc} />

            <CardContent className="gap-2">
              <CardTitle className="m-0 max-sm:text-[1.125rem] max-sm:leading-[1.3]">{card.title}</CardTitle>
              <CardDescription className="mt-0">{card.description}</CardDescription>
            </CardContent>

            <CardFooter>
              <Button
                className="pl-0"
                render={<a href={card.href ?? "#"} />}
                showArrow
                size="sm"
                variant="link"
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
