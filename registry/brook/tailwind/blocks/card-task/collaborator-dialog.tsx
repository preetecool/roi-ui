import { useRef } from "react";
import { cn } from "@/lib/tw-utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/tailwind/ui/avatar";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@/registry/brook/tailwind/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTitle,
} from "@/registry/brook/tailwind/ui/dialog";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/tailwind/ui/tooltip";

type User = {
  value: string;
  label: string;
  email: string;
  avatar: string;
};

type CollaboratorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: User[];
  currentCollaborators: User[];
  selectedCollaborators: User[];
  onSelectedCollaboratorsChange: (collaborators: User[]) => void;
  onConfirm: () => void;
};

export function CollaboratorDialog({
  open,
  onOpenChange,
  users,
  currentCollaborators,
  selectedCollaborators,
  onSelectedCollaboratorsChange,
  onConfirm,
}: CollaboratorDialogProps) {
  const comboboxAnchorRef = useRef<HTMLDivElement>(null);

  const handleRemoveCollaborator = (userValue: string) => {
    onSelectedCollaboratorsChange(
      selectedCollaborators.filter((c) => c.value !== userValue)
    );
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup className="max-w-[410px]">
          <DialogHeader>
            <DialogTitle>Add Collaborator</DialogTitle>
            <DialogDescription>
              Invite a team member to collaborate on this task.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {/* Current Collaborators */}
            <div>
              <div className="mb-2 block font-medium text-sm">
                Current Collaborators
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <TooltipProvider>
                  {selectedCollaborators?.map((collaborator, index) => {
                    const isNewlyAdded = !currentCollaborators.some(
                      (c) => c.value === collaborator.value
                    );
                    const lastIndex = selectedCollaborators.length - 1;
                    const isLast = index === lastIndex;
                    const isFirst = index === 0;

                    return (
                      <Tooltip key={collaborator.value}>
                        <TooltipTrigger
                          render={
                            <div className="group relative inline-block">
                              <Avatar
                                className={cn(
                                  "h-8 w-8 rounded-full border-2 transition-[border]",
                                  isNewlyAdded
                                    ? "border-[var(--success)]"
                                    : "border-transparent"
                                )}
                              >
                                <AvatarImage
                                  alt={collaborator.label}
                                  src={collaborator.avatar}
                                />
                                <AvatarFallback>
                                  {collaborator.label
                                    ?.split(" ")
                                    .map((n: string) => n[0])
                                    .join("") || "??"}
                                </AvatarFallback>
                              </Avatar>
                              <button
                                className={cn(
                                  "-top-1 -right-1 absolute flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full border-2 border-[var(--background)] bg-[var(--destructive)] font-semibold text-[10px] text-[var(--destructive-foreground)] leading-none transition-all hover:scale-110 hover:bg-[oklch(from_var(--destructive)_calc(l*0.9)_c_h)]",
                                  "focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2",
                                  isLast && !isFirst
                                    ? "pointer-events-auto opacity-100"
                                    : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                                )}
                                onClick={() =>
                                  handleRemoveCollaborator(collaborator.value)
                                }
                                type="button"
                              >
                                ×
                              </button>
                            </div>
                          }
                        />
                        <TooltipPortal>
                          <TooltipPositioner>
                            <TooltipPopup>
                              <TooltipArrow />
                              {collaborator.label}
                            </TooltipPopup>
                          </TooltipPositioner>
                        </TooltipPortal>
                      </Tooltip>
                    );
                  })}
                </TooltipProvider>
              </div>
            </div>

            {/* Add New Collaborator */}
            <div className="flex flex-col gap-2">
              <div className="font-medium text-sm">Add New Collaborator</div>
              <Combobox
                items={users}
                itemToStringLabel={(item) => item?.label || ""}
                itemToStringValue={(item) => item?.value || ""}
                // @ts-expect-error - Base UI Combobox multiple prop type inference issue
                multiple={true}
                onValueChange={(value) => {
                  if (value && Array.isArray(value)) {
                    onSelectedCollaboratorsChange(value as User[]);
                  }
                }}
                // @ts-expect-error - Base UI Combobox value type with multiple=true
                value={selectedCollaborators}
              >
                <div
                  className="relative flex w-full items-center rounded-[var(--radius)] border border-[var(--border)] bg-[var(--mix-card-50-bg)] transition-all duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--ring)] has-[:focus-visible]:outline-offset-2"
                  ref={comboboxAnchorRef}
                >
                  <ComboboxInput placeholder="Search users..." />
                  <ComboboxTrigger />
                </div>

                <ComboboxPortal>
                  <ComboboxPositioner anchor={comboboxAnchorRef}>
                    <ComboboxPopup className="w-[var(--anchor-width)]">
                      <ComboboxEmpty>No user found.</ComboboxEmpty>
                      <ComboboxList>
                        {(user: User) => (
                          <ComboboxItem
                            indicatorPosition="right"
                            key={user.value}
                            value={user}
                          >
                            <div className="flex flex-1 items-center gap-4">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  alt={user.label}
                                  src={user.avatar}
                                />
                                <AvatarFallback>
                                  {user.label
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-left">
                                <div className="font-medium text-sm">
                                  {user.label}
                                </div>
                                <div className="text-[var(--muted-foreground)] text-xs">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxPopup>
                  </ComboboxPositioner>
                </ComboboxPortal>
              </Combobox>
            </div>
          </div>

          <DialogFooter className="mt-8 flex gap-3 [&>*]:flex-1">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button onClick={onConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
