'use client'

import { useState } from "react";

export function IconCard({ icon }: { icon: { name: string; file: string; description: string } }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-110"
    >
      {/* Icon */}
      <img
        src={`/icons/${icon.file}`}
        alt={icon.name}
        className={`h-10 w-10 sm:h-14 sm:w-14 transition-transform duration-300 ${
          hovered ? "scale-125" : "scale-100"
        }`}
      />
      {/* Description (Appears below the icon) */}
      <div
        className={`absolute -bottom-8 text-center bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-md text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      >
        {icon.description}
      </div>
    </div>
  );
}
