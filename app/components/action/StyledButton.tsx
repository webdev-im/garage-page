import React from "react";

interface StyledButtonProps {
    text: string;
    onClick?: () => void;
    href?: string;
    compact?: boolean;
    variant?: "primary" | "secondary";
}

const StyledButton: React.FC<StyledButtonProps> = ({ text, onClick, href, compact = false, variant = "primary" }) => {
    const className = `inline-flex w-fit items-center justify-center rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 sm:text-sm ${compact ? "" : "mt-5"} ${
        variant === "secondary"
            ? "border border-black/15 bg-transparent text-neutral-700 hover:border-black/40 hover:text-neutral-950 dark:border-white/25 dark:text-neutral-200 dark:hover:border-white/50 dark:hover:text-white"
            : "bg-yellow-400 text-neutral-950 hover:bg-yellow-300"
    }`;

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {text}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            {text}
        </button>
    );
};

export default StyledButton;
