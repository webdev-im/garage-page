"use client";

import { GiSelfLove } from "react-icons/gi";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext"; // Ensure correct path

const Footer = () => {
    const { t, language } = useLanguage();

    return (
        <footer className="relative w-full py-2 px-1 rounded-lg text-xs md:text-sm flex justify-end">


            <div className="flex items-center space-x-1">
                <span>{t("madeWith")}</span>
                <GiSelfLove className="text-sky-500" />
                <div className="relative group">
                    <Link
                        href="https://webdevim.netlify.app"
                        target="_blank"
                        className="font-bold flex items-center hover:no-underline"
                    >
                        {language === "en" && (
                            <span className="font-normal">{t("by")} </span>
                        )}
                        <span className="ml-1">{"WebDev I'm"}</span>
                    </Link>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {t("externalLink")}
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
