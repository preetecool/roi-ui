/**
 * Lightweight manifest of all pages
 * This file contains only metadata, no MDX content
 * Used for generating static params and listing pages without loading MDX bundles
 */

export interface PageMetadata {
  slug: string[];
  url: string;
  title: string;
  description?: string;
  links?: {
    doc?: string;
    api?: string;
  };
  components?: string[];
  motion?: boolean;
}

export const pagesManifest: PageMetadata[] = [
  // Root pages
  {
    slug: [],
    url: "/docs",
    title: "Introduction",
    description:
      "Welcome to Brook UI - A collection of beautifully designed components",
  },
  {
    slug: ["start"],
    url: "/docs/start",
    title: "Getting Started",
    description: "Learn how to get started with Brook UI",
  },
  {
    slug: ["components"],
    url: "/docs/components",
    title: "Components Overview",
    description: "Browse all available components",
  },

  // UI Components
  {
    slug: ["ui", "accordion"],
    url: "/docs/ui/accordion",
    title: "Accordion",
    description: "A vertically stacked set of interactive headings",
  },
  {
    slug: ["ui", "alert-dialog"],
    url: "/docs/ui/alert-dialog",
    title: "Alert Dialog",
    description: "A modal dialog that interrupts the user",
  },
  {
    slug: ["ui", "alert"],
    url: "/docs/ui/alert",
    title: "Alert",
    description: "Displays a callout for user attention",
  },
  {
    slug: ["ui", "autocomplete"],
    url: "/docs/ui/autocomplete",
    title: "Autocomplete",
    description: "Text input with autocomplete suggestions",
  },
  {
    slug: ["ui", "avatar"],
    url: "/docs/ui/avatar",
    title: "Avatar",
    description: "An image element with a fallback",
  },
  {
    slug: ["ui", "badge"],
    url: "/docs/ui/badge",
    title: "Badge",
    description: "Displays a badge or label",
  },
  {
    slug: ["ui", "button"],
    url: "/docs/ui/button",
    title: "Button",
    description: "A button component with multiple variants",
  },
  {
    slug: ["ui", "card"],
    url: "/docs/ui/card",
    title: "Card",
    description: "A container for content",
  },
  {
    slug: ["ui", "carousel"],
    url: "/docs/ui/carousel",
    title: "Carousel",
    description: "A carousel component for cycling through elements",
  },
  {
    slug: ["ui", "charts"],
    url: "/docs/ui/charts",
    title: "Charts",
    description: "Data visualization components",
  },
  {
    slug: ["ui", "checkbox-group"],
    url: "/docs/ui/checkbox-group",
    title: "Checkbox Group",
    description: "A group of checkboxes",
  },
  {
    slug: ["ui", "checkbox"],
    url: "/docs/ui/checkbox",
    title: "Checkbox",
    description: "A control that allows selection",
  },
  {
    slug: ["ui", "collapsible"],
    url: "/docs/ui/collapsible",
    title: "Collapsible",
    description: "An interactive component which expands/collapses content",
  },
  {
    slug: ["ui", "combobox"],
    url: "/docs/ui/combobox",
    title: "Combobox",
    description: "A searchable select component",
  },
  {
    slug: ["ui", "command"],
    url: "/docs/ui/command",
    title: "Command",
    description: "Fast, composable command menu",
  },
  {
    slug: ["ui", "context-menu"],
    url: "/docs/ui/context-menu",
    title: "Context Menu",
    description: "Displays a menu on right-click",
  },
  {
    slug: ["ui", "copy-button"],
    url: "/docs/ui/copy-button",
    title: "Copy Button",
    description: "A button for copying text to clipboard",
  },
  {
    slug: ["ui", "dialog"],
    url: "/docs/ui/dialog",
    title: "Dialog",
    description: "A modal dialog component",
  },
  {
    slug: ["ui", "dropdown-menu"],
    url: "/docs/ui/dropdown-menu",
    title: "Dropdown Menu",
    description: "Displays a menu triggered by a button",
  },
  {
    slug: ["ui", "field"],
    url: "/docs/ui/field",
    title: "Field",
    description: "A form field wrapper",
  },
  {
    slug: ["ui", "fieldset"],
    url: "/docs/ui/fieldset",
    title: "Fieldset",
    description: "Groups related form elements",
  },
  {
    slug: ["ui", "form"],
    url: "/docs/ui/form",
    title: "Form",
    description: "Building forms with validation",
  },
  {
    slug: ["ui", "input"],
    url: "/docs/ui/input",
    title: "Input",
    description: "Text input component",
  },
  {
    slug: ["ui", "like-button"],
    url: "/docs/ui/like-button",
    title: "Like Button",
    description: "An animated like button",
  },
  {
    slug: ["ui", "menubar"],
    url: "/docs/ui/menubar",
    title: "Menubar",
    description: "A visually persistent menu",
  },
  {
    slug: ["ui", "meter"],
    url: "/docs/ui/meter",
    title: "Meter",
    description: "Displays a scalar measurement",
  },
  {
    slug: ["ui", "navigation-menu"],
    url: "/docs/ui/navigation-menu",
    title: "Navigation Menu",
    description: "A collection of links for navigation",
  },
  {
    slug: ["ui", "number-field"],
    url: "/docs/ui/number-field",
    title: "Number Field",
    description: "An input for numeric values",
  },
  {
    slug: ["ui", "popover"],
    url: "/docs/ui/popover",
    title: "Popover",
    description: "Displays content in a portal",
  },
  {
    slug: ["ui", "preview-card"],
    url: "/docs/ui/preview-card",
    title: "Preview Card",
    description: "A card with hover preview",
  },
  {
    slug: ["ui", "progress"],
    url: "/docs/ui/progress",
    title: "Progress",
    description: "Displays task progress",
  },
  {
    slug: ["ui", "radio"],
    url: "/docs/ui/radio",
    title: "Radio",
    description: "A set of radio buttons",
  },
  {
    slug: ["ui", "scroll-area"],
    url: "/docs/ui/scroll-area",
    title: "Scroll Area",
    description: "A custom styled scrollable area",
  },
  {
    slug: ["ui", "select"],
    url: "/docs/ui/select",
    title: "Select",
    description: "A dropdown selection component",
  },
  {
    slug: ["ui", "separator"],
    url: "/docs/ui/separator",
    title: "Separator",
    description: "Visually separates content",
  },
  {
    slug: ["ui", "slider"],
    url: "/docs/ui/slider",
    title: "Slider",
    description: "An input for selecting a value from a range",
  },
  {
    slug: ["ui", "switch"],
    url: "/docs/ui/switch",
    title: "Switch",
    description: "A toggle switch control",
  },
  {
    slug: ["ui", "tabs"],
    url: "/docs/ui/tabs",
    title: "Tabs",
    description: "A set of layered sections of content",
  },
  {
    slug: ["ui", "toast"],
    url: "/docs/ui/toast",
    title: "Toast",
    description: "A notification message",
  },
  {
    slug: ["ui", "toggle-group"],
    url: "/docs/ui/toggle-group",
    title: "Toggle Group",
    description: "A group of toggle buttons",
  },
  {
    slug: ["ui", "toggle"],
    url: "/docs/ui/toggle",
    title: "Toggle",
    description: "A two-state button",
  },
  {
    slug: ["ui", "toolbar"],
    url: "/docs/ui/toolbar",
    title: "Toolbar",
    description: "A container for grouping buttons and controls",
  },
  {
    slug: ["ui", "tooltip"],
    url: "/docs/ui/tooltip",
    title: "Tooltip",
    description: "A popup that displays information",
  },

  // Blocks
  {
    slug: ["blocks", "ai-chat"],
    url: "/docs/blocks/ai-chat",
    title: "AI Chat",
    description: "An AI chat interface component",
  },
  {
    slug: ["blocks", "card-expandable"],
    url: "/docs/blocks/card-expandable",
    title: "Card Expandable",
    description: "An expandable card component",
  },
  {
    slug: ["blocks", "card-history"],
    url: "/docs/blocks/card-history",
    title: "Card History",
    description: "A card showing history timeline",
  },
  {
    slug: ["blocks", "card-image"],
    url: "/docs/blocks/card-image",
    title: "Card Image",
    description: "A card with image display",
  },
  {
    slug: ["blocks", "card-login"],
    url: "/docs/blocks/card-login",
    title: "Card Login",
    description: "A login form card",
  },
  {
    slug: ["blocks", "card-task"],
    url: "/docs/blocks/card-task",
    title: "Card Task",
    description: "A task management card",
  },
  {
    slug: ["blocks", "card-traffic"],
    url: "/docs/blocks/card-traffic",
    title: "Card Traffic",
    description: "A traffic analytics card",
  },
  {
    slug: ["blocks", "profile-menu"],
    url: "/docs/blocks/profile-menu",
    title: "Profile Menu",
    description: "A user profile dropdown menu",
  },
];

