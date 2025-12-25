"use client";

import { ArrowUp, AudioLines, Paperclip } from "lucide-react";
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
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectSpacer,
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/ui/select/select";
import styles from "./ai-chat.module.css";

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
    <Form className={styles.form}>
      <Card className={styles.aiChatCard}>
        <CardContent>
          <Field className={styles.field}>
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
        <CardFooter className={styles.footer}>
          <Button
            className={styles.iconButton}
            size="icon"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            type="button"
            variant="ghost"
          >
            <Paperclip size={14} />
          </Button>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Select
              defaultValue={aiModes[0].value}
              items={aiModes}
              onValueChange={(value) => setSelectedItem(value as string)}
              value={selectedItem}
            >
              <SelectTrigger
                className={styles.selectTrigger}
                render={<Button size="sm" style={{ borderRadius: "var(--radius)" }} variant="ghost" />}
              >
                <SelectValue>
                  {(value) => {
                    const selectedMode = aiModes.find((mode) => mode.value === value);
                    return <span style={{ color: "var(--muted-foreground)" }}>{selectedMode?.label}</span>;
                  }}
                </SelectValue>
                <SelectIcon />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner align="end" alignItemWithTrigger={false} sideOffset={8}>
                  <SelectPopup className={styles.popup}>
                    <SelectSpacer />
                    <SelectList>
                      {aiModes.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          <SelectItemText>{label}</SelectItemText>
                          <SelectItemIndicator style={{ color: "var(--muted-foreground)" }} />
                        </SelectItem>
                      ))}
                    </SelectList>
                    <SelectSpacer />
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>

            <Button
              className={styles.iconButton}
              size="icon"
              style={{
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                backgroundColor: "var(--primary)",
              }}
              type="submit"
              variant="ghost"
            >
              {inputValue.trim() ? (
                <ArrowUp size={16} style={{ color: "var(--primary-foreground)" }} />
              ) : (
                <AudioLines size={16} style={{ color: "var(--primary-foreground)" }} />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
}
