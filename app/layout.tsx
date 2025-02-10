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

export const dynamic = "force-dynamic"; // ✅ Forces metadata to update on every request
export const revalidate = 0; // ✅ Disables caching


export async function generateMetadata(): Promise<Metadata> {
  "use server"; // ✅ Ensure this runs on the server

  const cookieStore = await cookies(); // ✅ Await the cookies
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"; // ✅ Get locale safely

  console.log("📌 Metadata Locale:", locale); // Debugging - Check in server logs

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

