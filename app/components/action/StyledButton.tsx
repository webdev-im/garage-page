import React from "react";
import { useLanguage } from "../../context/LanguageContext";

interface StyledButtonProps {
    text: string;
    onClick?: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({ text, onClick }) => {

    const { t, } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="group relative inline-block focus:ring-3 focus:outline-none mt-4 lg:mt-8"
        >
            {/* Background hover effect */}
            <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-400 dark:bg-gray-600 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 rounded-md"></span>

            {/* Main Button */}
            <span className="relative inline-block border-2 border-white dark:border-black px-8 py-3 text-sm font-bold tracking-widest uppercase text-black dark:text-white rounded-md">
                {text}
            </span>
        </button>
    );
};

export default StyledButton;
