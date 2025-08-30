export function cn<TState = Record<string, unknown>>(
  ...inputs: (string | undefined | null | false | (() => string) | ((state: TState) => string))[]
) {
  return inputs.filter(Boolean).join(" ");
}
