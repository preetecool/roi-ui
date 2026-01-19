import { cn } from "@/lib/utils-tailwind";
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
} from "@/registry/brook/tailwind/ui/dialog";
import { Field, FieldLabel } from "@/registry/brook/tailwind/ui/field";
import { Form } from "@/registry/brook/tailwind/ui/form";
import { Input } from "@/registry/brook/tailwind/ui/input";
import { Button } from "@/registry/brook/ui/button/button";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup
          className={cn(
            "flex max-h-[400px] w-[clamp(250px,90vw,400px)] flex-col gap-4 rounded-2xl p-6",
            "max-sm:!-translate-x-1/2 max-sm:right-auto max-sm:left-1/2 max-sm:max-h-[500px]"
          )}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription className="text-muted-foreground">Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <Form className="mt-0">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="John Doe" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input defaultValue="john@example.com" type="email" />
            </Field>
          </Form>
          <DialogFooter className="mt-8 flex gap-3 [&>*]:flex-1">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  );
}
