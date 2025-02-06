import React from "react";

interface StyledButtonProps {
    text: string;
    onClick?: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative inline-block text-sm font-semibold text-gray-900 dark:text-gray-100 focus:ring-3 focus:outline-none rounded-md"
        >
            {/* Border */}
            <span className="absolute inset-0 border border-orange-500 dark:border-gray-100 rounded-md"></span>

            {/* Button */}
            <span className="block border border-gray-900 dark:border-gray-100 bg-yellow-300 dark:bg-gray-700 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-md">
                {text}
            </span>
        </button>
    );
};

export default StyledButton;


// test