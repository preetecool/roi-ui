"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/registry/brook/ui/card/card";
import { Field, FieldLabel, FieldControl, FieldError } from "@/registry/brook/ui/field/field";
import { useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./card-login.module.css";

export default function CardLoginDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login successful!", { email, password });
    }
  };

  return (
    <Card className={styles.card} style={{ backgroundColor: 'color-mix(in oklch, var(--card) 33%, var(--background))' }}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldControl
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldControl
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </Field>
        </form>
      </CardContent>
      <CardFooter className={styles.footer}>
        <Button onClick={handleSubmit} className={styles.button}>
          Sign In
        </Button>
        <Button variant="ghost" className={styles.button}>
          Forgot Password?
        </Button>
      </CardFooter>
    </Card>
  );
}
