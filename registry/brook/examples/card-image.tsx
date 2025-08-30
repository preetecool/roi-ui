import { Card, CardTitle, CardContent, CardImage, CardFooter } from "@/registry/brook/ui/card/card";
import { Button } from "@/registry/brook/ui/button/button";

export default function CardImageDemo() {
  return (
    <Card variant="lift" style={{ maxWidth: "360px" }}>
      <CardImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=560&h=315&fit=crop&crop=center"
        alt="Mountain landscape"
      />

      <CardContent>
        <CardTitle style={{ margin: 0 }}>Mountain Adventure</CardTitle>
        <p style={{ margin: 0 }}>
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
