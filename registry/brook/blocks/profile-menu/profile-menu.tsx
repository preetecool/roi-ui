"use client";
import {
  BookOpen,
  Building2,
  Check,
  CreditCard,
  HelpCircle,
  LogOut,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/ui/avatar/avatar";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
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
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRadioItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuSubmenuRoot,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";
import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/ui/field/field";
import styles from "./profile-menu.module.css";

export default function ProfileMenuDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("acme");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className={styles.triggerButton} variant="outline">
            <Avatar className={styles.triggerAvatar}>
              <AvatarImage alt="@preetecool" src="/preetecool.png" />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <div className={styles.triggerText}>
              <div className={styles.triggerName}>preetecool</div>
              <div className={styles.triggerOrg}>Acme Corp</div>
            </div>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup className={styles.popup} render={<ul />}>
            <div style={{ height: "4px", width: "100%" }} />

            {/* Profile Section */}
            <div className={styles.profileSection}>
              <div className={styles.profileInfo}>
                <Avatar className={styles.avatar}>
                  <AvatarImage alt="@preetecool" src="/preetecool.png" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <div className={styles.profileText}>
                  <div className={styles.profileName}>preetecool</div>
                  <div className={styles.profileEmail}>example@roiui.com</div>
                </div>
              </div>
              <Badge className={styles.freeBadge} size="sm" variant="secondary">
                free
              </Badge>
            </div>

            <DropdownMenuSeparator />

            {/* Organizations Submenu */}
            <DropdownMenuSubmenuRoot>
              <DropdownMenuSubmenuTrigger
                className={styles.submenuTriggerWithIcon}
                render={<li />}
              >
                <Building2 className={styles.submenuIcon} size={14} />
                Organizations
              </DropdownMenuSubmenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuPositioner align="start" side="right">
                  <DropdownMenuPopup render={<ul />}>
                    <div style={{ height: "4px", width: "100%" }} />
                    <DropdownMenuRadioGroup
                      onValueChange={setSelectedOrg}
                      value={selectedOrg}
                    >
                      <DropdownMenuRadioItem
                        className={styles.radioItem}
                        render={<li />}
                        value="acme"
                      >
                        <span style={{ marginLeft: "4px" }}>Acme Corp</span>
                        <DropdownMenuRadioItemIndicator>
                          <Check size={14} />
                        </DropdownMenuRadioItemIndicator>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className={styles.radioItem}
                        render={<li />}
                        value="tech"
                      >
                        <span style={{ marginLeft: "4px" }}>Tech Startup</span>
                        <DropdownMenuRadioItemIndicator>
                          <Check size={14} />
                        </DropdownMenuRadioItemIndicator>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className={styles.radioItem}
                        render={<li />}
                        value="design"
                      >
                        <span style={{ marginLeft: "4px" }}>Design Studio</span>
                        <DropdownMenuRadioItemIndicator>
                          <Check size={14} />
                        </DropdownMenuRadioItemIndicator>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setIsDialogOpen(true)}
                      render={<li />}
                    >
                      <span style={{ marginLeft: "4px" }}>Add new...</span>
                    </DropdownMenuItem>
                    <div style={{ height: "4px", width: "100%" }} />
                  </DropdownMenuPopup>
                </DropdownMenuPositioner>
              </DropdownMenuPortal>
            </DropdownMenuSubmenuRoot>

            <DropdownMenuSeparator />

            <DropdownMenuItem icon={<Zap size={14} />} render={<li />}>
              Upgrade Plan
            </DropdownMenuItem>

            <DropdownMenuItem icon={<CreditCard size={14} />} render={<li />}>
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem icon={<HelpCircle size={14} />} render={<li />}>
              Get Help
            </DropdownMenuItem>

            <DropdownMenuItem icon={<BookOpen size={14} />} render={<li />}>
              Learn More
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem icon={<LogOut size={14} />} render={<li />}>
              Log Out
            </DropdownMenuItem>

            <div style={{ height: "4px", width: "100%" }} />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>

      {/* Add Organization Dialog */}
      <Dialog
        onOpenChange={(open) => setIsDialogOpen(open)}
        open={isDialogOpen}
      >
        <DialogPortal>
          <DialogOverlay />
          <DialogPopup className={styles.dialogPopup}>
            <DialogHeader>
              <DialogTitle>Add New Organization</DialogTitle>
              <DialogDescription>
                Enter the name of your new organization.
              </DialogDescription>
            </DialogHeader>
            <Field className={styles.field}>
              <FieldLabel className={styles.fieldLabel}>
                Organization Name
              </FieldLabel>
              <FieldControl
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter organization name"
                type="text"
                value={orgName}
              />
            </Field>
            <DialogFooter className={styles.dialogFooter}>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button
                onClick={() => {
                  // Handle organization creation here
                  console.log("Creating organization:", orgName);
                  setOrgName("");
                  setIsDialogOpen(false);
                }}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </DropdownMenu>
  );
}
