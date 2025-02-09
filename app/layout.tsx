import "./globals.css";

import { LanguageProvider } from "./context/LanguageContext";
import ThemeWrapper from "./components/layout/ThemeWrapper";
import { dir } from "i18next";
import enData from "@/public/locales/en.json";
import ltData from "@/public/locales/lt.json";

interface TranslationData {
  title: string;
  description: string;
  keywords: {
    car_repair: string;
    auto_care: string;
    vehicle_service: string;
    mechanic: string;
    car_maintenance: string;
  };
}

// ✅ Ensure correct typing of `generateMetadata`
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const language = params?.locale || "en"; // Fallback to "en"
  const translations: TranslationData = (language === "lt" ? ltData : enData) as TranslationData;

  return {
    title: translations.title,
    description: translations.description,
    keywords: Object.values(translations.keywords),
  };
}

// ✅ Fix `params` issue
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale: string }; // Make `params` optional
}) {
  const locale = params?.locale || "en"; // Default to "en" if `params` is undefined

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <ThemeWrapper>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
