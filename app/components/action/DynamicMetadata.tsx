"use client";

import { useEffect, useState } from "react";

import Head from "next/head";
import en from "../../locales/en.json";
import lt from "../../locales/lt.json";
import { useLanguage } from "../../context/LanguageContext";

export default function DynamicMetadata() {
    const { language } = useLanguage();

    // ✅ Store metadata in state and update dynamically
    const [metadata, setMetadata] = useState({
        title: en.title,
        description: en.description,
        openGraph: {
            title: en.openGraph.title,
            description: en.openGraph.description,
            image: en.openGraph.image,
            image_alt: en.openGraph.image_alt,
        },
    });

    // ✅ Update metadata dynamically when language changes
    useEffect(() => {
        const translations = language === "lt" ? lt : en;

        setMetadata({
            title: translations.title,
            description: translations.description,
            openGraph: {
                title: translations.openGraph.title,
                description: translations.openGraph.description,
                image: translations.openGraph.image,
                image_alt: translations.openGraph.image_alt,
            },
        });
    }, [language]);

    return (
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta property="og:description" content={metadata.openGraph.description} />
            <meta property="og:image" content={metadata.openGraph.image} />
            <meta property="og:image:alt" content={metadata.openGraph.image_alt} />
        </Head>
    );
}
