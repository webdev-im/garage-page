import "./globals.css";

import { LanguageProvider } from "./context/LanguageContext";
import type { Metadata } from "next";
import ThemeWrapper from "./components/layout/ThemeWrapper";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  const translations =
    locale === "lt"
      ? (await import("./locales/lt.json")).default
      : (await import("./locales/en.json")).default;

  return {
    title: translations.title || "Default Title",
    description: translations.description || "Default Description",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    <html lang={locale}>
      <body>
        <ThemeWrapper>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
