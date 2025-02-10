import "./globals.css";

import { LanguageProvider } from "./context/LanguageContext";
import { ReactNode } from "react";
import ThemeWrapper from "./components/layout/ThemeWrapper";
import { dir } from "i18next";
import enData from "../public/locales/en.json";
import ltData from "../public/locales/lt.json";

// ✅ Define a strict type for translations
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

interface LayoutProps {
  children: ReactNode;
  params: { locale: string }; // ✅ Ensure `params` is always an object
}

// ✅ Fix: Ensure `translations` has the correct type
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const language = params.locale || "en"; // Default to "en"

  const translations: TranslationData =
    language === "lt" ? (ltData as TranslationData) : (enData as TranslationData);

  return {
    title: translations.title,
    description: translations.description,
    keywords: Object.values(translations.keywords),
  };
}


export default async function RootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params; // ✅ Await the Promise

  return (
    <html lang={resolvedParams.locale} dir={dir(resolvedParams.locale)}>
      <body>
        <ThemeWrapper>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}


