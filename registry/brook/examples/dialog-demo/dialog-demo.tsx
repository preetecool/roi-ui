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
  DialogTrigger,
} from "@/registry/brook/ui/dialog/dialog";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./dialog-demo.module.css";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup className={styles.popup}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription className={styles.description}>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <div className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <Input defaultValue="John Doe" id="name" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <Input defaultValue="john@example.com" id="email" type="email" />
            </div>
          </div>
          <DialogFooter className={styles.footer}>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
