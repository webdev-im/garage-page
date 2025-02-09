import "./globals.css";

import { LanguageProvider } from "./context/LanguageContext";
import { Metadata } from "next";
import ThemeWrapper from "./components/layout/ThemeWrapper";
import { dir } from "i18next";
import enData from "@/public/locales/en.json";
import ltData from "@/public/locales/lt.json";

// ✅ Define a strict type for translations
interface TranslationData {
  title: string;
  headline: string;
  subheadline: string;
  description: string;
  cta: string;
  contact: string;
  services: string;
  map: string;
  keywords: {
    car_repair: string;
    auto_care: string;
    vehicle_service: string;
    mechanic: string;
    car_maintenance: string;
  };
  openGraph: {
    description: string;
    image_alt: string;
  };
  twitter: {
    description: string;
  };
  icons: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

// ✅ Ensure correct type for `params`
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const language = params?.locale || "en";

  const translations: TranslationData = (language === "lt" ? ltData : enData) as TranslationData;

  return {
    title: translations.title,
    description: translations.description,
    keywords: Object.values(translations.keywords),
  };
}

// ✅ Fix potential async issue with params
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  // ✅ Ensure params is resolved if it's a promise
  const resolvedParams = params instanceof Promise ? { locale: "en" } : params;

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
