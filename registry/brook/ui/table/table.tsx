import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import styles from "./table.module.css";

const tableVariants = cva(styles.table, {
  variants: {
    variant: {
      default: "",
      bordered: styles.tableBordered,
      striped: styles.tableStriped,
    },
    size: {
      sm: styles.tableSm,
      md: "",
      lg: styles.tableLg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

function Table({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"table"> & VariantProps<typeof tableVariants>) {
  return (
    <div className={styles.container} data-slot="table-container">
      <table className={cn(tableVariants({ variant, size }), className)} data-slot="table" {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn(styles.header, className)} data-slot="table-header" {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn(styles.body, className)} data-slot="table-body" {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot className={cn(styles.footer, className)} data-slot="table-footer" {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn(styles.row, className)} data-slot="table-row" {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th className={cn(styles.head, className)} data-slot="table-head" {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn(styles.cell, className)} data-slot="table-cell" {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption className={cn(styles.caption, className)} data-slot="table-caption" {...props} />;
}

const Root = Table;
const Header = TableHeader;
const Body = TableBody;
const Footer = TableFooter;
const Row = TableRow;
const Head = TableHead;
const Cell = TableCell;
const Caption = TableCaption;

export {
  Root as Table,
  Header as TableHeader,
  Body as TableBody,
  Footer as TableFooter,
  Row as TableRow,
  Head as TableHead,
  Cell as TableCell,
  Caption as TableCaption,
};
