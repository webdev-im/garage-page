"use client";

import { setCookie } from "cookies-next";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const isLithuanian = language === "lt";

  const toggleLanguage = () => {
    const newLanguage = isLithuanian ? "en" : "lt";
    setLanguage(newLanguage);
    setCookie("NEXT_LOCALE", newLanguage, { path: "/" });
  };

  return (
    <label htmlFor="LanguageSwitcher" className="relative inline-block h-9 w-[4.5rem] cursor-pointer rounded-full bg-neutral-300 transition-colors dark:bg-neutral-800 dark:ring-1 dark:ring-white/15">
      <input type="checkbox" id="LanguageSwitcher" checked={isLithuanian} onChange={toggleLanguage} className="peer sr-only" />
      <span className="absolute left-0.5 top-0.5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-neutral-950 shadow-sm transition-transform peer-checked:translate-x-9">
        {isLithuanian ? "LT" : "EN"}
      </span>
      <div className="absolute inset-0 flex items-center justify-between px-2 text-sm font-medium">
        <span className={isLithuanian ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-700 dark:text-neutral-200"}>EN</span>
        <span className={isLithuanian ? "text-neutral-700 dark:text-neutral-200" : "text-neutral-400 dark:text-neutral-500"}>LT</span>
      </div>
    </label>
  );
}
