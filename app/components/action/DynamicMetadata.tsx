"use client";

import { useEffect } from "react";

import en from "../../locales/en.json";
import lt from "../../locales/lt.json";
import { useLanguage } from "../../context/LanguageContext";

function upsertMeta(name: string, content: string) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
}

export default function DynamicMetadata() {
    const { language } = useLanguage();

    useEffect(() => {
        const translations = language === "lt" ? lt : en;
        document.title = translations.title;
        document.documentElement.lang = language;
        upsertMeta("description", translations.description);
    }, [language]);

    return null;
}
