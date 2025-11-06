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

/**
 * Table component for displaying tabular data with responsive overflow handling.
 *
 * @param variant - The visual style of the table
 *   - `"default"` - Clean minimal table with subtle borders
 *   - `"bordered"` - Table with full borders around all cells
 *   - `"striped"` - Alternating row background colors for better readability
 * @param size - The size/spacing of table cells
 *   - `"sm"` - Compact padding for dense data
 *   - `"md"` - Standard padding (default)
 *   - `"lg"` - Generous padding for spacious layouts
 * @param className - Optional CSS class names
 *
 * @example
 * ```tsx
 * // Basic table
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 *
 * // Striped table with borders
 * <Table variant="striped">
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 * ```
 */
function Table({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"table"> & VariantProps<typeof tableVariants>) {
  return (
    <div className={styles.container} data-slot="table-container">
      <table
        className={cn(tableVariants({ variant, size }), className)}
        data-slot="table"
        {...props}
      />
    </div>
  );
}

/**
 * TableHeader component for the table header section.
 * Wraps header rows and applies sticky positioning when scrolling.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Column 1</TableHead>
 *       <TableHead>Column 2</TableHead>
 *     </TableRow>
 *   </TableHeader>
 * </Table>
 * ```
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      className={cn(styles.header, className)}
      data-slot="table-header"
      {...props}
    />
  );
}

/**
 * TableBody component for the table body section.
 * Contains data rows.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Data 1</TableCell>
 *       <TableCell>Data 2</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn(styles.body, className)}
      data-slot="table-body"
      {...props}
    />
  );
}

/**
 * TableFooter component for the table footer section.
 * Useful for totals, summaries, or actions.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableBody>...</TableBody>
 *   <TableFooter>
 *     <TableRow>
 *       <TableCell>Total</TableCell>
 *       <TableCell>$1,234.56</TableCell>
 *     </TableRow>
 *   </TableFooter>
 * </Table>
 * ```
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(styles.footer, className)}
      data-slot="table-footer"
      {...props}
    />
  );
}

/**
 * TableRow component for table rows.
 * Supports hover states and can be made interactive/clickable.
 *
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>Data 1</TableCell>
 *   <TableCell>Data 2</TableCell>
 * </TableRow>
 *
 * // Interactive row
 * <TableRow onClick={() => handleRowClick()}>
 *   <TableCell>Clickable data</TableCell>
 * </TableRow>
 * ```
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(styles.row, className)}
      data-slot="table-row"
      {...props}
    />
  );
}

/**
 * TableHead component for header cells.
 * Automatically styled for header appearance.
 *
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Name</TableHead>
 *     <TableHead align="right">Amount</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(styles.head, className)}
      data-slot="table-head"
      {...props}
    />
  );
}

/**
 * TableCell component for data cells.
 *
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell align="right">$123.45</TableCell>
 * </TableRow>
 * ```
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(styles.cell, className)}
      data-slot="table-cell"
      {...props}
    />
  );
}

/**
 * TableCaption component for table captions/descriptions.
 * Provides context and improves accessibility.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>A list of recent transactions</TableCaption>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 * ```
 */
function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn(styles.caption, className)}
      data-slot="table-caption"
      {...props}
    />
  );
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
