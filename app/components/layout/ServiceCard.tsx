'use client';

import React from "react";

export function ServiceCard({
    service,
}: {
    service: { name: string; icon: string; description: string };
}) {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            {/* Icon */}
            <img
                src={`/icons/${service.icon}`}
                alt={service.name}
                className="h-16 w-16 mb-4"
                style={{
                    filter: "invert(0.8) brightness(1.2)", // Adjust icon brightness and color for better contrast
                }}
            />
            {/* Name */}
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {service.name}
            </h3>
            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {service.description}
            </p>
        </div>
    );
}
