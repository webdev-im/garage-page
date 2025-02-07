"use client";

import { useEffect, useState } from "react";

import { ThemeProvider } from "next-themes";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // ✅ Ensure the theme is applied only after mounting
    }, []);

    if (!mounted) {
        return <>{children}</>; // ✅ Prevents mismatch by avoiding early theme changes
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
        </ThemeProvider>
    );
}
