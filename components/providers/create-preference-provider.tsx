"use client";

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { useIsoLayoutEffect } from "@/hooks/use-iso-layout-effect";

type PreferenceContextType<T extends string> = {
  value: T;
  setValue: (value: T) => void;
};

type PreferenceProviderProps<T extends string> = {
  children: ReactNode;
  defaultValue: T;
};

type CreatePreferenceProviderOptions<T extends string> = {
  storageKey: string;
  validValues: readonly T[];
  dataAttribute: string;
};

export function createPreferenceProvider<T extends string>(options: CreatePreferenceProviderOptions<T>) {
  const { storageKey, validValues, dataAttribute } = options;
  const Context = createContext<PreferenceContextType<T> | undefined>(undefined);

  function Provider({ children, defaultValue }: PreferenceProviderProps<T>) {
    const [value, setValueState] = useState<T>(defaultValue);

    const setValue = useCallback((newValue: T) => {
      document.documentElement.setAttribute(dataAttribute, newValue);
      setValueState(newValue);
      localStorage.setItem(storageKey, newValue);
    }, []);

    useIsoLayoutEffect(() => {
      const saved = localStorage.getItem(storageKey);
      if (saved && validValues.includes(saved as T)) {
        setValueState(saved as T);
      }
    }, []);

    useIsoLayoutEffect(() => {
      document.documentElement.setAttribute(dataAttribute, value);
    }, [value]);

    const contextValue = useMemo(() => ({ value, setValue }), [value, setValue]);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }

  function usePreference() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(`usePreference must be used within a Provider (storageKey: ${storageKey})`);
    }
    return context;
  }

  return { Provider, usePreference };
}
