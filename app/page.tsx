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
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoCall } from "react-icons/io5";

const WORKSHOP_PHONE = "+37061234567";
const WORKSHOP_PHONE_LABEL = "+370 612 34567";
const WORKSHOP_ADDRESS = "Elnio g. 18, Šiauliai, 76281 Šiaulių m. sav";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Elnio g. 18, Šiauliai, 76281"
)}&travelmode=driving`;

export default function Home() {
  const { t, isLoaded } = useLanguage();
  const { theme } = useTheme();

  const [isServicesPage, setIsServicesPage] = useState(false);
  const [activeModal, setActiveModal] = useState<"location" | "contact" | null>(null);

  useEffect(() => {
    if (!activeModal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeModal]);

  if (!isLoaded) {
    return <div className="flex h-dvh items-center justify-center">Loading...</div>;
  }

  const carImage = theme === "dark" ? "/blackCar.webp" : "/yellowCar.webp";
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <DynamicMetadata />
      <section className="flex h-dvh flex-col overflow-hidden bg-darkGradient p-3 pb-0 text-gray-100 dark:bg-yellowGradient dark:text-gray-900 sm:p-4 lg:p-5 lg:pb-0">
        {activeModal === "location" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="location-title"
              className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-neutral-900 p-5 text-white shadow-2xl dark:bg-white dark:text-neutral-900 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="location-title" className="text-2xl font-bold">
                {t("location")}
              </h2>
              <p className="mt-2 text-gray-300 dark:text-gray-700">{WORKSHOP_ADDRESS}</p>
              <div className="mt-4 h-56 overflow-hidden rounded-2xl bg-gray-200 sm:h-64">
                <iframe
                  title={t("location")}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.344443309878!2d23.328426988829065!3d55.92606651317965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e5e2e505171a6b%3A0x6bada76356297813!2sGiedrius%20Service!5e0!3m2!1sen!2slt!4v1738883897465!5m2!1sen!2slt"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <StyledButton compact href={DIRECTIONS_URL} text={t("directions" as keyof Translations)} />
                <StyledButton compact variant="secondary" text={t("close" as keyof Translations)} onClick={closeModal} />
              </div>
            </div>
          </div>
        )}

        {activeModal === "contact" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              className="w-full max-w-md rounded-3xl bg-neutral-900 p-5 text-white shadow-2xl dark:bg-white dark:text-neutral-900 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="contact-title" className="text-2xl font-bold">
                {t("contactUs")}
              </h2>
              <a
                href={`tel:${WORKSHOP_PHONE}`}
                className="mt-5 flex items-center gap-3 rounded-2xl transition hover:opacity-80"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black">
                  <IoCall size={22} aria-hidden />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {t("phone")}
                  </span>
                  <span className="text-lg font-semibold">{WORKSHOP_PHONE_LABEL}</span>
                </span>
              </a>
              <p className="mt-4 text-sm text-gray-300 dark:text-gray-700">
                <strong>{t("workingHours")}: </strong>
                {t("monFri")}: 08:00 - 18:00
              </p>
              <p className="mt-2 text-sm text-gray-300 dark:text-gray-700">
                <strong>{t("address")}: </strong>
                {WORKSHOP_ADDRESS}
              </p>
              <div className="mt-5">
                <StyledButton compact variant="secondary" text={t("close" as keyof Translations)} onClick={closeModal} />
              </div>
            </div>
          </div>
        )}

        <div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 px-3 pt-3 dark:border-black/10 dark:bg-white/25 lg:px-5 lg:pt-4">
          <Header
            setLocationModalOpen={() => setActiveModal("location")}
            setContactModalOpen={() => setActiveModal("contact")}
            onLogoClick={() => setIsServicesPage(false)}
            onServicesClick={() => setIsServicesPage(true)}
            wide={isServicesPage}
          />
          <main
            className={`flex min-h-0 w-full flex-1 flex-col items-center ${
              isServicesPage ? "max-w-6xl overflow-y-auto py-4" : "overflow-hidden py-3 lg:w-[68%]"
            }`}
          >
            {isServicesPage ? (
              <div className="w-full pb-6 text-center">
                <h1 className="text-3xl font-extrabold text-gray-100 dark:text-gray-800 md:text-5xl">
                  {t("servicesPageTitle")}
                </h1>
                <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 dark:text-gray-600 md:text-lg">
                  {t("servicesPageSubtitle")}
                </p>
                <div className="mt-6">
                  <ServiceCards />
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-0 w-full flex-col-reverse gap-2 lg:flex-row lg:gap-8">
                <div className="flex shrink-0 flex-col justify-center lg:w-[46%]">
                  <p className="text-sm text-gray-400 dark:text-gray-600 lg:text-base">{t("subheadline")}</p>
                  <h1 className="my-2 text-3xl font-black leading-[0.95] sm:text-4xl lg:my-3 lg:text-5xl xl:text-6xl">
                    {t("headline")}
                  </h1>
                  <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-700 lg:text-base">
                    {t("description")}
                  </p>
                  <StyledButton
                    text={t("reserveNow" as keyof Translations)}
                    onClick={() => setActiveModal("contact")}
                  />
                </div>
                <div className="relative min-h-0 w-full flex-1">
                  <Image
                    src={carImage}
                    alt={t("openGraph.image_alt" as keyof Translations)}
                    fill
                    sizes="(min-width: 1024px) 36vw, 90vw"
                    className="object-contain object-center"
                    priority
                  />
                </div>
              </div>
            )}
          </main>
          {!isServicesPage && (
            <div className="w-full shrink-0 border-t border-white/10 dark:border-black/10">
              <IconCards onOpenServices={() => setIsServicesPage(true)} />
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
}
