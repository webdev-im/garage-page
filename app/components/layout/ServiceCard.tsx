"use client";

import Image from "next/image";

export function ServiceCard({
    service,
    activeCard,
    setActiveCard,
}: {
    service: { name: string; icon: string; description: string };
    activeCard: string | null;
    setActiveCard: (key: string | null) => void;
}) {
    const isActive = activeCard === service.name;

    const handleClick = () => {
        setActiveCard(isActive ? null : service.name);
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setActiveCard(service.name)} // Desktop hover
            onMouseLeave={() => setActiveCard(null)} // Remove hover effect
            className={`relative flex flex-col items-center justify-center cursor-pointer ${isActive
                ? "bg-yellow-300 text-black dark:bg-yellow-300"
                : "bg-gray-100 text-black dark:bg-gray-900 dark:text-white"
                } p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300 ${isActive
                    ? "scale-105 ring-2 ring-yellow-300 dark:ring-yellow-500"
                    : "hover:scale-105 hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600"
                }`}
        >
            {/* Icon */}


            <Image
                src={`/icons/${service.icon}`}
                alt={service.name}
                width={64} // Default width (adjust as needed)
                height={64} // Default height (adjust as needed)
                className={`h-14 w-14 sm:h-16 sm:w-16 mb-3 sm:mb-4 transition-transform duration-300 ${isActive ? "scale-110 brightness-110" : "hover:scale-105 hover:brightness-110"
                    }`}
                style={{
                    filter: isActive
                        ? "invert(0) brightness(1.5) drop-shadow(0 0 6px rgba(255, 223, 0, 0.6))"
                        : "invert(1) brightness(0.8)",
                }}
                priority // Ensures fast loading for important images
                unoptimized // (Optional) Allows external/local assets without Next.js optimization
            />

            {/* Name */}
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{service.name}</h3>
            {/* Description */}
            <p
                className={`text-sm text-center ${isActive ? "text-gray-800 dark:text-black" : "text-gray-500 dark:text-gray-400"
                    }`}
            >
                {service.description}
            </p>
        </div>
    );
}
