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
import { Field, FieldLabel } from "@/registry/brook/ui/field/field";
import { Form } from "@/registry/brook/ui/form/form";
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
            <DialogDescription className={styles.description}>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <Form>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="John Doe" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input defaultValue="john@example.com" type="email" />
            </Field>
          </Form>
          <DialogFooter className={styles.footer}>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
