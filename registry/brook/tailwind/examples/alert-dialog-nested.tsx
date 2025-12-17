"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";
import { Button } from "@/registry/brook/tailwind/ui/button";

export default function AlertDialogNested() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState("");

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open && textareaValue) {
          setConfirmationOpen(true);
        } else {
          setTextareaValue("");
          setDialogOpen(open);
        }
      }}
      open={dialogOpen}
    >
      <Dialog.Trigger render={<Button>New Post</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[var(--dialog-z)] bg-[var(--dialog-overlay)] transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-[101] flex w-full max-w-md flex-col gap-4 rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.6)] bg-[var(--mix-card-5-bg)] p-6 transition-all duration-150 data-[ending-style]:scale-95 data-[nested-dialog-open]:scale-[0.94] data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[nested-dialog-open]:brightness-[0.7] max-sm:right-4 max-sm:left-4 max-sm:w-[calc(100vw-2rem)] max-sm:max-w-none max-sm:translate-x-0">
          <Dialog.Title className="m-0 font-semibold text-foreground text-lg leading-none tracking-tight">
            Create post
          </Dialog.Title>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setTextareaValue("");
              setDialogOpen(false);
            }}
          >
            <textarea
              className="min-h-[120px] w-full resize-y rounded-[var(--radius)] border border-border bg-transparent p-3 text-foreground text-sm leading-relaxed placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              onChange={(event) => setTextareaValue(event.target.value)}
              placeholder="What's on your mind?"
              required
              value={textareaValue}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit">Post</Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>

      <AlertDialog.Root onOpenChange={setConfirmationOpen} open={confirmationOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Popup className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-[102] flex w-full max-w-sm flex-col gap-2 rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.6)] bg-[var(--mix-card-5-bg)] p-6 transition-all duration-150 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 max-sm:right-4 max-sm:left-4 max-sm:w-[calc(100vw-2rem)] max-sm:max-w-none max-sm:translate-x-0">
            <AlertDialog.Title className="m-0 font-semibold text-foreground text-lg leading-none tracking-tight">
              Discard post?
            </AlertDialog.Title>
            <AlertDialog.Description className="m-0 text-muted-foreground text-sm leading-relaxed">
              Your post will be lost.
            </AlertDialog.Description>
            <div className="mt-2 flex justify-end gap-2">
              <AlertDialog.Close render={<Button variant="outline">Go back</Button>} />
              <Button
                onClick={() => {
                  setTextareaValue("");
                  setConfirmationOpen(false);
                  setDialogOpen(false);
                }}
                variant="destructive"
              >
                Discard
              </Button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </Dialog.Root>
  );
}
