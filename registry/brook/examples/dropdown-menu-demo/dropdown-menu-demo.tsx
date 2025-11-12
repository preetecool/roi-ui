import { Button } from "@/registry/brook/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuSpacer,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <span>Sort by</span>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup render={<ul />}>
            <DropdownMenuSpacer />
            <DropdownMenuItem render={<li />}>Name</DropdownMenuItem>
            <DropdownMenuItem render={<li />}>Date Created</DropdownMenuItem>
            <DropdownMenuItem render={<li />}>Date Modified</DropdownMenuItem>
            <DropdownMenuItem render={<li />}>Size</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<li />}>Type</DropdownMenuItem>
            <DropdownMenuItem render={<li />}>Priority</DropdownMenuItem>
            <DropdownMenuSpacer />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
