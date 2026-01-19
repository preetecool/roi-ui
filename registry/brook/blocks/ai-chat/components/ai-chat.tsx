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
              placeholder="How can I help…"
              render={
                <textarea
                  className={styles.textarea}
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
              }
            />
          </Field>
        </CardContent>
        <CardFooter className={styles.footer}>
          <Button
            aria-label="Attach file"
            className={styles.attachButton}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Paperclip size={14} />
          </Button>

          <div className={styles.footerActions}>
            <Select
              defaultValue={aiModes[0].value}
              items={aiModes}
              onValueChange={(value) => setSelectedItem(value as string)}
              value={selectedItem}
            >
              <SelectTrigger
                className={styles.selectTrigger}
                render={<Button className={styles.selectButton} size="sm" variant="ghost" />}
              >
                <SelectValue>
                  {(value) => {
                    const selectedMode = aiModes.find((mode) => mode.value === value);
                    return <span className={styles.selectValue}>{selectedMode?.label}</span>;
                  }}
                </SelectValue>
                <SelectIcon className={styles.selectIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectPositioner align="start" alignItemWithTrigger={false} side="top" sideOffset={8}>
                  <SelectPopup className={styles.popup}>
                    <SelectSpacer />
                    <SelectList>
                      {aiModes.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          <SelectItemText>{label}</SelectItemText>
                          <SelectItemIndicator className={styles.selectIndicator} />
                        </SelectItem>
                      ))}
                    </SelectList>
                    <SelectSpacer />
                  </SelectPopup>
                </SelectPositioner>
              </SelectPortal>
            </Select>

            <Button
              aria-label={inputValue.trim() ? "Send message" : "Start voice input"}
              className={styles.submitButton}
              size="icon"
              type="submit"
              variant="ghost"
            >
              {inputValue.trim() ? (
                <ArrowUp className={styles.submitIcon} size={16} />
              ) : (
                <AudioLines className={styles.submitIcon} size={16} />
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
}
