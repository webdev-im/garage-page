'use client';

import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import LanguageSwitcher from "../action/LanguageSwitcher";
import Link from "next/link";
import { ThemeToggler } from "../action/ThemeToggler";
import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useState } from "react";

export const Header = ({
  setLocationModalOpen,
  setContactModalOpen,
  onLogoClick,
  onServicesClick,
}: {
  setLocationModalOpen: (open: boolean) => void;
  setContactModalOpen: (open: boolean) => void;
  onLogoClick: () => void; // Callback for logo click
  onServicesClick: () => void; // Callback for services click
}) => {
  const [drawerState, setDrawerState] = useState<"closed" | "open" | "closing">("closed");
  const { t } = useLanguage();

  const toggleDrawer = () => {
    setDrawerState((current) => {
      if (current === "open") return prefersReducedMotion() ? "closed" : "closing";
      if (current === "closing") return "closing";
      return "open";
    });
  };

  useEffect(() => {
    if (drawerState !== "closing") return;
    const timeout = window.setTimeout(() => setDrawerState("closed"), 240);
    return () => window.clearTimeout(timeout);
  }, [drawerState]);

  return (
    <header className="z-50 flex w-full shrink-0 items-center justify-between border-b border-black/10 py-3 dark:border-white/10">
      {/* Logo (Left) */}


      <div className="flex items-center flex-none">
        <div className="flex cursor-pointer items-center" onClick={onLogoClick}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            priority
          />
          <span className="ml-2.5 inline-flex items-baseline">
            <span className="text-lg font-semibold leading-none tracking-tight text-neutral-950 dark:text-white">
              Giedrius
            </span>
            <span className="ml-1.5 text-[13px] font-medium uppercase leading-none tracking-[0.12em] text-neutral-600 dark:text-neutral-400">
              {t("brandService")}
            </span>
          </span>
        </div>
      </div>



      {/* Navigation Links (Middle) */}
      <nav className="hidden lg:flex justify-center">

        <NavLink
          label={t("services")}
          href="#"
          onClick={onServicesClick} // Call onServicesClick when clicked
        />
        <NavLink
          label={t("map")}
          href="#"
          onClick={() => setLocationModalOpen(true)}
        />
        <NavLink
          label={t("contact")}
          href="#"
          onClick={() => setContactModalOpen(true)}
        />
      </nav>

      {/* Right Section: Theme & Language for Desktop, Menu Icon for Mobile */}
      <div className="flex items-center space-x-4">
        {/* ✅ Show on Desktop Only */}
        <div className="hidden lg:flex space-x-4">
          <ThemeToggler />
          <LanguageSwitcher />
        </div>

        {/* ✅ Show Mobile Menu Button on Small Screens */}
        <MobileMenuIcon toggleDrawer={toggleDrawer} />
      </div>

      {/* Mobile Drawer */}
      {drawerState !== "closed" && (
        <MobileDrawer
          isClosing={drawerState === "closing"}
          toggleDrawer={toggleDrawer}
          setLocationModalOpen={setLocationModalOpen}
          setContactModalOpen={setContactModalOpen}
          onServicesClick={onServicesClick}
          onLogoClick={onLogoClick}
        />
      )}
    </header>
  );
};

const NavLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className="px-4 text-neutral-800 transition-colors hover:text-neutral-950 dark:text-neutral-100 dark:hover:text-white"
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
  >
    {label}
  </Link>
);

const MobileMenuIcon = ({ toggleDrawer }: { toggleDrawer: () => void }) => (
  <button
    className="rounded-md p-2 text-neutral-900 hover:bg-black/5 dark:text-white dark:hover:bg-white/10 lg:hidden"
    onClick={toggleDrawer}
    aria-label="Open Menu"
  >
    <IoMenu size={24} />
  </button>
);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const MobileDrawer = ({
  isClosing,
  toggleDrawer,
  setLocationModalOpen,
  setContactModalOpen,
  onServicesClick,
}: {
  isClosing: boolean;
  toggleDrawer: () => void;
  setLocationModalOpen: (open: boolean) => void;
  setContactModalOpen: (open: boolean) => void;
  onServicesClick: () => void;
  onLogoClick: () => void;
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop fixed inset-0 z-40 bg-black/50 ${isClosing ? "is-closing" : ""}`}
        onClick={toggleDrawer}
      ></div>

      <div className={`drawer-panel fixed right-0 top-0 z-50 flex h-full w-64 flex-col bg-[#f7f4ee] text-neutral-900 shadow-lg dark:bg-[#16181d] dark:text-white ${isClosing ? "is-closing" : ""}`}>
        {/* Header Section (Close Button + Togglers) */}
        <div className="flex flex-row items-center justify-between border-b border-black/10 px-3 py-4 dark:border-white/10">
          {/* Theme & Language Switchers (Left Side) */}
          <div className="flex space-x-3">
            <ThemeToggler />
            <LanguageSwitcher />
          </div>

          {/* Close Button (Right Side) */}
          <button
            className="text-xl text-neutral-900 dark:text-white"
            onClick={toggleDrawer}
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-start p-6 space-y-6 mt-2">
          <NavLink
            label={t("services")}
            href="#"
            onClick={() => {
              onServicesClick();
              toggleDrawer();
            }}
          />
          <NavLink
            label={t("map")}
            href="#"
            onClick={() => {
              setLocationModalOpen(true);
              toggleDrawer();
            }}
          />
          <NavLink
            label={t("contact")}
            href="#"
            onClick={() => {
              setContactModalOpen(true);
              toggleDrawer();
            }}
          />


        </nav>

        {/* Bottom Close Button (Larger Gap) */}
        <div className="p-6 mt-auto">
          <button
            className="w-full rounded-full bg-neutral-950 py-2 text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            onClick={toggleDrawer}
          >
            {t("close")}
          </button>
        </div>
      </div>
    </>
  );
};
