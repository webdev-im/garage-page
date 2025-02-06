"use client";

import { Header } from "./components/layout/Header";
import IconCards from "./components/layout/IconCards";
import Image from "next/image";
import StyledButton from "./components/action/StyledButton";
import { Translations } from "./context/LanguageContext";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { t, isLoaded } = useLanguage();

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <section className="h-screen bg-gray-800 dark:bg-yellow-400 text-gray-100 dark:text-gray-900 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-between mt-32 lg:mt-24">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 w-11/12 md:w-3/5 lg:w-8/10 mx-auto">
          <div className="text-center lg:text-left">
            <p className="italic text-gray-400 dark:text-gray-600">{t("subheadline")}</p>
            <h1 className="text-4xl md:text-5xl font-bold my-4">
              {t("headline")} <span className="block">{t("cta")}</span>
            </h1>
            <p className="text-lg text-gray-300 dark:text-gray-700">{t("description")}</p>
            <StyledButton text={t('cta')} />
          </div>

          <div className="flex justify-center">
            <Image
              src="/car.png"
              alt={t("openGraph.image_alt" as keyof Translations)} // ✅ Type assertion fix
              width={800}
              height={500}
              className="rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
            />
          </div>
        </div>

        <footer className="bg-gray-700 dark:bg-yellow-300 p-6 rounded-t-xl shadow-inner">
          <IconCards />
        </footer>
      </div>
    </section>
  );
}
