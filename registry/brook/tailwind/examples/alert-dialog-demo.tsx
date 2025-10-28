import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/brook/tailwind/ui/alert-dialog";
import { Button } from "@/registry/brook/tailwind/ui/button";

export default function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete Account</Button>}
      />

      <AlertDialogContent className="w-[clamp(250px,90vw,400px)] max-h-[300px] flex flex-col rounded-2xl p-6 gap-4 max-sm:!left-1/2 max-sm:!right-auto max-sm:!-translate-x-1/2 max-sm:!-translate-y-1/2">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 flex gap-3 [&>*]:flex-1">
          <AlertDialogClose
            render={<Button variant="outline">Cancel</Button>}
          />
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
