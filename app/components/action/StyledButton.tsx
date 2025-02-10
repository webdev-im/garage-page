import React from "react";

interface StyledButtonProps {
    text: string;
    onClick?: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative inline-flex items-center justify-center focus:ring-3 focus:outline-none mt-4 lg:mt-8"
        >
            {/* Background hover effect - Fix: Removed `inset-0`, now matches button size */}
            <span className="absolute w-full h-full bg-yellow-400 dark:bg-gray-600 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 rounded-md"></span>

            {/* Main Button - Now defines the size of the hover effect */}
            <span className="relative border-2 border-white dark:border-black px-8 py-3 text-sm font-bold tracking-widest uppercase text-black dark:text-white rounded-md whitespace-nowrap">
                {text}
            </span>
        </button>
    );
};

export default StyledButton;
