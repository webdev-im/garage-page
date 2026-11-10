"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { useTheme } from "../layout/ThemeWrapper";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Use light mode" : "Use dark mode"}
      disabled={theme === null}
      onClick={() => {
        if (!theme) return;
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition hover:bg-black/5 disabled:opacity-60 dark:border-white/15 dark:hover:bg-white/10"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : theme === "light" ? (
        <MoonIcon className="h-5 w-5 text-neutral-900" />
      ) : null}
    </button>
  );
};