/**
 * Page tree structure for navigation
 * This is a hardcoded tree based on the manifest
 */
export const pageTree = {
  name: "Documentation",
  children: [
    {
      type: "page" as const,
      name: "Introduction",
      url: "/docs",
      external: false,
    },
    {
      type: "page" as const,
      name: "Getting Started",
      url: "/docs/start",
      external: false,
    },
    {
      type: "page" as const,
      name: "Components Overview",
      url: "/docs/components",
      external: false,
    },
    {
      type: "folder" as const,
      name: "UI Components",
      index: undefined,
      children: [
        {
          type: "page" as const,
          name: "Accordion",
          url: "/docs/ui/accordion",
          external: false,
        },
        {
          type: "page" as const,
          name: "Alert Dialog",
          url: "/docs/ui/alert-dialog",
          external: false,
        },
        {
          type: "page" as const,
          name: "Alert",
          url: "/docs/ui/alert",
          external: false,
        },
        {
          type: "page" as const,
          name: "Autocomplete",
          url: "/docs/ui/autocomplete",
          external: false,
        },
        {
          type: "page" as const,
          name: "Avatar",
          url: "/docs/ui/avatar",
          external: false,
        },
        {
          type: "page" as const,
          name: "Badge",
          url: "/docs/ui/badge",
          external: false,
        },
        {
          type: "page" as const,
          name: "Button",
          url: "/docs/ui/button",
          external: false,
        },
        {
          type: "page" as const,
          name: "Card",
          url: "/docs/ui/card",
          external: false,
        },
        {
          type: "page" as const,
          name: "Carousel",
          url: "/docs/ui/carousel",
          external: false,
        },
        {
          type: "page" as const,
          name: "Charts",
          url: "/docs/ui/charts",
          external: false,
        },
        {
          type: "page" as const,
          name: "Checkbox Group",
          url: "/docs/ui/checkbox-group",
          external: false,
        },
        {
          type: "page" as const,
          name: "Checkbox",
          url: "/docs/ui/checkbox",
          external: false,
        },
        {
          type: "page" as const,
          name: "Collapsible",
          url: "/docs/ui/collapsible",
          external: false,
        },
        {
          type: "page" as const,
          name: "Combobox",
          url: "/docs/ui/combobox",
          external: false,
        },
        {
          type: "page" as const,
          name: "Command",
          url: "/docs/ui/command",
          external: false,
        },
        {
          type: "page" as const,
          name: "Context Menu",
          url: "/docs/ui/context-menu",
          external: false,
        },
        {
          type: "page" as const,
          name: "Copy Button",
          url: "/docs/ui/copy-button",
          external: false,
        },
        {
          type: "page" as const,
          name: "Dialog",
          url: "/docs/ui/dialog",
          external: false,
        },
        {
          type: "page" as const,
          name: "Dropdown Menu",
          url: "/docs/ui/dropdown-menu",
          external: false,
        },
        {
          type: "page" as const,
          name: "Field",
          url: "/docs/ui/field",
          external: false,
        },
        {
          type: "page" as const,
          name: "Fieldset",
          url: "/docs/ui/fieldset",
          external: false,
        },
        {
          type: "page" as const,
          name: "Form",
          url: "/docs/ui/form",
          external: false,
        },
        {
          type: "page" as const,
          name: "Input",
          url: "/docs/ui/input",
          external: false,
        },
        {
          type: "page" as const,
          name: "Like Button",
          url: "/docs/ui/like-button",
          external: false,
        },
        {
          type: "page" as const,
          name: "Menubar",
          url: "/docs/ui/menubar",
          external: false,
        },
        {
          type: "page" as const,
          name: "Meter",
          url: "/docs/ui/meter",
          external: false,
        },
        {
          type: "page" as const,
          name: "Navigation Menu",
          url: "/docs/ui/navigation-menu",
          external: false,
        },
        {
          type: "page" as const,
          name: "Number Field",
          url: "/docs/ui/number-field",
          external: false,
        },
        {
          type: "page" as const,
          name: "Popover",
          url: "/docs/ui/popover",
          external: false,
        },
        {
          type: "page" as const,
          name: "Preview Card",
          url: "/docs/ui/preview-card",
          external: false,
        },
        {
          type: "page" as const,
          name: "Progress",
          url: "/docs/ui/progress",
          external: false,
        },
        {
          type: "page" as const,
          name: "Radio",
          url: "/docs/ui/radio",
          external: false,
        },
        {
          type: "page" as const,
          name: "Scroll Area",
          url: "/docs/ui/scroll-area",
          external: false,
        },
        {
          type: "page" as const,
          name: "Select",
          url: "/docs/ui/select",
          external: false,
        },
        {
          type: "page" as const,
          name: "Separator",
          url: "/docs/ui/separator",
          external: false,
        },
        {
          type: "page" as const,
          name: "Slider",
          url: "/docs/ui/slider",
          external: false,
        },
        {
          type: "page" as const,
          name: "Switch",
          url: "/docs/ui/switch",
          external: false,
        },
        {
          type: "page" as const,
          name: "Tabs",
          url: "/docs/ui/tabs",
          external: false,
        },
        {
          type: "page" as const,
          name: "Toast",
          url: "/docs/ui/toast",
          external: false,
        },
        {
          type: "page" as const,
          name: "Toggle Group",
          url: "/docs/ui/toggle-group",
          external: false,
        },
        {
          type: "page" as const,
          name: "Toggle",
          url: "/docs/ui/toggle",
          external: false,
        },
        {
          type: "page" as const,
          name: "Toolbar",
          url: "/docs/ui/toolbar",
          external: false,
        },
        {
          type: "page" as const,
          name: "Tooltip",
          url: "/docs/ui/tooltip",
          external: false,
        },
      ],
    },
    {
      type: "folder" as const,
      name: "Blocks",
      index: undefined,
      children: [
        {
          type: "page" as const,
          name: "AI Chat",
          url: "/docs/blocks/ai-chat",
          external: false,
        },
        {
          type: "page" as const,
          name: "Card Expandable",
          url: "/docs/blocks/card-expandable",
          external: false,
        },
        {
          type: "page" as const,
          name: "Card History",
          url: "/docs/blocks/card-history",
          external: false,
        },
        {
          type: "page" as const,
          name: "Card Image",
          url: "/docs/blocks/card-image",
          external: false,
        },
        {
          type: "page" as const,
          name: "Card Login",
          url: "/docs/blocks/card-login",
          external: false,
        },
        {
          type: "page" as const,
          name: "Card Task",
          url: "/docs/blocks/card-task",
          external: false,
        },
        {
          type: "page" as const,
          name: "Card Traffic",
          url: "/docs/blocks/card-traffic",
          external: false,
        },
        {
          type: "page" as const,
          name: "Profile Menu",
          url: "/docs/blocks/profile-menu",
          external: false,
        },
      ],
    },
  ],
};
