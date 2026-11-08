'use client';

import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import LanguageSwitcher from "../action/LanguageSwitcher";
import Link from "next/link";
import { ThemeToggler } from "../action/ThemeToggler";
import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";

export const Header = ({
  setLocationModalOpen,
  setContactModalOpen,
  onLogoClick,
  onServicesClick,
  wide = false,
}: {
  setLocationModalOpen: (open: boolean) => void;
  setContactModalOpen: (open: boolean) => void;
  onLogoClick: () => void; // Callback for logo click
  onServicesClick: () => void; // Callback for services click
  wide?: boolean;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const { t } = useLanguage();

  return (
    <header className={`mx-auto w-full shrink-0 ${wide ? "max-w-6xl" : "lg:w-[60%]"} bg-white dark:bg-gray-900 shadow-md rounded-xl flex items-center justify-between px-6 py-2 lg:py-3 z-50`}>
      {/* Logo (Left) */}


      <div className="flex items-center flex-none">
        <div className="flex items-center cursor-pointer" onClick={onLogoClick}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={30} // Adjust to your desired width
            height={30} // Adjust to your desired height
            priority // Ensures the logo loads quickly
          />
          <span className="text-lg font-bold text-black dark:text-white ml-2">
            SERVICE
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
      {isDrawerOpen && (
        <MobileDrawer
          toggleDrawer={toggleDrawer}
          setLocationModalOpen={setLocationModalOpen}
          setContactModalOpen={setContactModalOpen}
          onServicesClick={onServicesClick} // Pass callback for services click
          onLogoClick={onLogoClick} // Pass callback for logo click
        />
      )}
    </header>
  );
};

const NavLink = ({
  label,
  href,
  onClick,
  tone = "header",
}: {
  label: string;
  href: string;
  onClick?: () => void;
  tone?: "header" | "page";
}) => (
  <Link
    href={href}
    className={`px-4 transition-colors hover:underline ${
      tone === "page" ? "text-white dark:text-neutral-900" : "text-black dark:text-white"
    }`}
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
    className="lg:hidden p-2 rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
    onClick={toggleDrawer}
    aria-label="Open Menu"
  >
    <IoMenu size={24} />
  </button>
);

const MobileDrawer = ({
  toggleDrawer,
  setLocationModalOpen,
  setContactModalOpen,
  onServicesClick,
}: {
  toggleDrawer: () => void;
  setLocationModalOpen: (open: boolean) => void;
  setContactModalOpen: (open: boolean) => void;
  onServicesClick: () => void; // Callback for services click
  onLogoClick: () => void; // Callback for logo click
}) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-64 transform flex-col bg-neutral-900 text-white shadow-lg transition-transform duration-300 dark:bg-white dark:text-neutral-900">
        {/* Header Section (Close Button + Togglers) */}
        <div className="flex flex-row items-center justify-between border-b border-white/15 px-3 py-4 dark:border-black/10">
          {/* Theme & Language Switchers (Left Side) */}
          <div className="flex space-x-3">
            <ThemeToggler />
            <LanguageSwitcher />
          </div>

          {/* Close Button (Right Side) */}
          <button
            className="text-xl text-white dark:text-neutral-900"
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
            tone="page"
            onClick={() => {
              onServicesClick();
              toggleDrawer();
            }}
          />
          <NavLink
            label={t("map")}
            href="#"
            tone="page"
            onClick={() => {
              setLocationModalOpen(true);
              toggleDrawer();
            }}
          />
          <NavLink
            label={t("contact")}
            href="#"
            tone="page"
            onClick={() => {
              setContactModalOpen(true);
              toggleDrawer();
            }}
          />


        </nav>

        {/* Bottom Close Button (Larger Gap) */}
        <div className="p-6 mt-auto">
          <button
            className="w-full rounded-md bg-white/10 py-2 text-white transition hover:bg-white/20 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            onClick={toggleDrawer}
          >
            {t("close")}
          </button>
        </div>
      </div>
    </>
  );
};
