"use client";
import { Check, Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Button } from "@/registry/brook/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/registry/brook/ui/card/card";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/ui/checkbox/checkbox";
import { Field, FieldControl, FieldError, FieldLabel } from "@/registry/brook/ui/field/field";
import { Input } from "@/registry/brook/ui/input/input";
import styles from "./card-login.module.css";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const MIN_PASSWORD_LENGTH = 6;

type FormState =
  | { status: "idle" }
  | { status: "error"; errors: { email?: string; password?: string }; focusField?: "email" | "password" }
  | { status: "success" };

const initialFormState: FormState = { status: "idle" };

async function loginAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: { email?: string; password?: string } = {};

  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Email is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  if (Object.keys(errors).length > 0) {
    const focusField = errors.email ? "email" : "password";
    return { status: "error", errors, focusField };
  }

  return { status: "success" };
}

const getEmailError = (state: FormState): string | undefined =>
  state.status === "error" ? state.errors.email : undefined;

const getPasswordError = (state: FormState): string | undefined =>
  state.status === "error" ? state.errors.password : undefined;

const shouldFocusEmail = (state: FormState): boolean =>
  state.status === "error" && state.focusField === "email";

const shouldFocusPassword = (state: FormState): boolean =>
  state.status === "error" && state.focusField === "password";

export default function CardLoginDemo() {
  const [formState, submitAction, isPending] = useActionState(loginAction, initialFormState);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const emailError = getEmailError(formState);
  const passwordError = getPasswordError(formState);

  useEffect(() => {
    if (shouldFocusEmail(formState)) {
      emailInputRef.current?.focus();
    } else if (shouldFocusPassword(formState)) {
      passwordInputRef.current?.focus();
    }
  }, [formState]);

  useEffect(() => {
    if (formState.status === "success") {
    }
  }, [formState.status]);

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={submitAction} className={styles.form}>
          <Field className={styles.emailField}>
            <FieldLabel className={styles.fieldLabel}>Email</FieldLabel>
            <FieldControl
              autoComplete="email"
              name="email"
              placeholder="Enter your email…"
              ref={emailInputRef}
              render={<Input spellCheck={false} />}
              type="email"
            />
            {emailError && <FieldError>{emailError}</FieldError>}
          </Field>

          <Field>
            <div className={styles.passwordLabelRow}>
              <FieldLabel className={styles.fieldLabel}>Password</FieldLabel>
              <button className={styles.forgotPassword} type="button">
                Forgot password?
              </button>
            </div>
            <FieldControl
              autoComplete="current-password"
              name="password"
              placeholder="Enter your password…"
              ref={passwordInputRef}
              render={<Input />}
              type="password"
            />
            {passwordError && <FieldError>{passwordError}</FieldError>}
          </Field>

          <label className={styles.checkboxLabel} htmlFor="remember-me">
            <Checkbox defaultChecked={false} id="remember-me" name="rememberMe">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span className={styles.rememberMe}>Remember me</span>
          </label>

          <CardFooter className={styles.footer}>
            <Button className={styles.button} disabled={isPending} type="submit">
              <span className={styles.buttonContent}>
                Sign In
                {isPending && <Loader2 aria-hidden="true" className={styles.spinner} size={16} />}
              </span>
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      <div className={styles.dividerContainer}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerText}>OR</span>
        <div className={styles.dividerLine} />
      </div>
      <div className={styles.socialLoginContainer}>
        <Button className={styles.socialButton} variant="outline">
          <AppleIcon className={styles.appleLogo} />
          Apple
        </Button>
        <Button className={styles.socialButton} variant="outline">
          <GoogleIcon className={styles.socialIcon} />
          Google
          <Badge className={styles.lastUsedBadge} size="sm" variant="info">
            Last used
          </Badge>
        </Button>
      </div>
      <div className={styles.signupBanner}>
        <span className={styles.signupText}>No account? </span>
        <button className={styles.signupLink} type="button">
          Sign up
        </button>
      </div>
    </Card>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="currentColor"
      />
    </svg>
  );
}
