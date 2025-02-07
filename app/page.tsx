"use client";

import { Header } from "./components/layout/Header";
import IconCards from "./components/layout/IconCards";
import Image from "next/image";
import StyledButton from "./components/action/StyledButton";
import { Translations } from "./context/LanguageContext";
import { useLanguage } from "./context/LanguageContext";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { t, isLoaded } = useLanguage();
  const { theme } = useTheme();

  const [isModalOpen, setModalOpen] = useState(false);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const carImage = theme === "dark" ? "/blackCar.png" : "/yellowCar.png";

  return (
    <section className="h-screen bg-gray-800 dark:bg-yellow-400 text-gray-100 dark:text-gray-900 flex flex-col justify-center items-center">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-700 dark:bg-gray-100 p-6 rounded-lg w-[90%] lg:w-[50%] shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{t("ourLocation")}</h2>
            <p className="mb-4 text-gray-400 dark:text-gray-800">
              Elnio g. 18, Šiauliai, 76281 Šiaulių m. sav.
            </p>
            <div className="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
              {/* Example Google Maps iframe */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.344443309878!2d23.328426988829065!3d55.92606651317965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e5e2e505171a6b%3A0x6bada76356297813!2sGiedrius%20Service!5e0!3m2!1sen!2slt!4v1738883897465!5m2!1sen!2slt" width="100%"
                height="100%"
                allowFullScreen={true}
                loading="lazy"></iframe>

            </div>
            <StyledButton text={t("close" as keyof Translations)} onClick={() => setModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white/20 dark:bg-white/30 backdrop-blur-lg rounded-2xl h-[90%] mx-auto w-[90%] lg:w-[95%] flex flex-col justify-between items-center">
        <Header setModalOpen={setModalOpen} />

        {/* Texts and Image */}
        <div className="flex flex-row-reverse w-[90%] lg:w-[60%]">
          <div className="text-center lg:text-left">
            <p className="italic text-gray-400 dark:text-gray-600">{t("subheadline")}</p>
            <h1 className="text-4xl md:text-5xl font-black my-4">{t("headline")}</h1>
            <p className="text-lg text-gray-300 dark:text-gray-700">{t("description")}</p>
            <StyledButton text={t("reserveNow" as keyof Translations)} onClick={() => setModalOpen(true)} />
          </div>

          {/* Car Image */}
          <div className="flex justify-center w-full lg:ml-[100]">
            <Image
              src={carImage}
              alt={t("openGraph.image_alt" as keyof Translations)}
              width={800}
              height={600}
              className="rounded-lg w-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
              priority
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
