import { Button } from "@/registry/brook/ui/button/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";

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
