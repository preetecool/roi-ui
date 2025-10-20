"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { useState } from "react";

import { Card, CardContent, CardFooter } from "@/registry/brook/ui/card/card";
import { Form, FormControl, FormField } from "@/registry/brook/ui/form/form";
import {
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/ui/select/select";
import { ArrowUp, AudioLines, GraduationCap, Lightbulb, Paperclip, WandSparkles, Zap } from "lucide-react";
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
          <FormField className={styles.field}>
            <FormControl
              render={
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ outline: "none" }}
                />
              }
              placeholder="Ask and i'll answer."
            />
          </FormField>
        </CardContent>
        <CardFooter className={styles.footer}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Button
              size="icon"
              variant="outline"
              className={styles.iconButton}
              type="button"
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            >
              <Paperclip size={14} />
            </Button>

            <SelectRoot
              items={aiModes}
              defaultValue={aiModes[0].value}
              value={selectedItem}
              onValueChange={(value) => setSelectedItem(value as string)}
            >
              <SelectTrigger render={<Button size="sm" variant="outline" />}>
                <SelectValue>
                  {(value) => {
                    const selectedMode = aiModes.find((mode) => mode.value === value);
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
                <SelectPositioner sideOffset={8} alignItemWithTrigger={false}>
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
            </SelectRoot>
          </div>

          <Button
            size="icon"
            variant="outline"
            type="submit"
            className={styles.iconButton}
            style={{ borderRadius: "50%", width: "36px", height: "36px" }}
          >
            {inputValue.trim() ? <ArrowUp size={16} /> : <AudioLines size={16} />}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
