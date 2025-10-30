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
import { cn } from "@/lib/tw-utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/brook/tailwind/ui/avatar";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
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
} from "@/registry/brook/tailwind/ui/dropdown-menu";
import {
  Field,
  FieldControl,
  FieldLabel,
} from "@/registry/brook/tailwind/ui/field";

export default function ProfileMenuDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("acme");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className={cn(
              "flex h-auto min-h-[44px] min-w-[180px] items-center gap-2.5 px-4 py-1.5 touch-manipulation [-webkit-tap-highlight-color:transparent]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ring)]"
            )}
            variant="outline"
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage alt="@preetecool" src="/preetecool.png" />
              <AvatarFallback>PC</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-px">
              <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium text-[var(--foreground)] text-sm leading-5">
                preetecool
              </div>
              <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[var(--muted-foreground)] text-xs leading-4">
                Acme Corp
              </div>
            </div>
          </Button>
        }
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup className="min-w-[280px]" render={<ul />}>
            <div style={{ height: "4px", width: "100%" }} />

            {/* Profile Section */}
            <div className="flex items-start justify-between gap-3 px-3 py-2">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage alt="@preetecool" src="/preetecool.png" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium text-[var(--foreground)] text-sm leading-5">
                    preetecool
                  </div>
                  <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[var(--muted-foreground)] text-xs leading-4">
                    example@roiui.com
                  </div>
                </div>
              </div>
              <Badge className="mt-0.5 flex-shrink-0" size="sm" variant="secondary">
                free
              </Badge>
            </div>

            <DropdownMenuSeparator />

            {/* Organizations Submenu */}
            <DropdownMenuSubmenuRoot>
              <DropdownMenuSubmenuTrigger
                className="flex items-center gap-2"
                render={<li />}
              >
                <Building2 className="ml-1 flex-shrink-0 text-[var(--muted-foreground)]" size={14} />
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
                        className="flex items-center justify-between pr-3"
                        render={<li />}
                        value="acme"
                      >
                        <span className="ml-1">Acme Corp</span>
                        <DropdownMenuRadioItemIndicator>
                          <Check size={14} />
                        </DropdownMenuRadioItemIndicator>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className="flex items-center justify-between pr-3"
                        render={<li />}
                        value="tech"
                      >
                        <span className="ml-1">Tech Startup</span>
                        <DropdownMenuRadioItemIndicator>
                          <Check size={14} />
                        </DropdownMenuRadioItemIndicator>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem
                        className="flex items-center justify-between pr-3"
                        render={<li />}
                        value="design"
                      >
                        <span className="ml-1">Design Studio</span>
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
                      <span className="ml-1">Add new...</span>
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
          <DialogPopup
            className={cn(
              "flex w-[400px] flex-col gap-4 rounded-2xl p-6",
              "max-sm:w-[90vw] max-sm:p-5"
            )}
          >
            <DialogHeader>
              <DialogTitle>Add New Organization</DialogTitle>
              <DialogDescription className="text-[var(--muted-foreground)]">
                Enter the name of your new organization.
              </DialogDescription>
            </DialogHeader>
            <Field className="mt-4">
              <FieldLabel className="ml-1">Organization Name</FieldLabel>
              <FieldControl
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter organization name"
                type="text"
                value={orgName}
              />
            </Field>
            <DialogFooter className="mt-6 flex gap-3 [&>*]:flex-1">
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
