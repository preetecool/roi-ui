"use client";

import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Form,
  FormActions,
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@/registry/brook/ui/form/form";

export default function FormDemo() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Form
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const url = formData.get("url") as string;

        setLoading(true);
        const response = await submitForm(url);
        const serverErrors = {
          url: response.error,
        };

        setErrors(serverErrors);
        setLoading(false);
      }}
      style={{ maxWidth: "400px" }}
    >
      <FormField name="url">
        <FormLabel>Homepage</FormLabel>
        <FormControl
          pattern="https?://[^/]+\.com(/.*)?$"
          placeholder="https://example.com"
          required
          type="url"
        />
        <FormError />
      </FormField>

      <FormActions>
        <Button disabled={loading} style={{ width: "100%" }} type="submit">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </FormActions>
    </Form>
  );
}

async function submitForm(value: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  try {
    const url = new URL(value);

    if (url.hostname.endsWith("example.com")) {
      return { error: "The example domain is not allowed" };
    }
  } catch {
    return { error: "This is not a valid URL" };
  }

  return { success: true };
}
