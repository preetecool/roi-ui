import { Button } from "@/registry/brook/ui/button/button";

export default function ButtonExternalLink() {
  return (
    <Button
      pointExternal
      render={<a href="https://example.com">View External</a>}
      showArrow
      style={{ borderRadius: "30px" }}
      variant="outline"
    />
  );
}
