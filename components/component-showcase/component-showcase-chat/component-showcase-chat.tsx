import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/registry/brook/ui/select/select";
import { Card, CardFooter, CardContent } from "@/registry/brook/ui/card/card";
import { Form, FormField, FormControl } from "@/registry/brook/ui/form/form";
import { Paperclip, Zap, Lightbulb, WandSparkles, GraduationCap, AudioLines, ArrowUp } from "lucide-react";
import styles from "./component-showcase-chat.module.css";

const aiModes = [
  { value: "creative", label: "Creative", icon: WandSparkles },
  { value: "fast", label: "Fast", icon: Zap },
  { value: "reasoning", label: "Reason", icon: Lightbulb },
  { value: "teach", label: "Teach", icon: GraduationCap },
];

export function ShowcaseChat() {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string>(aiModes[0].value);

  return (
    <Form className={styles.form}>
      <Card className={styles.card}>
        <CardContent>
          <FormField className={styles.field}>
            <FormControl
              render={<textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} />}
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
              style={{ width: "32px", height: "32px" }}
            >
              <Paperclip size={14} />
            </Button>

            <Select
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
            </Select>
          </div>

          <Button
            size="icon"
            variant="outline"
            type="submit"
            style={{ padding: "8px", borderRadius: "50%", width: "36px", height: "36px" }}
          >
            {inputValue.trim() ? <ArrowUp size={20} /> : <AudioLines size={20} />}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
