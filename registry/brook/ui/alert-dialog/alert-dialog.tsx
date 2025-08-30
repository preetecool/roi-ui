"use client";

import { AlertDialog } from "@base-ui-components/react/alert-dialog";
import { cn } from "@/lib/utils";
import styles from "./alert-dialog.module.css";

const AlertDialogRoot = ({ ...props }: React.ComponentProps<typeof AlertDialog.Root>) => {
  return <AlertDialog.Root {...props} />;
};

const AlertDialogTrigger = ({ ...props }: React.ComponentProps<typeof AlertDialog.Trigger>) => {
  return <AlertDialog.Trigger {...props} />;
};

const AlertDialogPortal = AlertDialog.Portal;

const AlertDialogBackdrop = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Backdrop>) => (
  <AlertDialog.Backdrop className={cn(styles.overlay, className)} {...props} />
);

const AlertDialogPopup = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Popup>) => (
  <AlertDialogPortal>
    <AlertDialogBackdrop />
    <AlertDialog.Popup className={cn(styles.content, className)} {...props}>
      {children}
    </AlertDialog.Popup>
  </AlertDialogPortal>
);

const AlertDialogContent = AlertDialogPopup;

const AlertDialogTitle = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Title>) => (
  <AlertDialog.Title className={cn(styles.title, className)} {...props} />
);

const AlertDialogDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialog.Description>) => (
  <AlertDialog.Description className={cn(styles.description, className)} {...props} />
);

const AlertDialogClose = ({ ...props }: React.ComponentProps<typeof AlertDialog.Close>) => {
  return <AlertDialog.Close {...props} />;
};

const AlertDialogOverlay = AlertDialogBackdrop;

const AlertDialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn(styles.header, className)} {...props} />
);

const AlertDialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn(styles.footer, className)} {...props} />
);

export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogOverlay,
  AlertDialogPortal,
};
