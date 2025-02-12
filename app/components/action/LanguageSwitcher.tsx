"use client";

import { setCookie } from "cookies-next"; // ✅ Ensure cookies update dynamically
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const isLithuanian = language === "lt";

  const toggleLanguage = () => {
    const newLanguage = isLithuanian ? "en" : "lt";
    setLanguage(newLanguage);
    setCookie("NEXT_LOCALE", newLanguage, { path: "/" }); // ✅ Ensure server receives update
  };

  return (
    <label
      htmlFor="LanguageSwitcher"
      className="relative inline-block h-8 w-16 cursor-pointer rounded-full bg-gray-300 transition"
    >
      <input
        type="checkbox"
        id="LanguageSwitcher"
        checked={isLithuanian}
        onChange={toggleLanguage}
        className="peer sr-only"
      />

      {/* Toggle Ball */}
      <span
        className="absolute inset-y-0 start-0 z-10 m-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 transition-all peer-checked:start-8"
      >
        <span className="text-sm font-bold text-black">{isLithuanian ? "LT" : "EN"}</span>
      </span>

      {/* Opposite Language Inside Background */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <span className={`text-sm font-medium ${isLithuanian ? "text-gray-400" : "text-gray-500"}`}>
          EN
        </span>
        <span className={`text-sm font-medium ${isLithuanian ? "text-gray-500" : "text-gray-400"}`}>
          LT
        </span>
      </div>
    </label>
  );
}
