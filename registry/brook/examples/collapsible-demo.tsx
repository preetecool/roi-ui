import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from "@/registry/brook/ui/collapsible/collapsible";

export default function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen={false}>
      <CollapsibleTrigger>Show recovery keys</CollapsibleTrigger>
      <CollapsiblePanel>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "0.25rem",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            backgroundColor: "var(--card)",
            cursor: "text",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "var(--muted)",
              borderRadius: "0.25rem",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              // border: "1px solid var(--border)",
            }}
          >
            recovery-key-1: abc123def456
          </div>
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "var(--muted)",
              borderRadius: "0.25rem",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              // border: "1px solid var(--border)",
            }}
          >
            recovery-key-2: ghi789jkl012
          </div>
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "var(--muted)",
              borderRadius: "0.25rem",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              // border: "1px solid var(--border)",
            }}
          >
            recovery-key-3: mno345pqr678
          </div>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
