import { cn } from "@/lib/utils-tailwind";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/brook/tailwind/ui/alert-dialog";
import { Button } from "@/registry/brook/tailwind/ui/button";

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
      <AlertDialogContent
        className={cn(
          "flex max-h-[300px] w-[clamp(250px,90vw,400px)] flex-col gap-4 rounded-2xl p-6",
          "max-sm:!left-1/2 max-sm:!right-auto max-sm:!translate-x-[-50%] max-sm:!translate-y-[-50%]"
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription className="text-[var(--muted-foreground)]">
            Are you sure you want to delete this task?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 flex gap-3 [&>*]:flex-1">
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
