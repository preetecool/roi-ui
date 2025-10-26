import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/brook/ui/alert-dialog/alert-dialog";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./alert-dialog-demo.module.css";

export default function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete Account</Button>}
      />

      <AlertDialogContent className={styles.content}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className={styles.description}>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={styles.footer}>
          <AlertDialogClose
            render={<Button variant="outline">Cancel</Button>}
          />
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
