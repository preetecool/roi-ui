import assert from "node:assert/strict";
import test from "node:test";
import { groupExamples } from "../lib/canvas-groups.ts";

test("examples group under the longest matching component", () => {
  const groups = groupExamples(
    ["alert", "alert-dialog", "checkbox", "checkbox-group", "sidebar"],
    ["alert-demo", "alert-dialog-nested", "checkbox-group-parent", "checkbox-card", "shipping"]
  );

  assert.deepEqual(groups, [
    { name: "alert", examples: ["alert-demo"] },
    { name: "alert-dialog", examples: ["alert-dialog-nested"] },
    { name: "checkbox", examples: ["checkbox-card"] },
    { name: "checkbox-group", examples: ["checkbox-group-parent"] },
    { name: "shipping", examples: ["shipping"] },
  ]);
});
