"use client";

import { Header } from "./components/layout/Header";
import IconCards from "./components/layout/IconCards";
import Image from "next/image";
import StyledButton from "./components/action/StyledButton";
import { Translations } from "./context/LanguageContext";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "next-themes"; // ⬅️ Theme detection

export default function Home() {
  const { t, isLoaded } = useLanguage();
  const { theme } = useTheme(); // ⬅️ Get current theme

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Select image based on theme
  const carImage = theme === "dark" ? "/blackCar.png" : "/yellowCar.png";

  return (
    <section className="h-screen bg-gray-800 dark:bg-yellow-400 text-gray-100 dark:text-gray-900 flex flex-col justify-center aling-center">
      <div className="bg-white/20 dark:bg-white/30 backdrop-blur-lg rounded-2xl h-[90%] mx-auto w-[90%] lg:w-[95%] flex flex-col justify-between items-center ">
        <Header />
        {/* texts and image */}


        {/* texts and image*/}
        <div className="flex flex-row-reverse w-[90%] lg:w-[60%] ">
          <div className="text-center lg:text-left">
            <p className="italic text-gray-400 dark:text-gray-600">{t("subheadline")}</p>
            <h1 className="text-4xl md:text-5xl font-black my-4">
              {t("headline")}
            </h1>
            <p className="text-lg text-gray-300 dark:text-gray-700">{t("description")}</p>

            {/* Increased gap on desktop */}
            <StyledButton text={t("cta")} />
          </div>

          {/* ✅ Ensuring Larger Image */}
          <div className="flex justify-center w-full lg:ml-[100]">
            <Image
              src={carImage} // ⬅️ Dynamic Image
              alt={t("openGraph.image_alt" as keyof Translations)}
              width={800} // ⬆️ Larger width
              height={600} // ⬆️ Larger height
              className="rounded-lg w-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
              priority // ⬅️ Ensures fast loading
            />
          </div>
        </div>

        <footer className="bg-white/30 dark:bg-white/30 w-[100%] rounded-2xl">
          <IconCards />
        </footer>
      </div>
    </section>
  );
}
