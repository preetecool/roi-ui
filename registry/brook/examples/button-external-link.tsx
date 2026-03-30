import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";

export default function ButtonExternalLink() {
  return (
    <Button nativeButton={false} render={<a href="#" />} style={{ borderRadius: "30px" }} variant="outline">
      View External
      <ArrowPointer pointExternal />
    </Button>
  );
}
