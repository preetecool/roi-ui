"use client";

import { ArrowUp, Paperclip } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils-tailwind";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { Card, CardContent, CardFooter } from "@/registry/brook/tailwind/ui/card";
import { Field, FieldControl } from "@/registry/brook/tailwind/ui/field";
import { Form } from "@/registry/brook/tailwind/ui/form";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectSpacer,
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/tailwind/ui/select";

const aiModes = [
  { value: "creative", label: "Creative" },
  { value: "fast", label: "Fast" },
  { value: "reasoning", label: "Reason" },
  { value: "teach", label: "Teach" },
];

export type AiChatProps = {
  onSubmit?: (submission: { message: string; mode: string }) => void | Promise<void>;
  onAttach?: () => void;
};

export function AiChat({ onSubmit, onAttach }: AiChatProps = {}) {
  const [message, setMessage] = useState("");
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasContent = message.trim().length > 0;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasContent || isPending) {
      return;
    }
    const mode = String(new FormData(event.currentTarget).get("mode") ?? aiModes[0].value);
    setPending(true);
    setError(null);
    try {
      if (onSubmit) {
        await onSubmit({ message: message.trim(), mode });
      }
      setMessage("");
    } catch {
      setError("Message could not be sent. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <Form className="w-full max-sm:flex max-sm:items-center max-sm:justify-center" onSubmit={handleSubmit}>
      <Card
        className={cn(
          "!gap-3 !p-3 mx-auto h-auto w-full rounded-[var(--radius-lg)] border-[oklch(from_var(--border)_l_c_h_/_0.25)] bg-[var(--mix-card-50-bg)] transition-[border-color] duration-200 ease-in-out focus-within:border-[oklch(from_var(--border)_l_c_h_/_0.5)] hover:border-[oklch(from_var(--border)_l_c_h_/_0.5)]",
          "min-w-0 max-w-[600px]",
          "max-sm:min-w-[230px]"
        )}
      >
        <CardContent>
          <Field
            className={cn(
              "[&_textarea]:!border-0 [&_textarea]:!bg-transparent [&_textarea]:!p-1 [&_textarea]:resize-none",
              "[&_textarea]:h-auto [&_textarea]:min-h-10 [&_textarea]:leading-[1.5] [&_textarea]:focus:outline-none",
              "max-xl:[&_textarea]:!p-2 max-xl:[&_textarea]:min-h-16"
            )}
          >
            <FieldControl
              placeholder="How can I help…"
              render={
                <textarea
                  aria-label="Message"
                  className="focus:outline-none"
                  disabled={isPending}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              }
            />
          </Field>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-2">
          {onAttach ? (
            <Button
              aria-label="Attach file"
              className="!size-8 !rounded-full !p-2 shrink-0 [&>svg]:shrink-0 [&>svg]:rotate-[-45deg] [&>svg]:text-muted-foreground"
              disabled={isPending}
              onClick={onAttach}
              size="icon"
              type="button"
              variant="ghost"
            >
              <Paperclip size={14} />
            </Button>
          ) : null}

          <div className="ml-auto flex items-center gap-2">
            <Select defaultValue={aiModes[0].value} disabled={isPending} items={aiModes} name="mode">
              <SelectTrigger
                className="!transition-none hover:!bg-accent data-[popup-open]:!bg-accent"
                render={<Button className="!rounded-[var(--radius)]" size="sm" variant="ghost" />}
              >
                <SelectValue>
                  {(value) => {
                    const selectedMode = aiModes.find((mode) => mode.value === value);
                    return <span className="text-muted-foreground max-md:text-sm">{selectedMode?.label}</span>;
                  }}
                </SelectValue>
                <SelectIcon className="ml-1 max-md:hidden" />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner align="start" alignItemWithTrigger={false} side="top" sideOffset={8}>
                  <SelectPopup
                    className="max-md:!w-[120px] max-md:!min-w-[120px] max-md:!max-w-[120px] box-border min-w-[140px]"
                    data-slot="select-popup"
                  >
                    <SelectSpacer />
                    <SelectList>
                      {aiModes.map(({ label, value }) => (
                        <SelectItem data-slot="select-item" key={value} value={value}>
                          <SelectItemText>{label}</SelectItemText>
                          <SelectItemIndicator className="text-muted-foreground" />
                        </SelectItem>
                      ))}
                    </SelectList>
                    <SelectSpacer />
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>

            <Button
              aria-label="Send message"
              className="!size-9 !rounded-full !bg-primary hover:not-disabled:!bg-[oklch(from_var(--primary)_calc(l*0.8)_c_h)] shrink-0"
              disabled={isPending || !hasContent}
              size="icon"
              type="submit"
              variant="ghost"
            >
              <ArrowUp className="text-primary-foreground" size={16} />
            </Button>
          </div>
        </CardFooter>
        {error ? <p role="alert">{error}</p> : null}
      </Card>
    </Form>
  );
}
