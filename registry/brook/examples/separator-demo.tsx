import { Separator } from "@/registry/brook/ui/separator/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <h3 className="font-semibold text-lg">Account Settings</h3>
        <p className="text-muted-foreground text-sm">Manage your account preferences</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <h4 className="font-medium text-sm">Profile</h4>
        <p className="text-muted-foreground text-sm">Update your photo and personal details</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <h4 className="font-medium text-sm">Security</h4>
        <p className="text-muted-foreground text-sm">Manage your password and authentication</p>
      </div>
    </div>
  );
}
