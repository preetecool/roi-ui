"use client";

import * as React from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./alert-dialog-nested.module.css";

export default function AlertDialogNested() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState("");

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(open) => {
        if (!open && textareaValue) {
          setConfirmationOpen(true);
        } else {
          setTextareaValue("");
          setDialogOpen(open);
        }
      }}
    >
      <Dialog.Trigger render={<Button>New Post</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <Dialog.Title className={styles.title}>Create post</Dialog.Title>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              setTextareaValue("");
              setDialogOpen(false);
            }}
          >
            <textarea
              required
              className={styles.textarea}
              placeholder="What's on your mind?"
              value={textareaValue}
              onChange={(event) => setTextareaValue(event.target.value)}
            />
            <div className={styles.actions}>
              <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit">Post</Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>

      <AlertDialog.Root open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Popup className={styles.confirmPopup}>
            <AlertDialog.Title className={styles.title}>
              Discard post?
            </AlertDialog.Title>
            <AlertDialog.Description className={styles.description}>
              Your post will be lost.
            </AlertDialog.Description>
            <div className={styles.actions}>
              <AlertDialog.Close render={<Button variant="outline">Go back</Button>} />
              <Button
                variant="destructive"
                onClick={() => {
                  setTextareaValue("");
                  setConfirmationOpen(false);
                  setDialogOpen(false);
                }}
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
