type EnterArrowIconProps = {
  className?: string;
};

/**
 * EnterArrowIcon component for displaying Enter/Return key arrow.
 * Typically used in keyboard shortcuts display.
 *
 * @param className - Optional CSS classes for the SVG element
 *
 * @example
 * ```tsx
 * <EnterArrowIcon />
 * ```
 */
export function EnterArrowIcon({ className }: EnterArrowIconProps) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Arrow is decorative icon for keyboard shortcut
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="14"
    >
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}
