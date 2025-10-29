import { useRef } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/ui/avatar/avatar";
import { Button } from "@/registry/brook/ui/button/button";
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
} from "@/registry/brook/ui/combobox/combobox";
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
} from "@/registry/brook/ui/dialog/dialog";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
import styles from "./card-task.module.css";

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
        <DialogPopup className={styles.dialogPopup}>
          <DialogHeader>
            <DialogTitle>Add Collaborator</DialogTitle>
            <DialogDescription>
              Invite a team member to collaborate on this task.
            </DialogDescription>
          </DialogHeader>

          <div className={styles.dialogContent}>
            {/* Current Collaborators */}
            <div>
              <div className={styles.sectionLabel}>Current Collaborators</div>
              <div className={styles.collaboratorList}>
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
                            <div className={styles.collaboratorAvatar}>
                              <Avatar
                                className={`${styles.collaboratorAvatarImage} ${styles.avatarSize} ${
                                  isNewlyAdded
                                    ? styles.collaboratorAvatarImageNew
                                    : styles.collaboratorAvatarImageOriginal
                                }`}
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
                                className={`${styles.removeButton} ${
                                  isLast && !isFirst ? styles.alwaysVisible : ""
                                }`}
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
            <div className={styles.addCollaboratorSection}>
              <div className={styles.addCollaboratorLabel}>
                Add New Collaborator
              </div>
              <Combobox
                items={users}
                itemToStringLabel={(item) => item?.label || ""}
                itemToStringValue={(item) => item?.value || ""}
                multiple
                onValueChange={(value) => {
                  if (value && Array.isArray(value)) {
                    onSelectedCollaboratorsChange(value as User[]);
                  }
                }}
                value={selectedCollaborators}
              >
                <div className={styles.comboboxWrapper} ref={comboboxAnchorRef}>
                  <ComboboxInput placeholder="Search users..." />
                  <ComboboxTrigger />
                </div>

                <ComboboxPortal>
                  <ComboboxPositioner anchor={comboboxAnchorRef}>
                    <ComboboxPopup className={styles.comboboxPopup}>
                      <ComboboxEmpty>No user found.</ComboboxEmpty>
                      <ComboboxList>
                        {(user: User) => (
                          <ComboboxItem
                            indicatorPosition="right"
                            key={user.value}
                            value={user}
                          >
                            <div className={styles.userItemContainer}>
                              <Avatar className={styles.userAvatar}>
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
                              <div className={styles.userInfo}>
                                <div className={styles.userName}>
                                  {user.label}
                                </div>
                                <div className={styles.userEmail}>
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

          <DialogFooter className={styles.dialogFooter}>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button onClick={onConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
