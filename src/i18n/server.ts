import { cookies } from "next/headers";
import { messages, type Locale } from "@/i18n/messages";

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("tamyr_locale")?.value;
  return value === "ru" ? "ru" : "kz";
}

export async function getServerMessages() {
  const locale = await getLocale();
  return { locale, t: messages[locale] };
}
