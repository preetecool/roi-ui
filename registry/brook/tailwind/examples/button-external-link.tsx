import { ArrowPointer, Button } from "@/registry/brook/tailwind/ui/button";

export default function ButtonExternalLink() {
  return (
    <Button
      nativeButton={false}
      render={
        // biome-ignore lint/a11y/useAnchorContent: link text is passed as Button children
        <a href="https://base-ui.com" rel="noopener noreferrer" target="_blank" />
      }
      style={{ borderRadius: "30px" }}
      variant="outline"
    >
      View External
      <ArrowPointer pointExternal />
    </Button>
  );
}
