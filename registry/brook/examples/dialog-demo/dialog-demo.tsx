import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/registry/brook/ui/dialog/dialog";
import { Button } from "@/registry/brook/ui/button/button";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./dialog-demo.module.css";

export default function DialogDemo() {
  return (
    <DialogRoot>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup
          className={styles.popup}
          style={{ backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))" }}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Name</label>
              <Input defaultValue="John Doe" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email</label>
              <Input type="email" defaultValue="john@example.com" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  );
}
