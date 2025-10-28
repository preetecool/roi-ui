import { Button } from "@/registry/brook/tailwind/ui/button";

export default function ButtonExternalLink() {
  return (
    <Button
      pointExternal
      // biome-ignore lint/a11y/useAnchorContent: Content is provided by Button component children
      render={<a href="https://example.com" />}
      showArrow
      style={{ borderRadius: "30px" }}
      variant="outline"
    >
      View External
    </Button>
  );
}
