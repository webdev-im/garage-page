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
import { useEffect, useRef, useState } from "react";
import { IoCall } from "react-icons/io5";

const WORKSHOP_PHONE = "+37061234567";
const WORKSHOP_PHONE_LABEL = "+370 612 34567";
const WORKSHOP_ADDRESS = "Elnio g. 18, Šiauliai, 76281 Šiaulių m. sav";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Elnio g. 18, Šiauliai, 76281"
)}&travelmode=driving`;

type WindStream = { d: string; dur: string; delay: string; warm?: boolean };

function windStreams(
  width: number,
  height: number,
  car: { left: number; right: number; top: number; bottom: number }
): WindStream[] {
  const nose = car.right;
  const tail = car.left;
  const roof = car.top;
  const belly = car.bottom;
  const carW = Math.max(nose - tail, 1);
  const carH = Math.max(belly - roof, 1);

  if (width < 1024) {
    const over = roof - Math.max(8, carH * 0.1);
    const under = belly + Math.max(6, carH * 0.06);
    const specs = [
      { y: Math.max(20, roof - carH * 0.65), wake: null as number | null },
      { y: roof + carH * 0.32, wake: over },
      { y: roof + carH * 0.48, wake: over - carH * 0.14 },
      { y: roof + carH * 0.68, wake: under },
    ];
    return specs.map((spec, index) => {
      const front = nose + carW * 0.05;
      const settle = tail + carW * 0.38;
      const d =
        spec.wake == null
          ? `M ${width + 50} ${spec.y} L ${-50} ${spec.y}`
          : `M ${width + 40} ${spec.y} L ${front + carW * 0.1} ${spec.y} C ${front} ${spec.y}, ${nose - carW * 0.1} ${spec.wake}, ${settle} ${spec.wake} L ${-40} ${spec.wake}`;
      return {
        d,
        dur: `${16 + index * 2.6}s`,
        delay: `${-index * 2.7}s`,
        warm: index === 2,
      };
    });
  }

  const mid = (roof + belly) / 2;
  const levels = [0.08, 0.2, 0.34, 0.46, 0.58, 0.7, 0.86];

  return levels.map((level, index) => {
    const y = height * level;
    const hits = y > roof + 12 && y < belly - 12;
    let d: string;
    if (!hits) {
      d = `M ${width + 180} ${y} L ${-180} ${y}`;
    } else {
      const upper = y < mid;
      const t = upper ? (mid - y) / (mid - roof) : (y - mid) / (belly - mid);
      const wake = upper ? roof - 22 - t * 34 : belly + 18 + t * 30;
      const front = nose + 20;
      d = `M ${width + 180} ${y} L ${front + 130} ${y} C ${front} ${y}, ${nose - 80} ${wake}, ${tail + (nose - tail) * 0.42} ${wake} L ${-180} ${wake}`;
    }
    return {
      d,
      dur: `${18 + index * 2.4}s`,
      delay: `${-index * 3.1}s`,
      warm: index === 3,
    };
  });
}

export default function Home() {
  const { t, isLoaded } = useLanguage();

  const carRef = useRef<HTMLDivElement>(null);
  const [wind, setWind] = useState<{ w: number; h: number; streams: WindStream[] } | null>(null);
  const [isServicesPage, setIsServicesPage] = useState(false);
  const [activeModal, setActiveModal] = useState<"location" | "contact" | null>(null);
  const [modalClosing, setModalClosing] = useState(false);

  useEffect(() => {
    if (isServicesPage) return;
    const car = carRef.current;
    const section = car?.closest("section");
    if (!car || !section) return;

    const measure = () => {
      const bounds = section.getBoundingClientRect();
      const box = car.getBoundingClientRect();
      if (bounds.width < 40 || box.width < 40) return;
      const next = {
        w: bounds.width,
        h: bounds.height,
        streams: windStreams(bounds.width, bounds.height, {
          left: box.left - bounds.left,
          right: box.right - bounds.left,
          top: box.top - bounds.top,
          bottom: box.bottom - bounds.top,
        }),
      };
      setWind((prev) => (prev && prev.w === next.w && prev.h === next.h ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    return () => observer.disconnect();
  }, [isServicesPage, isLoaded]);

  const openModal = (modal: "location" | "contact") => {
    setActiveModal(modal);
    setModalClosing(false);
  };

  const closeModal = () => {
    if (!activeModal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveModal(null);
      setModalClosing(false);
      return;
    }
    setModalClosing(true);
  };

  useEffect(() => {
    if (!activeModal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeModal, modalClosing]);

  useEffect(() => {
    if (!modalClosing) return;
    const timeout = window.setTimeout(() => {
      setActiveModal(null);
      setModalClosing(false);
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [modalClosing]);

  if (!isLoaded) {
    return <div className="flex h-dvh items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <DynamicMetadata />
      <section className="relative flex h-dvh flex-col overflow-hidden bg-[#efe8dc] text-neutral-900 dark:bg-[#121316] dark:text-neutral-100">
        <div className="studio" aria-hidden>
          <div className="studio-light" />
          {wind && !isServicesPage && (
            <svg className="wind-field" viewBox={`0 0 ${wind.w} ${wind.h}`} preserveAspectRatio="none" aria-hidden>
              {wind.streams.map((stream, index) => (
                <g key={index}>
                  <path className="ghost" d={stream.d} pathLength={1000} />
                  <path
                    className={stream.warm ? "flow warm" : "flow"}
                    d={stream.d}
                    pathLength={1000}
                    style={{ animationDuration: stream.dur, animationDelay: stream.delay }}
                  />
                </g>
              ))}
            </svg>
          )}
          <div className="studio-vignette" />
          <div className="grain" />
        </div>
        {activeModal === "location" && (
          <div
            className={`modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm ${modalClosing ? "is-closing" : ""}`}
            onClick={closeModal}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="location-title"
              className={`modal-panel max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 text-neutral-900 shadow-2xl dark:bg-neutral-900 dark:text-white sm:p-6 ${modalClosing ? "is-closing" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="location-title" className="text-2xl font-bold">
                {t("location")}
              </h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">{WORKSHOP_ADDRESS}</p>
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
            className={`modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm ${modalClosing ? "is-closing" : ""}`}
            onClick={closeModal}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              className={`modal-panel w-full max-w-md rounded-3xl bg-white p-5 text-neutral-900 shadow-2xl dark:bg-neutral-900 dark:text-white sm:p-6 ${modalClosing ? "is-closing" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="contact-title" className="text-2xl font-bold">
                {t("contactUs")}
              </h2>
              <a
                href={`tel:${WORKSHOP_PHONE}`}
                className="mt-5 flex items-center gap-3 rounded-2xl transition hover:opacity-80"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950">
                  <IoCall size={22} aria-hidden />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-neutral-500">
                    {t("phone")}
                  </span>
                  <span className="text-lg font-semibold">{WORKSHOP_PHONE_LABEL}</span>
                </span>
              </a>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
                <strong>{t("workingHours")}: </strong>
                {t("monFri")}: 08:00 - 18:00
              </p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                <strong>{t("address")}: </strong>
                {WORKSHOP_ADDRESS}
              </p>
              <div className="mt-5">
                <StyledButton compact variant="secondary" text={t("close" as keyof Translations)} onClick={closeModal} />
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 sm:px-6">
          <Header
            setLocationModalOpen={() => openModal("location")}
            setContactModalOpen={() => openModal("contact")}
            onLogoClick={() => setIsServicesPage(false)}
            onServicesClick={() => setIsServicesPage(true)}
          />
          <main className={`min-h-0 w-full flex-1 ${isServicesPage ? "overflow-y-auto py-8" : "overflow-hidden"}`}>
            {isServicesPage ? (
              <div key="services" className="content-enter w-full pb-8 text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                  {t("services")}
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 dark:text-white md:text-5xl">
                  {t("servicesPageTitle")}
                </h1>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-base">
                  {t("servicesPageSubtitle")}
                </p>
                <div className="mt-8">
                  <ServiceCards />
                </div>
              </div>
            ) : (
              <div key="home" className="content-enter flex h-full min-h-0 w-full flex-col justify-end lg:justify-center">
                <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:items-center lg:gap-6">
                  <div className="flex w-full shrink-0 flex-col justify-center lg:w-[38%]">
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                      {t("subheadline")}
                    </p>
                    <h1 className="mt-3 text-4xl font-black leading-[0.92] tracking-tight text-neutral-950 dark:text-white sm:text-5xl lg:text-6xl">
                      {t("headline")}
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 lg:text-base">
                      {t("description")}
                    </p>
                    <StyledButton
                      text={t("reserveNow" as keyof Translations)}
                      onClick={() => openModal("contact")}
                    />
                  </div>
                  <div className="relative h-52 w-full sm:h-64 lg:h-[min(76vh,680px)] lg:flex-1">
                    <div ref={carRef} className="pointer-events-none absolute inset-x-[18%] inset-y-[16%] z-10 lg:inset-x-[8%] lg:inset-y-[8%]">
                      <div className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-10 rounded-full bg-black/15 blur-2xl dark:bg-black/60" />
                      <Image
                        src="/blackCar.webp"
                        alt={t("openGraph.image_alt" as keyof Translations)}
                        fill
                        sizes="(min-width: 1024px) 48vw, 90vw"
                        className="object-contain object-center dark:hidden"
                        priority
                      />
                      <Image
                        src="/yellowCar.webp"
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 48vw, 90vw"
                        className="hidden object-contain object-center dark:block"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 hidden lg:block">
                      <IconCards layout="orbit" onOpenServices={() => setIsServicesPage(true)} />
                    </div>
                  </div>
                </div>
                <div className="mt-2 w-full shrink-0 lg:hidden">
                  <IconCards onOpenServices={() => setIsServicesPage(true)} />
                </div>
              </div>
            )}
          </main>
        </div>
        <Footer />
      </section>
    </>
  );
}
