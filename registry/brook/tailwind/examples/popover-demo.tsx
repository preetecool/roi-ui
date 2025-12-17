import { Share2 } from "lucide-react";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { CopyButton } from "@/registry/brook/tailwind/ui/copy-button";
import { Input } from "@/registry/brook/tailwind/ui/input";
import {
  Popover,
  PopoverArrow,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/brook/tailwind/ui/popover";

export default function PopoverDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <Popover>
        <PopoverTrigger
          render={
            <Button className="gap-2" variant="outline">
              <Share2 size={16} stroke="var(--secondary-foreground)" />
              Share
            </Button>
          }
        />
        <PopoverPortal>
          <PopoverPositioner align="center" side="top" sideOffset={8}>
            <PopoverPopup className="w-80">
              <PopoverArrow />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <PopoverTitle>Share this website</PopoverTitle>
                </div>

                <div className="flex justify-start gap-3">
                  <button
                    aria-label="Share on Facebook"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-transparent text-foreground outline outline-[0.5px] outline-border/60 outline-offset-2 transition-all duration-150 hover:bg-muted"
                    type="button"
                  >
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 30 30"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Share on X"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-transparent text-foreground outline outline-[0.5px] outline-border/60 outline-offset-2 transition-all duration-150 hover:bg-muted"
                    type="button"
                  >
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 30 30"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Share on LinkedIn"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-transparent text-foreground outline outline-[0.5px] outline-border/60 outline-offset-2 transition-all duration-150 hover:bg-muted"
                    type="button"
                  >
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 30 30"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Share on Instagram"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-transparent text-foreground outline outline-[0.5px] outline-border/60 outline-offset-2 transition-all duration-150 hover:bg-muted"
                    type="button"
                  >
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 30 30"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-stretch gap-2">
                  <Input
                    className="flex-1 border-[0.5px] border-border/60 bg-transparent"
                    defaultValue="https://roiui.com"
                    readOnly
                  />
                  <CopyButton
                    className="h-10 w-10 rounded-[var(--radius)] bg-transparent outline outline-[0.5px] outline-border/60 outline-offset-2 hover:bg-muted"
                    code="https://roiui.com"
                  />
                </div>
              </div>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>
    </div>
  );
}
