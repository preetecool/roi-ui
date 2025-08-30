import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
} from "@/registry/brook/ui/tooltip/tooltip";
import { Button } from "@/registry/brook/ui/button/button";

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>Hover me</Button>} />
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup>
              <TooltipArrow />
              This is a tooltip with helpful information.
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
