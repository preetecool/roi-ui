import { Button } from "@/registry/brook/ui/button/button";

export default function ButtonExternalLink() {
  return (
    <Button
      render={<a href="https://github.com" target="_blank" rel="noopener noreferrer" />}
      variant="outline"
      showArrow
      pointExternal
    >
      View on GitHub
    </Button>
  );
}
