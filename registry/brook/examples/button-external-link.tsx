import { Button } from "@/registry/brook/ui/button/button";

export default function ButtonExternalLink() {
  return (
    <Button
      render={<a href="#" />}
      variant="outline"
      showArrow
      pointExternal
      style={{ borderRadius: "30px" }}
    >
      View External
    </Button>
  );
}
