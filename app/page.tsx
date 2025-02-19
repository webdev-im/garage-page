"use client";

import DynamicMetadata from "./components/action/DynamicMetadata";
import Footer from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import IconCards from "./components/layout/IconCards";
import Image from "next/image";
import ServiceCards from "./components/layout/ServiceCards";
import StyledButton from "./components/action/StyledButton";
import { Translations } from "./context/LanguageContext";
import { useLanguage } from "./context/LanguageContext";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { t, isLoaded } = useLanguage();
  const { theme } = useTheme();

  const [isServicesPage, setIsServicesPage] = useState(false);
  const [activeModal, setActiveModal] = useState<"location" | "contact" | null>(null);

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const carImage = theme === "dark" ? "/blackCar.png" : "/yellowCar.png";

  return (
    <>   <DynamicMetadata />
      <section className="min-h-screen flex flex-col bg-darkGradient dark:bg-yellowGradient text-gray-100 dark:text-gray-900 p-5 pb-0 lg:p-9 lg:pb-0">
        {/* Location Modal */}
        {activeModal === "location" && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="bg-gray-700 dark:bg-gray-100 p-6 rounded-lg w-[90%] lg:w-[50%] shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 mb-10 lg:mb-10">{t("location")}</h2>
              <p className="mb-4 text-gray-400 dark:text-gray-800">
                Elnio g. 18, Šiauliai, 76281 Šiaulių m. sav
              </p>
              <div className="w-full h-64 bg-gray-200 rounded-md overflow-hidden mb-10 lg:mb-5" >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.344443309878!2d23.328426988829065!3d55.92606651317965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e5e2e505171a6b%3A0x6bada76356297813!2sGiedrius%20Service!5e0!3m2!1sen!2slt!4v1738883897465!5m2!1sen!2slt"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <StyledButton text={t("close" as keyof Translations)} onClick={() => setActiveModal(null)} />
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {activeModal === "contact" && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="bg-gray-700 dark:bg-gray-100 p-4 lg:p-6 rounded-lg w-[90%] lg:w-[40%] shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 mb-10 ">{t("contactUs")}</h2>
              <p className="text-gray-300 dark:text-gray-800 mb-2">
                <strong>{t("phone")}: </strong>
                <a href="tel:+37061234567" className="text-yellow-400 dark:text-yellow-500 hover:underline">
                  +370 612 34567
                </a>
              </p>
              <p className="text-gray-300 dark:text-gray-800 mb-2 text-sm lg:text-base">
                <strong>{t("workingHours")}: </strong>
                {t("monFri")}: 08:00 - 18:00
              </p>
              <p className="text-gray-300 dark:text-gray-800 text-sm lg:text-base mb-10 lg:mb-5">
                <strong>{t("address")}: </strong> Elnio g. 18, Šiauliai, 76281 Šiaulių m. sav
              </p>
              <StyledButton text={t("close" as keyof Translations)} onClick={() => setActiveModal(null)} />
            </div>
          </div>
        )}


        <div className=" flex-grow min-h-full flex-grow w-full bg-white/10 dark:bg-white/30 rounded-xl flex flex-col border-2 border-transparent items-center
            animate-[pulseGlow_1.5s_ease-in-out_infinite] dark:animate-[darkPulseGlow_1.5s_ease-in-out_infinite]">






          {/* Header */}
          <Header
            setLocationModalOpen={() => setActiveModal("location")}
            setContactModalOpen={() => setActiveModal("contact")}
            onLogoClick={() => setIsServicesPage(false)}
            onServicesClick={() => setIsServicesPage(true)}
          />
          <main className="flex-grow flex flex-col justify-center items-center w-[100%] lg:w-[60%] py-8 px-4 lg:px-0" >
            {isServicesPage ? (
              <div className="text-center w-full lg:my-20 mt-5" >
                <div className="text-center my-8">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100 dark:text-gray-800">
                    {t("servicesPageTitle")}
                  </h1>
                  <p className="mt-4 text-lg md:text-xl text-gray-300 dark:text-gray-600 max-w-2xl mx-auto">
                    {t("servicesPageSubtitle")}
                  </p>
                  <p className="mt-2 italic text-sm md:text-lg text-gray-400 dark:text-gray-500">
                    {t("servicesPageSlogan")}
                  </p>
                </div>
                <ServiceCards />
              </div>
            ) : (
              <div className="flex flex-col-reverse lg:flex-row w-full max-w-5xl xl:max-w-screen-xl 2xl:max-w-screen-2xl gap-8 xl:gap-12 2xl:gap-16 mt-5 ">
                {/* Left Side: Text Content */}
                <div className="text-left lg:w-1/2">
                  <p className="italic text-gray-400 dark:text-gray-600 text-lg 2xl:text-xl">
                    {t("subheadline")}
                  </p>
                  <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-black my-4">
                    {t("headline")}
                  </h1>
                  <p className="text-lg 2xl:text-xl text-gray-300 dark:text-gray-700 lg:mb-6">
                    {t("description")}
                  </p>
                  <StyledButton
                    text={t("reserveNow" as keyof Translations)}
                    onClick={() => setActiveModal("contact")}
                  />
                </div>

                {/* Right Side: Image */}
                <div className="flex justify-center w-full lg:w-1/2 my-[100] lg:my-0">
                  <Image
                    src={carImage}
                    alt={t("openGraph.image_alt" as keyof Translations)}
                    width={1000}
                    height={750}
                    className="rounded-lg object-contain w-full lg:w-[120%] 2xl:w-[95%] 2xl:max-w-[1000px] h-auto"
                    priority
                  />
                </div>
              </div>


            )}
          </main>
          {/* Footer */}
          {!isServicesPage && (
            <footer className="bg-white/20 dark:bg-white/40 w-full py-1 mt-10 rounded-xl">
              <IconCards />
            </footer>
          )}</div>
        <Footer />
      </section></>
  );
}
