import "./globals.css";

import { LanguageProvider } from "./context/LanguageContext";
import { Metadata } from "next";
import ThemeWrapper from "./components/layout/ThemeWrapper"; // ✅ Import ThemeWrapper
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

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const language = params.locale || "en";


  const translations: TranslationData = (language === "lt" ? ltData : enData) as TranslationData;

  return {
    title: translations.title,
    description: translations.description,
    keywords: Object.values(translations.keywords),
    openGraph: {
      title: translations.title,
      description: translations.openGraph.description,
      url: `https://yourwebsite.com/${language}`,
      type: "website",
      images: [
        {
          url: "/car.png",
          width: 1200,
          height: 630,
          alt: translations.openGraph.image_alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourtwitterhandle",
      title: translations.title,
      description: translations.twitter.description,
      images: ["/car.png"],
    },
  };
}



export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale} dir={dir(params.locale)}>
      <body>
        <ThemeWrapper> {/* ✅ Ensures theme is applied only on client */}
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
