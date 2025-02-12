"use client";

import { useEffect, useState } from "react";

import Head from "next/head";
import en from "../../locales/en.json";
import lt from "../../locales/lt.json";
import { useLanguage } from "../../context/LanguageContext";

export default function DynamicMetadata() {
    const { language } = useLanguage();

    const [metadata, setMetadata] = useState({
        title: en.title,
        description: en.description,

    });

    useEffect(() => {
        const translations = language === "lt" ? lt : en;

        setMetadata({
            title: translations.title,
            description: translations.description,

        });
    }, [language]);

    return (
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />

        </Head>
    );
}
