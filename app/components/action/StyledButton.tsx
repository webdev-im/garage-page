import React from "react";

interface StyledButtonProps {
    text: string;
    onClick?: () => void;
    href?: string;
    compact?: boolean;
    variant?: "primary" | "secondary";
}

const StyledButton: React.FC<StyledButtonProps> = ({ text, onClick, href, compact = false, variant = "primary" }) => {
    const className = `group relative inline-flex w-fit items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${compact ? "" : "mt-3 lg:mt-5"}`;
    const inner = variant === "secondary" ? (
        <span className="relative whitespace-nowrap rounded-md border border-white/30 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white/75 transition hover:border-white/60 hover:text-white dark:border-black/20 dark:text-neutral-600 dark:hover:border-black/40 dark:hover:text-neutral-900 sm:px-8 sm:text-sm">
            {text}
        </span>
    ) : (
        <>
            <span className="absolute h-full w-full rounded-md bg-yellow-400 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 dark:bg-gray-600"></span>
            <span className="relative whitespace-nowrap rounded-md border-2 border-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black dark:border-black dark:text-white sm:px-8 sm:text-sm">
                {text}
            </span>
        </>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            {inner}
        </button>
    );
};

export default StyledButton;
