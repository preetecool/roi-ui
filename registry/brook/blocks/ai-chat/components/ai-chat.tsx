"use client";

import { ArrowUp, Paperclip } from "lucide-react";
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
    <Form className={styles.form} onSubmit={handleSubmit}>
      <Card className={styles.aiChatCard}>
        <CardContent>
          <Field className={styles.field}>
            <FieldControl
              placeholder="How can I help…"
              render={
                <textarea
                  aria-label="Message"
                  className={styles.textarea}
                  disabled={isPending}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              }
            />
          </Field>
        </CardContent>
        <CardFooter className={styles.footer}>
          {onAttach ? (
            <Button
              aria-label="Attach file"
              className={styles.attachButton}
              disabled={isPending}
              onClick={onAttach}
              size="icon"
              type="button"
              variant="ghost"
            >
              <Paperclip size={14} />
            </Button>
          ) : null}

          <div className={styles.footerActions}>
            <Select defaultValue={aiModes[0].value} disabled={isPending} items={aiModes} name="mode">
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
                  <SelectPopup className={styles.popup} data-slot="select-popup">
                    <SelectSpacer />
                    <SelectList>
                      {aiModes.map(({ label, value }) => (
                        <SelectItem data-slot="select-item" key={value} value={value}>
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
              aria-label="Send message"
              className={styles.submitButton}
              disabled={isPending || !hasContent}
              size="icon"
              type="submit"
              variant="ghost"
            >
              <ArrowUp className={styles.submitIcon} size={16} />
            </Button>
          </div>
        </CardFooter>
        {error ? <p role="alert">{error}</p> : null}
      </Card>
    </Form>
  );
}
