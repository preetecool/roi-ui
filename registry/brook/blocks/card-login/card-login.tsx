"use client";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/registry/brook/ui/checkbox/checkbox";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/registry/brook/ui/field/field";
import { Check } from "lucide-react";
import { useState } from "react";
import styles from "./card-login.module.css";

export default function CardLoginDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

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
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Field className={styles.emailField}>
            <FieldLabel className={styles.fieldLabel}>Email</FieldLabel>
            <FieldControl
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              value={email}
            />

            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field>
            <div className={styles.passwordLabelRow}>
              <FieldLabel className={styles.fieldLabel}>Password</FieldLabel>
              <button className={styles.forgotPassword} type="button">
                Forgot password?
              </button>
            </div>
            <FieldControl
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              value={password}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </Field>

          <label className={styles.checkboxLabel}>
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            >
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className={styles.rememberMe}>Remember me</span>
          </label>
        </form>
      </CardContent>
      <CardFooter className={styles.footer}>
        <Button className={styles.button} onClick={handleSubmit} size="lg">
          Sign In
        </Button>
      </CardFooter>
      <div className={styles.signupBanner}>
        <span className={styles.signupText}>No account? </span>
        <span className={styles.signupLink}>Sign up</span>
      </div>
    </Card>
  );
}
