import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils-tailwind";

const tableVariants = cva(
  [
    "w-full table-auto caption-bottom border-collapse font-[0.925rem]",
    // Font smoothing
    "antialiased",
  ],
  {
    variants: {
      variant: {
        default: "",
        bordered: [
          "border border-border",
          "[&_th:last-child]:border-r-0 [&_th]:border-r [&_th]:border-r-border/50",
          "[&_td:last-child]:border-r-0 [&_td]:border-r [&_td]:border-r-border/50",
          "[&_tr]:border-b [&_tr]:border-b-border",
        ],
        striped: [
          "[&_tbody_tr:nth-child(odd)]:bg-muted/40",
          "[&_tbody_tr:nth-child(even)]:bg-card",
          "[&_tbody_tr:hover]:bg-muted",
        ],
      },
      size: {
        sm: "[&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_th]:px-3 [&_th]:py-2 [&_th]:text-sm",
        md: "",
        lg: "[&_td]:px-5 [&_td]:py-4 [&_td]:text-base [&_th]:px-5 [&_th]:py-4 [&_th]:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

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
    <div
      className="relative w-full overflow-x-auto rounded-[var(--radius)] [-webkit-overflow-scrolling:touch] [scrollbar-color:var(--border)_var(--muted)] [scrollbar-width:thin]"
      data-slot="table-container"
    >
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
      className={cn(
        "sticky top-0 z-10 border-border border-b bg-card",
        className
      )}
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
      className={cn("bg-card", className)}
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
      className={cn("border-border border-t bg-muted font-medium", className)}
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
      className={cn(
        "border-b border-b-border/50 transition-colors duration-150 ease-[var(--ease-out-quad)]",
        "hover:bg-muted",
        "[&:has([onclick])]:hover:cursor-pointer [&:has([onclick])]:hover:bg-accent",
        "[&:has([role='button'])]:hover:cursor-pointer [&:has([role='button'])]:hover:bg-accent",
        "last:border-b-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-[-2px]",
        className
      )}
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
 *     <TableHead className="text-right">Amount</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-4 py-3 text-left font-medium text-muted-foreground tracking-[-0.01em]",
        "text-center:[&[align='center']]",
        "text-right:[&[align='right']]",
        className
      )}
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
 *   <TableCell className="font-medium">$123.45</TableCell>
 * </TableRow>
 * ```
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "px-4 py-3 align-middle text-foreground",
        "text-center:[&[align='center']]",
        "text-right:[&[align='right']]",
        className
      )}
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
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn("mt-4 text-left text-muted-foreground text-sm", className)}
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
