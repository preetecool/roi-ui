import { anchoredToastManager } from "@/registry/brook/ui/toast/toast";

/** Copies text to the clipboard and shows a toast anchored to the triggering element. */
export async function copyWithToast(text: string, anchor: HTMLElement | null) {
  const positionerProps = { anchor, side: "top" as const, sideOffset: 6 };
  try {
    await navigator.clipboard.writeText(text);
    anchoredToastManager.add({ title: "Copied!", timeout: 800, positionerProps });
  } catch {
    anchoredToastManager.add({ title: "Failed to copy", timeout: 2000, positionerProps });
  }
}
