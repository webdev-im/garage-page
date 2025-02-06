"use client";

import { IoMenu } from "react-icons/io5";
import LanguageSwitcher from "../action/LanguageSwitcher";
import { ThemeToggler } from "../action/ThemeToggler";
import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const { t } = useLanguage();

  return (
    <header className="fixed top-8 left-0 right-0 mx-auto w-[90%] lg:w-[60%] bg-white dark:bg-gray-900 shadow-md rounded-xl items-center justify-between flex px-6 py-2 lg:py-4 z-50 flex-row-reverse">
      {/* Logo (Left) */}
      <div className="flex items-center flex-none">
        <Logo />
      </div>

      {/* Navigation Links (Middle) */}
      <nav className="hidden lg:flex justify-center space-x-6">
        <NavLink label={t("contact")} href="#" />
        <NavLink label={t("services")} href="#" />
        <NavLink label={t("map")} href="#" />
      </nav>

      {/* Theme & Language Switchers (Right) */}
      <div className="flex items-center space-x-4">
        <ThemeToggler />
        <LanguageSwitcher />
        <MobileMenuIcon toggleDrawer={toggleDrawer} />
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && <MobileDrawer toggleDrawer={toggleDrawer} />}
    </header>
  );
};

const Logo = () => (
  <div className="flex items-center">
    <h1 className="text-lg font-bold text-black dark:text-white">G - SERVICE</h1>
  </div>
);

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="text-black dark:text-white hover:underline transition-colors px-4"
  >
    {label}
  </a>
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

const MobileDrawer = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-64 z-50 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300">
        <button
          className="absolute top-4 right-4 text-black dark:text-white"
          onClick={toggleDrawer}
          aria-label="Close Menu"
        >
          ✕
        </button>
        <nav className="flex flex-col items-start p-6 space-y-4">
          <NavLink label={t("contact")} href="#" />
          <NavLink label={t("services")} href="#" />
          <NavLink label={t("map")} href="#" />
          <ThemeToggler />
          <LanguageSwitcher />
        </nav>
      </div>
    </>
  );
};
