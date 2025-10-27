"use client";

import {
  ArrowUp,
  AudioLines,
  GraduationCap,
  Lightbulb,
  Paperclip,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/tw-utils";
import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/registry/brook/tailwind/ui/card";
import { Field, FieldControl } from "@/registry/brook/tailwind/ui/field";
import { Form } from "@/registry/brook/tailwind/ui/form";
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/tailwind/ui/select";

const aiModes = [
  { value: "creative", label: "Creative", icon: WandSparkles },
  { value: "fast", label: "Fast", icon: Zap },
  { value: "reasoning", label: "Reason", icon: Lightbulb },
  { value: "teach", label: "Teach", icon: GraduationCap },
];

export function AiChat() {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string>(aiModes[0].value);

  return (
    <Form className="w-full max-sm:flex max-sm:items-center max-sm:justify-center max-xl:h-full">
      <Card
        className={cn(
          "h-auto w-full flex-1 gap-3 rounded-[var(--radius-lg)] border-[var(--border)] bg-[var(--mix-card-50-bg)] p-3",
          "min-w-0 max-w-none",
          "max-xl:h-full",
          "max-sm:mx-auto"
        )}
      >
        <CardContent>
          <Field
            className={cn(
              "[&_textarea]:resize-none [&_textarea]:border-none [&_textarea]:bg-transparent [&_textarea]:p-1",
              "[&_textarea]:h-auto [&_textarea]:min-h-10 [&_textarea]:outline-none",
              "max-xl:[&_textarea]:h-full max-xl:[&_textarea]:min-h-16 max-xl:[&_textarea]:p-2"
            )}
          >
            <FieldControl
              placeholder="Ask and i'll answer."
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
          <div className="flex items-center gap-2">
            <Button
              className="rounded-full p-2 [&>svg:first-child]:rotate-[-45deg]"
              size="icon"
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              type="button"
              variant="outline"
            >
              <Paperclip size={14} />
            </Button>

            <Select
              defaultValue={aiModes[0].value}
              items={aiModes}
              onValueChange={(value) => setSelectedItem(value as string)}
              value={selectedItem}
            >
              <SelectTrigger render={<Button size="sm" variant="outline" />}>
                <SelectValue>
                  {(value) => {
                    const selectedMode = aiModes.find(
                      (mode) => mode.value === value
                    );
                    const IconComponent = selectedMode?.icon;
                    return (
                      <div className="flex w-full items-center gap-2">
                        {IconComponent && <IconComponent size={14} />}
                        <span>{selectedMode?.label}</span>
                      </div>
                    );
                  }}
                </SelectValue>
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner alignItemWithTrigger={false} sideOffset={8}>
                  <SelectPopup className="box-border w-36 min-w-36 max-w-36 p-1">
                    {aiModes.map(({ label, value, icon: IconComponent }) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex w-full items-center gap-2">
                          <IconComponent size={14} />
                          <SelectItemText>{label}</SelectItemText>
                          <SelectItemIndicator />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>
          </div>

          <Button
            className="rounded-full p-2"
            size="icon"
            style={{ borderRadius: "50%", width: "36px", height: "36px" }}
            type="submit"
            variant="outline"
          >
            {inputValue.trim() ? (
              <ArrowUp size={16} />
            ) : (
              <AudioLines size={16} />
            )}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
