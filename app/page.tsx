"use client";

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

  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false); // ✅ Added missing state
  const [isServicesPage, setIsServicesPage] = useState(false); // State to toggle between layouts
  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const carImage = theme === "dark" ? "/blackCar.png" : "/yellowCar.png";

  return (
    <section className="h-screen bg-gray-800 dark:bg-yellow-400 text-gray-100 dark:text-gray-900 flex flex-col justify-center items-center">
      {/* Location Modal */}
      {isLocationModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setLocationModalOpen(false)}
        >
          <div
            className="bg-gray-700 dark:bg-gray-100 p-6 rounded-lg w-[90%] lg:w-[50%] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{t("location")}</h2>
            <p className="mb-4 text-gray-400 dark:text-gray-800">
              Elnio g. 18, Šiauliai, 76281 Šiaulių m. sav
            </p>
            <div className="w-full h-64 bg-gray-200 rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.344443309878!2d23.328426988829065!3d55.92606651317965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e5e2e505171a6b%3A0x6bada76356297813!2sGiedrius%20Service!5e0!3m2!1sen!2slt!4v1738883897465!5m2!1sen!2slt"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <StyledButton text={t("close" as keyof Translations)} onClick={() => setLocationModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (

        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setContactModalOpen(false)}
        >

          <div
            className="bg-gray-700 dark:bg-gray-100 p-6 rounded-lg w-[90%] lg:w-[40%] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">{t("contactUs")}</h2>
            <p className="text-gray-400 dark:text-gray-800 mb-2">
              <strong>{t("phone")}: </strong>
              <a href="tel:+37061234567" className="text-yellow-400 hover:underline">
                +370 612 34567
              </a>
            </p>
            <p className="text-gray-400 dark:text-gray-800 mb-2">
              <strong>{t("workingHours")}: </strong> {t("monFri")}: 08:00 - 18:00
            </p>
            <p className="text-gray-400 dark:text-gray-800">
              <strong>{t("address")}: </strong> Elnio g. 18, Šiauliai, 76281 Šiaulių m. sav
            </p>
            <StyledButton text={t("close" as keyof Translations)} onClick={() => setContactModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content with Animated Pulsating Border */}
      <div className="relative bg-white/20 dark:bg-white/30 backdrop-blur-lg rounded-2xl h-[95%] lg:h-[90%]mx-auto w-[90%] lg:w-[95%] flex flex-col justify-between items-center border-4 border-transparent animate-pulse-border">
        {/* ✅ Fixed: Passing the correct modal state functions */}
        <Header
          setLocationModalOpen={setLocationModalOpen}
          setContactModalOpen={setContactModalOpen}
          onLogoClick={() => setIsServicesPage(false)} // Show default layout
          onServicesClick={() => setIsServicesPage(true)} // Show services layout
        />
        {/* Services page */}
        {isServicesPage ? <div className="text-center">
          <div className="text-center my-8">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-100 dark:text-gray-800">
              {t("servicesPageTitle")}
            </h1>
            {/* Subtitle */}
            <p className="mt-4 text-lg md:text-xl text-gray-300 dark:text-gray-600 max-w-2xl mx-auto">
              {t("servicesPageSubtitle")}
            </p>
            {/* Slogan */}
            <p className="mt-2 italic text-sm md:text-lg text-gray-400 dark:text-gray-500">
              {t("servicesPageSlogan")}
            </p>
          </div>
          <ServiceCards />
        </div> : <>

          {/* Texts and Image */}
          <div className="flex flex-col-reverse lg:flex-row-reverse w-[90%] lg:w-[60%] mt-[40] mb-[40]">
            <div className="text-left mt-[20]">
              <p className="italic text-gray-400 dark:text-gray-600">{t("subheadline")}</p>
              <h1 className="text-4xl md:text-5xl font-black my-4 mb-6">{t("headline")}</h1>
              <p className="text-lg text-gray-300 dark:text-gray-700">{t("description")}</p>
              <StyledButton text={t("reserveNow" as keyof Translations)} onClick={() => setContactModalOpen(true)} />
            </div>

            {/* Car Image - Fixed Aspect Ratio & Prevented Distortion */}
            <div className="flex justify-center w-full lg:ml-[100]">
              <Image
                src={carImage}
                alt={t("openGraph.image_alt" as keyof Translations)}
                width={800}
                height={600}
                className="rounded-lg object-contain max-w-full h-auto"
                priority
              />
            </div>
          </div></>}


        {!isServicesPage && <footer className="bg-white/30 dark:bg-white/30 w-[100%] rounded-2xl mt-[20]" >
          <IconCards />
        </footer>}
        {isServicesPage && <div className="h-10"></div>}

      </div>

      {/* Tailwind Keyframes */}
      <style jsx global>{`
        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 10px rgba(255, 255, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 0, 0.7);
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 0, 0.3);
          }
        }

        .animate-pulse-border {
          animation: pulse-border 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
