import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuSpacer,
  DropdownMenuTrigger,
} from "@/registry/brook/tailwind/ui/dropdown-menu";
import { Button } from "@/registry/brook/ui/button/button";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <span>Actions</span>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup render={<ul />}>
            <DropdownMenuSpacer />
            <DropdownMenuItem render={<li />}>Edit</DropdownMenuItem>
            <DropdownMenuItem render={<li />}>Duplicate</DropdownMenuItem>
            <DropdownMenuItem render={<li />}>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<li />}>Archive</DropdownMenuItem>
            <DropdownMenuItem render={<li />}>Delete</DropdownMenuItem>
            <DropdownMenuSpacer />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
