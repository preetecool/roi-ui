import { Separator } from "@/registry/brook/ui/separator/separator";

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences
        </p>
      </div>

      <Separator />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Profile</h4>
        <p className="text-sm text-muted-foreground">
          Update your photo and personal details
        </p>
      </div>

      <Separator />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Security</h4>
        <p className="text-sm text-muted-foreground">
          Manage your password and authentication
        </p>
      </div>
    </div>
  );
}
