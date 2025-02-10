"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import en from "../locales/en.json";
import lt from "../locales/lt.json";

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
  location: string;
  ourLocation: string;
  close: string;
  reserveNow: string;
  contactUs: string;
  address: string;
  workingHours: string;
  monFri: string;
  phone: string;
  servicesPageTitle: string;
  servicesPageSubtitle: string;
  servicesPageSlogan: string;
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
  };
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
  location: data.location ?? "Location",
  ourLocation: data.map ?? "Our location",
  close: data.close ?? "Close",
  reserveNow: data.reserveNow ?? "Reserve now",
  contactUs: data.contactUs ?? "Contact us",
  address: data.address ?? "Address",
  workingHours: data.workingHours ?? "Working hours",
  monFri: data.monFri ?? "Mon - Fri",
  phone: data.phone ?? "Phone",
  servicesPageTitle: data.servicesPageTitle ?? "Explore our services",
  servicesPageSubtitle:
    data.servicesPageSubtitle ??
    "Quality care for your vehicle, driven by expertise and precision",
  servicesPageSlogan:
    data.servicesPageSlogan ??
    "Your car deserves the best – and we deliver it",
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

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "lt";
    }
    return "lt"; // Default language
  });

  const [translations, setTranslations] = useState<Translations>(() =>
    getSafeTranslations(language === "lt" ? lt : en)
  );

  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Load stored language once when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language") as Language;
      if (storedLang && storedLang !== language) {
        setLanguage(storedLang);
      }
      setIsLoaded(true);
    }
  }, []); // ✅ Runs only on mount

  // ✅ Update translations when language changes
  useEffect(() => {
    if (isLoaded) {
      setTranslations(getSafeTranslations(language === "lt" ? lt : en));
      localStorage.setItem("language", language);
    }
  }, [language, isLoaded]); // ✅ Prevents updates before load

  // ✅ Translation function (no infinite loops)
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations;

    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`⚠ Missing translation key: "${key}"`);
        return key;
      }
    }

    return typeof value === "string" ? value.trim() : key;
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
