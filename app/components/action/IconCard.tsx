'use client';

import { useEffect, useState } from 'react';

import Image from "next/image";

export function IconCard({
  icon,
}: {
  icon: { name: string; file: string; description: string };
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // `lg` breakpoint in Tailwind
    };

    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    // Mobile Version
    <div className="flex flex-col items-center justify-center bg-gray-900 dark:bg-gray-100 text-white dark:text-black p-4 rounded-lg shadow-md w-full sm:w-1/2 gap-2">
      {/* Icon */}
      <Image
        src={`/icons/${icon.file}`}
        alt={icon.name}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        style={{
          filter: "invert(0.7) brightness(0.9) grayscale(1)",
        }}
        priority
        unoptimized
      />

      {/* Name */}
      <h3 className=" text-md lg:text-lg font-semibold text-gray-300 dark:text-gray-900 text-center">
        {icon.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 dark:text-gray-600 text-center">
        {icon.description}
      </p>
    </div>
  ) : (
    // Desktop Version
    <div
      className="group relative w-20 h-20 sm:w-20 sm:h-20 lg:w-16 lg:h-16 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-110"
    >
      <Image
        src={`/icons/${icon.file}`}
        alt={icon.name}
        width={48}
        height={48}
        className="h-15 w-15 sm:h-12 sm:w-12 lg:h-8 lg:w-8 transition-transform duration-300"
      />
      <div className="absolute -bottom-15 text-center bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-md text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {icon.description}
      </div>
    </div>
  );
}
