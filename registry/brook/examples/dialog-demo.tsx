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

export default function DialogDemo() {
  return (
    <DialogRoot>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>Name</label>
              <input
                style={{
                  padding: "0.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
                defaultValue="John Doe"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500" }}>Email</label>
              <input
                type="email"
                style={{
                  padding: "0.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
                defaultValue="john@example.com"
              />
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
