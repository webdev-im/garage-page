"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import en from "@/public/locales/en.json";
import lt from "@/public/locales/lt.json";

type Language = "en" | "lt";

export interface Translations {
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
    title?: string;
    description: string;
    image?: string;
    image_alt: string;
  };
  twitter: {
    title?: string;
    description: string;
  };
  icons: {
    [key: string]: {
      name: string;
      description: string;
    };
  },
}

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  isLoaded: boolean;
}

// ✅ Safe loading of translations
const getSafeTranslations = (data: Partial<Translations>): Translations => ({
  title: data.title ?? "Default Title",
  headline: data.headline ?? "Default Headline",
  subheadline: data.subheadline ?? "Default Subheadline",
  description: data.description ?? "Default Description",
  cta: data.cta ?? "Click Here",
  contact: data.contact ?? "Contact Us",
  services: data.services ?? "Our Services",
  map: data.map ?? "Find Us",
  keywords: {
    car_repair: data.keywords?.car_repair ?? "Car Repair",
    auto_care: data.keywords?.auto_care ?? "Auto Care",
    vehicle_service: data.keywords?.vehicle_service ?? "Vehicle Service",
    mechanic: data.keywords?.mechanic ?? "Mechanic",
    car_maintenance: data.keywords?.car_maintenance ?? "Car Maintenance",
  },
  openGraph: {
    title: data.openGraph?.title ?? "Default OG Title",
    description: data.openGraph?.description ?? "Default OG Description",
    image: data.openGraph?.image ?? "/default-og.jpg",
    image_alt: data.openGraph?.image_alt ?? "Default OG Image",
  },
  twitter: {
    title: data.twitter?.title ?? "Default Twitter Title",
    description: data.twitter?.description ?? "Default Twitter Description",
  },
  icons: data.icons ?? {}, // Ensure icons always exist
});

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "lt";
    }
    return "en";
  });

  const [translations, setTranslations] = useState<Translations>(() => 
    getSafeTranslations(typeof window !== "undefined" && localStorage.getItem("language") === "lt" ? lt : en)
  );
  
  

  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Load stored language when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language") as Language;
      if (storedLang && storedLang !== language) {
        setLanguage(storedLang);
      }
      setIsLoaded(true);
    }
  }, []);

  // ✅ Update translations when language changes
  useEffect(() => {
    setTranslations(getSafeTranslations(language === "lt" ? lt : en));
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split("."); // ✅ Splits `openGraph.image_alt` into `["openGraph", "image_alt"]`
    let value: unknown = translations;
  
    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k]; // ✅ Navigate through nested object
      } else {
        return key; // ✅ Return key as fallback if not found
      }
    }
  
    return typeof value === "string" ? value : key;
  };
  
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
