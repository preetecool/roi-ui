import { Settings } from "lucide-react";
import { Button } from "@/registry/brook/tailwind/ui/button";

export default function ButtonIcon() {
  return (
    <Button size="icon" variant="outline">
      <Settings size={16} />
    </Button>
  );
}
