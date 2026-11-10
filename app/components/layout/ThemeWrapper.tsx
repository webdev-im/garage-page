"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isDaytime, nextSunChange } from "../../lib/daylight";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme | null;
    setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = "themePreference";

const ThemeContext = createContext<ThemeContextValue>({
    theme: null,
    setTheme: () => {},
});

function readPreference(): Theme | "auto" {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return "auto";
}

function resolveTheme(): Theme {
    const preference = readPreference();
    if (preference !== "auto") return preference;
    return isDaytime() ? "light" : "dark";
}

function applyTheme(theme: Theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme | null>(null);

    useEffect(() => {
        let timer = 0;

        const followSun = () => {
            window.clearTimeout(timer);
            if (readPreference() !== "auto") return;
            const next = isDaytime() ? "light" : "dark";
            applyTheme(next);
            setThemeState(next);
            const wait = Math.min(Math.max(15_000, nextSunChange().getTime() - Date.now()), 60 * 60 * 1000);
            timer = window.setTimeout(followSun, wait);
        };

        const next = resolveTheme();
        applyTheme(next);
        setThemeState(next);
        if (readPreference() === "auto") {
            const wait = Math.min(Math.max(15_000, nextSunChange().getTime() - Date.now()), 60 * 60 * 1000);
            timer = window.setTimeout(followSun, wait);
        }

        const onVisible = () => {
            if (document.visibilityState === "visible") followSun();
        };
        document.addEventListener("visibilitychange", onVisible);
        return () => {
            window.clearTimeout(timer);
            document.removeEventListener("visibilitychange", onVisible);
        };
    }, []);

    const setTheme = (next: Theme) => {
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
        setThemeState(next);
    };

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
