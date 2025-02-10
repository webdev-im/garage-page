import "./globals.css";

import { LanguageProvider } from "./context/LanguageContext";
import type { Metadata } from "next";
import ThemeWrapper from "./components/layout/ThemeWrapper";
import { cookies } from "next/headers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}


// ✅ `generateMetadata` now awaits `cookies()` properly
export async function generateMetadata(): Promise<Metadata> {
  const cookiesList = await cookies(); // ✅ Await the promise
  const locale = cookiesList.get("NEXT_LOCALE")?.value || "en"; // ✅ Get locale safely

  const translations =
    locale === "lt"
      ? (await import("./locales/lt.json")).default
      : (await import("./locales/en.json")).default;

  return {
    title: translations.title,
    description: translations.description,
    keywords: Object.values(translations.keywords),
  };
}
