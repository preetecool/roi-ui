"use client";
import { Check, Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils-tailwind";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import { Button } from "@/registry/brook/tailwind/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/registry/brook/tailwind/ui/card";
import { Checkbox, CheckboxIndicator } from "@/registry/brook/tailwind/ui/checkbox";
import { Field, FieldControl, FieldError, FieldLabel } from "@/registry/brook/tailwind/ui/field";
import { Input } from "@/registry/brook/tailwind/ui/input";

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

export function CardLogin() {
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
    <Card
      className={cn(
        "mx-auto w-full max-w-[440px] rounded-[var(--radius-lg)] !p-5",
        "max-sm:!p-4"
      )}
    >
      <CardHeader>
        <CardTitle className={cn("ml-1", "max-sm:text-xl max-sm:leading-[1.3]")}>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={submitAction} className="flex flex-col gap-4">
          <Field className="pb-1">
            <FieldLabel className={cn("ml-1", "max-sm:text-sm")}>Email</FieldLabel>
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
            <div className={cn("flex w-full items-center justify-between", "max-sm:mb-1.5")}>
              <FieldLabel className={cn("ml-1", "max-sm:text-sm")}>Password</FieldLabel>
              <button
                className={cn(
                  "mr-1 cursor-pointer border-none bg-transparent p-0 font-light text-[var(--secondary-foreground)] text-sm leading-5 transition-colors duration-200",
                  "hover:text-[var(--foreground)]",
                  "max-sm:mr-0 max-sm:min-h-11 max-sm:p-2 max-sm:text-sm"
                )}
                type="button"
              >
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

          <label
            className={cn(
              "mt-2 ml-1 flex cursor-pointer items-center gap-2 font-light text-sm leading-5",
              "max-sm:min-h-11 max-sm:items-center max-sm:gap-2.5 max-sm:text-sm"
            )}
            htmlFor="remember-me"
          >
            <Checkbox defaultChecked={false} id="remember-me" name="rememberMe">
              <CheckboxIndicator>
                <Check size={16} strokeWidth={3} />
              </CheckboxIndicator>
            </Checkbox>
            <span
              className={cn(
                "cursor-pointer text-[var(--secondary-foreground)]",
                "hover:text-[var(--foreground)]",
                "max-sm:text-sm"
              )}
            >
              Remember me
            </span>
          </label>

          <CardFooter className="flex flex-col gap-4">
            <Button className="relative w-full" disabled={isPending} type="submit">
              Sign In
              {isPending && <Loader2 aria-hidden="true" className="absolute right-4 animate-spin [animation-duration:0.6s]" size={16} />}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span
          className={cn("px-2 font-normal text-[var(--muted-foreground)] text-xs leading-5", "max-sm:text-[0.8125rem]")}
        >
          OR
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          className={cn("relative flex w-full gap-2", "max-sm:min-h-11 max-sm:gap-2.5 max-sm:text-[0.9375rem]")}
          variant="outline"
        >
          <AppleIcon className={cn("-ml-2 h-5 w-5", "max-sm:-ml-1 max-sm:h-[1.125rem] max-sm:w-[1.125rem]")} />
          Apple
        </Button>
        <Button
          className={cn("relative flex w-full gap-2", "max-sm:min-h-11 max-sm:gap-2.5 max-sm:text-[0.9375rem]")}
          variant="outline"
        >
          <GoogleIcon className={cn("h-5 w-5", "max-sm:h-[1.125rem] max-sm:w-[1.125rem]")} />
          Google
          <Badge className={cn("absolute right-3", "max-sm:right-2")} size="sm" variant="info">
            Last used
          </Badge>
        </Button>
      </div>
      <div
        className={cn(
          "-ml-5 -mr-5 -mb-5 -mt-2 w-[calc(100%+40px)] rounded-b-[var(--radius-lg)] bg-[var(--mix-card-35-trans)] py-5 text-center text-sm leading-5",
          "max-sm:-ml-4 max-sm:-mr-4 max-sm:-mb-4 max-sm:w-[calc(100%+2rem)] max-sm:py-4 max-sm:text-[0.9375rem]"
        )}
      >
        <span className="text-[var(--muted-foreground)]">No account? </span>
        <button
          className="cursor-pointer border-none bg-transparent p-0 font-inherit text-[var(--secondary-foreground)] hover:text-[var(--foreground)]"
          type="button"
        >
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
