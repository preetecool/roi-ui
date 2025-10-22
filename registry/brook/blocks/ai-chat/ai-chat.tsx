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
import { Button } from "@/registry/brook/ui/button/button";
import { Card, CardContent, CardFooter } from "@/registry/brook/ui/card/card";
import { Field, FieldControl } from "@/registry/brook/ui/field/field";
import { Form } from "@/registry/brook/ui/form/form";
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
} from "@/registry/brook/ui/select/select";
import styles from "./ai-chat.module.css";

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
    <Form className={styles.form}>
      <Card id={styles.card}>
        <CardContent>
          <Field className={styles.field}>
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
        <CardFooter className={styles.footer}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Button
              className={styles.iconButton}
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
                      <div className={styles.triggerContent}>
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
                  <SelectPopup className={styles.popup}>
                    {aiModes.map(({ label, value, icon: IconComponent }) => (
                      <SelectItem key={value} value={value}>
                        <div className={styles.triggerContent}>
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
            className={styles.iconButton}
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
