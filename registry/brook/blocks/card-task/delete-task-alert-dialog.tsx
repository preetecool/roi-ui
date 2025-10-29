import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/brook/ui/alert-dialog/alert-dialog";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./card-task.module.css";

type DeleteTaskAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteTaskAlertDialog({
  open,
  onOpenChange,
}: DeleteTaskAlertDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className={styles.alertContent}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription className={styles.alertDescription}>
            Are you sure you want to delete this task?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={styles.alertFooter}>
          <AlertDialogClose
            render={<Button variant="outline">Cancel</Button>}
          />
          <Button onClick={() => onOpenChange(false)} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
