"use client";

import { ArrowUp, AudioLines, Paperclip } from "lucide-react";
import { useActionState, useState } from "react";
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
    <Form action={submitAction} className={styles.form}>
      <Card className={styles.aiChatCard}>
        <CardContent>
          <Field className={styles.field}>
            <FieldControl
              placeholder="How can I help…"
              render={
                <textarea
                  className={styles.textarea}
                  defaultValue={defaultMessage}
                  disabled={isPending}
                  name="message"
                  onChange={(e) => setHasContent(e.target.value.trim().length > 0)}
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
            <Select defaultValue={defaultMode} items={aiModes} name="mode">
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
              aria-label={hasContent ? "Send message" : "Start voice input"}
              className={styles.submitButton}
              disabled={isPending}
              size="icon"
              type="submit"
              variant="ghost"
            >
              {hasContent ? (
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
