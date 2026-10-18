"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { messages, type Locale, type Messages } from "@/i18n/messages";
export { fill } from "@/i18n/format";

type ContextValue = { locale: Locale; t: Messages; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<ContextValue | null>(null);

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: React.ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(initialLocale);
  const value = useMemo<ContextValue>(() => ({
    locale,
    t: messages[locale],
    setLocale(nextLocale) {
      document.cookie = `tamyr_locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
      updateLocale(nextLocale);
      window.location.reload();
    },
  }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("LocaleProvider is missing");
  return context;
}

