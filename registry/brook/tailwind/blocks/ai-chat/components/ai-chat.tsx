"use client";

import { ArrowUp, AudioLines, Paperclip } from "lucide-react";
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

export function AiChat() {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string>(aiModes[0].value);

  return (
    <Form className="w-full max-sm:flex max-sm:items-center max-sm:justify-center max-xl:h-full">
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
              "[&_textarea]:!h-[50px] [&_textarea]:!min-h-[50px] [&_textarea]:!outline-0 [&_textarea]:!px-1 [&_textarea]:outline-none",
              "[&_textarea]:!leading-normal",
              "max-xl:[&_textarea]:!p-2 max-xl:[&_textarea]:h-full max-xl:[&_textarea]:min-h-16"
            )}
          >
            <FieldControl
              placeholder="How can I help?"
              render={
                <textarea
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ outline: "none" }}
                  value={inputValue}
                />
              }
            />
          </Field>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-2">
          <Button
            className="shrink-0 rounded-full p-2 [&>svg:first-child]:rotate-[-45deg] [&>svg]:shrink-0 [&>svg]:text-muted-foreground"
            size="icon"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            type="button"
            variant="ghost"
          >
            <Paperclip size={14} />
          </Button>

          <div className="flex items-center gap-2">
            <Select
              defaultValue={aiModes[0].value}
              items={aiModes}
              onValueChange={(value) => setSelectedItem(value as string)}
              value={selectedItem}
            >
              <SelectTrigger
                className="min-w-[100px] hover:!bg-accent data-[popup-open]:!bg-accent"
                render={<Button className="rounded-[var(--radius)]" size="sm" variant="ghost" />}
              >
                <SelectValue>
                  {(value) => {
                    const selectedMode = aiModes.find((mode) => mode.value === value);
                    return <span className="text-muted-foreground max-md:text-sm">{selectedMode?.label}</span>;
                  }}
                </SelectValue>
                <SelectIcon className="ml-1" />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner align="end" alignItemWithTrigger={false} sideOffset={8}>
                  <SelectPopup className="min-w-[120px]">
                    <SelectSpacer />
                    <SelectList>
                      {aiModes.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
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
              className="shrink-0 rounded-full p-2 [&>svg]:shrink-0 [&>svg]:text-muted-foreground"
              size="icon"
              style={{
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                minWidth: "36px",
                minHeight: "36px",
                backgroundColor: "var(--primary)",
              }}
              type="submit"
              variant="ghost"
            >
              {inputValue.trim() ? (
                <ArrowUp className="!text-primary-foreground" size={16} />
              ) : (
                <AudioLines className="!text-primary-foreground" size={16} />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
}
