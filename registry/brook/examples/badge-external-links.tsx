"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import Link from "next/link";

export default function BadgeExternalLinks() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      <Link href="https://base-ui.com" target="_blank" rel="noopener noreferrer">
        <Badge>
          Base UI Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="#" target="_blank" rel="noopener noreferrer">
        <Badge variant="secondary">
          Motion Documentation <span>↗</span>
        </Badge>
      </Link>
      <Link href="#" target="_blank" rel="noopener noreferrer">
        <Badge variant="outline">
          View on GitHub <span>↗</span>
        </Badge>
      </Link>
    </div>
  );
}
