"use client";

import { ArrowUp, AudioLines, Paperclip } from "lucide-react";
import { useActionState, useState } from "react";
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

type FormState =
  | { status: "idle" }
  | { status: "success"; data: { message: string; mode: string } }
  | { status: "error"; error: string; submittedData: { message: string; mode: string } };

const initialFormState: FormState = { status: "idle" };

async function chatAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const message = formData.get("message") as string;
  const mode = formData.get("mode") as string;

  return { status: "success", data: { message, mode } };
}

export function AiChat() {
  const [formState, submitAction, isPending] = useActionState(chatAction, initialFormState);
  const [hasContent, setHasContent] = useState(false);

  const defaultMessage = formState.status === "error" ? formState.submittedData.message : "";
  const defaultMode = formState.status === "error" ? formState.submittedData.mode : aiModes[0].value;

  return (
    <Form action={submitAction} className="w-full max-sm:flex max-sm:items-center max-sm:justify-center max-xl:h-full">
      <Card
        className={cn(
          "h-auto w-full flex-1 gap-3 rounded-[var(--radius-lg)] border-[oklch(from_var(--border)_l_c_h_/_0.25)] bg-[var(--mix-card-50-bg)] p-3 transition-[border-color] duration-200 hover:border-[oklch(from_var(--border)_l_c_h_/_0.5)] focus-within:border-[oklch(from_var(--border)_l_c_h_/_0.5)]",
          "min-w-0 max-w-none",
          "max-xl:h-full",
          "max-sm:mx-auto"
        )}
      >
        <CardContent>
          <Field
            className={cn(
              "[&_textarea]:!border-0 [&_textarea]:!p-1 [&_textarea]:resize-none [&_textarea]:bg-transparent",
              "[&_textarea]:!h-[50px] [&_textarea]:!min-h-[50px] [&_textarea]:!px-1 [&_textarea]:focus:outline-none",
              "[&_textarea]:!leading-normal",
              "max-xl:[&_textarea]:!p-2 max-xl:[&_textarea]:h-full max-xl:[&_textarea]:min-h-16"
            )}
          >
            <FieldControl
              placeholder="How can I help…"
              render={
                <textarea
                  className="focus:outline-none"
                  defaultValue={defaultMessage}
                  disabled={isPending}
                  name="message"
                  onChange={(e) => setHasContent(e.target.value.trim().length > 0)}
                />
              }
            />
          </Field>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-2">
          <Button
            aria-label="Attach file"
            className="size-8 shrink-0 rounded-full p-2 [&>svg]:shrink-0 [&>svg]:rotate-[-45deg] [&>svg]:text-muted-foreground"
            size="icon"
            type="button"
            variant="ghost"
          >
            <Paperclip size={14} />
          </Button>

          <div className="flex items-center gap-2">
            <Select defaultValue={defaultMode} items={aiModes} name="mode">
              <SelectTrigger
                className="!transition-none hover:!bg-accent data-[popup-open]:!bg-accent"
                render={<Button className="rounded-[var(--radius)]" size="sm" variant="ghost" />}
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
                  <SelectPopup className="min-w-[120px] max-md:w-[120px]" data-slot="select-popup">
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
              aria-label={hasContent ? "Send message" : "Start voice input"}
              className="size-9 shrink-0 rounded-full bg-primary p-2 hover:bg-[oklch(from_var(--color-primary)_calc(l*0.8)_c_h)]"
              disabled={isPending}
              size="icon"
              type="submit"
              variant="ghost"
            >
              {hasContent ? (
                <ArrowUp className="text-primary-foreground" size={16} />
              ) : (
                <AudioLines className="text-primary-foreground" size={16} />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
}
