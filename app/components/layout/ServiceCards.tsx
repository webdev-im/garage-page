'use client';

import { ServiceCard } from "./ServiceCard"; // Reference to your ServiceCard component
import { Translations } from "../../context/LanguageContext";
import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";

export default function ServiceCards() {
    const { t } = useLanguage(); // Access translations
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const icons = [
        { key: "battery", file: "Battery.svg" },
        { key: "brake", file: "Brake.svg" },
        { key: "dashboard", file: "Dashboard.svg" },
        { key: "filter", file: "Filter.svg" },
        { key: "fuel", file: "Fuel.svg" },
        { key: "gearbox", file: "Gearbox.svg" },
        { key: "ignition", file: "Ignition.svg" },
        { key: "repairs", file: "Repairs.svg" },
        { key: "rotor", file: "Rotor.svg" },
        { key: "electric", file: "Electric.svg" },
        { key: "steering_wheel", file: "Steering wheel.svg" },
        { key: "service", file: "Service.svg" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6" >
            {icons.map((icon) => (
                <ServiceCard
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                    key={icon.key}
                    service={{
                        name: t(`icons.${icon.key}.name` as keyof Translations), // Get translation for name
                        icon: icon.file,
                        description: t(`icons.${icon.key}.description` as keyof Translations), // Get translation for description
                    }}
                />
            ))}
        </div>
    );
}
